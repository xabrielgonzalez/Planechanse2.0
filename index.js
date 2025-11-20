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


// --- Lógica del Dado ---

const rollButton = document.getElementById('roll-button');
const diceCube = document.getElementById('dice-cube');

// Definir las rotaciones para cada cara del dado
const faceRotations = {
    1: 'rotateX(0deg) rotateY(0deg)',
    2: 'rotateY(-90deg) rotateY(0deg)', // Muestra la cara 2
    3: 'rotateX(-90deg) rotateY(0deg)', // Muestra la cara 3
    4: 'rotateX(90deg) rotateY(0deg)',  // Muestra la cara 4
    5: 'rotateY(90deg) rotateY(0deg)',  // Muestra la cara 5
    6: 'rotateY(180deg) rotateY(0deg)' // Muestra la cara 6
};

rollButton.addEventListener('click', () => {
    // 1. Generar un resultado aleatorio (1 a 6)
    const result = Math.floor(Math.random() * 6) + 1;
    
    // 2. Obtener la rotación base para el resultado
    let [baseX, baseY] = faceRotations[result]
        .match(/rotate[XY]\((\-?\d+)deg\)/g)
        .map(rot => parseInt(rot.match(/\-?\d+/)[0]));

    // 3. Añadir giros aleatorios completos para el efecto de rodaje
    // Aseguramos que el dado gire al menos 3 veces (1080 grados)
    const randomTurnsX = (Math.floor(Math.random() * 3) + 3) * 360; 
    const randomTurnsY = (Math.floor(Math.random() * 3) + 3) * 360;

    // 4. Combinar la rotación base con los giros aleatorios
    const finalRotationX = baseX + randomTurnsX;
    const finalRotationY = baseY + randomTurnsY;

    // 5. Aplicar la transformación para iniciar la animación
    diceCube.style.transform = `rotateX(${finalRotationX}deg) rotateY(${finalRotationY}deg)`;

    // Opcional: Mostrar el resultado después de que la animación termine (1.5s)
    setTimeout(() => {
        console.log(`El dado cayó en: ${result}`);
        // Aquí podrías actualizar un elemento en el HTML para mostrar el resultado
    }, 1500); 
});

// Nota: Aquí iría tu código existente para el botón de 'Sacar una carta'
// ...