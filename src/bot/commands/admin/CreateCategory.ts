import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import {
  createCategory,
  CREATE_CAT_RESULT,
} from '../../../actions/createCategory';

export default class CreateCategoryCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'create_category',
      memberName: 'createcategory',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description:
        'Create a new category (*!roles create_category FPS Select a FPS role*)',
      args: [
        {
          key: 'slug',
          prompt: 'Provide a key name for the category (e.g FPS)',
          type: 'string',
        },
        {
          key: 'message',
          prompt: 'Provide a text for the message to be posted',
          type: 'string',
        },
      ],
    });
  }

  public async run(
    msg: CommandoMessage,
    { slug, message }: { slug: string; message: string }
  ): Promise<Message> {
    try {
      const result = await createCategory({
        guildId: msg.guild.id,
        slug: slug.toLowerCase(),
        message: message,
      });

      switch (result) {
        case CREATE_CAT_RESULT.DUPLICATE:
          return msg.channel.send(
            `A category with this slug already exists: **${slug}**`
          );
        default:
          return msg.channel.send(`Created category **${slug}**`);
      }
    } catch (e) {
      return msg.channel.send(
        'Something went wrong with the create category command, check your input please'
      );
    }
  }
}
