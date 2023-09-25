/*eslint-env node*/
/**
 * Focus.
 * Add .focus.dev.json to the project root and this will display things you need to be focused on.
 */
const log = console.log;
const colors = {
	"reset": "\x1b[0m",
	"bright": "\x1b[1m",
	"dim": "\x1b[2m",
	"underscore": "\x1b[4m",
	"blink": "\x1b[5m",
	"reverse": "\x1b[7m",
	"hidden": "\x1b[8m",

	"black": "\x1b[30m",
	"red": "\x1b[31m",
	"green": "\x1b[32m",
	"yellow": "\x1b[33m",
	"blue": "\x1b[34m",
	"magenta": "\x1b[35m",
	"cyan": "\x1b[36m",
	"white": "\x1b[37m",
	"gray": "\x1b[90m",
	"crimson": "\x1b[38m",

	"bg": {
		"black": "\x1b[40m",
		"red": "\x1b[41m",
		"green": "\x1b[42m",
		"yellow": "\x1b[43m",
		"blue": "\x1b[44m",
		"magenta": "\x1b[45m",
		"cyan": "\x1b[46m",
		"white": "\x1b[47m",
		"gray": "\x1b[100m",
		"crimson": "\x1b[48m",
	},
};
/**
 * Shows colored message.
 * @param {string } color Color Will be set and then reseted.
 * @param {string} message Message will be colored and shown.
 */
const color = (color, message) => {
	return log(`${colors[color]}${message}${colors["reset"]}`);
};
/**
 * Returns string filled with given char.
 * @param {string} char Char ot use as fill.
 * @param {string} count Count how many times to repeat.
 */
const fill = (char = " ", count = 10) => {
	return Array(count).fill(char).join("");
};
/**
 * Puts @done items on the bottom of the list.
 * @param {string} a Item a.
 * @param {string} b Item b.
 */
const sortUndoneFirst = (a = "", b = "") => {
	return a.includes("@done") && !b.includes("@done") ? 1 : -1;
};
/*@ts-ignore*/
import focus from "./../../.focus.dev.json"; /** @todo Check if focus file exists. */
//
log("");
color("yellow", fill("=", 30) + " [+Focus ] " + fill("=", 30));
for (const focusItem of focus.sort(sortUndoneFirst)) {
	color("blue", `• ${focusItem.replace("@done", `${colors["green"]}@done${colors["reset"]}`)}`);
}
color("yellow", fill("=", 30) + " [-Focus ] " + fill("=", 30));
log("");
