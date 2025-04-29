document.querySelector('.contacts-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtenha os dados do formulário
    const from = document.querySelector('input[name="from"]').value; // Captura o e-mail do remetente
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;


    // Envia os dados para o backend
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, subject, message }), // Inclui o campo "from"
    })
        .then((response) => {
            if (response.ok) {
                alert('E-mail enviado com sucesso!');
            } else {
                alert('Erro ao enviar o e-mail. Tente novamente.');
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao enviar o e-mail. Tente novamente.');
        });
});