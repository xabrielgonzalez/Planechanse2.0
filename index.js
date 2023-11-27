let cardDeck = Array.from({ length: 67 }, (_, i) => ({
  image: `plane${i + 1}.webp`,
}));

let cardsDrawn = 0;
let drawnCards = [];

const drawButton = document.getElementById("draw-button");
drawButton.addEventListener("click", drawCard);

function drawCard() {
  let selectedCard;

  if (cardDeck.length === 0) {
    if (drawnCards.length === 0) {
    
      return;
    }
    // Si se ha agotado el mazo, mostrar la primera carta que se sacó
    selectedCard = drawnCards.shift();
  } else {
    // Extraer una carta normalmente del mazo
    const randomIndex = Math.floor(Math.random() * cardDeck.length);
    selectedCard = cardDeck[randomIndex];

    // Eliminar la carta seleccionada del mazo
    cardDeck.splice(randomIndex, 1);
  }

  // Agregar la carta al conjunto de cartas extraídas
  drawnCards.push(selectedCard);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = `<img src="img/${selectedCard.image}" alt="card" loading="lazy">`;

  cardsDrawn++;
}
