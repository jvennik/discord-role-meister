import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import { createRole, CREATE_ROLE_RESULT } from '../../../actions/createRole';

export default class CreateRoleCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'create_role',
      memberName: 'createrole',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description:
        'Create a new role (<category> <role name> <emoji>) (*!roles create_role FPS valorant :cowboy:*)',
      args: [
        {
          key: 'category',
          prompt:
            'Provide the slug (identifier) of the category you want to add the role to',
          type: 'string',
        },
        {
          key: 'name',
          prompt:
            'Provide a name for the role, this should match the emoji name',
          type: 'string',
        },
        {
          key: 'emoji',
          prompt: 'Provide the emoji for this role',
          type: 'string',
        },
      ],
    });
  }

  public async run(
    msg: CommandoMessage,
    { category, name, emoji }: { category: string; name: string; emoji: string }
  ): Promise<Message> {
    const result = await createRole({
      guildId: msg.guild.id,
      category: category.toLowerCase(),
      name: name,
      emoji: emoji,
    });

    switch (result) {
      case CREATE_ROLE_RESULT.CATEGORY_NOT_FOUND:
        return msg.channel.send(`Could not find category: **${category}**`);
      case CREATE_ROLE_RESULT.EMOJI_NOT_FOUND:
        return msg.channel.send(`Could not find emoji: **${name}**`);
      case CREATE_ROLE_RESULT.DUPLICATE:
        return msg.channel.send(
          `A role with this name already exists: **${name}**`
        );
      default:
        return msg.channel.send(`Created role: **${name}** - ${emoji}`);
    }
  }
}
