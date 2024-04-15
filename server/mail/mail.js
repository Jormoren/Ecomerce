import nodemailer from 'nodemailer';  


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'jorgitom1980@gmail.com',
        pass: 'Amzn12345'
    }
});



export const sendMail = prod => {
    transporter.sendMail({
        from: "Onlinestore" <"Onlinestore@gmail.com",
        to: "jorgitom1980@gmail.com",
        subject: "Stock at its minimun",
        text: `The following product's stock which id's is${prod.id}. is almost empty`
    }).then(console.info)
    .catch(console.catch)
}