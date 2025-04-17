// Função para criar um card reutilizável
function createCardComponent(title, description, imageUrl, linkText, linkHref) {
    const card = document.createElement('div');
    card.classList.add('container-card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    card.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    card.appendChild(descriptionElement);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = title;
    card.appendChild(imageElement);

    const linkElement = document.createElement('a');
    linkElement.href = linkHref;
    linkElement.textContent = linkText;
    card.appendChild(linkElement);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container principal onde os cards serão inseridos
    const cardsContainer = document.querySelector('.container-cards-services');

    // Remove o card vazio que veio do HTML, se necessário
    const emptyCard = cardsContainer.querySelector('.container-card');
    if (emptyCard) {
        cardsContainer.removeChild(emptyCard);
    }

    // Lista de serviços
    const services = [
        {
            title: 'Troca de Pneus',
            description: 'Realizamos a troca de pneus com segurança e eficiência, garantindo que seu veículo esteja sempre pronto para a estrada.',
            imageUrl: '../assets/Troca de Pneus.jpg',
            linkText: 'Agendar Serviço',
            linkHref: '#'
        },
        {
            title: 'Troca de Óleo',
            description: 'Fazer a troca de óleo é essencial para garantir o bom desempenho.Aqui na nossa oficina,utilizamos produtos de alta qualidade para cuidar bem do motor do seu carro.',
            imageUrl: '../assets/Troca de Óleo.jpg',
            linkText: 'Agendar Serciço',
            linkHref: '#'
        },
        {
            title: 'Revisão Completa',
            description: 'Verificamos freios, suspensão, motor, e outros itens essenciais para garantir que você dirija com tranquilidade e sem surpresas.',
            imageUrl: '../assets/Revisão.jpg',
            linkText: 'Agendar Serviço',
            linkHref: '#'
        }
    ];

    // Cria e adiciona os cards ao container
    services.forEach(service => {
        const card = createCardComponent(
            service.title,
            service.description,
            service.imageUrl,
            service.linkText,
            service.linkHref
        );
        
        cardsContainer.appendChild(card);
    });
});
