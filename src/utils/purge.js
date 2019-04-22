export const purge =
async function purge(channel) {
  channel.fetchMessages().then(messages => {
    const msgArray = messages.array();

    msgArray.forEach(message => {
      message.delete();
    });
  });
};

export default purge;
