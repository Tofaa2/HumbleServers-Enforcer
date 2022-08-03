import { Message } from "discord.js";
import DiscordBot from "../DiscordBot";
import { DiscordEvents } from "../DiscordEventEmiter";
import translate from '@vitalets/google-translate-api';
import googleTranslateApi from "@vitalets/google-translate-api";

export const type = DiscordEvents.MESSAGE_CREATE;
export const execute = async (message: Message, client: DiscordBot) => {
    translate(message.content, {from: 'en', to: 'es'}).then(res => {
        // replace all [ and ] with ""
        const translated = res.text.replace(/\[|\]/g, "");
        message.reply({
            failIfNotExists: false,
            content: translated,
        });

    });
}
