// JavaScript Logic for Tic Tac Toe Game

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // প্রথমে X দিয়ে খেলা শুরু হবে
let board = Array(9).fill(''); // বোর্ড খালি থাকবে
let gameActive = true; // গেমটি চালু থাকবে কিনা

// জেতার সম্ভাব্য সব কন্ডিশন
const winConditions = [
    [0, 1, 2], // প্রথম সারি
    [3, 4, 5], // দ্বিতীয় সারি
    [6, 7, 8], // তৃতীয় সারি
    [0, 3, 6], // প্রথম কলাম
    [1, 4, 7], // দ্বিতীয় কলাম
    [2, 5, 8], // তৃতীয় কলাম
    [0, 4, 8], // ডায়াগোনাল (বাম থেকে ডান)
    [2, 4, 6]  // ডায়াগোনাল (ডান থেকে বাম)
];

// সেল ক্লিক ইভেন্ট
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// সেল ক্লিক হ্যান্ডলিং
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    // যদি সেলে ইতোমধ্যে X বা O থাকে বা গেম শেষ হয়ে যায়
    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    // চলমান প্লেয়ারকে সেলে বসান
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // জেতার কন্ডিশন চেক করুন
    checkWinner();

    // প্লেয়ার পরিবর্তন করুন
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// জেতার কন্ডিশন চেক করা
function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    // ড্র চেক করুন
    if (!board.includes('')) {
        gameActive = false;
        message.textContent = "It's a draw!";
    }
}

// রিসেট গেম ফাংশন
resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = Array(9).fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}
