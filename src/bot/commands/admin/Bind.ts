import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { TextChannel, Message } from 'discord.js';
import { bindToChannel, BIND_RESULT } from '../../../actions/bind';

export default class BindCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'bind',
      memberName: 'bind',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description:
        'Bind the channel to post the roles messages to (*!roles bind #roles*)',
      args: [
        {
          key: 'channel',
          prompt: 'Provide the channel you want to bind to',
          type: 'channel',
        },
      ],
    });
  }

  public async run(
    msg: CommandoMessage,
    { channel }: { channel: TextChannel }
  ): Promise<Message> {
    try {
      const result = await bindToChannel({
        guildId: msg.guild.id,
        channelId: channel.id,
      });

      switch (result) {
        case BIND_RESULT.ALREADY_BOUND:
          return msg.channel.send('Already bound to the selected channel');
        default:
          return msg.channel.send('Bound to target channel');
      }
    } catch (e) {
      console.log(e);
      return msg.channel.send(
        'Something went wrong with the bind command, check your input please'
      );
    }
  }
}
