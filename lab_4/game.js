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
    document.getElementById('gameArea').style.display = 'block';

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

    // Повертаємося до стартового меню
    document.getElementById('difficulty').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
}

function spawnSquare() {
    // Якщо гра не запущена
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

    // Таймер для програшу
    squareTimeout = setTimeout(() => {
        endGame(); // Гравець програє, якщо не встиг натиснути на квадрат
    }, getSquareTimeout());

    currentSquare = square; // Зберігаємо поточний квадрат
}

function getSquareTimeout() {
    switch (difficulty) {
        case 'easy':
            return 5000; // 5 секунд
        case 'normal':
            return 3000; // 3 секунди
        case 'hard':
            return 1000; // 1 секунда
        default:
            return 3000;
    }
}
