'use strict';

const connector = require(__dirname + '/lib/connector')

const userName = 'User1@org1.example.com';

	const args = ['matrixMultiplication', "1000"]
	console.log(args)
	connector.submit(userName, args).then(result => { console.log(result) }).catch(err => { console.log(err) })




