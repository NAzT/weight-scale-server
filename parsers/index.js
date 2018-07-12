const hexExample = '7e7f0101ffffffff3c000000c50e000000000000000018fe34db3b980145010000e50b00001910000021000000d3000000087d930006000000070000000800000009000000074c6172697330310003030000000000004c030000000000003a090000d50000000d0a'
                  //7e7f0101ffffffff3c000000cc274900000000000000000000000000000000000050c300000200000003000000040000000500000006000000070000000800000009000000045743303100000000000000004e0000000d0a
// typedef struct __attribute((__packed__)) {
//   uint8_t header[2] = {0x7e, 0x7f};
//   uint8_t version = 1;
//   uint8_t project = 1;
//   uint8_t reserved[4]= {0xff,0xff,0xff,0xff};
//   uint32_t sleepTime;
//   uint32_t ms;
//   CMMC_SENSOR_DATA_T data;
//   uint32_t sum;
//   uint8_t tail[2] = {0x0d, 0x0a};
// } CMMC_PACKET_T;

const Parser = require('binary-parser').Parser
const cmmcParser = require('./body')
const tailParser = require('./_tail')
const formatters = require('./formatter')
const parser = Parser.start()
  .endianess('big')
  .array('header', {
    type: 'uint8',
    length: 2,
    formatter: formatters.toHextString
  })
  .uint8('version')
  .uint8('project')
  .array('reserved', {
    type: 'uint8',
    length: 4,
    formatter: formatters.toHextString
  })
  .endianess('little')
  .uint32('sleepTime')
  .uint32('ms')
  .nest('sensor', {type: cmmcParser})
  .nest('tail', {type: tailParser})

module.exports = parser

