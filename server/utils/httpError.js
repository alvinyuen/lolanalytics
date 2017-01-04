'use strict';

var http = require('http');

function HttpError (status, message) {
  var err = new Error(message || http.STATUS_CODES[status]);
  err.status = status;
  return err;
}

module.exports = HttpError;