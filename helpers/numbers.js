'use strict';

exports.cleanPrice = (price) => {
    return parseInt(price.replace(/[$.]/g,'').trim());
}