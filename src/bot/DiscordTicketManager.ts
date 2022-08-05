import { ButtonBuilder } from "@discordjs/builders";
import { TextChannel, ActionRowBuilder, ActionRow, ButtonStyle, Embed, EmbedBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder } from "discord.js";
import DiscordBot from "./DiscordBot";


class DiscordTicketManager {


    private client: DiscordBot;
    private supportChannel: TextChannel;

    constructor(client: DiscordBot) {
        this.client = client;
        this.supportChannel = client.guild?.channels.cache.get(client.config.ticket_message_channel_id) as TextChannel
        this.clearAndUpdateTicketChannel()
    }

    private async clearAndUpdateTicketChannel() {
        await this.supportChannel.bulkDelete(100).then(() => {
            const actionRow: any = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("english-ticket").setLabel("English Ticket").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("spanish-ticket").setLabel("Español Ticket").setStyle(ButtonStyle.Primary)
            )
            const embed: EmbedBuilder = new EmbedBuilder().setTitle('Support Tickets').setDescription('Please select a language for your ticket.  |  Seleccione un idioma para su billete.')
            this.supportChannel.send({
                embeds: [embed],
                components: [actionRow]
            })
        }) 
    }


    async handleTicket(interaction: ButtonInteraction) {
        const modal: ModalBuilder = new ModalBuilder().setCustomId("english-ticket-modal") // What is your billing email? What is your server IP/ID? Reply with NONE if you do not have one. What issue are you facing?    

    }

    async handleSpanishTicketRequest(interaction: ButtonInteraction) {
        const modal: ModalBuilder = new ModalBuilder().setCustomId("spanish-ticket-modal").setTitle("Español Ticket");
        const billingEmailInput: TextInputBuilder = new TextInputBuilder().setLabel("¿Cuál es su correo electrónico de facturación?").setCustomId("billing-email")
        const serverIpInput: TextInputBuilder = new TextInputBuilder().setLabel("¿Cuál es la IP/ID de su servidor? Responda con NONE si no tiene uno.").setCustomId("server-ip")
        const issueInput: TextInputBuilder = new TextInputBuilder().setLabel("¿Qué problema está teniendo?").setCustomId("issue")
        const billingActionRow: any = new ActionRowBuilder().addComponents(billingEmailInput);
        const serverActionRow: any = new ActionRowBuilder().addComponents(serverIpInput);
        const issueActionRow: any = new ActionRowBuilder().addComponents(issueInput);

        modal.addComponents(billingActionRow, serverActionRow, issueActionRow)
        await interaction.showModal(modal)
    }
}

export default DiscordTicketManager;