require('dotenv').config();
const DaydreamClient = require('./bot/client/DaydreamClient');

const client = new DaydreamClient({
	owner: process.env.OWNERS.split(','),
	token: process.env.TOKEN,
	dateFormat: process.env.DATE_FORMAT.replace(/_/g, ' '),
	hubGuild: process.env.HUB_GUILD,
	prefix: process.env.PREFIX,
	emojis: {
		online: process.env.EMOJI_ONLINE,
		offline: process.env.EMOJI_OFFLINE,
		invisible: process.env.EMOJI_OFFLINE,
		idle: process.env.EMOJI_IDLE,
		dnd: process.env.EMOJI_DND,
		streaming: process.env.EMOJI_STREAMING,
		crest: process.env.EMOJI_CREST,
		fail: process.env.EMOJI_FAIL
	}
});

client
	.on('error', err => client.logger.error(`Error:\n${err.stack}`))
	.on('warn', warn => client.logger.warn(`Warning:\n${warn}`));

client.start();
