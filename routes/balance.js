var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

/* GET user balance listing. */
router.get('/', function (req, res, next) {

  //var accountPublicKey = "GCRWLMPDJIIY6XJDVW3LD6MWNAMVJJHAYKCULG3SVDPF5DNWGZO6ZYOB";
 var accountPublicKey = req.query.accountId

  // This is funcation get the balance from the network.
  server.loadAccount(accountPublicKey)
    .then(function (account) {
      res.send({ TokenName: account.balances[0].asset_code, Balance: account.balances[0].balance})
    });
});

module.exports = router;
