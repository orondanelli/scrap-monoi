'use strict';

exports.cleanNumber = (text) => {
    return text.replace(/[$.]/g,'').trim();
}