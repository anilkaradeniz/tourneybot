import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";

import * as tr from '../tournaments.js';

//SET THIS
export const name = "tournament_editor_";

// returns: [new message body, do what on last message]
export function execute(req, senderId){
  const { type, id, data } = req.body;
  
  // FILL HERE AND RETURN
  const tournamentName = data.values[0];
  const tournament = tr.toursList[tournamentName]
  console.log(tournament);
  
  return [{
    "type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    "data": {
      "content": `Tournament info of \`${tournamentName}\``,
      "tts": false,
      "embeds": [
        {
          "type": "rich",
          "title": `${tournamentName}`,
          "description": `Tournament description: \`${tournament.desc}\``,
          "color": 0x00FFFF,
          "fields": [
            {
              "name": `Teams:`,
              "value": `\`${tr.listTeams(tournament.teams)}\``,
            },
            {
              "name": `Players signed up:`,
              "value": `\`${tr.listPlayers(tournament.players)}\``,
            }
          ]
        }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "label": `Edit Name`,
              "custom_id": `tour_edit_name_`,
              "disabled": false,
              "type": 2
            },
            {
              "style": 1,
              "label": `Edit Teams`,
              "custom_id": `tour_edit_teams_`,
              "disabled": false,
              "type": 2
            },
            {
              "style": 1,
              "label": `Edit Players`,
              "custom_id": `tour_edit_players_`,
              "disabled": false,
              "type": 2
            }
          ]
        },
      ],
    }
  },
  { method: 'DELETE'} ];
}

/*

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": `Tournament info of <name>`,
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `<name>`,
      "description": `<desc>`,
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `Teams`,
          "value": `Team 1 - player1, player2, player3\nTeam 2`
        },
        {
          "name": `Players signed up`,
          "value": `-player1\n-player2\n-player3`
        }
      ]
    }
  ]
});

*/