'use strict';

exports.cleanPrice = (price) => {
    return parseInt(price.replace(/[$.]/g,'').trim());
}

exports.timeSCL = () => {
    return new Date().toLocaleString("en-US", {timeZone: "America/Santiago"})
}