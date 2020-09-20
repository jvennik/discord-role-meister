import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import { listRoles } from '../../../actions/listRoles';
import { createEmbed } from '../../../utils/createRolesEmbed';

export default class ListRolesCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'list_roles',
      memberName: 'listroles',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'List all roles',
    });
  }

  public async run(msg: CommandoMessage): Promise<Message> {
    const roles = await listRoles({ guildId: msg.guild.id });
    const embed = createEmbed(roles);
    return msg.channel.send(embed);
  }
}
