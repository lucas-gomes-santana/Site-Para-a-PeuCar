require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

console.log('Servidor iniciado. Variáveis de ambiente carregadas.');
console.log('EMAIL_USER:', process.env.EMAIL_SERVER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Erro ao verificar SMTP:', error);
    } else {
        console.log('Transporte SMTP pronto para envio.');
    }
});

app.post('/send-email', (req, res) => {
    const { from, subject, message } = req.body;

    const emailOptions = {
        from: process.env.EMAIL_SERVER, 
        to: process.env.EMAIL_RECIPIENT, 
        subject: subject,
        text: message,
        replyTo: from,
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).send('Erro ao enviar o e-mail.');
        }
        console.log('E-mail enviado:', info.response);
        res.status(200).send('E-mail enviado com sucesso!');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});