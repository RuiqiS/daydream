
/**
 * Titlecases provided string
 * @param {string} input string to title case
 * @returns {string} string in title case
 */
function toTitleCase(input) {
	return input = input.replace(/(\w)(\w*\s?)/gi, (match, p1, p2) => p1.toUpperCase() + p2);
}

module.exports = toTitleCase;
