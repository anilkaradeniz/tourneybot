import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";

import { getRandomEmoji } from '../utils.js';

export const COMMAND_INFO = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

//returns message body
export function execute(req){
  const { type, id, data } = req.body;
  
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      // Fetches a random emoji to send from a helper function
      content: "hello world " + getRandomEmoji(),
    },
  };
}