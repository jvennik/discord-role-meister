import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import { deleteRole, DELETE_ROLE_RESULT } from '../../../actions/deleteRole';

export default class DeleteRoleCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'delete_role',
      memberName: 'deleterole',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'Delete a role (*!roles delete_role valorant*)',
      args: [
        {
          key: 'name',
          prompt: 'Enter the name of the role you want to delete',
          type: 'string',
        },
      ],
    });
  }

  public async run(
    msg: CommandoMessage,
    { name }: { name: string }
  ): Promise<Message> {
    const result = await deleteRole({
      guildId: msg.guild.id,
      name: name,
    });
    switch (result) {
      case DELETE_ROLE_RESULT.DOES_NOT_EXIST:
        return msg.channel.send(
          `Could not find a role by that name: **${name}**`
        );
      default:
        return msg.channel.send(`Role: **${name}** was deleted`);
    }
  }
}
