module.exports.config = {
    name: 'help',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['help'],
    description: "Beginner's guide",
    usage: "Help [page] or [command]",
    credits: 'Developer',
};

module.exports.run = async function({
    api,
    event,
    enableCommands,
    args,
    Utils,
    prefix
}) {
    const input = args.join(' ');
    try {
        const eventCommands = enableCommands[1].handleEvent;
        const commands = enableCommands[0].commands;
        
        if (!input) {
            const pages = 999;
            let page = 1;
            let start = (page - 1) * pages;
            let end = start + pages;
            let helpMessage = `⚙️➽☟\n\n====彡🄰🅃🄷-🄱🄾🅃彡====\n\n`;
            for (let i = start; i < Math.min(end, commands.length); i++) {
                helpMessage += `  ╭─╮\n  | 『 ${i + 1}.』➽ ${prefix}${commands[i]}\n  ╰─────────────◉\n`;
            }
            helpMessage += '\n====『 🅔︎🅥︎🅔︎🅝︎🅣︎: 』====\n\n';
            eventCommands.forEach((eventCommand, index) => {
                helpMessage += `  ╭─────────────────╮\n  | 『 ${index + 1}.』➽ ${prefix}${eventCommand}\n  ╰─────────────────╯ \n`;
            });
            helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}. Pour afficher la page suivante, tapez'${prefix}help 2'. L'objectif d'ATH BOT est de venir en aide à toute personne nécessitant une assistance.\n\n`;
            api.sendMessage(helpMessage, event.threadID, event.messageID);
        } else if (!isNaN(input)) {
            if (input === '2') {
                const pages = 999;
                let page = 2;
                let start = (page - 1) * pages;
                let end = start + pages;
                let helpMessage = `⚙️\n\n====彡🄰🅃🄷-🄱🄾🅃彡====\n\n`;
                for (let i = start; i < Math.min(end, commands.length); i++) {
                    helpMessage += `  ╭─╮\n  | 『 ${i + 1}.』  ${prefix}${commands[i]}\n  ╰─────────────◉\n`;
                }
                helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}. Pour afficher la page précédente,tapez'${prefix}help'. L'objectif d'ATH BOT est de venir en aide à toute personne nécessitant une assistance.\n\n`;
                api.sendMessage(helpMessage, event.threadID, event.messageID);
            } else {
                // Remaining code remains unchanged
            }
        } else {
            // Remaining code remains unchanged
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.handleEvent = async function({
    api,
    event,
    prefix
}) {
    const { threadID, messageID, body } = event;
    const message = prefix 
        ? `Yo, my prefix is [ 𓆩 '${prefix}' 𓆪 ]\n\nSOME COMMANDS THAT MAY HELP YOU:\n➥ '${prefix}help [command]' -> information and usage of command\n\nHave fun using it, enjoy! ❤` 
        : "Sorry, I don't have a prefix.";
    if (body?.toLowerCase().startsWith('prefix')) {
        api.sendMessage(message, threadID, messageID);
    }
	}
