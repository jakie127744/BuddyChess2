// Chess game with Stockfish integration
class ChessGame {
    constructor() {
        this.game = new Chess();
        this.boardElement = document.getElementById('chessboard');
        this.statusText = document.getElementById('status-text');
        this.moveListElement = document.getElementById('move-list');
        this.capturedWhiteElement = document.getElementById('captured-white');
        this.capturedBlackElement = document.getElementById('captured-black');
        this.pieceSetSelector = document.getElementById('piece-set-selector');
        this.evalBarFill = document.getElementById('eval-bar-fill');
        this.evalText = document.getElementById('eval-text');
        
        this.selectedSquare = null;
        this.flipped = false;
        this.stockfish = null;
        this.evaluation = 0;
        
        // Piece sets from Wikimedia Commons
        this.pieceSets = {
            burnett: {
                p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
                n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
                b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
                r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
                q: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Chess_qdt45.svg',
                k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
                P: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
                N: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
                B: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
                R: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
                Q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
                K: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
            },
            merida: {
                p: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Chess_pdt45_merida.svg',
                n: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Chess_ndt45_merida.svg',
                b: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Chess_bdt45_merida.svg',
                r: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_rdt45_merida.svg',
                q: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Chess_qdt45_merida.svg',
                k: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Chess_kdt45_merida.svg',
                P: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_plt45_merida.svg',
                N: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Chess_nlt45_merida.svg',
                B: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Chess_blt45_merida.svg',
                R: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Chess_rlt45_merida.svg',
                Q: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Chess_qlt45_merida.svg',
                K: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Chess_klt45_merida.svg'
            },
            alpha: {
                p: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Chess_pdt45_alpha.svg',
                n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45_alpha.svg',
                b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45_alpha.svg',
                r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45_alpha.svg',
                q: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Chess_qdt45_alpha.svg',
                k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45_alpha.svg',
                P: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45_alpha.svg',
                N: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45_alpha.svg',
                B: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45_alpha.svg',
                R: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45_alpha.svg',
                Q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45_alpha.svg',
                K: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45_alpha.svg'
            },
            neo: {
                p: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Chess_pdt45_neo.svg',
                n: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Chess_ndt45_neo.svg',
                b: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Chess_bdt45_neo.svg',
                r: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chess_rdt45_neo.svg',
                q: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Chess_qdt45_neo.svg',
                k: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Chess_kdt45_neo.svg',
                P: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Chess_plt45_neo.svg',
                N: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_nlt45_neo.svg',
                B: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Chess_blt45_neo.svg',
                R: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Chess_rlt45_neo.svg',
                Q: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Chess_qlt45_neo.svg',
                K: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Chess_klt45_neo.svg'
            }
        };
        
        this.initStockfish();
        this.setupEventListeners();
        this.renderBoard();
        this.updateStatus();
    }
    
    async initStockfish() {
        try {
            // Use Stockfish.js from CDN - it uses Web Workers (COI not needed for this approach)
            const stockfishUrl = 'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.0/stockfish.js';
            
            // Create a blob URL for the worker to avoid COOP issues
            const response = await fetch(stockfishUrl);
            const scriptContent = await response.text();
            const blob = new Blob([scriptContent], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);
            
            this.stockfish = new Worker(workerUrl);
            
            this.stockfish.onmessage = (event) => {
                const message = event.data;
                
                // Parse evaluation from "info depth X score cp Y" or "score mate Z"
                if (message.startsWith('info') && message.includes('score')) {
                    const scoreMatch = message.match(/score (cp|mate) (-?\d+)/);
                    if (scoreMatch) {
                        const [, type, value] = scoreMatch;
                        let evalValue = parseFloat(value);
                        
                        if (type === 'mate') {
                            // Mate in X moves - convert to large number
                            evalValue = value > 0 ? 10000 - Math.abs(parseInt(value)) : -10000 + Math.abs(parseInt(value));
                        }
                        
                        // Adjust for black's perspective
                        if (this.game.turn() === 'b') {
                            evalValue = -evalValue;
                        }
                        
                        this.evaluation = evalValue;
                        this.updateEvalBar();
                    }
                }
            };
            
            // Initialize Stockfish
            this.stockfish.postMessage('uci');
            this.stockfish.postMessage('isready');
            
            // Start analysis after a short delay
            setTimeout(() => this.analyzePosition(), 1000);
            
        } catch (error) {
            console.error('Failed to initialize Stockfish:', error);
            this.evalText.textContent = 'N/A';
        }
    }
    
    analyzePosition() {
        if (!this.stockfish || this.game.game_over()) return;
        
        // Stop previous analysis
        this.stockfish.postMessage('stop');
        
        // Set position and start analysis
        this.stockfish.postMessage(`position fen ${this.game.fen()}`);
        this.stockfish.postMessage('go depth 15');
    }
    
    updateEvalBar() {
        // Convert centipawns to pawn units for display
        const evalInPawns = this.evaluation / 100;
        
        // Clamp evaluation for display (-10 to +10)
        const clampedEval = Math.max(-10, Math.min(10, evalInPawns));
        
        // Convert to percentage (0-100%)
        // Positive = white advantage (more green), Negative = black advantage (less green)
        const percentage = ((clampedEval + 10) / 20) * 100;
        
        this.evalBarFill.style.height = `${percentage}%`;
        
        // Update text display
        const sign = evalInPawns >= 0 ? '+' : '';
        this.evalText.textContent = sign + evalInPawns.toFixed(1);
        
        // Color coding
        if (evalInPawns > 2) {
            this.evalBarFill.style.background = 'linear-gradient(to top, #2E7D32, #66BB6A)';
        } else if (evalInPawns < -2) {
            this.evalBarFill.style.background = 'linear-gradient(to top, #424242, #757575)';
        } else {
            this.evalBarFill.style.background = 'linear-gradient(to top, #4CAF50, #8BC34A)';
        }
    }
    
    setupEventListeners() {
        this.pieceSetSelector.addEventListener('change', () => {
            this.renderBoard();
        });
        
        document.getElementById('flip-board').addEventListener('click', () => {
            this.flipped = !this.flipped;
            this.renderBoard();
        });
        
        document.getElementById('undo-move').addEventListener('click', () => {
            this.game.undo();
            this.renderBoard();
            this.updateStatus();
            this.updateMoveList();
            this.updateCapturedPieces();
            setTimeout(() => this.analyzePosition(), 500);
        });
        
        document.getElementById('new-game').addEventListener('click', () => {
            this.game.reset();
            this.evaluation = 0;
            this.updateEvalBar();
            this.renderBoard();
            this.updateStatus();
            this.updateMoveList();
            this.updateCapturedPieces();
            setTimeout(() => this.analyzePosition(), 500);
        });
    }
    
    getPieceSet() {
        return this.pieceSets[this.pieceSetSelector.value];
    }
    
    renderBoard() {
        this.boardElement.innerHTML = '';
        const pieceSet = this.getPieceSet();
        const board = this.game.board();
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const actualRow = this.flipped ? 7 - row : row;
                const actualCol = this.flipped ? 7 - col : col;
                
                const square = document.createElement('div');
                const isLight = (actualRow + actualCol) % 2 === 0;
                square.className = `square ${isLight ? 'light' : 'dark'}`;
                square.dataset.square = String.fromCharCode(97 + actualCol) + (8 - actualRow);
                
                const piece = board[actualRow][actualCol];
                if (piece) {
                    const pieceDiv = document.createElement('div');
                    pieceDiv.className = 'piece';
                    const pieceKey = piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
                    pieceDiv.style.backgroundImage = `url(${pieceSet[pieceKey]})`;
                    square.appendChild(pieceDiv);
                }
                
                square.addEventListener('click', () => this.handleSquareClick(square.dataset.square));
                this.boardElement.appendChild(square);
            }
        }
        
        this.highlightLastMove();
        this.highlightCheck();
    }
    
    handleSquareClick(square) {
        if (this.game.game_over()) return;
        
        if (this.selectedSquare === null) {
            const piece = this.game.get(square);
            if (piece && piece.color === this.game.turn()) {
                this.selectedSquare = square;
                this.highlightLegalMoves(square);
            }
        } else {
            const move = this.game.move({
                from: this.selectedSquare,
                to: square,
                promotion: 'q'
            });
            
            if (move) {
                this.renderBoard();
                this.updateStatus();
                this.updateMoveList();
                this.updateCapturedPieces();
                setTimeout(() => this.analyzePosition(), 500);
            }
            
            this.clearHighlights();
            this.selectedSquare = null;
        }
    }
    
    highlightLegalMoves(square) {
        this.clearHighlights();
        const moves = this.game.moves({ square, verbose: true });
        
        moves.forEach(move => {
            const squareEl = document.querySelector(`[data-square="${move.to}"]`);
            if (squareEl) {
                squareEl.classList.add('highlighted');
            }
        });
        
        const selectedEl = document.querySelector(`[data-square="${square}"]`);
        if (selectedEl) {
            selectedEl.style.backgroundColor = 'rgba(100, 200, 100, 0.5)';
        }
    }
    
    highlightLastMove() {
        const history = this.game.history({ verbose: true });
        if (history.length > 0) {
            const lastMove = history[history.length - 1];
            const fromEl = document.querySelector(`[data-square="${lastMove.from}"]`);
            const toEl = document.querySelector(`[data-square="${lastMove.to}"]`);
            
            if (fromEl) fromEl.classList.add('last-move');
            if (toEl) toEl.classList.add('last-move');
        }
    }
    
    highlightCheck() {
        if (this.game.in_check()) {
            const board = this.game.board();
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const piece = board[row][col];
                    if (piece && piece.type === 'k' && piece.color === this.game.turn()) {
                        const square = String.fromCharCode(97 + col) + (8 - row);
                        const squareEl = document.querySelector(`[data-square="${square}"]`);
                        if (squareEl) {
                            squareEl.classList.add('check');
                        }
                    }
                }
            }
        }
    }
    
    clearHighlights() {
        document.querySelectorAll('.highlighted, .last-move, .check').forEach(el => {
            el.classList.remove('highlighted', 'last-move', 'check');
            el.style.backgroundColor = '';
        });
    }
    
    updateStatus() {
        let status = '';
        
        if (this.game.in_checkmate()) {
            status = `Checkmate! ${this.game.turn() === 'w' ? 'Black' : 'White'} wins!`;
        } else if (this.game.in_draw()) {
            status = 'Draw!';
        } else {
            status = `${this.game.turn() === 'w' ? 'White' : 'Black'} to move`;
            if (this.game.in_check()) {
                status += ' (Check!)';
            }
        }
        
        this.statusText.textContent = status;
    }
    
    updateMoveList() {
        const history = this.game.history();
        this.moveListElement.innerHTML = '';
        
        for (let i = 0; i < history.length; i += 2) {
            const moveRow = document.createElement('div');
            moveRow.className = 'move-row';
            
            const moveNumber = document.createElement('span');
            moveNumber.className = 'move-number';
            moveNumber.textContent = `${Math.floor(i / 2) + 1}.`;
            
            const moveWhite = document.createElement('span');
            moveWhite.className = 'move-white';
            moveWhite.textContent = history[i];
            
            const moveBlack = document.createElement('span');
            moveBlack.className = 'move-black';
            moveBlack.textContent = history[i + 1] || '';
            
            moveRow.appendChild(moveNumber);
            moveRow.appendChild(moveWhite);
            moveRow.appendChild(moveBlack);
            this.moveListElement.appendChild(moveRow);
        }
        
        this.moveListElement.scrollTop = this.moveListElement.scrollHeight;
    }
    
    updateCapturedPieces() {
        const capturedWhite = [];
        const capturedBlack = [];
        const pieceSet = this.getPieceSet();
        
        // Count material difference from initial position
        const initialMaterial = {
            'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1
        };
        
        const currentMaterial = { w: {}, b: {} };
        const board = this.game.board();
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    const key = piece.type;
                    if (!currentMaterial[piece.color][key]) {
                        currentMaterial[piece.color][key] = 0;
                    }
                    currentMaterial[piece.color][key]++;
                }
            }
        }
        
        // Calculate captured pieces
        ['p', 'n', 'b', 'r', 'q'].forEach(type => {
            const whiteCaptured = initialMaterial[type] - currentMaterial['w'][type];
            const blackCaptured = initialMaterial[type] - currentMaterial['b'][type];
            
            for (let i = 0; i < whiteCaptured; i++) {
                capturedWhite.push(type.toUpperCase());
            }
            for (let i = 0; i < blackCaptured; i++) {
                capturedBlack.push(type);
            }
        });
        
        this.capturedWhiteElement.innerHTML = '';
        capturedWhite.forEach(piece => {
            const pieceDiv = document.createElement('div');
            pieceDiv.className = 'captured-piece';
            pieceDiv.style.backgroundImage = `url(${pieceSet[piece]})`;
            this.capturedWhiteElement.appendChild(pieceDiv);
        });
        
        this.capturedBlackElement.innerHTML = '';
        capturedBlack.forEach(piece => {
            const pieceDiv = document.createElement('div');
            pieceDiv.className = 'captured-piece';
            pieceDiv.style.backgroundImage = `url(${pieceSet[piece]})`;
            this.capturedBlackElement.appendChild(pieceDiv);
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChessGame();
});
