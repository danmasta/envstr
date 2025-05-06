#!/usr/bin/env node

import { getArgv, optsFromArgv } from 'lo';
import { log } from 'node:console';
import { Envstr } from '../lib/envstr.js';
import { readStdin } from '../lib/util.js';
import pkg from '../package.json' with { type: 'json' };

const HELP = `Usage:
    envstr [str] [...options]

Options:
    --string  -s - Text string to parse
    --stdin    - - Read input from stdin
    --json    -j - Handle input as json
    --key     -k - If input is json, parse data at specified key
    --quotes  -q - If true add quotes around each output value
    --newline -n - Which character to use as newline delimeter. Default is '\\n'
    --include -i - Which keys to include in output: key1,key2
    --exclude -e - Which keys to exclude from output: key3,key4
    --caps    -c - If true capitalizes the output key name
    --export  -x - If true adds the 'export' keyword in front of each output key
    --version -v - Print the current version
    --help    -h - Show this help message

Example:
    envstr -s '{"KEY1":true,"KEY2":false}' --json --quotes`;

const args = {
    string: 's',
    stdin: '-',
    json: 'j',
    key: 'k',
    quotes: 'q',
    newline: 'n',
    include: 'i',
    exclude: 'e',
    caps: 'c',
    export: 'x',
    version: 'v',
    help: 'h'
};

const argv = getArgv();
const opts = optsFromArgv(args, { argv });
const envstr = new Envstr(opts);

let { help, version, stdin, json, string: str } = opts;

if (help) {
    log(HELP);
} else if (version) {
    log(pkg.version);
} else {
    if (!str && stdin) {
        str = await readStdin();
    }
    if (!str) {
        str = argv._.pop();
    }
    if (str) {
        if (json) {
            log(envstr.parseJsonStr(str));
        } else {
            log(envstr.parseTableStr(str));
        }
    } else {
        log(HELP);
    }
}
