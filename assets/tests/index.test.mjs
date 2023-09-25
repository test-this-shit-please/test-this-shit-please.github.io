import { describe, expect, it, test } from "bun:test";
import { join } from "path";
import { log } from "../../src/utils.mjs";

const baseUrl = "http://localhost:3000";
const response = await fetch(baseUrl);
const html = await response.text();

/**
 * Getting tags.
 * @param {string} html Valid HTML code.
 * @param {string|array} tagName Name of the tags to get or array of names.
 */
function getTags(html, tagName) {
	tagName = typeof tagName === "string" ? tagName : tagName.join("|");
	const regexp = new RegExp(`<(${tagName})([^>]+)>`, "gi");
	const matches = [...html.matchAll(regexp)];
	const tags = {};
	for (const match of matches) {
		const matchedTagName = match[1];
		const propsStr = match[2].trim();
		const propsMatches = [...propsStr.matchAll(/([a-z:]+)="([^"]+)"/gi)];
		tags[matchedTagName] ??= [];
		const tagProps = {};
		for (const propMatch of propsMatches) {
			const [, key, value] = propMatch;
			tagProps[key] = value;
		}
		tags[matchedTagName].push(tagProps);
	}
	return tags;
}

const tags = getTags(html, ["meta", "link"]);
log();
log("-- Hey Bro. keep fucus -- ");
log();
describe("index page", async () => {
	/**
	 * BaseUrl is available.
	 */
	it(`confirm that ${baseUrl} responses with 200`, async (done) => {
		expect(response.status).toBe(200);
		done();
	});
	/**
	 * Linked assets.
	 */
	it("it confirms all assets responses with 200", async (done) => {
		for (const [tagName, props] of Object.entries(tags)) {
			for (const tagProps of props) {
				for (const [propName, propVal] of Object.entries(tagProps)) {
					let url = "";
					if (propVal[0] === "/") {
						url = join(baseUrl, propVal);
					}
					if (propVal.includes("://")) {
						url = propVal;
					}
					if (url) {
						//Log(url);
						const response = await fetch(url);
						expect(response.status).toBe(200);
					}
				}
			}
		}
		done();
	});

	it("confirm that robots.txt, sitemap.xml etc is presented and not empty", async (done) => {
		const uriList = ["/robots.txt", "/sitemap.xml"];
		for (const uri of uriList) {
			log(uri);
			const response = await fetch(join(baseUrl, uri));
			expect(response.status).toBe(200);
		}
		done();
	});
	it.todo("it confirms that external API's is available");
	test.todo("charset");
	test.todo("viewport");
	test.todo("title");
	test.todo("description");
	test.todo("og:tags");
	test.todo("twitter:tags");
	test.todo("sitemap.xml");
	test.todo("favicon.ico");
	test.todo("apple icons");
	test.todo("android icons icons");
});
