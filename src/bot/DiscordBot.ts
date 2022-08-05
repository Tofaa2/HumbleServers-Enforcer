import { ButtonInteraction, Channel, Client, Collection, Guild, TextChannel } from "discord.js";
import fs from "fs";
import { token } from "../token";
import Logger from "../utils/Logger";
import * as configuration from "./configuration.json" 
import * as path from "path";
import DiscordEventEmiter from "./DiscordEventEmiter";
import DiscordTicketManager from "./DiscordTicketManager";

class DiscordBot extends Client{

    public commands = new Collection();
    public eventHandler: DiscordEventEmiter = new DiscordEventEmiter(this);
    public ticketManager: DiscordTicketManager | undefined;
    public config = configuration;
    public guild: Guild | undefined;
    public logChannel: TextChannel | undefined;
    public logger: Logger = new Logger();

    constructor() {
        super({
            intents: [
                "GuildMessages",
                "Guilds",
                "GuildPresences",
                "GuildVoiceStates",
                "GuildMembers",
                "GuildIntegrations",
                "MessageContent"
            ],
            allowedMentions: {
                repliedUser: false
            }

        });
        this.login(token);  

        this.on("ready", () => {
            this.guild = this.guilds.cache.get(this.config.guild_id);
            if (!this.guild?.channels.cache.get(this.config.log_channel_id)?.isTextBased) throw new Error("Log channel is not a text channel");
            this.logChannel = this.guild?.channels.cache.get(this.config.log_channel_id) as TextChannel;
            this.logger.setLogChannel(this.logChannel);
            this.logger.info(`Client has started up!`);
            
            // Event Manager
            const listenerPath = path.join(__dirname, "/events");
            const allListeners: any[] = [];
            const listeners = fs.readdirSync(listenerPath) // I don't care about filtering, everything in there will be a .js or .ts file    
            listeners.forEach(file => {
                const eventPath = __dirname + "/events/" + file;
                const event = require(eventPath);
                this.eventHandler.addListener(event.type, (...args: any[]) => event.execute(...args, this));
                allListeners.push(event.type);
            })
            this.logger.info(`Loaded ${allListeners.length} listeners: ${allListeners.join(", ")}`);
            this.ticketManager = new DiscordTicketManager(this);
        });

        this.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton) return;
            this.ticketManager?.handleSpanishTicketRequest(interaction as ButtonInteraction);
        })
    }


}

export default DiscordBot;