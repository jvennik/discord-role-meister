import { reactWithArray } from './reactions';

export const updateMessage =
async function updateMessage(message, options) {
  const addReactions = [];
  const existingReactions = [];

  message.reactions.forEach(reaction => {
    existingReactions.push(reaction._emoji.name);
  });

  options.forEach(option => {
    if (existingReactions.indexOf(option) === -1) {
      addReactions.push(option);
    }
  });

  if (addReactions.length > 0) {
    await reactWithArray(message, addReactions);
  }
}

export default updateMessage;
