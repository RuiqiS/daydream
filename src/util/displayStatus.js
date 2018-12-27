const { Guild } = require('discord.js'); // eslint-disable-line

/**
 * Returns the status emoji for provided member, results in an alternative if the bot does not have emoji permissions
 * @param {client} client Bot client
 * @param {string} status Status to get the emoji or altternative for
 * @param {Guild} guild Guild to take permission information from
 * @returns {string} Emojistring
 */
function displayStatus(client, status, guild) {
	if (guild && !guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
		return `${status}:`;
	}
	return client.config.emojis[status];
}

module.exports = displayStatus;
