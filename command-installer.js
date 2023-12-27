import { InstallGlobalCommands } from './utils.js';
import { getCommands } from './command-manager.js';

async function install(){
  const ALL_COMMANDS = await getCommands();
  console.log("exporting:")
  console.log(ALL_COMMANDS)

  InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
}

install();