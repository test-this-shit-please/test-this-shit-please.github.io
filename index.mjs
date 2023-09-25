/* eslint-disable no-undef */
/* eslint-env node */

/**
 * Bootstarp.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { parse } from "url";
import web from "./@dev/src/checklists/web_v1.mjs";
import Index from "./src/pages";

// Md.push(`## ${section.title}`);
// For (const item of section.items) {
// 	Let title = item.title;
// 	If (item.link) {
// 		Title = `[${title}](${item.link})`;
// 	}
// 	If (item.moreLink) {
// 		Title = `${title} <small>
//  		<a href="${item.moreLink}" target="_blank" style="color: gray">(info)</a>
//  	</small>`;
// 	}
// 	Md.push(`- ${title}`);
// }

/**
 * Renders checklist teim.
 * @param {object} item Item of the checklist.
 * @returns {string}
 */
const processItem = (item) => {
	let title = item.title;
	if (item.link) {
		title = `[${title}](${item.link})`;
	}
	if (item.moreLink) {
		title = `${title}
		<small>
			<a href="${item.moreLink}" target="_blank" style="color: gray">
				(info)
			</a>
		</small>`;
	}
	return title;
};

/**
 * Renders section of the checklist.
 * @param {array} md Markdown array.
 * @param {array} section Section to be rendered.
 */
const processSection = (md, section) => {
	md.push(`## ${section.title}`);
	for (const item of section.items) {
		md.push(`- ${processItem(item)}`);
	}
};

/**
 * Renders checklist object to markdown file.
 * @param {object} checklist Object representing checklist.
 */
function checkListToMd_v1(checklist = {}) {
	const md = [`# ${checklist.title}`, `> ${checklist.description}`];
	for (const section of checklist.sections) {
		processSection(md, section);
	}
	const mdStr = md.join("\n");
	writeFileSync("./web.md", mdStr);
}

/**
 * Builds index page.
 */
function build() {
	const html = renderToString(Index());
	writeFileSync("./index.html", html);
	checkListToMd_v1(web);
}

build();

Bun.serve({
	"port": 3000,
	fetch(req) {
		const url = parse(req.url);
		const pathName = url.pathname === "/" ? "./index.html" : url.pathname;
		return new Response(Bun.file(join(process.cwd(), pathName)));
	},
	error() {
		return new Response("Not Found", { "status": 404 });
	},
});
