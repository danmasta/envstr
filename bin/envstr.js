#!/usr/bin/env node

import { ARGV, optsFromArgv, parseArgv } from 'lo';
import { Envstr } from '../lib/envstr.js';
import { readStdin, writeStdout } from '../lib/util.js';

const HELP = `Usage:
    envstr [...options]

Options:
    --string  -s - Text string to parse
    --stdin    - - Read input from stdin
    --json    -j - Handle input as json
    --key     -k - If input is json, parse data at specified key
    --quotes  -q - If true add quotes around env values
    --newline -n - Which character to use as newline delimeter. Default is '\\n'
    --include -i - Which keys to include in output: key1,key2
    --exclude -e - Which keys to exclude from output: key3,key4
    --caps    -c - If true capitalizes the output key name
    --export  -x - If true adds the 'export' keyword in front of each output key
    --help    -h - Show this help message

Example:
    envstr -s '{"KEY1":true,"KEY2":false}' --json --quotes
`;

const args = {
    string: 's',
    stdin: '-',
    json: 'j',
    key: 'k',
    quotes: 'q',
    newline: 'n',
    include: 'i',
    exclude: 'e',
    help: 'h',
    caps: 'c',
    export: 'x'
};

const argv = parseArgv(ARGV);
const opts = optsFromArgv(args, { argv });
const envstr = new Envstr(opts);
let { help, stdin, json, string: str } = opts;

if (help) {
    writeStdout(HELP);
} else {
    if (str) {
        if (json) {
            writeStdout(envstr.parseJsonStr(str));
        } else {
            writeStdout(envstr.parseTableStr(str));
        }
    } else if (stdin) {
        str = await readStdin();
        if (json) {
            writeStdout(envstr.parseJsonStr(str));
        } else {
            writeStdout(envstr.parseTableStr(str));
        }
    } else {
        writeStdout(HELP);
    }
}
