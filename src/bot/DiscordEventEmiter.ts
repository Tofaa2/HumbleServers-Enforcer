import { Interaction, Message } from "discord.js";
import EventEmitter from "events";
import DiscordBot from "./DiscordBot";

class DiscordEventEmiter extends EventEmitter {
   
    constructor(client: DiscordBot) {
        super();

        client.on('messageCreate', message => this.onMessageCreate(message));
        client.on('interactionCreate', interaction => this.onInteractionCreate(interaction))
    }


    async onMessageCreate(message: Message) {
        if (message.author.bot) return;
        this.emit('messageCreate', message);
    }

    async onInteractionCreate(interaction: Interaction) {
        if (interaction.isCommand()) {
            this.emit('commandInteraction', interaction);
        }
        else if (interaction.isButton()) {
            this.emit('buttonInteraction', interaction);
        }
    }






}