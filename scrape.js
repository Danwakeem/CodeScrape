const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'http://codepad.org';
const run = 'True';

const parseOutput = (outputPage) => {
	const $ = cheerio.load(outputPage);
	const output = $($('a[name="output"] + .code .highlight pre')[1]).text();
	return { output };
}

const getRedirect = (body) => {
	return rp.post(url, body)
	.then(data => {})
	.catch(redirect => {
		if (redirect.response.statusCode === 302) {
			return redirect.response.headers.location;
		} else {
			return 'Error';
		}
	});
};

const getCompiledHTML = (location) => {
	return rp.get(location)
	.then(html => html);
};

const compileCode = (lang, code) => {
	return getRedirect({ form: { lang, code, run } })
	.then(location => {
		return getCompiledHTML(location)
		.then(html => parseOutput(html));
	}).catch(err => {
		return { output: 'Error: Something went wrong when compiling your code. Please try again later.' };
	});
};


module.exports = {
   compileCode,
   parseOutput,
   getCompiledHTML,
   getRedirect
};
