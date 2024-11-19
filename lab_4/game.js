let score = 0;
let squareTimeout;
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
    document.getElementById('score').textContent = `Бали: ${score}`;

    // Приховуємо стартове меню
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('gameArea').style.display = 'flex';

    spawnSquare(); // Спаунимо перший квадрат
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

    document.getElementById('difficulty').style.display = 'flex';
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
            endGame(); // Якщо не встигли натиснути — завершуємо гру
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
            return 2500;
    }
}
