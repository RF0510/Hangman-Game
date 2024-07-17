const animals = [
    "lion", "elephant", "giraffe", "zebra", "tiger", 
    "monkey", "kangaroo", "penguin", "koala", "crocodile"
];

const foods = [
    "pizza", "hamburger", "spaghetti", "sushi", "pancake", 
    "salad", "sandwich", "ice cream", "cake", "steak"
];

// Select the buttons
const animalsButton = document.getElementById('button2');
const foodsButton = document.getElementById('button3');

// Add click event listeners to the button

animalsButton.addEventListener('click', function() {
    // Redirect to a new page where the game starts with the Animals category
    startGame('animals');
});

foodsButton.addEventListener('click', function() {
    // Redirect to a new page where the game starts with the Foods category
    startGame('foods');
});

// Function to start the game based on category
function startGame(category) {
    // Store the category in localStorage to pass it to the new page
    localStorage.setItem('category', category);
    
    // Redirect to the game page where the hangman game events are handled
    window.location.href = 'hangman_game.html'; // Replace with your actual game page name
}
