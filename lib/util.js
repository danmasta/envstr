import { BaseError } from 'lo/errors';
import { stdin, stdout } from 'node:process';

export class EnvstrError extends BaseError {
    static code = 'ERR_ENVSTR';
}

export function readStdin () {
    return new Promise((resolve, reject) => {
        let res = '';
        stdin.on('data', chunk => {
            res += chunk;
        });
        stdin.on('end', () => {
            resolve(res);
        });
    });
}

export function writeStdout (str) {
    return stdout.write(str);
}
