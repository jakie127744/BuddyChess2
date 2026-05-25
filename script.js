// Chess game logic using chess.js with selectable piece sets from Wikimedia Commons
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
        this.pieceSet = 'cburnett'; // Default piece set
        
        // Piece sets from Wikimedia Commons
        this.pieceSets = {
            'cburnett': {
                name: 'ChessBurnett',
                url: 'https://upload.wikimedia.org/wikipedia/commons/',
                pieces: {
                    'w': {
                        'p': '4/40/pawn.svg',
                        'n': 'f/f0/Knight.svg',
                        'b': 'b/b1/Bishop.svg',
                        'r': 'a/a0/Rook.svg',
                        'q': '4/47/Queen.svg',
                        'k': '4/42/King.svg'
                    },
                    'b': {
                        'p': 'c/c7/Pawn.svg',
                        'n': 'e/ef/Black_knight.svg',
                        'b': '9/98/Bishop.svg',
                        'r': 'f/ff/Rook.svg',
                        'q': '4/4b/Queen.svg',
                        'k': 'f/f0/King.svg'
                    }
                }
            },
            'merida': {
                name: 'Merida',
                url: 'https://upload.wikimedia.org/wikipedia/commons/',
                pieces: {
                    'w': {
                        'p': '9/92/Chess_plt45.svg',
                        'n': '7/70/Chess_nlt45.svg',
                        'b': 'b/b1/Chess_blt45.svg',
                        'r': '7/72/Chess_rlt45.svg',
                        'q': '4/47/Chess_qlt45.svg',
                        'k': '4/42/Chess_klt45.svg'
                    },
                    'b': {
                        'p': 'c/c7/Chess_pdt45.svg',
                        'n': 'e/ef/Chess_ndt45.svg',
                        'b': '9/98/Chess_bdt45.svg',
                        'r': 'f/ff/Chess_rdt45.svg',
                        'q': '4/4b/Chess_qdt45.svg',
                        'k': 'f/f0/Chess_kdt45.svg'
                    }
                }
            },
            'alpha': {
                name: 'Alpha',
                url: 'https://upload.wikimedia.org/wikipedia/commons/',
                pieces: {
                    'w': {
                        'p': '4/45/Chess_plt45_alpha.svg',
                        'n': '7/73/Chess_nlt45_alpha.svg',
                        'b': 'b/b4/Chess_blt45_alpha.svg',
                        'r': '7/74/Chess_rlt45_alpha.svg',
                        'q': '4/49/Chess_qlt45_alpha.svg',
                        'k': '4/44/Chess_klt45_alpha.svg'
                    },
                    'b': {
                        'p': 'c/c9/Chess_pdt45_alpha.svg',
                        'n': 'e/e9/Chess_ndt45_alpha.svg',
                        'b': '9/96/Chess_bdt45_alpha.svg',
                        'r': 'f/f9/Chess_rdt45_alpha.svg',
                        'q': '4/4d/Chess_qdt45_alpha.svg',
                        'k': 'f/f2/Chess_kdt45_alpha.svg'
                    }
                }
            },
            'neo': {
                name: 'Neo',
                url: 'https://upload.wikimedia.org/wikipedia/commons/',
                pieces: {
                    'w': {
                        'p': '1/10/Chess_plt45_neo.svg',
                        'n': '7/76/Chess_nlt45_neo.svg',
                        'b': 'b/b7/Chess_blt45_neo.svg',
                        'r': '7/78/Chess_rlt45_neo.svg',
                        'q': '4/4f/Chess_qlt45_neo.svg',
                        'k': '4/46/Chess_klt45_neo.svg'
                    },
                    'b': {
                        'p': 'c/c1/Chess_pdt45_neo.svg',
                        'n': 'e/e3/Chess_ndt45_neo.svg',
                        'b': '9/9a/Chess_bdt45_neo.svg',
                        'r': 'f/f1/Chess_rdt45_neo.svg',
                        'q': '4/41/Chess_qdt45_neo.svg',
                        'k': 'f/f4/Chess_kdt45_neo.svg'
                    }
                }
            }
        };
    }
    
    getPieceSvg(color, type) {
        const set = this.pieceSets[this.pieceSet];
        const piecePath = set.pieces[color][type];
        return `<img src="${set.url}${piecePath}" alt="${color}${type}" class="piece-image" draggable="false">`;
    }

    init() {
        this.renderBoard();
        this.updateStatus();
        this.setupEventListeners();
        this.populatePieceSelector();
    }

    populatePieceSelector() {
        const selector = document.getElementById('piece-set-selector');
        for (const [key, value] of Object.entries(this.pieceSets)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = value.name;
            if (key === this.pieceSet) {
                option.selected = true;
            }
            selector.appendChild(option);
        }
    }

    setupEventListeners() {
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('flip-board').addEventListener('click', () => this.flipBoard());
        document.getElementById('undo-move').addEventListener('click', () => this.undoMove());
        document.getElementById('piece-set-selector').addEventListener('change', (e) => {
            this.pieceSet = e.target.value;
            this.renderBoard();
        });
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
                    square.innerHTML = this.getPieceSvg(piece.color, piece.type);
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
            `<span>${this.getPieceSvg('w', p)}</span>`
        ).join('');

        this.blackCapturedElement.innerHTML = capturedBlack.map(p => 
            `<span>${this.getPieceSvg('b', p)}</span>`
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
