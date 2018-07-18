const Buffer = require('safe-buffer').Buffer
const SerialPort = require('serialport')
const Delimiter = SerialPort.parsers.Delimiter
const SERIAL_PORT = '/dev/ttyS0'
const SERIAL_BAUDRATE = '9600'
const dataParser = require('./parsers/index')
const mqtt = require('cmmc-mqtt').mqtt
const port = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(SERIAL_BAUDRATE),
})

const parser = port.pipe(new Delimiter({delimiter: Buffer.from('0d0a', 'hex')}))
const mqttClient1 = mqtt.create('mqtt://localhost', [])
const mqttClient2 = mqtt.create('mqtt://cmmc:cmmc@odin.cmmc.io', [])
  .register('on_connected', function () {
    console.log('mqtt connected.')
  })

console.log('hello')

parser.on('data', data => {
  const payload = Buffer.concat([data, Buffer.from('0d0a', 'hex')])
  try {
    parsed = dataParser.parse(payload)
    //const deviceName = parsed.sensor.device_name.replace(/\0[\s\S]*$/g, '')
    //parsed.sensor.device_name = deviceName
    //console.log(`${parsed.sensor.device_name}`)
    console.log(`${JSON.stringify(parsed)}`)
    mqttClient1.publish(`NAT/${parsed.sensor.device_name}/status`, JSON.stringify(parsed), {retain: false})
    mqttClient2.publish(`NAT/${parsed.sensor.device_name}/status`, JSON.stringify(parsed), {retain: false})
  }
  catch (ex) {
    console.log(ex)
  }
})

port.on('open', () => {
  console.log('serial port has been openned.')
})

port.on('error', () => {

})
