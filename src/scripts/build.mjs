import { writeFileSync } from "fs";
import { renderToString } from "react-dom/server";
import page from "./test.jsx";

export function build() {}

const html = renderToString(page());
writeFileSync("./test.html", html);
