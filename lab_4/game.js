let score = 0;
let gameInterval;
let squareTimeout;
let gameTime = 30; // Час гри в секундах
let isGameRunning = false;
let squareSize = 50;
let difficulty = 'normal'; // Default
let squareColor = 'red'; // Default
let currentSquare = null; // Змінна для зберігання поточного квадрата

// Вибір складності та кольору
document.getElementById('difficultySelect').addEventListener('change', (e) => {
    difficulty = e.target.value;
    adjustSquareSize();
});
document.getElementById('colorSelect').addEventListener('change', (e) => {
    squareColor = e.target.value;
});

function adjustSquareSize() {
    switch (difficulty) {
        case 'easy':
            squareSize = 70; // Більший квадрат
            break;
        case 'normal':
            squareSize = 50;
            break;
        case 'hard':
            squareSize = 30; // Менший квадрат
            break;
        default:
            squareSize = 50;
    }
}

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

    adjustSquareSize();
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

    // Очистити всі активні таймери та квадрати
    clearTimeout(squareTimeout);
    if (currentSquare) {
        currentSquare.remove();
        currentSquare = null;
    }

    document.getElementById('difficulty').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
}

function spawnSquare() {
    // Якщо гра не запущена або квадрат вже існує
    if (!isGameRunning) return;

    // Якщо існує попередній квадрат, видаляємо його
    if (currentSquare) {
        currentSquare.remove();
        currentSquare = null;
        clearTimeout(squareTimeout);
    }

    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = squareColor;
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

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
        clearTimeout(squareTimeout); // Зупиняємо таймер видалення
        spawnSquare(); // Спаунимо новий квадрат
    });

    // Таймер для видалення квадрата, якщо не було кліку
    squareTimeout = setTimeout(() => {
        if (currentSquare) {
            currentSquare.remove();
            currentSquare = null;
            endGame(); // Завершити гру, якщо користувач не встиг
        }
    }, getSquareTimeout());

    currentSquare = square; // Зберігаємо поточний квадрат
}

function getSquareTimeout() {
    switch (difficulty) {
        case 'easy':
            return 5000; // 5 секунд на квадрат
        case 'normal':
            return 2500; // 2.5 секунди на квадрат
        case 'hard':
            return 1000; // 1 секунда на квадрат
        default:
            return 2000;
    }
}
