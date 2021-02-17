import { Guild, TextChannel } from 'discord.js';
import { getRepository } from 'typeorm';
import { Guild as DBGuild } from '../entity/Guild';
import { Category } from '../entity/Category';
import { addReactionCollector } from '../utils/reactionCollector';

export const rebind = async function rebind({
  guild,
}: {
  guild: Guild;
}): Promise<boolean> {
  const guildRepository = getRepository(DBGuild);
  const categoryRepository = getRepository(Category);

  const guildObj = await guildRepository.findOne({
    where: { guildId: guild.id },
  });

  const categories = await categoryRepository.find({
    where: { guildId: guild.id },
  });

  const categoryMessages = categories.map(
    (category) => `(${category.slug}) ${category.message}`
  );
  const boundChannel = guild.channels.cache.find(
    (channel: { id: string }) => channel.id === guildObj?.boundChannelId
  );

  const targetChannel = await boundChannel?.fetch();
  try {
    await (targetChannel as TextChannel).messages.fetch().then((messages) => {
      const msgArray = messages.array();
      console.log(`Rebinding for ${guild.id}: ${guild.name}`);

      msgArray.forEach((message) => {
        if (categoryMessages.indexOf(message.content) !== -1) {
          // Rebind the message
          addReactionCollector(message);
        }
      });
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};

export default rebind;
