const ret = { toHextString: arr => (global.myBuffer || Buffer).from(arr).toString('hex') }

module.exports = ret


