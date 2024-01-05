import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";

//SET THIS
export const name = "templatecommand_";

// returns: [new message body, do what on last message]
export function execute(req, senderId){
  const { type, id, data } = req.body;
  
  // FILL HERE AND RETURN
  
  return [{
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      // Fetches a random emoji to send from a helper function
      content: "send message back",
    },
  },
  { method: 'DELETE'} ];
}