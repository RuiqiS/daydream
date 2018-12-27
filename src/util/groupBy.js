const { Collection } = require('discord.js');

/**
 * Groups an iterable into a collection based on the return value of provided function
 * @param {Collection} collection Collection to group
 * @param {Function} fn Function to group by
 * @returns {Collection} Grouped Collection
 */
function groupBy(collection, fn) {
	const c = new Collection();
	for (const [key, val] of collection) {
		const group = fn(val);
		const existing = c.get(group);
		if (existing) existing.set(key, val);
		else c.set(group, new Collection([[key, val]]));
	}
	return c;
}

module.exports = groupBy;
