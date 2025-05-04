require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verificar configuração do transporter
transporter.verify((error) => {
    if (error) {
        console.error('Erro ao verificar SMTP:', error);
    } else {
        console.log('Transporte SMTP pronto para envio.');
    }
});

app.post('/send-email', (req, res) => {
    try {
        const { from, subject, message, name, phone } = req.body;

        if (!from || !subject || !message || !name || !phone) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const emailOptions = {
            from: process.env.EMAIL_SERVER,
            to: process.env.EMAIL_RECIPIENT,
            subject: subject,
            text: `Mensagem enviada por ${name}\n\n Número: ${phone} \n\n E-mail: ${from}:\n\n${message}`,
            replyTo: from,
        };

        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar o e-mail:', error);
                return res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
            }
            console.log('E-mail enviado:', info.response);
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        });
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});