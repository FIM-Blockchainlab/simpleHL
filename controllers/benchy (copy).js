'use strict';

const connector = require(__dirname + '/lib/connector')

const userName = 'User1@org1.example.com';

const txs = 2
const timeOut = 0
var logs = []

const args = ['matrixMultiplication', "2"]

async function test() {
	var logEntry = []
	logEntry[0] = Date.now()
	console.log(await connector.submit(userName, args))
	}
test()
console.log(logs)



