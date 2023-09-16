import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { parse } from "url";
import Index from ".";
const html = renderToString(Index());
writeFileSync("./index.html", html);

Bun.serve({
	port: 3000,
	fetch(req) {
		const url = parse(req.url);
		const pathName = url.pathname === "/" ? "./index.html" : url.pathname;
		return new Response(Bun.file(join(process.cwd(), pathName)));
	},
	error(req) {
		return new Response("Not Found", { status: 404 });
	},
});
