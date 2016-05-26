// i2c-test.js
const artik = require('./artik-sdk');

const name = artik.get_platform_name();

if(name == 'Artik 5') {
	console.log('Running I2C test on Artik 5');
	const a5 = require('./artik5');
	var cw2015 = artik.i2c(1, 2000, '8', 0x62);
} else if(name == 'Artik 10') {
	console.log('Running I2C test on Artik 10');
	const a10 = require('./artik10');
	var cw2015 = artik.i2c(0, 2000, '8', 0x62);
}

if (cw2015.request()) {
  console.log('Failed to request cw2015');
} else {
  console.log('Version: ' + Buffer(cw2015.read_register(0, 1)).toString('hex'));
  var reg = cw2015.read_register(8, 1);
  console.log('Config: 0x' + Buffer(reg).toString('hex'));
  reg = new Buffer([0xff], 'hex');
  console.log('Writing 0x' + Buffer(reg).toString('hex') + ' to config register');
  cw2015.write_register(8, reg, 1);
  reg = cw2015.read_register(8, 1);
  console.log('Config: 0x' + Buffer(reg).toString('hex'));
  
  cw2015.release();
}