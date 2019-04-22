import { revokeRole } from '../roles/revoke-role';

const config = require('config');

export const setupRemoveEmojiCollector =
async function setupRemoveEmojiCollector(client) {
  client.on('messageReactionRemove', (reaction, user) => {
    if (!user.bot) {
      if (config.reactMessagesIds.indexOf(reaction.message.id) !== -1) {
        revokeRole(reaction.message, reaction.emoji.name, user);
      }
    }
  });
};

export default setupRemoveEmojiCollector;
