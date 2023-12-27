import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import { DiscordRequest, getRandomEmoji } from "../utils.js";

import { activeGames } from "../commands/rps.js";
import { getResult } from "../game.js";

export const name = "select_choice_";

// returns: [new message body, do what on last message]
export function execute(req, senderId){
  const { type, id, data } = req.body;
  
  const gameId = senderId;
  
  if (activeGames[gameId]) {
    // Get user ID and object choice for responding user
    const userId = req.body.member.user.id;
    const objectName = data.values[0];
    // Calculate result from helper function
    const resultStr = getResult(activeGames[gameId], {
      id: userId,
      objectName,
    });

    // Remove game from storage
    delete activeGames[gameId];
    // Update message with token in request body
    const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;

    return [{
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: resultStr },
      },
      // Update ephemeral message
      {
        method: "PATCH",
        body: {
          content: "Nice choice " + getRandomEmoji(),
          components: [],
        },
      }]

  }
}