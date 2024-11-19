let score = 0;
let squareTimeout;
let isGameRunning = false;
let squareSize = 50;
let difficulty = 'normal'; // За замовчуванням
let squareColor = 'red'; // За замовчуванням
let currentSquare = null; // Поточний квадрат
let lastPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Початкова позиція

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
    if (!isGameRunning) return;

    // Видалення попереднього квадрата
    if (currentSquare) {
        currentSquare.remove();
        currentSquare = null;
        clearTimeout(squareTimeout);
    }

    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = squareColor;

    // Генерація нової позиції на основі рівня складності
    const { x, y } = generateNewPosition();
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;

    // Додаємо квадрат на сторінку
    document.getElementById('gameArea').appendChild(square);

    // Клік на квадрат
    square.addEventListener('click', () => {
        score++;
        document.getElementById('score').textContent = `Бали: ${score}`;
        square.remove();
        currentSquare = null;
        clearTimeout(squareTimeout);
        spawnSquare();
    });

    // Таймер для видалення квадрата, якщо не було кліку
    squareTimeout = setTimeout(() => {
        if (currentSquare) {
            endGame(); // Завершення гри, якщо не встигли натиснути
        }
    }, getSquareTimeout());

    currentSquare = square; // Зберігаємо поточний квадрат
}

function generateNewPosition() {
    const maxX = window.innerWidth - squareSize;
    const maxY = window.innerHeight - squareSize;

    let newX, newY;
    const distanceRange = getDistanceRange();

    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        const distance = Math.sqrt(
            Math.pow(newX - lastPosition.x, 2) + Math.pow(newY - lastPosition.y, 2)
        );

        // Перевірка відстані залежно від складності
        if (
            (difficulty === 'easy' && distance <= distanceRange.max && distance >= distanceRange.min) ||
            (difficulty === 'normal' && distance >= distanceRange.min && distance <= distanceRange.max) ||
            (difficulty === 'hard' && distance >= distanceRange.min)
        ) {
            break;
        }
    } while (true);

    lastPosition = { x: newX, y: newY }; // Оновлюємо останню позицію
    return { x: newX, y: newY };
}

function getDistanceRange() {
    switch (difficulty) {
        case 'easy':
            return { min: 50, max: 150 }; // Квадрат з’являється неподалік
        case 'normal':
            return { min: 150, max: 300 }; // Середня відстань
        case 'hard':
            return { min: 300, max: Infinity }; // Квадрат з’являється далеко
        default:
            return { min: 150, max: 300 };
    }
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
