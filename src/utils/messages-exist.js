const config = require("config");

export const messagesExist = async function messagesExist(channel) {
  const existingMessages = config.messages;
  const existingMessagesText = [];

  await existingMessages.forEach(msg => {
    existingMessagesText.push(msg.text);
  });

  const allExist = await channel.fetchMessages().then(messages => {
    const msgArray = messages.array();
    const found = [];

    msgArray.forEach(message => {
      if (existingMessagesText.indexOf(message.content) !== -1) {
        found.push(message);
      }
    });

    if (found.length === existingMessages.length) {
      return true;
    }

    return false;
  });
};

export default messagesExist;
