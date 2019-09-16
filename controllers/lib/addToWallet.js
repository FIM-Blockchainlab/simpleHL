/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname);

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./wallet/');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '../creds');
        const cert = fs.readFileSync(path.join(credPath, '/Admin@org1.example.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/4d28133b8e3f767a6b95178245d646329c1694db600ddf41b5cc808844dd904c_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@org1.example.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
