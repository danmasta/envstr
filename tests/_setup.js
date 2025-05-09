import { assert, expect, should } from 'chai';
import { Envstr, fromJSON, fromObject, fromPairs, fromTable } from '../lib/envstr.js';

const envstr = new Envstr();

beforeEach(() => {
    global.assert = assert;
    global.expect = expect;
    global.should = should();
    global.Envstr = Envstr;
    global.envstr = envstr;
    global.fromJSON = fromJSON;
    global.fromObject = fromObject;
    global.fromPairs = fromPairs;
    global.fromTable = fromTable;
});
