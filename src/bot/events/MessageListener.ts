import { Message } from "discord.js";
import DiscordBot from "../DiscordBot";
import { DiscordEvents } from "../DiscordEventEmiter";

export const type = DiscordEvents.MESSAGE_CREATE;
export const execute = async (message: Message, client: DiscordBot) => {
    client.logger?.info(`Message received: ${message.content}`);
}