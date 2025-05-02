function createHeader() {
    const header = document.createElement('header');
    header.className = 'container-header';

    header.innerHTML = `
        <div class="container-image">
            <img src="assets/PeuCar_logo-removebg-preview_upscaled.png" alt="Logo">
        </div>
        <div class="menu-toggle" id="menuToggle">☰</div>
        <nav class="container-links-header" id="navLinks">
            <a href="pages/servicos.html">Nossos Serviços</a>
            <a href="pages/contatos.html">Fale Conosco</a>
            <a href="pages/perfil.html">Sobre Nós</a>
            <a href="index.html">Home</a>
        </nav>
    `;

    return header;
}

function insertHeader() {
    const header = createHeader();
    document.body.insertBefore(header, document.body.firstChild);

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Alterna a exibição dos links de navegação ao clicar no ícone
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Garante que os links sejam exibidos em telas grandes
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
        }
    });
}

insertHeader();