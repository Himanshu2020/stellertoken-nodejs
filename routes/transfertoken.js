var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

/* GET users listing. */
router.post('/', function (req, res, next) {

    StellarSdk.Network.useTestNetwork();

    console.log(req.body);


    var tokenName = req.body.tokenName;
    var tokenAmount = req.body.tokenAmount;
    
    var sourceAccountKeyPairs = StellarSdk.Keypair.fromSecret((req.body.sourceAccount));
    var receiverAccountKeyPairs = StellarSdk.Keypair.fromSecret(req.body.receiverAccount);

    console.log("himna1111"+receiverAccountKeyPairs.secret());
    console.log("himna1111"+sourceAccountKeyPairs.secret());


    server.loadAccount(receiverAccountKeyPairs.publicKey())
        .then(function (receiver) {
           // console.log(receiver)

            var transaction = new StellarSdk.TransactionBuilder(receiver, {
                fee: StellarSdk.BASE_FEE
            })
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: new StellarSdk.Asset(tokenName, sourceAccountKeyPairs.publicKey()),
                    source: receiverAccountKeyPairs.publicKey()
                    // limit: amountIssued
                }))
                .addOperation(StellarSdk.Operation.payment({
                    destination: receiverAccountKeyPairs.publicKey(),
                    asset: new StellarSdk.Asset(tokenName, sourceAccountKeyPairs.publicKey()),
                    amount: JSON.stringify(tokenAmount),
                    source: sourceAccountKeyPairs.publicKey(),
                })).setTimeout(1000)
                .addMemo(StellarSdk.Memo.text('10 INR to newAcc'))
                .build();

            transaction.sign(receiverAccountKeyPairs);
            transaction.sign(sourceAccountKeyPairs);

         //   console.log(transaction)
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
