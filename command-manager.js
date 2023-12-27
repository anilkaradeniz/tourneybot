import 'dotenv/config';

import * as fs from 'fs';
import { DiscordRequest } from './utils.js';

export const COMMAND_EXEC = {};
export const COMP_COMMAND = {}; // component command execs

export async function getCommands(){
  const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
  const commandInfos = [];

  for (const file of commandFiles) {
    if (file === "template.js") continue;
    
    const command = await import(`./commands/${file}`); // Using dynamic import
    if ('COMMAND_INFO' in command && 'execute' in command) {
      commandInfos.push(command.COMMAND_INFO);
      COMMAND_EXEC[command.COMMAND_INFO.name] = command.execute;
    } else {
      console.log(`[WARNING] The command ${file} is missing a required "COMMAND_INFO" or "execute" property.`);
    }
  }
  //console.log(commandInfos);
  //console.log("COMMAND_EXEC:", COMMAND_EXEC);
  return commandInfos;
}

async function getCommandExec(dir){ // use dir='.' or dir='./commands'
  const commandFiles = fs.readdirSync(dir).filter((file) => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    if (file === "template.js") continue;
    
    const command = await import(`${dir}/${file}`); // Using dynamic import
    if ('execute' in command) {
      COMP_COMMAND[command.name] = command.execute;
    } else {
      console.log(`[WARNING] The command ${file} is missing a required "execute" property.`);
    }
  //console.log("COMP_COMMAND:", COMP_COMMAND);
  }
}

const ALL_COMMANDS = getCommands();

getCommandExec('./component-commands');
