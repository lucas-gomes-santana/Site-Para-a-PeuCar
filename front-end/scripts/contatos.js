document.querySelector('.contacts-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtém os valores dos campos do formulário
    const from = document.querySelector('input[name="from"]').value; 
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    const emailMessage = document.getElementById('mensagem');
    
    if (!validateCredentials()) {  // Se a validação falhar, não envie o formulário
        return;
    }

    emailMessage.textContent = "Enviando mensagem...";

    // Envia os dados para a API
    fetch('https://peucar-automotivos-servidor.onrender.com/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, subject, message, name, phone }), // Inclui o campo "from"
    })
        .then((response) => {
            if (response.ok) {
                emailMessage.textContent = "E-mail enviado com sucesso!";
                emailMessage.style.color = "green";
            } 
            else {
                emailMessage.textContent = "Erro ao enviar o e-mail. Tente novamente.";
                emailMessage.style.color = "red";
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
            emailMessage.textContent = "Erro ao enviar o e-mail. Tente novamente.";
            emailMessage.style.color = "red";
        });
});

// Função para formatar o número de telefone
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 2) {
            value = `(${value}`;
        } 
        else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } 
        else if (value.length <= 11) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } 
        else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
    }
    
    input.value = value;
}

// Adiciona o evento de formatação ao campo de telefone
document.querySelector('input[name="phone"]').addEventListener('input', function(event) {
    formatPhoneNumber(event.target);
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