'use strict';
const converter = require('convert-array-to-csv')
const header = ['startTime', 'endTime', 'result']
const fs = require('fs');

const sleep = require('util').promisify(setTimeout)
const connector = require(__dirname + '/lib/connector')
console.log(__dirname)

const userName = 'User1@org1.example.com';

// matrix size
const mSize = 2

// number of iterations
const it = 2

// base number of transactions per iteration
var txs = 20

// timeout between iterations
const timeOut = 2000

// ramp up speed
const ramp = 10

var errC

var logs = []
var promises = []

const args = ['matrixMultiplication', mSize.toString()]

function helper() {
	return new Promise(async function (resolve, reject) {
		var logEntry = []
		logEntry[0] = Date.now()

		try {
			var result = await connector.submit(userName, args)
		}

		catch (err) {
			errC++
			console.log(errC)
			//console.log("asdasd")
		}

		logEntry[1] = Date.now()
		logEntry[2] = result
		logs.push(logEntry)
		resolve(logEntry)
	})
}


async function batchIterator() {
	for (var i = 0; i < it; i++) {
		errC = 0
		console.log(txs)
		logs.push(["startOfPromise", Date.now()])
		for (var j = 0; j < txs; j++) {
			promises.push(helper())
		}
		logs.push(["startOfPromise", Date.now()])
		await Promise.all(promises)
		logs.push(["iteration:" + i, "transactions:" + txs, "timeout:" + timeOut])
		//console.log(logs)
		console.log(errC)
		console.log(errC / txs)
		if (errC / txs > 0.1) { process.exit(1) }
		await new Promise(resolve => setTimeout(resolve, timeOut))
		txs = txs + ramp
	}
	console.log("finished")

	const csvFromArrayOfArrays = converter.convertArrayToCSV(logs, {
		header,
		separator: ' '
	})

	console.log(csvFromArrayOfArrays)

	fs.writeFile(__dirname + "/" + Date.now() + ".csv", csvFromArrayOfArrays, function (err) {
		if (err) throw err
		console.log("file saved")
	})
}

batchIterator()







