import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";
import { COMMAND_EXEC, COMP_COMMAND } from "./command-manager.js";


// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
//const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    
    // "challenge" command
    const newMessage = COMMAND_EXEC[name](req);
    await res.send(newMessage);
  }

  /**
   * Handle requests from interactive components
   * See https://discord.com/developers/docs/interactions/message-components#responding-to-a-component-interaction
   */
  if (type === InteractionType.MESSAGE_COMPONENT) {
    // custom_id set in payload when sending message component
    const componentId = data.custom_id;
    var commandName;
    var extraData;
    {
      let ind = componentId.lastIndexOf('_');
      commandName = componentId.slice(0, ind+1);
      extraData = componentId.slice(ind+1);
    }
    
    
    //console.log(commandName);
    //console.log(COMP_COMMAND[commandName]);
    
    if (!(commandName in COMP_COMMAND)) {
      console.error("No such command:", commandName);
      return;
    }
    
    try {
      const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
      
      const newMessage = COMP_COMMAND[commandName](req, extraData);
      
      await res.send(newMessage[0]);
      //await DiscordRequest(endpoint, newMessage[1]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
    
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
