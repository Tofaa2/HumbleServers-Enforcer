import { Channel, Client, Collection, Guild, TextChannel } from "discord.js";
import fs from "fs";
import { token } from "../token";
import Logger from "../utils/Logger";
import * as configuration from "./configuration.json" 
import * as path from "path";

class DiscordBot extends Client{

    public commands = new Collection();
    public config = configuration;
    public guild: Guild | undefined;
    public logChannel: TextChannel | undefined;
    public logger: Logger | undefined;

    constructor() {
        super({intents: 32767});
        this.login(token);  

        this.on("ready", () => {
            this.guild = this.guilds.cache.get(this.config.guild_id);
            if (!this.guild?.channels.cache.get(this.config.log_channel_id)?.isTextBased) throw new Error("Log channel is not a text channel");
            this.logChannel = this.guild?.channels.cache.get(this.config.log_channel_id) as TextChannel;
            this.logger = new Logger(this.logChannel);
            this.logger.info(`Client has started up!`);
            
            // Event Manager
            const listenerPath = path.join(__dirname, "/events");
            const allListeners: any[] = [];
            const listeners = fs.readdirSync(listenerPath) // I don't care about filtering, everything in there will be a .js or .ts file    
            listeners.forEach(file => {
                const eventPath = __dirname + "/events/" + file;
                const event = require(eventPath);
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(...args, this));
                }
                else {
                    this.on(event.name, (...args) => event.execute(...args, this));
                }
                allListeners.push(event.name);
            })
            this.logger.info(`Loaded ${allListeners.length} listeners: ${allListeners.join(", ")}`);

            
        });
    }


}

export default DiscordBot;