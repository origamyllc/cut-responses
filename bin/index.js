'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send_bad_implementation_error = send_bad_implementation_error;
exports.send_unauthorized_error = send_unauthorized_error;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _cutErrors = require('cut-errors');

var errors = _interopRequireWildcard(_cutErrors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');


function send_success_response(res, obj) {
    res.status(200).json(obj);
}

function send_not_found_error(res, obj) {
    var details = obj.details || {};
    var statusCode = obj.statusCode || '00000';
    var error = errors.not_found('Resource Not Found', details, statusCode);
    res.status(404).json(error);
}

function send_bad_implementation_error(res, obj) {
    var details = obj.details || {};
    var statusCode = obj.statusCode || '00000';
    var error = errors.bad_implementation('Bad Implementation', details, statusCode);
    res.status(500).json(error);
}

function send_unauthorized_error(res, obj) {
    var details = obj.details || {};
    var statusCode = obj.statusCode || '00000';
    var error = errors.unauthorized('Unauthorized', details, statusCode);
    res.status(401).json(error);
}