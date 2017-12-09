const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'http://codepad.org';
const run = 'True';

const parseOutput = (outputPage) => {
	const $ = cheerio.load(outputPage);
	const output = $($('a[name="output"] + .code .highlight pre')[1]).text();
	return { output };
}

const compileCode = (lang, code) => {
	return rp.post(url, { form: { lang, code, run } })
	.then(data => {})
	.catch(redirect => {
		return rp.get(redirect.response.headers.location)
		.then(parseOutput);
	});
};


module.exports = {
   compileCode
};
