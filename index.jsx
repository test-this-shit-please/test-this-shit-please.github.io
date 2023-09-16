import { log } from "./src/utils.mjs";

const hashIt = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash;
	}
	return new Uint32Array([hash])[0].toString(36);
};

const toDashCase = (str = "") => {
	return str.replaceAll(/([A-Z]{1})/g, "-$1").toLowerCase();
};

const styleshits = {};

class Stylesheet {
	className = "";
	media = "all";
	props = {};
	mediaArgs = {
		sm: [],
		md: [],
		lg: [],
	};
	sm(...args) {
		this.media = "sm";
		this.mediaArgs = args;
		return this;
	}
	md() {
		this.media = "md";
		return this;
	}
	lg() {
		this.media = "lg";
		return this;
	}
	toString() {
		const json = JSON.stringify(this.props) + this.media;
		const hash = hashIt(json);
		const media = {
			sm: "(max-width: 600px)",
			md: "(max-width: 800px)",
			lg: "(max-width: 1000px)",
		};
		if (!styleshits[hash]) {
			let cssClass = `.${hash} {\n`;
			for (let [propName, propValue] of Object.entries(this.props)) {
				propName = toDashCase(propName);
				cssClass += `\t${propName}: ${propValue};\n`;
			}
			for (const [mediaName, mediaArgs] of Object.entries(
				this.mediaArgs
			)) {
				for (const mediaArg of this.mediaArgs) {
					log(mediaArg);

					for (let [mediaPropName, mediaPropVal] of Object.entries(
						mediaArg
					)) {
						//log({ mediaPropName, mediaPropVal });
					}
				}
			}
			cssClass += "}";
			styleshits[hash] = this;
			log(cssClass);
		}
		return hash;
	}
}

function rcss(...args) {
	const stylesheet = new Stylesheet();
	for (const arg of args) {
		Object.assign(
			stylesheet.props,
			typeof arg === "function" ? arg() : arg
		);
	}
	return stylesheet;
}

const sheet = rcss(
	{ backgroundColor: "red", color: "pink" },
	{ fontFamily: "arial" },
	() => ({ fontSize: "1rem" })
);

const config = {
	url: "https://test-this-shit-please.github.io/",
	coverBig: "https://test-this-shit-please.github.io/cover-big.jpg",
	title: "QA/Testing Team - Test This Shit",
	description:
		"A team of testers, programmers, designers, and DevOps who have decided to engage in testing.",
};

export default function Index() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>{config.title}</title>
				<meta property="og:url" content={config.url} />
				<meta property="og:type" content="article" />
				<meta property="og:image" content={config.coverBig} />
				<meta name="description" content={config.description} />
				<meta name="viewport" content="width=device-width" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icon-180x180.png"
				/>
				<link rel="icon" type="image/png" href="/icon-64x64.png" />
				<link rel="icon" type="image/png" href="/icon-32x32.png" />
				<link rel="icon" type="image/png" href="/icon-16x16.png" />
				<link rel="stylesheet" type="text/css" href="/index.css" />
				<meta name="twitter:image" content={config.coverBig} />
				<meta name="twitter:description" content={config.description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="theme-color" content="#0B1120" />
			</head>
			<body
				className={rcss({ backgroundColor: "red" }).sm(
					{
						backgroundColor: "pink",
					},
					{ fontSize: "2rem" }
				)}
			>
				<section>
					<div className="brand">
						<h2>TestThisShitPlease</h2>
					</div>
					<h1>
						QA Team you will love
						<br />
						to work with
					</h1>
					<a href="https://github.com/test-this-shit-please/test-this-shit-please.github.io">
						Read More On Github
					</a>
					<div className="background">
						{[...Array(26)].map((e, i) => (
							<span key={i} />
						))}
					</div>
				</section>
			</body>
		</html>
	);
}
