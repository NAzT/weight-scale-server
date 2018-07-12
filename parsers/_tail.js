const Parser = require('binary-parser').Parser
const formatters = require('./formatter')

const tailParser = Parser.start()
  .endianess('little')
  .uint32('checksum')
  .array('terminator', {
	      type: 'uint8',
	      length: 2,
	      formatter: formatters.toHextString
	    })

module.exports = tailParser

