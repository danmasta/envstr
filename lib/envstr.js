import { defaults, filter, fmt, get, isString, join, map, mapLine, split, toPairs, toUpper } from 'lo';
import { EnvstrError } from './util.js';

const defs = {
    quotes: false,
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

    fromPairs (pairs=[]) {
        let { include, exclude, export: x, caps, quotes, newline } = this.opts;
        if (include) {
            pairs = filter(pairs, ([key]) => {
                return include.indexOf(key) > -1;
            });
        }
        if (exclude) {
            pairs = filter(pairs, ([key]) => {
                return exclude.indexOf(key) < 0;
            });
        }
        return join(map(pairs, ([key, val]) => {
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

    fromObject (obj={}) {
        let { key } = this.opts;
        if (key) {
            obj = get(obj, key);
        }
        return this.fromPairs(toPairs(obj));
    }

    fromTable (str='') {
        let pairs = mapLine(str, line => {
            return split(line, ' ', { limit: 1, trim: true });
        });
        return this.fromPairs(pairs);
    }

    fromJSON (str='') {
        if (isString(str)) {
            if (!str) {
                return str;
            }
            try {
                return this.fromObject(JSON.parse(str));
            } catch (err) {
                throw new EnvstrError('String not valid json: %s', err.message);
            }
        } else {
            throw new EnvstrError('Invalid string type: %s', typeof str);
        }
    }

    static fromJSON (str, opts) {
        return new Envstr(opts).fromJSON(str);
    }

    static fromObject (obj, opts) {
        return new Envstr(opts).fromObject(obj);
    }

    static fromPairs (pairs, opts) {
        return new Envstr(opts).fromPairs(pairs);
    }

    static fromTable (str, opts) {
        return new Envstr(opts).fromTable(str);
    }

    static get defaults () {
        return defs;
    }

    static factory (defs) {
        return function factory (opts) {
            return new Envstr({ ...defs, ...opts });
        };
    }

}

export const { factory, fromJSON, fromObject, fromPairs, fromTable } = Envstr;

export default Envstr;
