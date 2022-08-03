import { Interaction, Message, TextChannel } from "discord.js";
import EventEmitter from "events";
import DiscordBot from "./DiscordBot";

class DiscordEventEmiter extends EventEmitter {
   
    private client: DiscordBot | undefined;

    constructor(client: DiscordBot) {
        super();
        this.client = client;
        client.on('messageCreate', message => this.onMessageCreate(message));
        client.on('interactionCreate', interaction => this.onInteractionCreate(interaction));

    }

    async addEventListener(event: DiscordEvents, listener: (...args: any[]) => void) {
        this.addListener(event, listener);
    }
    private async onMessageCreate(message: Message) {
        if (message.author.bot) return;
        const channel: TextChannel = this.client?.channels.cache.get(message.channelId) as TextChannel;

        if (channel.name.includes("es-ticket")) {
            this.emit('spanishTicketMessageCreate', message)
        }

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
    ENGLISH_TICKET_MESSAGE_CREATE = "englishTicketMessageCreate",  
    SPANISH_TICKET_MESSAGE_CREATE = "spanishTicketMessageCreate",
    COMMAND_INTERACTION = "commandInteraction",
    BUTTON_INTERACTION = "buttonInteraction"
}

export default DiscordEventEmiter;
export { DiscordEvents };