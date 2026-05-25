// Chess game logic using chess.js
class ChessGame {
    constructor() {
        this.game = new Chess();
        this.boardElement = document.getElementById('chessboard');
        this.statusElement = document.getElementById('status');
        this.movesElement = document.getElementById('moves');
        this.whiteCapturedElement = document.getElementById('white-captured');
        this.blackCapturedElement = document.getElementById('black-captured');
        this.selectedSquare = null;
        this.validMoves = [];
        this.isFlipped = false;
        this.lastMove = null;

        this.pieces = {
            'w': {
                'p': '<svg viewBox="0 0 45 45" class="piece"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>',
                'n': '<svg viewBox="0 0 45 45" class="piece"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/><path d="M24 18c.38 2.32-4.68 1.97-5 0 .38-2.32 4.68-1.97 5 0z" fill="#000"/><path d="M9.5 25.5A4.5 4.5 0 1 1 18.5 25.5 4.5 4.5 0 1 1 9.5 25.5z" fill="#fff" stroke="#000" stroke-width="1.5"/><path d="M15 15.5c-1.67 2.97-5.5 4.5-9 4.5" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>',
                'b': '<svg viewBox="0 0 45 45" class="piece"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45V30H9v6zm0 0c0 1.66 1.34 3 3 3h21c1.66 0 3-1.34 3-3v-2.25c-3.75-1.5-11.25-1.5-15 0V36zM22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g></svg>',
                'r': '<svg viewBox="0 0 45 45" class="piece"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5c0 2.76-2.24 5-5 5h-7c-2.76 0-5-2.24-5-5V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke-linejoin="miter"/></g></svg>',
                'q': '<svg viewBox="0 0 45 45" class="piece"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 3 4.5s5.5-2 11-2 11 2 11 2 2-2 3-4.5c1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g></svg>',
                'k': '<svg viewBox="0 0 45 45" class="piece"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" stroke-linecap="butt"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-4-1v-3h-5v3s-1 1-4 1-4-3-8-2c-3 6 6 10.5 6 10.5v7z" fill="#fff"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none"/></g></svg>'
            },
            'b': {
                'p': '<svg viewBox="0 0 45 45" class="piece"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>',
                'n': '<svg viewBox="0 0 45 45" class="piece"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/><path d="M24 18c.38 2.32-4.68 1.97-5 0 .38-2.32 4.68-1.97 5 0z" fill="#fff"/><path d="M9.5 25.5A4.5 4.5 0 1 1 18.5 25.5 4.5 4.5 0 1 1 9.5 25.5z" stroke="#000" stroke-width="1.5"/><path d="M15 15.5c-1.67 2.97-5.5 4.5-9 4.5" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>',
                'b': '<svg viewBox="0 0 45 45" class="piece"><g stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45V30H9v6zm0 0c0 1.66 1.34 3 3 3h21c1.66 0 3-1.34 3-3v-2.25c-3.75-1.5-11.25-1.5-15 0V36zM22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g></svg>',
                'r': '<svg viewBox="0 0 45 45" class="piece"><g stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5c0 2.76-2.24 5-5 5h-7c-2.76 0-5-2.24-5-5V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke-linejoin="miter"/></g></svg>',
                'q': '<svg viewBox="0 0 45 45" class="piece"><g stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 3 4.5s5.5-2 11-2 11 2 11 2 2-2 3-4.5c1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g></svg>',
                'k': '<svg viewBox="0 0 45 45" class="piece"><g stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" stroke-linecap="butt"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-4-1v-3h-5v3s-1 1-4 1-4-3-8-2c-3 6 6 10.5 6 10.5v7z" stroke-linecap="butt"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none"/></g></svg>'
            }
        };
    }

    init() {
        this.renderBoard();
        this.updateStatus();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('flip-board').addEventListener('click', () => this.flipBoard());
        document.getElementById('undo-move').addEventListener('click', () => this.undoMove());
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        const board = this.game.board();

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const actualRow = this.isFlipped ? 7 - row : row;
                const actualCol = this.isFlipped ? 7 - col : col;

                const square = document.createElement('div');
                const isLight = (actualRow + actualCol) % 2 === 0;
                square.className = `square ${isLight ? 'light' : 'dark'}`;
                square.dataset.row = actualRow;
                square.dataset.col = actualCol;

                const piece = board[actualRow][actualCol];
                if (piece) {
                    const pieceSvg = this.pieces[piece.color][piece.type];
                    square.innerHTML = pieceSvg;
                }

                // Highlight selected square
                if (this.selectedSquare && 
                    this.selectedSquare.row === actualRow && 
                    this.selectedSquare.col === actualCol) {
                    square.classList.add('selected');
                }

                // Highlight valid moves
                const validMove = this.validMoves.find(m => 
                    m.to === this.squareToCoords(actualRow, actualCol)
                );
                if (validMove) {
                    if (board[actualRow][actualCol]) {
                        square.classList.add('valid-capture');
                    } else {
                        square.classList.add('valid-move');
                    }
                }

                // Highlight last move
                if (this.lastMove) {
                    const lastFrom = this.coordsToSquare(this.lastMove.from);
                    const lastTo = this.coordsToSquare(this.lastMove.to);
                    const currentSquare = this.squareToCoords(actualRow, actualCol);
                    if (currentSquare === lastFrom || currentSquare === lastTo) {
                        square.classList.add('last-move');
                    }
                }

                // Highlight king in check
                if (piece && piece.type === 'k' && this.game.in_check()) {
                    const turn = this.game.turn();
                    if (piece.color === turn) {
                        square.classList.add('check');
                    }
                }

                square.addEventListener('click', () => this.handleSquareClick(actualRow, actualCol));
                this.boardElement.appendChild(square);
            }
        }

        this.updateCapturedPieces();
    }

    handleSquareClick(row, col) {
        const square = this.squareToCoords(row, col);

        if (this.selectedSquare) {
            const move = {
                from: this.squareToCoords(this.selectedSquare.row, this.selectedSquare.col),
                to: square,
                promotion: 'q'
            };

            try {
                const result = this.game.move(move);
                if (result) {
                    this.lastMove = result;
                    this.selectedSquare = null;
                    this.validMoves = [];
                    this.renderBoard();
                    this.updateStatus();
                    this.updateMoveHistory();
                    return;
                }
            } catch (e) {
                // Invalid move
            }

            // If clicking on same square or invalid move, deselect
            if (this.selectedSquare.row === row && this.selectedSquare.col === col) {
                this.selectedSquare = null;
                this.validMoves = [];
            } else {
                // Try to select a different piece
                const piece = this.game.board()[row][col];
                if (piece && piece.color === this.game.turn()) {
                    this.selectedSquare = { row, col };
                    this.validMoves = this.game.moves({ square: square, verbose: true });
                } else {
                    this.selectedSquare = null;
                    this.validMoves = [];
                }
            }
        } else {
            // Select a piece
            const piece = this.game.board()[row][col];
            if (piece && piece.color === this.game.turn()) {
                this.selectedSquare = { row, col };
                this.validMoves = this.game.moves({ square: square, verbose: true });
            }
        }

        this.renderBoard();
    }

    squareToCoords(row, col) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return files[col] + (8 - row);
    }

    coordsToSquare(coords) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const file = coords.charCodeAt(0) - 97;
        const rank = 8 - parseInt(coords[1]);
        return { row: rank, col: file };
    }

    updateStatus() {
        let status = '';
        const turn = this.game.turn() === 'w' ? "White" : "Black";

        if (this.game.in_checkmate()) {
            status = `Checkmate! ${turn === 'White' ? 'Black' : 'White'} wins!`;
        } else if (this.game.in_draw()) {
            status = 'Draw!';
        } else {
            status = `${turn}'s turn`;
            if (this.game.in_check()) {
                status += ' - Check!';
            }
        }

        this.statusElement.textContent = status;
    }

    updateMoveHistory() {
        const history = this.game.history();
        this.movesElement.innerHTML = '';

        for (let i = 0; i < history.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            const whiteMove = history[i];
            const blackMove = history[i + 1];

            const moveDiv = document.createElement('div');
            moveDiv.className = 'move-item';
            moveDiv.textContent = `${moveNum}. ${whiteMove} ${blackMove || ''}`;
            this.movesElement.appendChild(moveDiv);
        }

        this.movesElement.scrollTop = this.movesElement.scrollHeight;
    }

    updateCapturedPieces() {
        const board = this.game.board();
        const capturedWhite = [];
        const capturedBlack = [];

        // Count pieces on board
        const pieceCounts = {
            'w': { 'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0, 'k': 0 },
            'b': { 'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0, 'k': 0 }
        };

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    pieceCounts[piece.color][piece.type]++;
                }
            }
        }

        // Calculate captured pieces (starting - current = captured)
        const startingPieces = { 'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1, 'k': 1 };

        for (let type of ['p', 'n', 'b', 'r', 'q']) {
            const whiteMissing = startingPieces[type] - pieceCounts['w'][type];
            const blackMissing = startingPieces[type] - pieceCounts['b'][type];

            for (let i = 0; i < whiteMissing; i++) {
                capturedBlack.push(type);
            }
            for (let i = 0; i < blackMissing; i++) {
                capturedWhite.push(type);
            }
        }

        this.whiteCapturedElement.innerHTML = capturedWhite.map(p => 
            `<span>${this.pieces['w'][p]}</span>`
        ).join('');

        this.blackCapturedElement.innerHTML = capturedBlack.map(p => 
            `<span>${this.pieces['b'][p]}</span>`
        ).join('');
    }

    newGame() {
        this.game.reset();
        this.selectedSquare = null;
        this.validMoves = [];
        this.lastMove = null;
        this.renderBoard();
        this.updateStatus();
        this.movesElement.innerHTML = '';
    }

    flipBoard() {
        this.isFlipped = !this.isFlipped;
        this.renderBoard();
    }

    undoMove() {
        this.game.undo();
        this.selectedSquare = null;
        this.validMoves = [];
        this.lastMove = this.game.history().length > 0 ? 
            { from: '', to: '' } : null;
        this.renderBoard();
        this.updateStatus();
        this.updateMoveHistory();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chessGame = new ChessGame();
    chessGame.init();
});
