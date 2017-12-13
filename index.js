const scrape = require('./scrape');
const _ = require('lodash');
const headers = {
    "Access-Control-Allow-Origin": "*"
};

exports.handler = (event, context, callback) => {
    // TODO implement
    try {
        const body = JSON.parse(event.body.toString());
        if ('lang' in body && 'code' in body) {
            scrape.compileCode(body.lang, body.code)
            .then(output => callback(null, {
                statusCode: 200,
                headers,
                body: JSON.stringify(output)
            }));
        } else {
            callback(null, {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Invalid request body' })
            });    
        }
    } catch (e) {
        callback(null, {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Missing body', e })
        });
    }
};
