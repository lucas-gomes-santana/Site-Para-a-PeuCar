// Define a reusable function to create the card component
function createCardComponent(title, description, imageUrl, linkText, linkHref) {
    
    // Create the main container div
    const containerCard = document.createElement('div');
    containerCard.classList.add('container-card');

    // Create and append the title
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;
    containerCard.appendChild(cardTitle);

    // Create and append the description
    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;
    containerCard.appendChild(cardDescription);

    // Create and append the image
    const cardImage = document.createElement('img');
    cardImage.src = imageUrl;
    cardImage.alt = title;
    containerCard.appendChild(cardImage);

    // Create and append the link
    const cardLink = document.createElement('a');
    cardLink.href = linkHref;
    cardLink.textContent = linkText;
    containerCard.appendChild(cardLink);

    return containerCard;
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-container'); // Ensure you have a container in your HTML with this ID

    const card = createCardComponent(
        'Troca de Pneus',
        'Realizamos a troca de pneus com segurança e eficiência, garantindo que seu veículo esteja sempre pronto para a estrada.',
        '../assets/Troca de Pneus.jpg',
        'Obter Serviço',
        '#'
    );

    container.appendChild(card);
});