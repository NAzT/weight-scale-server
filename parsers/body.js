const Parser = require('binary-parser').Parser
const formatters = require('./formatter')

const sensorNodeParser = Parser.start().endianess('big')
  .array('from', {
	      type: 'uint8',
	      length: 6,
	      formatter: formatters.toHextString
	    })
  .array('to', {
	      type: 'uint8',
	      length: 6,
	      formatter: formatters.toHextString
	    })
  .endianess('little')
  .uint8('type')
  .uint32('battery')
  .int32('field1')
  .int32('field2')
  .int32('field3')
  .int32('field4')
  .int32('field5')
  .int32('field6')
  .int32('field7')
  .int32('field8')
  .int32('field9')
  .uint8('name_len')
  .string('device_name', {length: 16, stripNull: true})
  .uint32('node_ms')
  .uint32('sent_ms')
  .uint32('checksum')

module.exports = sensorNodeParser


