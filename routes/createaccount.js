var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var request = require('request');

/* GET user balnce listing. */
/* 

router.get('/', function (req, res, next) {


  var accountPublicKey = "GCRWLMPDJIIY6XJDVW3LD6MWNAMVJJHAYKCULG3SVDPF5DNWGZO6ZYOB";

  server.loadAccount(accountPublicKey)
    .then(function (account) {
      res.send({ AssetType: account.balances[0].asset_type, Balance: account.balances[0].balance })
    });
});  */

router.get('/', function (req, res, next) {

    var pair = StellarSdk.Keypair.random();
    var account = {};
    var accountId = pair.publicKey();
    var accountSeed = pair.secret();
    account["accountId"] = accountId;
    account["accountSeed"] = accountSeed;

    request.get({
        url: 'https://horizon-testnet.stellar.org/friendbot',
        qs: {
            addr: accountId
        },
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
        } else {
            console.log('SUCCESS! You have a new account :)\n', body);
          //  deferred.resolve(accountId);

        }
    });
    res.send(account);
});

module.exports = router;
