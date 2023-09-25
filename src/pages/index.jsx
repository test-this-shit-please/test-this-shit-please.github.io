/*eslint-env node*/
import React from "react";
import { writeFileSync } from "fs";
/**
 * Creates unsafe hash for string.
 * @param {string} str String to hash.
 * @returns {string}
 */
const hashIt = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash;
	}
	return new Uint32Array([hash])[0].toString(36);
};
/**
 * Converts string to dash-case.
 * @param {string} str Will be converted to dashcase.
 * @returns {string}
 */
const toDashCase = (str = "") => {
	return str.replaceAll(/([A-Z]{1})/g, "-$1").toLowerCase();
};
//
const media = {
	"sm": "(max-width: 600px)",
	"md": "(max-width: 800px)",
	"lg": "(max-width: 1000px)",
};
//
const styleshits = {};
class Stylesheet {
	className = "";
	media = "all";
	props = {};
	mediaArgs = {
		"sm": [],
		"md": [],
		"lg": [],
	};
	sm(...args) {
		this.media = "sm";
		this.mediaArgs.sm = args;
		return this;
	}
	md(...args) {
		this.media = "md";
		this.mediaArgs.md = args;
		return this;
	}
	lg(...args) {
		this.media = "lg";
		this.mediaArgs.lg = args;
		return this;
	}
	_renderProps(props = {}, offset = "") {
		let propsStr = "";
		for (let [propName, propVal] of Object.entries(props)) {
			propsStr += `${offset}${toDashCase(propName)}: ${propVal};\n`;
		}
		return propsStr;
	}
	_renderFirstLevelProps(props = {}) {
		let css = "";
		for (let [propName, propValue] of Object.entries(props)) {
			propName = toDashCase(propName);
			css += `\t${propName}: ${propValue};\n`;
		}
		return css;
	}
	_renderMediaLevelProps() {
		let css;
		for (const [mediaName, mediaArgs] of Object.entries(this.mediaArgs)) {
			css += `\t@media ${media[mediaName]} {\n`;
			css += this._renderProps(mediaArgs, "\t\t");
			css += "\t}\n";
			return css;
		}
	}
	toString() {
		let cssClass = "";
		cssClass += this._renderFirstLevelProps(this.props);
		cssClass += this._renderMediaLevelProps();
		const hash = "r" + hashIt(cssClass);
		cssClass = `.${hash} {\n${cssClass}}`;
		if (!styleshits[hash]) {
			styleshits[hash] = cssClass;
			writeFileSync("./rcss.css", Object.values(styleshits).join("\n"));
		}
		return hash;
	}
}

/**
 * Creates stylesheet object and populate it with props.
 * @param {[*]} args Objects or functions returning objects fos styles.
 */
function rcss(...args) {
	const stylesheet = new Stylesheet();
	for (const arg of args) {
		Object.assign(stylesheet.props, typeof arg === "function" ? arg() : arg);
	}
	return stylesheet;
}
//
const config = {
	"url": "https://test-this-shit-please.github.io/",
	"coverBig": "https://test-this-shit-please.github.io/cover-big.jpg",
	"title": "QA/Testing Team - Test This Shit",
	"description": `A team of testers, programmers, designers, 
		and DevOps who have decided to engage in testing.`,
};

const githubLink = "https://github.com/test-this-shit-please/test-this-shit-please.github.io";

/**
 * Head Component.
 */
const Head = () => {
	return (
		<head>
			<meta charSet="utf-8" />
			<title>{config.title}</title>
			<meta property="og:url" content={config.url} />
			<meta property="og:type" content="article" />
			<meta property="og:image" content={config.coverBig} />
			<meta name="description" content={config.description} />
			<meta name="viewport" content="width=device-width" />
			<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" href="/assets/icons/favicon-64x64.png" />
			<link rel="icon" type="image/png" href="/assets/icons/favicon-32x32.png" />
			<link rel="icon" type="image/png" href="/assets/icons/favicon-16x16.png" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="mask-icon" href="/assets/icons/mask-icon.svg" color="#111111" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="stylesheet" type="text/css" href="/index.css" />
			<link rel="stylesheet" type="text/css" href="/rcss.css" />
			<meta name="twitter:image" content={config.coverBig} />
			<meta name="twitter:description" content={config.description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="theme-color" content="#0B1120" />
		</head>
	);
};

/**
 * Index page component.
 */
export default function Index() {
	return (
		<html lang="en">
			<Head />
			<body>
				<section>
					<div className="brand">
						<h2 className={rcss({ "display": "flex", "alignItems": "center" })}>
							TestThisShitPlease&nbsp;
							<img
								src="/assets/icons/icon.svg"
								className={rcss({
									"height": "1em",
									"opacity": ".5",
								})}
							/>
						</h2>
					</div>
					<h1>
						QA Team
						<br /> you will love
						<br /> to work with
					</h1>
					<a href={githubLink}>Read More On Github</a>
					<div className="background">
						{[...Array(26)].map((e, i) => {
							return <span key={i} />;
						})}
					</div>
				</section>
			</body>
		</html>
	);
}
