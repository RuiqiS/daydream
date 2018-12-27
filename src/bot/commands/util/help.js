const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const toTitleCase = require('../../../util/toTitleCase');
const DaydreamEmbed = require('../../structures/DaydreamEmbed');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'h', 'commandinfo'],
			description: {
				content: 'Display Command help (`--all` to show all commands, regardless of permissions)',
				usage: '[command] [--all]'
			},
			clientPermissions: ['EMBED_LINKS'],
			editable: true,
			cooldown: 5000,
			ratelimit: 2,
			args: [
				{
					id: 'cmd',
					type: 'commandAlias'
				},
				{
					id: 'all',
					match: 'flag',
					flag: ['--all', '--a']
				}
			]
		});
	}

	buildInfoEmbed(ref, message) {
		let infoString = `Name: ${ref.id}`;
		let restrictionString = '';
		if (ref.description.content) {
			infoString += `\nDescription: ${ref.description.content}`;
		}
		if (ref.aliases.length) {
			infoString += `\nAliases: ${ref.aliases.map(e => `\`${e}\``).join(', ')}`;
		}
		if (ref.description.usage) {
			infoString += `\nUsage: \`${ref.description.usage}\``;
		}
		if (ref.userPermissions) {
			restrictionString += `\nPermissions (user): ${ref.userPermissions.map(e => `\`${e}\``).join(', ')}`;
		}
		if (ref.clientPermissions) {
			restrictionString += `\nPermissions (bot) ${ref.clientPermissions.map(e => `\`${e}\``).join(', ')}`;
		}
		if (ref.channel === 'guild') {
			restrictionString += `\nGuildOnly: true`;
		}
		if (ref.ownerOnly) {
			restrictionString += `\nOwnerOnly: true`;
		}
		const embed = new DaydreamEmbed()
			.addField('Command Information', infoString);
		if (restrictionString) {
			 embed.addField('Restrictions', restrictionString);
		}
		if (!embed.color && message.guild && message.guild.me.displayColor) {
			embed.setColor(message.guild.me.displayColor);
		}
		return embed.applySpacers();
	}

	exec(msg, { cmd, all }) {
		if (!cmd || ((cmd && cmd.userPermissions && msg.channel.type === 'text' && !msg.member.hasPermission(cmd.userPermissions)) && !all)) {
			const allowedCategories = this.handler.categories.filter(category => {
				const filtered = category.filter(comm => {
					if (all) {
						return true;
					}
					if (msg.channel.type === 'text' && comm.userPermissions) {
						return msg.member.hasPermission(comm.userPermissions);
					}
					return true;
				});
				if (filtered.size) {
					return true;
				}
				return false;
			});
			const map = allowedCategories.map(cat => `${toTitleCase(cat.id)}: ${cat.filter(e => {
				if (all) {
					return true;
				}
				if (msg.channel.type === 'text' && e.userPermissions) {
					return msg.member.hasPermission(e.userPermissions);
				}
				return true;
			}).map(e => `\`${e.id}\``).join(', ')}`);
			return msg.util.send(stripIndents`
				Your available commands are:
				${map.join('\n')}

				You can use \`${this.handler.prefix(msg)}${this.id} <commandname>\` to get more information about a command.
			`);
		}
		msg.util.send(this.buildInfoEmbed(cmd, msg));
	}
}
module.exports = HelpCommand;
