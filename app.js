const Buffer = require('safe-buffer').Buffer
const SerialPort = require('serialport') 
const Delimiter = SerialPort.parsers.Delimiter
const SERIAL_PORT = '/dev/ttyS0'
const SERIAL_BAUDRATE = '9600' 
const dataParser = require('./parsers/index')

const port = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(SERIAL_BAUDRATE),
//  //parser: com.parsers.byteLength(PACKET_LEN)
})

//const port = new SerialPort(process.env.TARGET_PORT, {
//	  baudRate: parseInt(process.env.TARGET_BAUDRATE)
//})
const parser = port.pipe(new Delimiter({delimiter: Buffer.from('0d0a', 'hex')}))
console.log('hello') 

parser.on('data', data => { 
console.log(data) 
   //console.log(`recv packet = ${packetCounter}, data = ${data.toString('hex')}`)
   const payload = Buffer.concat([data, Buffer.from('0d0a', 'hex')])
	 console.log(payload.toString('hex'))
   try {
      parsed = dataParser.parse(payload) 
      console.log(parsed)
   }
   catch(ex) { 
     console.log(ex) 
   }
})

port.on('open', () => { 
	console.log('serial port has been openned.') 
})

port.on('error', () => { 

})
