// File: /home/lucas/Projeto Site para a PeuCar/scripts/header.js

function createHeader() {
    const header = document.createElement('header');
    header.className = 'container-header';

    header.innerHTML = `
        <div class="container-image">
            <img src="/assets/PeuCar_logo-removebg-preview_upscaled.png" alt="">
        </div>
        <nav class="container-links-header">
            <a href="serviços.html">Nossos Serviços</a>
            <a href="contatos.html">Fale Conosco</a>
            <a href="perfil.html">Sobre Nós</a>
        </nav>
    `;

    return header;
}

function insertHeader() {
    const header = createHeader();
    document.body.insertBefore(header, document.body.firstChild);
}

// Call this function on every page to insert the header
insertHeader();