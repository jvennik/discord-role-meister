import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import {
  deleteCategory,
  DELETE_CAT_RESULT,
} from '../../../actions/deleteCategory';

export default class DeleteCategoryCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'delete_category',
      memberName: 'deletecategory',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'Delete a category (*!roles delete_category FPS*)',
      args: [
        {
          key: 'slug',
          prompt:
            'Enter the slug(identifier) of the category you want to delete',
          type: 'string',
        },
      ],
    });
  }

  public async run(
    msg: CommandoMessage,
    { slug }: { slug: string }
  ): Promise<Message> {
    const result = await deleteCategory({
      guildId: msg.guild.id,
      slug: slug,
    });
    switch (result) {
      case DELETE_CAT_RESULT.DOES_NOT_EXIST:
        return msg.channel.send(
          `Could not find a category by that slug (identifier): **${slug}**`
        );
      default:
        return msg.channel.send(`Category: **${slug}** was deleted`);
    }
  }
}
