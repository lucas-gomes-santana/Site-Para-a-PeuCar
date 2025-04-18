require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SENHA CARREGADA' : 'SENHA NÃO CARREGADA');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
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
    const { subject, message } = req.body;

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ls7128387@gmail.com',
        subject: subject,
        text: message,
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
