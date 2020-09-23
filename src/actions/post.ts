import createGuild from '../utils/createGuild';
import { CommandoMessage } from 'discord.js-commando';
import { TextChannel } from 'discord.js';
import { getRepository } from 'typeorm';
import { Guild } from '../entity/Guild';
import { Category } from '../entity/Category';
import { addReactionCollector } from '../utils/reactionCollector';

export enum POST_RESULT {
  SUCCESS,
  NO_CHANNEL_BOUND,
  NO_CHANNEL_FOUND,
}

export const postToChannel = async ({
  guildId,
  msg,
}: {
  guildId: string;
  msg: CommandoMessage;
}): Promise<POST_RESULT> => {
  await createGuild({ guildId });
  const guildRepository = getRepository(Guild);

  const guild = await guildRepository.findOne({
    where: {
      guildId,
    },
  });

  if (!guild || !guild.boundChannelId) {
    return POST_RESULT.NO_CHANNEL_BOUND;
  }

  const boundChannel = msg.guild.channels.cache.find(
    (channel: { id: string }) => channel.id === guild.boundChannelId
  );

  if (!boundChannel) {
    return POST_RESULT.NO_CHANNEL_FOUND;
  }
  const targetChannel = await boundChannel.fetch();

  const categoryRepository = getRepository(Category);
  const categories = await categoryRepository.find({
    where: {
      guildId,
    },
    relations: ['roles'],
    order: {
      slug: 'ASC',
    },
  });

  // Purge channel first
  await (targetChannel as TextChannel).messages.fetch().then((messages) => {
    const msgArray = messages.array();

    msgArray.forEach((message) => message.delete());
  });

  categories.forEach(async (category) => {
    const message = await (targetChannel as TextChannel).send(
      `(${category.slug}) ${category.message}`
    );

    category.roles.forEach(async (role) => {
      if (role.emoji.indexOf('<') === 0) {
        try {
          const emojiId = role.emoji.split(':')[2].replace('>', '');
          message.react(emojiId);
        } catch (e) {
          console.error(e);
        }
      } else {
        message.react(role.emoji);
      }
    });

    addReactionCollector(message);
  });

  return POST_RESULT.SUCCESS;
};
