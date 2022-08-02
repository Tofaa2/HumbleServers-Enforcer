import { EmbedBuilder, TextChannel} from 'discord.js'

class Logger {
    
    private logChannel: TextChannel;

    constructor(logChannel: TextChannel) {
        this.logChannel = logChannel;
    }

    info (info: any) {
        const date = new Date().toLocaleString()

        console.log(`[${date}] [INFO] ${info}`)

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