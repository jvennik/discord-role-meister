import { GuildMember, Message, MessageReaction } from 'discord.js';
import { grantRole } from './grantRole';
import { revokeRole } from './revokeRole';

export const addReactionCollector = async (msg: Message): Promise<void> => {
  if (!msg.guild) {
    throw new Error(
      'Guild missing from message when trying to mount reaction controller'
    );
  }

  const emojiFilter = (reaction: MessageReaction): boolean => {
    return (
      msg.reactions.cache.find(
        (react) => react.emoji.name === reaction.emoji.name
      ) !== undefined
    );
  };

  const collector = msg.createReactionCollector(emojiFilter, {
    time: 1000 * 60 * 30,
    dispose: true,
  });

  collector.on(
    'collect',
    async (reaction: MessageReaction, member: GuildMember) => {
      if (!msg.guild) {
        throw new Error('Guild missing from message');
      }

      // If the reaction is from the bot, ignore it
      if (member.user && member.user.bot) {
        return;
      }
      // Grant role
      await grantRole({
        msg: msg,
        role: reaction.emoji.name,
        member: member,
      });
    }
  );

  collector.on(
    'remove',
    async (reaction: MessageReaction, member: GuildMember) => {
      await revokeRole({
        msg: msg,
        role: reaction.emoji.name,
        member: member,
      });
    }
  );

  collector.on('end', async () => {
    await addReactionCollector(msg);
  });
};
