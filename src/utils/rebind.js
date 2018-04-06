import { setupAddEmojiCollector } from './collectors/setup-add-emoji-collector';
import { setupRemoveEmojiCollector } from './collectors/setup-remove-emoji-collector';

const config = require('config');

export const rebindMessages =
async function rebindMessages(client, channel) {
  const bindMessages = [];
  const existingMessages = config.messages;
  const existingMessagesText = [];

  await existingMessages.forEach(message => {
    existingMessagesText.push(message.text);
  });

  await channel.fetchMessages().then(messages => {
    const msgArray = messages.array();

    msgArray.forEach(message => {
      if (existingMessagesText.indexOf(message.content) !== -1) {
        bindMessages.push(message);
      }
    });
  });

  await bindMessages.forEach(message => {
    const existingObj = existingMessages.find((obj) => {
      return obj.text === message.content;
    });

    setupAddEmojiCollector(message, (react) => existingObj.options.indexOf(react.emoji.name) !== -1);
    config.reactMessagesIds.push(message.id);
  });

  setupRemoveEmojiCollector(client);
}

export default rebindMessages;
