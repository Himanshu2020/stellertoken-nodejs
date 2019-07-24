var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

/* GET user balnce listing. */
router.get('/', function (req, res, next) {

//  var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  var accountPublicKey = "GCRWLMPDJIIY6XJDVW3LD6MWNAMVJJHAYKCULG3SVDPF5DNWGZO6ZYOB";

  server.loadAccount(accountPublicKey)
    .then(function (account) {
      /*      account.balances.forEach(function (balance) {
             console.log({ AssetType: balance.asset_type, Balance: balance.balance })
           }); */
     // console.log(JSON.stringify(account, null, 2))
      res.send({ AssetType: account.balances[0].asset_type, Balance: account.balances[0].balance })
    });
});

module.exports = router;
