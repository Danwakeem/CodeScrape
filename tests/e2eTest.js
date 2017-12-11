const nock = require('nock');
const should = require('should');
const scrape = require('../scrape');

describe('E2E test of API', () => {

  describe('compileCode() should', () => {
    const lang = 'C';
    const code = `#include<stdio.h>\n\nint main () {\n   printf(\"HELLO, WORLD!\");\n   return 0;\n}`;

    it('return html', () => {
      return scrape.compileCode(lang, code)
      .then(output => {
        output.should.deepEqual({ output: 'HELLO, WORLD!' });
      });
    });

    it('return error for invalid return link', () => {
      nock('http://codepad.org')
      .post('/')
      .reply(302, {}, { location: 'http://codepad.org/GhKld89' });

      nock('http://codepad.org')
      .get('/GhKld89')
      .reply(500);

      return scrape.compileCode(lang, code)
      .then(output => {
        output.should.deepEqual({ output: 'Error: Something went wrong when compiling your code. Please try again later.' });
      });
    });
  });

});