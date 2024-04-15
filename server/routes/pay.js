import Stripe from "stripe";
const striper = Stripe('sk_test_51P3L11RwU7phCr0yEQVmgnklOhVJAzRTAX5EDnemoTQSmIsxt0lbe2mtVjpmLcZju5DJwZ8IC4HSwfMTJAlEoiAL00jZRnuip6');



export const pay = async (req,res) => {
    let {amount, id} = req.body
    try {
        const payment = await striper.paymentIntents.create({
            amount,
            currency: 'US Dollars',
            description: 'shop',
            payment_method: id,
            confirm: true
        })

        console.log('payment', payment);
        res.json({
            message: 'payment succesful',
            succes: true
        })
    } catch (error) {
        console.log('error', error);
        res.json({
            message:'payment failed',
            succes: false
        })
    }
}