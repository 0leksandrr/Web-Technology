let score = 0;
let gameInterval;
let squareTimeout;
let gameTime = 30; // час гри в секундах
let isGameRunning = false;
let squareSize = 50;
let difficulty = 'normal'; // Default
let squareColor = 'red'; // Default
let currentSquare = null; // Змінна для зберігання поточного квадрата

// Вибір складності та кольору
document.getElementById('difficultySelect').addEventListener('change', (e) => {
    difficulty = e.target.value;
});
document.getElementById('colorSelect').addEventListener('change', (e) => {
    squareColor = e.target.value;
});

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    score = 0;
    gameTime = 30;
    document.getElementById('score').textContent = `Бали: ${score}`;
    document.getElementById('timer').textContent = `Час: ${gameTime}`;

    // Приховуємо стартове меню
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';

    gameInterval = setInterval(updateGameTime, 1000);
    spawnSquare(); // Спаунимо перший квадрат
}

function updateGameTime() {
    if (gameTime <= 0) {
        clearInterval(gameInterval);
        endGame();
    } else {
        gameTime--;
        document.getElementById('timer').textContent = `Час: ${gameTime}`;
    }
}

function endGame() {
    alert(`Гра завершена! Ваш результат: ${score} балів`);
    isGameRunning = false;
    document.getElementById('difficulty').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
}

function spawnSquare() {
    if (!isGameRunning || currentSquare) return; // Якщо гра не запущена або квадрат вже є

    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = squareColor;

    // Встановлюємо випадкове місце на екрані
    const maxX = window.innerWidth - squareSize;
    const maxY = window.innerHeight - squareSize;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    square.style.left = `${randomX}px`;
    square.style.top = `${randomY}px`;

    // Додаємо квадрат на сторінку
    document.getElementById('gameArea').appendChild(square);

    // Клік на квадрат
    square.addEventListener('click', () => {
        score++;
        document.getElementById('score').textContent = `Бали: ${score}`;
        square.remove(); // Видаляємо квадрат
        currentSquare = null; // Очищаємо поточний квадрат
        spawnSquare(); // Спаунимо новий квадрат
    });

    // Таймер для видалення квадрата, якщо не було кліку
    squareTimeout = setTimeout(() => {
        square.remove(); // Видаляємо квадрат
        currentSquare = null; // Очищаємо поточний квадрат
        spawnSquare(); // Спаунимо новий квадрат
    }, getSquareTimeout());

    currentSquare = square; // Зберігаємо поточний квадрат
}

function getSquareTimeout() {
    switch (difficulty) {
        case 'easy':
            return 3000; // 3 секунди на квадрат
        case 'normal':
            return 2000; // 2 секунди на квадрат
        case 'hard':
            return 1000; // 1 секунда на квадрат
        default:
            return 2000;
    }
}
