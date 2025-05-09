describe('Envstr', () => {

    it('fromPairs', () => {
        expect(fromPairs([['name','test'], ['env', 'dev']])).to.equal('name=test\nenv=dev');
    });

    it('fromObject', () => {
        expect(fromObject({ name: 'test', env: 'dev' })).to.equal('name=test\nenv=dev');
    });

    it('fromTable', () => {
        let tbl = 'name    test\nenv    dev'
        expect(fromTable(tbl)).to.equal('name=test\nenv=dev');
    });

    it('fromJSON', () => {
        let json = '{"name":"test","env":"dev"}';
        expect(fromJSON(json)).to.equal('name=test\nenv=dev');
    });

    it('quotes', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { quotes: true })).to.equal('name="test"\nenv="dev"');
    });

    it('caps', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { caps: true })).to.equal('NAME=test\nENV=dev');
    });

    it('export', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { export: true })).to.equal('export name=test\nexport env=dev');
    });

    it('key', () => {
        expect(fromObject({ data: { name: 'test', env: 'dev' } }, { key: 'data' })).to.equal('name=test\nenv=dev');
    });

    it('include', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { include: 'name' })).to.equal('name=test');
    });

    it('exclude', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { exclude: 'name' })).to.equal('env=dev');
    });

    it('newline', () => {
        expect(fromObject({ name: 'test', env: 'dev' }, { newline: '\r\n' })).to.equal('name=test\r\nenv=dev');
    });

});
