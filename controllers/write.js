'use strict';

const connector = require(__dirname + '/lib/connector')

const userName = 'User1@org1.example.com';



	const args = ['writeData', "3ich bin ein key", "dieData"]
	console.log(args)
	connector.submit(userName, args).then(result => { console.log(result) }).catch(err => { console.log(err) })




