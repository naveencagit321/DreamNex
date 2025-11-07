// backend/src/services/paymentService.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        return paymentIntent;
    } catch (error) {
        throw new Error('Payment processing failed: ' + error.message);
    }
};

const confirmPayment = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
        return paymentIntent;
    } catch (error) {
        throw new Error('Payment confirmation failed: ' + error.message);
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment,
};