import { Message } from "discord.js";
import { DiscordEvents } from "../DiscordEventEmiter";
import { detect } from "tinyld";
import translate from '@vitalets/google-translate-api';
import DiscordBot from "../DiscordBot";

export const type = DiscordEvents.SPANISH_TICKET_MESSAGE_CREATE;
export async function execute(message: Message, client: DiscordBot) {

    const lang = getLang(detect(message.content));
    console.log(lang)
    await translate(message.content, { to: lang }).then(res => {
        const shouldCancel = message.content.toUpperCase() === res.text.toUpperCase();
        if (shouldCancel) return;

        message.reply({
            content: res.text,
            failIfNotExists: false,
        })
    });
}

function getLang(lang: string) {
    switch (lang) {
        case "en":
            return "es";
        case "es":
            return "en";
        default:
            return "en";
    }    
}