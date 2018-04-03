import { grantRole } from '../roles/grant-role';

export const setupAddEmojiCollector =
async function setupAddEmojiCollector(msg, filter) {
  const collector = msg.createReactionCollector(filter);
  collector.on('collect', reaction => {
    reaction.users.forEach(user => {
      if (!user.bot) {
        grantRole(msg, reaction.emoji.name, user);
      }
    });
  });
};

export default setupAddEmojiCollector;
