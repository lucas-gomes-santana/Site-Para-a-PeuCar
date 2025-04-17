require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuração do Middleware
app.use(cors());
app.use(bodyParser.json());

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

// Configuração do transporte SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    // Variáveis de ambiente para credenciais do Gmail
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

// Rota para envio de e-mails
app.post('/send-email', (req, res) => {
    const { subject, message } = req.body;

    const emailOptions = {
        from: process.env.EMAIL_USER, // E-mail do servidor que irá enviar a mensagem
        to: 'ls7128387@gmail.com', // E-mail do destinatário (dono do site)
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