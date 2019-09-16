'use strict';

const connector = require(__dirname + '/lib/connector')

const userName = 'User1@org1.example.com';



	const args = ['readData', "3ich bin ein key"]
	console.log(args)
	connector.query(userName, args).then(result => { console.log(result) }).catch(err => { console.log(err) })




