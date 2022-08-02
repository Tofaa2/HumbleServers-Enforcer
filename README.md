
## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#how-to-contribute)
- [License](#license)


# About <a name = about>
This is the main HumbleServers Enforcer Discord bot repository.
This bot contains the following features:

> * Logging
> * Tickets System
> * Moderation
> * Aikar's timings parser

The bot is completely written in TypeScript and uses the [discord.js](https://discord.js.org) library.
If there are feature requests, please open an issue.
This bot features a custom event handler which allows easy event emmiting and handling.
The custom events are: 
> * `commandInteraction` - Emmited when someone interacts with an application command   
> * `buttonInteraction` - Emmited when someone interacts with a button
> * `ticketMessageCreate` - Emmited when a message is sent in a ticket channel
> * `ticketMessageDelete` - Emmited when a message is deleted in a ticket channel
> * `ticketMessageUpdate` - Emmited when a message is updated in a ticket channel



# Installation (Requires NodeJS 16+) <a name = installation>
> * Clone the repo
> * Download yarn (npm install -g yarn)
> * Run `yarn install`
> * Create a token.json file in the src folder and "export const token = 'your token here';"
> * The following scripts are presented to you with NPM: 
> * `npm run compile` - Compiles the TypeScript files
> * `npm run run` - Runs the compiled code from out directory
> * `npm run start` - Compiles and runs the code


# Configuration <a name = configuration>
> The bot is configured using JSON files [here](/src/bot//configuration.json)

> * `guild_id` - The guild ID of the guild the bot is in
> * `log_channel_id` - The channel ID of the channel to log messages to
> * `suggestions_channel_id` - The channel ID of the channel to log suggestions to




# How to contribute <a name = how-to-contribute>
> * Fork the repo
> * Make your changes
> * Create a pull request ( Please be very descriptive in your PR )
> * If the PR is accepted, it will be merged into the main branch


# License <a name = license>
> This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

