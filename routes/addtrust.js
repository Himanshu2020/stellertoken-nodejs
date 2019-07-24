var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');


/* GET users listing. */
router.get('/', function (req, res, next) {


    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


    var issuerKeyPairs = StellarSdk.Keypair.fromSecret("SAB6AZ6XJ3WP5USBDYI2DMWUMNHDAG6KQALSECOPVLRE7LEBTKBE33KP");
    var assetName = "IGP";
    var destSecret = StellarSdk.Keypair.fromSecret("SDP2WU5DPF2P2KRYHQD22KDFV2ON5FJV4RGVKWSWZYI2Q4HXFUOWFKIJ")
    var issrAccountId = issuerKeyPairs.publicKey();

    var sourceAcc = StellarSdk.Keypair.fromSecret("SAYH6F4NRJ7HA4OK66GDPMAODJH65F6NQAVQ2PWHRB4O2ACIUHAYF67X");



    server.loadAccount(destSecret.publicKey())
        .then(function (receiver) {
            console.log(receiver)

            var transaction = new StellarSdk.TransactionBuilder(receiver, {
                fee: StellarSdk.BASE_FEE
            })
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: new StellarSdk.Asset(assetName, issrAccountId),
                    source: destSecret.publicKey()
                    // limit: amountIssued
                }))
                .addOperation(StellarSdk.Operation.payment({
                    destination: destSecret.publicKey(),
                    asset: new StellarSdk.Asset('IGP', issuerKeyPairs.publicKey()),
                    amount: "10",
                    source: issuerKeyPairs.publicKey(),
                })).setTimeout(1000)
                .addMemo(StellarSdk.Memo.text('10 INR to newAcc'))
                .build();

            transaction.sign(destSecret);
            transaction.sign(issuerKeyPairs);

            console.log(transaction)
            server.submitTransaction(transaction);
            console.log('Trustline created and Payment Done')
           
         //   res.send({ 'Msg': JSON.stringify(transaction, null, 2) });
           // console.log('Trustline created and Payment Done')

        })
        .catch(function (error) {
            console.error(error)
            res.send(error);
        });


     res.send("Trust added and payment done ...");

});

module.exports = router;
