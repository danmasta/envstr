import { defaults, filter, fmt, get, isString, join, map, mapLine, split, toPairs, toUpper } from 'lo';
import { EnvstrError } from './util.js';

const defs = {
    quotes: false,
    json: false,
    key: undefined,
    newline: '\n',
    include: undefined,
    exclude: undefined,
    caps: false,
    export: false
};

export class Envstr {

    constructor (opts) {
        this.opts = opts = defaults(opts, defs);
        let { include, exclude } = opts;
        if (include) {
            opts.include = split(include, ',', { trim: true });
        }
        if (exclude) {
            opts.exclude = split(exclude, ',', { trim: true });
        }
    }

    pairsToStr (pairs=[]) {
        let { include, exclude, export: x, caps, quotes, newline } = this.opts;
        if (include) {
            pairs = filter(pairs, pair => {
                return include.indexOf(pair[0]) > -1;
            });
        }
        if (exclude) {
            pairs = filter(pairs, pair => {
                return exclude.indexOf(pair[0]) < 0;
            });
        }
        return join(map(pairs, pair => {
            let { 0: key, 1: val } = pair;
            if (caps) {
                key = toUpper(key);
            }
            if (x) {
                key = fmt('export %s', key);
            }
            if (quotes) {
                val = fmt('"%s"', val);
            }
            return fmt('%s=%s', key, val);
        }), newline);
    }

    parseTableStr (str='') {
        let pairs = mapLine(str, line => {
            return split(line, ' ', { limit: 1, trim: true });
        });
        return this.pairsToStr(pairs);
    }

    parseObj (obj={}) {
        let { key } = this.opts;
        if (key) {
            obj = get(obj, key);
        }
        return this.pairsToStr(toPairs(obj));
    }

    parseJsonStr (str='') {
        if (isString(str)) {
            if (!str.length) {
                return str;
            }
            try {
                return this.parseObj(JSON.parse(str));
            } catch (err) {
                throw new EnvstrError('String not valid json: %s', err.message);
            }
        } else {
            throw new EnvstrError('Invalid string type: %s', typeof str);
        }
    }

    static get defaults () {
        return defs;
    }

    static factory () {
        let Fn = this;
        return function factory (...args) {
            return new Fn(...args);
        };
    }

}

export {
    Envstr as default
};
