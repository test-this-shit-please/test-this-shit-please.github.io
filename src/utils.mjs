/*eslint-env node*/
/**
 * Utils.
 */
export const log = console.log;
export const info = console.info;
export const debug = console.debug;
let hereCount = 0;
/**
 * Just dopped message. Short equialent of console.log('here').
 * @returns {void}
 */
export const here = () => {
	return log("here", hereCount++);
};
