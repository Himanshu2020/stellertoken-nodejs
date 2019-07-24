var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

/* GET users listing. */
router.get('/', function (req, res, next) {

    const sourceSecretKey = 'SAYH6F4NRJ7HA4OK66GDPMAODJH65F6NQAVQ2PWHRB4O2ACIUHAYF67X';

    // Derive Keypair object and public key (that starts with a G) from the secret
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const receiverPublicKey = 'GCC32CC52NRCXOKFOBCRPGMIJPJXQZ3Q62J2ISQY6WA76OWNRMNFH5UZ';
    StellarSdk.Network.useTestNetwork();


    (async function main() {
        // Transactions require a valid sequence number that is specific to this account.
        // We can fetch the current sequence number for the source account from Horizon.
        const account = await server.loadAccount(sourcePublicKey);


        // Right now, there's one function that fetches the base fee.
        // In the future, we'll have functions that are smarter about suggesting fees,
        // e.g.: `fetchCheapFee`, `fetchAverageFee`, `fetchPriorityFee`, etc.
        const fee = await server.fetchBaseFee();

        console.log(fee);

        const transaction = new StellarSdk.TransactionBuilder(account, { fee })
            // Add a payment operation to the transaction
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                // The term native asset refers to lumens
                asset: StellarSdk.Asset.native(),
                // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
                // the decimal. They are represented in JS Stellar SDK in string format
                // to avoid errors from the use of the JavaScript Number data structure.
                amount: '100.1234567',
            }))
            // Make this transaction valid for the next 30 seconds only
            .setTimeout(30)
            // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
            // .addMemo(StellarSdk.Memo.text('Hello world!'))
            .build();

        // Sign this transaction with the secret key
        // NOTE: signing is transaction is network specific. Test network transactions
        // won't work in the public network. To switch networks, use the Network object
        // as explained above (look for StellarSdk.Network).
        transaction.sign(sourceKeypair);

        // Let's see the XDR (encoded in base64) of the transaction we just built
      //  console.log(transaction.toEnvelope().toXDR('base64'));

        // Submit the transaction to the Horizon server. The Horizon server will then
        // submit the transaction into the network for us.
        try {
            const transactionResult = await server.submitTransaction(transaction);
        //    console.log(JSON.stringify(transactionResult, null, 2));
          //  console.log('\nSuccess! View the transaction at: ');
            console.log(transactionResult._links.transaction.href);
        } catch (error) {
            console.log('An error has occured:');
            console.log(error);
            res.send({'Msg': JSON.stringify(error, null, 2)});
        }
    })();



});

module.exports = router;



