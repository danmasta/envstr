#!/usr/bin/env node

import { getArgv, optsFromArgv } from 'lo';
import { log } from 'node:console';
import { fromJSON, fromTable } from '../lib/envstr.js';
import { readStdin } from '../lib/util.js';
import pkg from '../package.json' with { type: 'json' };

const HELP = `Usage:
    envstr [str] [...options]

Options:
    --input   -i - Text string to parse
    --stdin    - - Read input from stdin
    --json    -j - Handle input as JSON
    --key     -k - If input is JSON, parse data at specified key
    --quotes  -q - Add quotes around each output value
    --newline -n - Which character to use as newline delimeter. Default is '\\n'
    --pick    -p - Pick which keys to include in output: key1,key2
    --exclude -e - Exclude keys from output: key3,key4
    --caps    -c - Capitalize each output key
    --export  -x - Add the 'export' keyword in front of each output key
    --prefix  -f - Prefix to add to each output key
    --version -v - Print the current version
    --help    -h - Show this help message

Example:
    envstr -i '{"KEY1":true,"KEY2":false}' --json --quotes`;

const args = {
    input: 'i',
    stdin: '-',
    json: 'j',
    key: 'k',
    quotes: 'q',
    newline: 'n',
    pick: 'p',
    exclude: 'e',
    caps: 'c',
    export: 'x',
    prefix: 'f',
    version: 'v',
    help: 'h'
};

const argv = getArgv();
const opts = optsFromArgv(args, { argv });

let { help, version, stdin, json, input } = opts;

if (help) {
    log(HELP);
} else if (version) {
    log(pkg.version);
} else {
    if (!input && stdin) {
        input = await readStdin();
    }
    if (!input) {
        input = argv._.pop();
    }
    if (input) {
        if (json) {
            log(fromJSON(input, opts));
        } else {
            log(fromTable(input, opts));
        }
    } else {
        log(HELP);
    }
}
