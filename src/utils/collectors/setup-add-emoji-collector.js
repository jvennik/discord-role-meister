import { grantRole } from "../roles/grant-role";

export const setupAddEmojiCollector = async function setupAddEmojiCollector(
  msg,
  filter
) {
  const collector = msg.createReactionCollector(filter, {
    time: 1000 * 60 * 30,
    dispose: true
  });

  collector.on("collect", reaction => {
    reaction.users.forEach(user => {
      if (!user.bot) {
        grantRole(msg, reaction.emoji.name, user);
      }
    });
  });

  collector.on("end", async () => {
    await setupAddEmojiCollector(msg, filter);
  });
};

export default setupAddEmojiCollector;
