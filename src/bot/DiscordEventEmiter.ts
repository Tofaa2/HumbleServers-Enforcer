import { Interaction, Message } from "discord.js";
import EventEmitter from "events";
import DiscordBot from "./DiscordBot";

class DiscordEventEmiter extends EventEmitter {
   
    constructor(client: DiscordBot) {
        super();

        client.on('messageCreate', message => this.onMessageCreate(message));
        client.on('interactionCreate', interaction => this.onInteractionCreate(interaction));
    }

    async addEventListener(event: DiscordEvents, listener: (...args: any[]) => void) {
        this.addListener(event, listener);
    }
    private async onMessageCreate(message: Message) {
        if (message.author.bot) return;
        this.emit('messageCreate', message);
    }

    private async onInteractionCreate(interaction: Interaction) {
        if (interaction.isCommand()) {
            this.emit('commandInteraction', interaction);
        }
        else if (interaction.isButton()) {
            this.emit('buttonInteraction', interaction);
        }
    }






}

enum DiscordEvents {
    MESSAGE_CREATE = "messageCreate",
    COMMAND_INTERACTION = "commandInteraction",
    BUTTON_INTERACTION = "buttonInteraction"
}

export default DiscordEventEmiter;
export { DiscordEvents };