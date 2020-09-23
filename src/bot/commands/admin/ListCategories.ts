import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import { listCategories } from '../../../actions/listCategories';
import { createEmbed } from '../../../utils/createCategoriesEmbed';

export default class ListCategoriesCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'list_categories',
      memberName: 'listcategories',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'List all categories',
    });
  }

  public async run(msg: CommandoMessage): Promise<Message> {
    const categories = await listCategories({ guildId: msg.guild.id });
    const embed = createEmbed(categories);
    return msg.channel.send(embed);
  }
}
