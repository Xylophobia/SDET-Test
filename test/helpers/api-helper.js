'use strict';

const config = require('../config'),
    request = require('request'),
    api = config.api;
    

let options = {};
options.headers =  {...api.headers};

function getRequest(uri, params = null) {
    options.url = api.root + uri;
    options.method = 'GET';
    options.qs = params;
    options.json = true;
    return new Promise (function (res, rej){
        request(options, function (error, response, body) {
            if (!error && response.statusCode < 500) {
            var reply = {
                body: body,
                statusCode: response.statusCode
            }
            res(reply);
            }
        });
    });
}

function postRequest(uri, body) {
    options.url = api.root + uri;
    options.method = 'POST';
    options.body = body;
    options.json = true;
    return new Promise (function (res, rej){
        request(options, function (error, response, body) {
            if (!error && response.statusCode < 500) {
            res(body);
            }
        });
    });
}

function deleteRequest(uri) {
    options.url = api.root + uri;
    options.method = 'DELETE';
    options.json = true;
    return new Promise (function (res, rej){
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    var info = JSON.parse(body);
                } catch (error) {
                    throw (error);
                }
            res(info);
            }
        });
    });
}

module.exports={
    getRequest,
    deleteRequest, 
    postRequest
};