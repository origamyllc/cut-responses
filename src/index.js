
const _ = require('lodash');
import Promise from 'bluebird';
import * as errors from 'cut-errors';

function  send_not_found_error(res,obj){
    let details = obj.details || {};
    let statusCode = obj.statusCode || '00000';
    let error = errors.not_found('Resource Not Found', details,statusCode );
    res.status(404).json(error);
}

export function send_bad_implementation_error(res ,obj){
    let details = obj.details || {};
    let statusCode = obj.statusCode || '00000';
    let  error = errors.bad_implementation('Bad Implementation', details, statusCode);
    res.status(500).json(error);
}

export function send_unauthorized_error(res ,obj) {
    let details = obj.details || {};
    let statusCode = obj.statusCode || '00000';
    let  error = errors.unauthorized('Unauthorized', details, statusCode);
    res.status(401).json(error);
}
