import { EmbedBuilder, TextChannel} from 'discord.js'

class Logger {
    
    private logChannel: TextChannel | undefined;

    constructor() {
    }

    setLogChannel(channel: TextChannel) {
        this.logChannel = channel;
    }


    info (info: any) {
        const date = new Date().toLocaleString()
        console.log(`[${date}] [INFO] ${info}`)
        if (!this.logChannel) return; 

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle("Info ->")
        .setDescription(info.toString())

        this.logChannel.send({
            embeds: [embed]
        })
    }

    warn(warning: any) {
        const date = new Date().toLocaleString()
        console.log(`[${date}] [WARN] ${warning}`)
        if (!this.logChannel) return; 

        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle("Warning ->")
        .setDescription(warning.toString())

        this.logChannel.send({
            embeds: [embed]
        })
    }

    error(error: any) {
        const date = new Date().toLocaleString()
        console.log(`[${date}] [ERROR] ${error}`)
        if (!this.logChannel) return; 

        const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle("Error ->")
        .setDescription(error.toString())

        this.logChannel.send({
            embeds: [embed]
        })
    }
}

export default Logger;