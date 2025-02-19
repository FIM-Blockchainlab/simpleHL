/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');



/**
 * Custom context
 */
class BenchContext extends Context {
    constructor() {
        super();
    }
}

/**
 * Define smart contract by extending Fabric Contract class
 *
 */
class BenchContract extends Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.bench.benchcontract');
    }

    /**
     * Define a custom context
    */
    createContext() {
        return new BenchContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract')
    }

    /** Standard seters and geters
     * @param {String} key  Primary key
     * @param {String|Object} data value to store
     */

    async writeData(ctx, _key, _value) {
	await ctx.stub.putState(_key.toString(), Buffer.from(_value))
	return Buffer.from("success")
    }

    async readData(ctx, _key) {
	var tmp = await ctx.stub.getState(_key.toString())
	return Buffer.from(tmp.toString())
    }

    async writeMuchData(ctx, _start, _end, data) {
	for (var i = _start; i < _end; i++) {
		await ctx.stub.putState(i.toString(), Buffer.from(i.toString())) 
	}
    }

    async readMuchData(ctx, _start, _end) {
	var sum
	for (var i = _start; i < _end; i++) {
		console.log(key)
		var tmp = await ctx.stub.getState(i.toString())
		console.log(sum)
		sum += tmp
	}
        return Buffer.from(sum.toString())
    }


    /** For overhead testing
    */
    async doNothing(ctx) {
	return Buffer.from('1')
    }

    /** Function for matrix multiplication
     * @param {Number} n number of rows/ columns
     */
    async matrixMultiplication(ctx, n) {
        console.log(n)
        function multiplyMatrices(m1, m2) {
            var result = []
            for (var i = 0; i < m1.length; i++) {
                result[i] = []
                for (var j = 0; j < m2[0].length; j++) {
                    var sum = 0
                    for (var k = 0; k < m1[0].length; k++) {
                        sum += m1[i][k] * m2[k][j]
                    }
                    result[i][j] = sum
                }
            }
            return result
        }

        var f = 1
        var m1 = [];
        for (var i = 0; i < n; i++) {
            console.log(i)
            m1[i] = [];
            for (var j = 0; j < n; j++) {
                m1[i][j] = f
                f++
            }
        }

        var m2 = m1

        var result = multiplyMatrices(m1, m2)

	var matrixSum = 0

	for(var i = 0; i < result.length; ++i) {
            for (var j = 0; j < result[i].length; ++j){
                matrixSum += result[i][j];
            }
        }
        return Buffer.from(matrixSum.toString())
    }



}

module.exports = BenchContract;
