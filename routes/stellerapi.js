var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');


/* GET users listing. */
router.get('/', function (req, res, next) {

  const sourceKeypair = StellarSdk.Keypair.random();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ publicKey: sourceKeypair.publicKey(), privateKey: sourceKeypair.secret() }));
});


module.exports = router;



