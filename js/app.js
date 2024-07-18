// categories arrays
const animals = [
    "lion", "elephant", "giraffe", "zebra", "tiger", 
    "monkey", "kangaroo", "penguin", "koala", "crocodile"
];

const foods = [
    "pizza", "hamburger", "spaghetti", "sushi", "pancake", 
    "salad", "sandwich", "ice cream", "cake", "steak"
];

let chosenWord = '';
let wrongGuesses = 0;

// Function to select a random word from an array
function getRandomWord(categoryArray) {
    const randomIndex = Math.floor(Math.random() * categoryArray.length);
    return categoryArray[randomIndex];
}

// Function to display underscores for the chosen word
function displayUnderscores(word) {
    const wordDisplay = document.getElementById('wordDisplay');
    wordDisplay.innerHTML = ''; // Clear previous content
    for (let i = 0; i < word.length; i++) {
        const underscore = document.createElement('span');
        underscore.textContent = '_ ';
        underscore.id = 'letter-' + i;
        wordDisplay.appendChild(underscore);
    }
}

// Function to draw the hangman
function drawHangman(part) {
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    switch(part) {
        case 1: // Head
            context.beginPath();
            context.arc(100, 40, 10, 0, Math.PI * 2, true);
            context.stroke();
            break;
        case 2: // Body
            context.moveTo(100, 50);
            context.lineTo(100, 90);
            context.stroke();
            break;
        case 3: // Left arm
            context.moveTo(100, 60);
            context.lineTo(80, 75);
            context.stroke();
            break;
        case 4: // Right arm
            context.moveTo(100, 60);
            context.lineTo(120, 75);
            context.stroke();
            break;
        case 5: // Left leg
            context.moveTo(100, 90);
            context.lineTo(85, 110);
            context.stroke();
            break;
        case 6: // Right leg
            context.moveTo(100, 90);
            context.lineTo(115, 110);
            context.stroke();
            break;
    }
}

// Function to handle letter button clicks
function handleLetterClick(event) {
    const letter = event.target.innerText.toLowerCase();
    let letterFound = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            document.getElementById('letter-' + i).textContent = letter.toUpperCase() + ' ';
            letterFound = true;
        }
    }

    if (!letterFound) {
        event.target.disabled = true;
        event.target.style.backgroundColor = 'gray';
        wrongGuesses++;
        drawHangman(wrongGuesses);
    } else {
        event.target.style.backgroundColor = 'green';
    }

    if (wrongGuesses >= 6) {
        alert('Game over!');
        // Optionally, reset the game or disable all buttons
    }
}

// Function to handle category button clicks and log the chosen word
function handleCategorySelection(event) {
    let selectedCategory = [];
    if (event.target.id === 'animals') {
        selectedCategory = animals;
    } else if (event.target.id === 'foods') {
        selectedCategory = foods;
    }

    chosenWord = getRandomWord(selectedCategory);
    console.log(`Chosen word: ${chosenWord}`);
    document.getElementById('catrgory').innerText = `Chosen word: ${chosenWord}`;

    // Display underscores for the chosen word
    displayUnderscores(chosenWord);

    // Enable all letter buttons and reset their style
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });

    // Reset wrong guesses and clear the canvas
    wrongGuesses = 0;
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Adding event listeners to category buttons
document.getElementById('animals').addEventListener('click', handleCategorySelection);
document.getElementById('foods').addEventListener('click', handleCategorySelection);

// Adding event listeners to letter buttons
const letterButtons = document.querySelectorAll('.letter');
letterButtons.forEach(button => {
    button.addEventListener('click', handleLetterClick);
});
