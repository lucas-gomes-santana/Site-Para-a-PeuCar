// Header component que é utilizado em todas as páginas do site

function createHeader() {
    const header = document.createElement('header');
    header.className = 'container-header';

    header.innerHTML = `
        <div class="container-image">
            <img src="../assets/PeuCar_logo-removebg-preview_upscaled.png" alt="">
        </div>
        <nav class="container-links-header">
            <a href="servicos.html">Nossos Serviços</a>
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

insertHeader();