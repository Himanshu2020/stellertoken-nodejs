var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var request = require('request');

// Create the new account the with new private and public key .
router.get('/', function (req, res, next) {

    var pair = StellarSdk.Keypair.random();
    var account = {};
    var accountId = pair.publicKey();
    var accountPrivateKey = pair.secret();
    account["pubicKey"] = accountId;
    account["privateKey"] = accountPrivateKey;
    request.get({
        url: 'https://horizon-testnet.stellar.org/friendbot',
        qs: {
            addr: accountId
        },
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
            res.send(error);
        } else {
            console.log('SUCCESS! You have a new account :)\n', body);
          //  deferred.resolve(accountId);
          res.send(account);
        }
    });
   
});

module.exports = router;
