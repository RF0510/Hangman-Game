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

function getRandomWord(categoryArray) {
    const randomIndex = Math.floor(Math.random() * categoryArray.length);
    return categoryArray[randomIndex];
}

function displayUnderscores(word) {
    const wordDisplay = document.getElementById('wordDisplay');
    wordDisplay.innerHTML = ''; 
    for (let i = 0; i < word.length; i++) {
        const underscore = document.createElement('span');
        underscore.textContent = '_ ';
        underscore.id = 'letter-' + i;
        wordDisplay.appendChild(underscore);
    }
}

function drawStand() {
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    
    const yOffset = -20; 

    context.moveTo(40, 180 + yOffset);
    context.lineTo(200, 180 + yOffset);
    context.stroke();

    context.moveTo(80, 180 + yOffset);
    context.lineTo(80, 20 + yOffset);
    context.stroke();

    context.moveTo(80, 20 + yOffset);
    context.lineTo(160, 20 + yOffset);
    context.stroke();

    context.moveTo(160, 20 + yOffset);
    context.lineTo(160, 40 + yOffset);
    context.stroke();
}

function drawHangman(part) {
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    const yOffset = -20; 

    switch (part) {
        case 1: 
            context.beginPath();
            context.arc(160, 50 + yOffset, 10, 0, Math.PI * 2, true);
            context.stroke();
            break;
        case 2: 
            context.moveTo(160, 60 + yOffset);
            context.lineTo(160, 100 + yOffset);
            context.stroke();
            break;
        case 3:
            context.moveTo(160, 70 + yOffset);
            context.lineTo(140, 85 + yOffset);
            context.stroke();
            break;
        case 4: 
            context.moveTo(160, 70 + yOffset);
            context.lineTo(180, 85 + yOffset);
            context.stroke();
            break;
        case 5: 
            context.moveTo(160, 100 + yOffset);
            context.lineTo(145, 130 + yOffset);
            context.stroke();
            break;
        case 6: 
            context.moveTo(160, 100 + yOffset);
            context.lineTo(175, 130 + yOffset);
            context.stroke();
            break;
    }
}


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

    if (checkWin()) {
        displayConfetti();
        document.getElementById('wordDisplay').innerText = `You Win! The word was: ${chosenWord}`;
        document.getElementById('resetButton').style.display = 'block';
        disableAllButtons();
    } else if (wrongGuesses >= 6) {
        document.getElementById('wordDisplay').innerText = `You Lose! The word was: ${chosenWord}`;
        document.getElementById('resetButton').style.display = 'block';
        disableAllButtons();
    }
}


function handleCategorySelection(event) {
    let selectedCategory = [];
    if (event.target.id === 'animals') {
        selectedCategory = animals;
    } else if (event.target.id === 'foods') {
        selectedCategory = foods;
    }

    chosenWord = getRandomWord(selectedCategory);
    displayUnderscores(chosenWord);


    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });

    document.getElementById('resetButton').style.display = 'none'; 
}


function checkWin() {
    for (let i = 0; i < chosenWord.length; i++) {
        if (document.getElementById('letter-' + i).textContent.trim() === '_') {
            return false;
        }
    }
    return true;
}


function displayConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confettiContainer';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}


function disableAllButtons() {
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = true;
    });
}


function resetGame() {
    location.reload();
}

document.getElementById('animals').addEventListener('click', handleCategorySelection);
document.getElementById('foods').addEventListener('click', handleCategorySelection);

const letterButtons = document.querySelectorAll('.letter');
letterButtons.forEach(button => {
    button.addEventListener('click', handleLetterClick);
});

document.getElementById('resetButton').addEventListener('click', resetGame);


drawStand();
