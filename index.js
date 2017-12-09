const scrape = require('./scrape');
const _ = require('lodash');
const headers = {};

exports.handler = (event, context, callback) => {
    // TODO implement
    if (_.isObject(event.body)) {
        if ('lang' in event.body && 'code' in event.body) {
            scrape.compileCode(event.body.lang, event.body.code)
            .then(output => callback(null, {
                statusCode: 200,
                headers,
                body: JSON.stringify(output)
            }));
        } else {
            callback(null, {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Invalid request body' });
            });    
        }
    } else {
        callback(null, {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Missing body' })
        });
    }
};
