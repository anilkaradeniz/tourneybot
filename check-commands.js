import 'dotenv/config';
import { DiscordRequest } from './utils.js';
export async function CheckGlobalCommands(appId) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

CheckGlobalCommands(process.env.APP_ID)