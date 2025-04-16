// Envio de mensagens por E-mail usando o protocolo mailto

document.querySelector('.contacts-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const emailDestinatario = "ls7128387@gmail.com";

    const mailtoLink = `mailto:${emailDestinatario}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
});