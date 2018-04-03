import { setupAddEmojiCollector } from './collectors/setup-add-emoji-collector';
import { setupRemoveEmojiCollector } from './collectors/setup-remove-emoji-collector';
import { reactWithArray } from './reactions';

const config = require('config');

export const setup =
async function setup(client, channel) {
  await config.messages.forEach(message => {
    channel.send(message.text).then(msg => {
      reactWithArray(msg, message.options);
      setupAddEmojiCollector(msg, (react) => message.options.indexOf(react.emoji.name) !== -1);
      config.reactMessagesIds.push(msg.id);
    });
  });

  setupRemoveEmojiCollector(client);
};

export default setup;
