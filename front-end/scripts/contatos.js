document.querySelector('.contacts-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtém os valores dos campos do formulário
    const from = document.querySelector('input[name="from"]').value; 
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    // Se a validação falhar, não envie o formulário
    if (!validateCredentials()) {
        return;
    }

    // Envia os dados para a API
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, subject, message, name, phone }), // Inclui o campo "from"
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

// Função para validar os campos do formulário
function validateCredentials() {
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    const phoneValid = phoneRegex.test(phone);

    if (name.length < 8) {
        alert("Insira o seu nome completo.");
        return false;
    }

    if (phone.length < 10 || !phoneValid) {
        alert("Insira um número de telefone válido.");
        return false;
    }

    return true;
}