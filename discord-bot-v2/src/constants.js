import commands from './commands/index';
import _typecheck from 'type-check';

const typecheck = _typecheck.typeCheck;

export const deepDiff = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const mapper = (mappingKeys, values) => {
    const obj = {};
    for (const val of mappingKeys) {
        for (let o = 0; o < values.length; o++) {
            obj[val] = values[o];
        }
    }
    return obj;
}

export const parseAndExecuteCommand = async (command, args) => {
    let obj = {};
    for (let i = 0; i < command.args.length; i++) {
        const argument = command.args[i];

        // If is 'advanced' command, like !poll create <params>
        if (typecheck('Object', argument)) {
            // if the command is equal to the current args, shift the array so we only have the args and map that.
            // could use recursion but adds too much complexity, but would allow for !poll create my thing <params>
            if (args[0] === argument.arg) {
                const argsCopy = args.slice();
                argsCopy.shift();
                obj = mapper(argument.params, argsCopy);
            }
            break;
        }

        // If is simple command, use index of current argument for multiple args
        if (typecheck('String', argument)) {
            obj[argument] = args[i];
        }
    }
    await command.execute(obj);
}

export const commandParser = async (cmd) => {
    if (cmd.split('')[0] === process.env.DISCORD_BOT_PREFIX) {
        for (const command of commands) {
            const wholeCommandWithoutPrefix = cmd.substr(1).split(' ');
            if (command.cmd === wholeCommandWithoutPrefix[0]) {
                const onlyArguments = wholeCommandWithoutPrefix.slice();
                onlyArguments.shift();
                await parseAndExecuteCommand(command, onlyArguments);
            }
        }
    }
}
