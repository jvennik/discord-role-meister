import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import { postToChannel, POST_RESULT } from '../../../actions/post';

export default class PostCommand extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: 'post',
      memberName: 'post',
      group: 'admin',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'Post the category messages and role reactions',
    });
  }

  public async run(msg: CommandoMessage): Promise<Message> {
    const result = await postToChannel({
      guildId: msg.guild.id,
      msg: msg,
    });

    switch (result) {
      case POST_RESULT.NO_CHANNEL_BOUND:
        return msg.channel.send(
          'No channel bound yet. Please use the bind command'
        );
      case POST_RESULT.NO_CHANNEL_FOUND:
        return msg.channel.send('The bound channel can no longer be found.');
      default:
        return msg.channel.send('Posted roles');
    }
    return msg.channel.send('Cleared and posted');
  }
}
