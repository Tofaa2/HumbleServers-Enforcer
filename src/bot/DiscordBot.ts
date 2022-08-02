import { Client, Collection } from "discord.js";
import fs from "fs";
import * as configuration from "./configuration.json" 

class DiscordBot extends Client{

    public commands = new Collection();
    public events = new Collection();
    public config = configuration;


    constructor() {
        super({
            intents: 32767, 
        }); 
        this.login(process.env.DISCORD_TOKEN);
    }
}


async function registerCommands(client: DiscordBot) {

}

async function registerEvents(client: DiscordBot) {
    const eventFiles = fs.readdirSync(__dirname + "/events").filter(file => file.endsWith(".ts"));
    eventFiles.forEach(file => {
        const event = require(__dirname + `/events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    })
}


export default DiscordBot;