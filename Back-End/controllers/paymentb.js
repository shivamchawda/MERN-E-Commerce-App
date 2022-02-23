var braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "dc657bvsppnywqb5",
    publicKey: "2vgr5s6m67k8r95w",
    privateKey: "bac6fb368c88a2ce44b804b27a37802e"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,

            options: {
                submitForSettlement: true
            }
        },
        function (err, result) {
            if (err) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
