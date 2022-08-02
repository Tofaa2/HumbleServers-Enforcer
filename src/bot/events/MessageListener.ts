import { Message } from "discord.js";
import DiscordBot from "../DiscordBot";

export const name = "messageCreate";
export const once = false;
export const execute = async (message: Message, client: DiscordBot) => {

    if (message.author.bot) return;
    if (message.content.includes("test")) return message.channel.send({
        
    });
}