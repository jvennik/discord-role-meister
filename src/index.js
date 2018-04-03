import { isMod } from './utils/permissions';
import { purge } from './utils/purge';
import { setup } from './utils/setup';

const config = require('config');
const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = config.general.commandPrefix;

client.on('ready', () => {
  client.user.setUsername(config.general.botUsername);
  config.reactMessagesIds = [];
});

client.on('message', async msg => {
  const isAuthorized = isMod(msg);
  const authorizedChannel = config.authorizedChannels.indexOf(msg.channel.name) !== -1;
  if (msg.content === `${prefix}setupRoles` && isAuthorized && authorizedChannel) {
    await purge(msg.channel);
    await setup(client, msg.channel);
  }
});

client.login(config.general.botToken);
