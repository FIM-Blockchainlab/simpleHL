for (var i = 0; i < txs; i++) {
	var logEntry[0] = Date.now()
	connector.submit(userName, args).then(result => { 
		logEntry[1] = Date.now() 
		logs.push(logEntry)
	}).catch(err => { console.log(err) })
}
