import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";

import { getShuffledOptions } from "../game.js";

export const name = "accept_button_";

// returns: [new message body, do what on last message]
export function execute(req, senderId){
  const { type, id, data } = req.body;
  
  const gameId = senderId;
      // Delete message with token in request body
  return [{
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "What is your object of choice?",
      // Indicates it'll be an ephemeral message
      flags: InteractionResponseFlags.EPHEMERAL,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.STRING_SELECT,
              // Append game ID
              custom_id: `select_choice_${gameId}`,
              options: getShuffledOptions(),
            },
          ],
        },
      ],
    },
  },
    // Delete previous message
  { method: "DELETE" }];
}