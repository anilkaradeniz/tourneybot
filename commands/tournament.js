import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";

import { getRandomEmoji } from '../utils.js';
import * as tr from '../tournaments.js';

export const COMMAND_INFO = {
  name: 'tournament',
  description: 'Add edit or show a tournament.',
  options:[
    {
      name: "add",
      description: 'Add a tournament.',
      options:[
        {
          type: 3,
          name: 'name',
          description: 'Tournament name',
          required: true,
        },
        {
          type: 3,
          name: 'description',
          description: 'Tournament description',
          required: false,
        }
      ],
      type: 1,
    },
    {
      name: "edit",
      description: 'Edit a tournament.',
      type: 1,
    }
  ],
  type: 1,
};

//returns message body
export function execute(req){
  const { type, id, data } = req.body;
  
  const commandName = data.options[0].name;
  
  if (commandName === "add"){
    console.log("add:", data.options[0]);
    console.log("add:", data.options[1]);
    const tournamentName = data.options[0].options[0].value;
    let tournamentDesc = "";
    if (data.options[0].options[1])
      tournamentDesc = data.options[0].options[1].value;
    tr.addTournament(tournamentName, tournamentDesc);
    
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: `Added tournament ${tournamentName}.`,
      },
    };
  } else
  if (commandName === "edit"){
    console.log("edit:", data.options);
    if (tr.toursList.length == 0){
      return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Currently there are no tournaments.",
        // Indicates it'll be an ephemeral message
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    };
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Please select a tournament.",
        // Indicates it'll be an ephemeral message
        flags: InteractionResponseFlags.EPHEMERAL,
        components: [
          {
            type: MessageComponentTypes.ACTION_ROW,
            components: [
              {
                type: MessageComponentTypes.STRING_SELECT,
                // Append game ID
                custom_id: `tournament_editor_`,
                options: tr.createTournamentOptions(),
              },
            ],
          },
        ],
      },
    };
  }
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      // Fetches a random emoji to send from a helper function
      content: `Added tournament ${data.options}`,
    },
  };
}