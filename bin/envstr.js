#!/usr/bin/env node

import { optsFromArgv, parseArgv } from 'lo';
import { stdout } from 'node:process';
import { Envstr } from '../lib/envstr.js';
import { getStdin } from '../lib/util.js';

const HELP = `Usage:
envstr [str] [...options]

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

Examples:
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

let argv = parseArgv();
let opts = optsFromArgv(args, { argv });
let { 0: str } = argv._;
let { help, stdin, json, string } = opts;
let envstr = new Envstr(opts);

if (string) {
    str = string;
}

if (help) {
    stdout.write(HELP);
} else {
    if (str) {
        if (json) {
            stdout.write(envstr.parseJsonStr(str));
        } else {
            stdout.write(envstr.parseTableStr(str));
        }
    } else if (stdin) {
        str = await getStdin();
        if (json) {
            stdout.write(envstr.parseJsonStr(str));
        } else {
            stdout.write(envstr.parseTableStr(str));
        }
    } else {
        stdout.write(HELP);
    }
}
