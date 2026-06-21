(function () {
'use strict';

/* ============================================================
   CONSTANTS
============================================================ */
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Wikimedia Commons SVG chess pieces - reliable CDN links
const PIECE_SETS = {
  Burnett: {
    w: { k: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_klt45.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg' },
    b: { k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg' }
  },
  Merida: {
    w: { k: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Chess_klt_merida.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_qlt_merida.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_rlt_merida.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Chess_blt_merida.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Chess_nlt_merida.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Chess_plt_merida.svg' },
    b: { k: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Chess_kdt_merida.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_qdt_merida.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chess_rdt_merida.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_bdt_merida.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Chess_ndt_merida.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_pdt_merida.svg' }
  },
  Alpha: {
    w: { k: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt_alpha.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Chess_qlt_alpha.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Chess_rlt_alpha.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chess_blt_alpha.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Chess_nlt_alpha.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Chess_plt_alpha.svg' },
    b: { k: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Chess_kdt_alpha.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_qdt_alpha.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt_alpha.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Chess_bdt_alpha.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Chess_ndt_alpha.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt_alpha.svg' }
  },
  Neo: {
    w: { k: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chess_klt_neo.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Chess_qlt_neo.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Chess_rlt_neo.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Chess_blt_neo.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Chess_nlt_neo.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Chess_plt_neo.svg' },
    b: { k: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Chess_kdt_neo.svg', q: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_qdt_neo.svg', r: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt_neo.svg', b: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Chess_bdt_neo.svg', n: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Chess_ndt_neo.svg', p: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Chess_pdt_neo.svg' }
  }
};

let currentPieceSet = 'Burnett';

function getPieceUrl(color, type) {
  return PIECE_SETS[currentPieceSet][color][type] || PIECE_SETS['Burnett'][color][type];
}

const CLASS_INFO = {
  brilliant:  { label:'Brilliant',   color:'#1baca6', symbol:'!!', text:'#fff' },
  great:      { label:'Great Move',  color:'#5c8bb0', symbol:'!',  text:'#fff' },
  best:       { label:'Best Move',   color:'#3aab59', symbol:'✓',  text:'#fff' },
  excellent:  { label:'Excellent',   color:'#81b64c', symbol:'✓',  text:'#fff' },
  good:       { label:'Good',        color:'#8bab5c', symbol:'✓',  text:'#fff' },
  book:       { label:'Book',        color:'#a88865', symbol:'B',  text:'#fff' },
  inaccuracy: { label:'Inaccuracy',  color:'#f0c93d', symbol:'?!', text:'#1a1a1a' },
  mistake:    { label:'Mistake',     color:'#ffa15c', symbol:'?',  text:'#1a1a1a' },
  blunder:    { label:'Blunder',     color:'#fa4f4f', symbol:'??', text:'#fff' }
};
const CLASS_KEYS = ['brilliant','great','best','excellent','good','book','inaccuracy','mistake','blunder'];
const PIECE_VALUES = { p:1, n:3, b:3, r:5, q:9, k:0 };

// Embedded opening book — common theory lines (SAN tokens, no move numbers).
const OPENING_BOOK = [
"e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8",
"e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Nb8 d4 Nbd7",
"e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Ne2 Qxd1 Rxd1",
"e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5 Bb3 Bc5 c3 O-O d4 Bb6",
"e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 a6 O-O d6",
"e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 Nxe4 O-O Bxc3 d5",
"e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6 Be2 h6 Nf3 e4 Ne5",
"e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7",
"e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O",
"e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5",
"e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 e5 Qe7",
"e4 e5 Nc3 Nf6 Bc4 Nxe4 Nxe4 d5 Bd3 dxe4 Bxe4 Nc6",
"e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7",
"e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3 Nxe4",
"e4 e5 f4 Bc5 Nf3 d6 c3 f5",
"e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Nc6 O-O Be7 Re1 Bg4",
"e4 e5 Nf3 Nc6 c3 Nf6 d4 Nxe4 d5 Ne7 Nxe5 Ng6",
"e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6",
"e4 e5 Nf3 d6 d4 Nf6 Nc3 Nbd7 Bc4 Be7 O-O O-O",
"e4 e5 Nf3 Nc6 d4 Nf6 Nc3 Be7",
"e4 e5 Bc4 Nf6 d3 Bc5 Nc3 c6",
"e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O",
"e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Be7",
"e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6",
"e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O",
"e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5 Nd5 Be7",
"e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be2 a6",
"e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6",
"e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 f4 e6",
"e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6 Bc4 Nb6 Bb3",
"e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 d6 Bc4 e6",
"e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7",
"e4 c5 Nf3 d6 c4 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 g6",
"e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 a3 Nh6",
"e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 Qc7",
"e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 f4 O-O",
"e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6",
"e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O",
"e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5",
"e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 c3 Nc6",
"e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Nf3 Ngf6 Nxf6+ Nxf6 Bd3",
"e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3",
"e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Nf3 Ngf6 Nxf6+ Nxf6 Bd3",
"e4 c6 d4 d5 Nd2 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3 Nd7",
"e4 c6 d4 d5 f3 dxe4 fxe4 e5",
"e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Na6",
"e4 d6 d4 Nf6 Nc3 g6 Be2 Bg7 g4",
"e4 g6 d4 Bg7 Nc3 d6 f4 Nf6 Nf3 O-O",
"e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5",
"e4 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 a6",
"e4 Nf6 e5 Nd5 d4 d6 Nf3 g6 Bc4 Nb6 Bb3 Bg7",
"e4 Nf6 e5 Nd5 c4 Nb6 c5 Nd5 Nc3",
"d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6",
"d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7 Rc1 c6",
"d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6",
"d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4",
"d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4",
"d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5",
"d4 d5 c4 c6 Nc3 Nf6 e3 g6",
"d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6",
"d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 e5",
"d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5",
"d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5",
"d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3",
"d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O",
"d4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O dxc4",
"d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O",
"d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6",
"c4 e5 Nc3 Nf6 Nf3 Nc6 g3 d5 cxd5 Nxd5 Bg2 Nb6",
"c4 c5 Nf3 Nf6 Nc3 Nc6 g3 g6 Bg2 Bg7 O-O O-O",
"c4 e6 Nc3 Nf6 e4 d5",
"Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O",
"d4 d5 Nf3 Nf6 Bf4 e6 e3 Bd6 Bg3 O-O",
"d4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6",
"f4 d5 Nf3 Nf6 e3 g6 Be2 Bg7",
"e4 e5 Nf3 Nc6 c3 Nf6 d4 Nxe4 d5 Ne7 Nxe5 Ng6 Nxg6 hxg6",
"e4 e5 Nf3 Nc6 Nc3 Nf6 d4 exd4 Nxd4 Bb4",
"d4 e5 dxe5 Nc6 Nf3 Qe7 Bf4 Qb4+",
"d4 Nf6 Bg5 Ne4 Bf4 c5 f3 Qa5+",
"e4 c5 Nf3 d6 Bb5+ Nd7 d4 cxd4 Qxd4",
"e4 e6 d4 d5 e5 c5 Nf3 Nc6 Be2 Nge7"
];

const OPENING_BOOK_TOKENS = OPENING_BOOK.map(line => line.split(' '));
function isBookMove(sanHistory, ply) {
  for (let li = 0; li < OPENING_BOOK_TOKENS.length; li++) {
    const tokens = OPENING_BOOK_TOKENS[li];
    if (tokens.length < ply) continue;
    let match = true;
    for (let i = 0; i < ply; i++) {
      if (tokens[i] !== sanHistory[i]) { match = false; break; }
    }
    if (match) return true;
  }
  return false;
}

// Engine sources - fixed URLs without trailing spaces
const ENGINE_SOURCES = [
  {
    label: 'Stockfish 16 (NNUE, jsDelivr)',
    url: 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16-single.js',
    wasmBase: 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/'
  },
  {
    label: 'Stockfish 16 (NNUE, unpkg)',
    url: 'https://unpkg.com/stockfish@16.0.0/src/stockfish-nnue-16-single.js',
    wasmBase: 'https://unpkg.com/stockfish@16.0.0/src/'
  },
  {
    label: 'Stockfish 10 (asm.js fallback, cdnjs)',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js',
    wasmBase: null
  },
  {
    label: 'Stockfish 10 (asm.js fallback, jsDelivr)',
    url: 'https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js',
    wasmBase: null
  },
  {
    label: 'Stockfish 10 (asm.js fallback, unpkg)',
    url: 'https://unpkg.com/stockfish.js@10.0.2/stockfish.js',
    wasmBase: null
  }
];

/* ============================================================
   STATE
============================================================ */
let positions = [START_FEN];
let moveHistory = [];
let headers = {};
let gameMeta = { whiteAvatar: null, blackAvatar: null, endTime: null, source: null, rawPgn: null };
let currentPly = 0;
let flipped = false;
let analysisResults = [];
let analysisInProgress = false;
let analysisCancelled = false;
let classCounts = null;
let gameAccuracy = { w: null, b: null };

let selectedSquare = null;
let legalTargets = [];
let pendingPromotion = null;

let playMode = false;
let playGame = null;
let playLastMove = null;
let humanColor = null;
let playStartFen = null;
let lastPlayEvalWhiteCp = 0;
let lastPlayEvalMate = null;

let currentGameListItems = [];

/* ============================================================
   DOM REFS
============================================================ */
let el = {};
function q(id) { return document.getElementById(id); }
function initElements() {
  el = {
    boardWrapper: q('boardWrapper'), board: q('board'),
    evalBarWhite: q('evalBarWhite'), evalLabel: q('evalLabel'),
    evalGraph: q('evalGraph'),
    engineStatusDot: q('engineStatusDot'), engineStatusText: q('engineStatusText'), retryEngineBtn: q('retryEngineBtn'),
    btnFirst: q('btnFirst'), btnPrev: q('btnPrev'), btnNext: q('btnNext'), btnLast: q('btnLast'),
    btnFlip: q('btnFlip'), btnFlip2: q('btnFlip2'), btnPlayEngine: q('btnPlayEngine'),
    btnResetReview: q('btnResetReview'),
    reviewControls: q('reviewControls'), playControls: q('playControls'),
    btnSavePgn: q('btnSavePgn'), btnSavePgnPlay: q('btnSavePgnPlay'),
    playStatusBanner: q('playStatusBanner'),
    promotionPicker: q('promotionPicker'), promotionButtons: q('promotionButtons'),
    chesscomUsername: q('chesscomUsername'), fetchChesscomBtn: q('fetchChesscomBtn'),
    lichessUsername: q('lichessUsername'), fetchLichessBtn: q('fetchLichessBtn'),
    gameListWrap: q('gameListWrap'), gameListMeta: q('gameListMeta'), gameListItems: q('gameListItems'),
    pgnInput: q('pgnInput'), loadPgnBtn: q('loadPgnBtn'), importStatus: q('importStatus'),
    gameHeader: q('gameHeader'),
    analysisProgressWrap: q('analysisProgressWrap'), analysisProgressText: q('analysisProgressText'),
    analysisProgressBar: q('analysisProgressBar'), cancelAnalysisBtn: q('cancelAnalysisBtn'),
    reviewEmptyState: q('reviewEmptyState'), reviewContent: q('reviewContent'),
    accuracyWhiteVal: q('accuracyWhiteVal'), accuracyBlackVal: q('accuracyBlackVal'),
    accuracyWhiteBar: q('accuracyWhiteBar'), accuracyBlackBar: q('accuracyBlackBar'),
    classBreakdown: q('classBreakdown'), depthSelect: q('depthSelect'), reanalyzeBtn: q('reanalyzeBtn'),
    moveList: q('moveList')
  };
}

/* ============================================================
   UTILITIES
============================================================ */
function fenToBoard(fen) {
  const rows = fen.split(' ')[0].split('/');
  const board = [];
  for (const row of rows) {
    const r = [];
    for (const ch of row) {
      if (/\d/.test(ch)) { for (let i = 0; i < parseInt(ch, 10); i++) r.push(null); }
      else r.push({ type: ch.toLowerCase(), color: ch === ch.toUpperCase() ? 'w' : 'b' });
    }
    board.push(r);
  }
  return board;
}
function squareAt(row, col, flip) {
  let file, rank;
  if (!flip) { file = col; rank = 7 - row; } else { file = 7 - col; rank = row; }
  return 'abcdefgh'[file] + (rank + 1);
}
function isLightSquare(square) {
  const file = square.charCodeAt(0) - 96;
  const rank = parseInt(square[1], 10);
  return (file + rank) % 2 === 1;
}
function pieceAt(board, square) {
  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1], 10);
  const row = 8 - rank;
  return board[row][file];
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

const DEFAULT_AVATAR_DATA_URI = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#3f3f46"/><circle cx="20" cy="16" r="7" fill="#a1a1aa"/><path d="M6 36c0-8 6-13 14-13s14 5 14 13" fill="#a1a1aa"/></svg>'
);
function avatarImgHtml(url, alt) {
  const src = url || DEFAULT_AVATAR_DATA_URI;
  return '<img src="' + src + '" alt="' + escapeHtml(alt || '') + '" ' +
    'class="w-9 h-9 rounded-full object-cover border border-zinc-700 bg-zinc-800 flex-shrink-0" ' +
    'referrerpolicy="no-referrer" loading="lazy" ' +
    'onerror="this.onerror=null;this.src=\'' + DEFAULT_AVATAR_DATA_URI + '\';">';
}
function deriveDateFromHeaders(h) {
  try {
    if (h.UTCDate && h.UTCTime) {
      const d = h.UTCDate.replace(/\./g, '-');
      const dt = new Date(d + 'T' + h.UTCTime + 'Z');
      if (!isNaN(dt.getTime())) return dt;
    }
    if (h.Date && h.Date.indexOf('?') === -1) {
      const d = h.Date.replace(/\./g, '-');
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) return dt;
    }
  } catch (e) {}
  return null;
}
function formatDateTime(d) {
  if (!d) return '';
  try {
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch (e) { return ''; }
}
function createPieceElement(color, type) {
  const wrap = document.createElement('div');
  wrap.className = 'piece-wrap';
  const img = document.createElement('img');
  img.src = getPieceUrl(color, type);
  img.className = 'piece-svg';
  img.alt = type.toUpperCase();
  img.onerror = function() {
    // Fallback to Burnett set if image fails
    this.src = PIECE_SETS['Burnett'][color][type];
  };
  wrap.appendChild(img);
  return wrap;
}

/* ============================================================
   EVAL MATH
============================================================ */
function mateToCp(m) {
  const sign = m > 0 ? 1 : -1;
  const dist = Math.min(Math.abs(m), 99);
  return sign * (100000 - dist * 1000);
}
function scoreToCp(scoreObj) {
  if (!scoreObj) return 0;
  return scoreObj.type === 'mate' ? mateToCp(scoreObj.value) : scoreObj.value;
}
function toWhiteCp(scoreObj, sideToMove) {
  const cp = scoreToCp(scoreObj);
  return sideToMove === 'w' ? cp : -cp;
}
function toWhiteMate(scoreObj, sideToMove) {
  if (!scoreObj || scoreObj.type !== 'mate') return null;
  return sideToMove === 'w' ? scoreObj.value : -scoreObj.value;
}
function winPercent(cp) {
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
}
function moveAccuracyFromLoss(wpl) {
  const acc = 103.1668 * Math.exp(-0.04354 * wpl) - 3.1668;
  return clamp(acc, 0, 100);
}
function computeSideAccuracy(accuracies) {
  if (!accuracies.length) return null;
  const mean = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
  const harmonic = accuracies.length / accuracies.reduce((a, b) => a + 1 / Math.max(b, 0.1), 0);
  return (mean + harmonic) / 2;
}
function formatEval(cp, mate) {
  if (mate != null && mate !== 0) {
    return (mate > 0 ? 'M' : '-M') + Math.abs(mate);
  }
  if (Math.abs(cp) >= 90000) {
    const mtm = Math.max(1, Math.round((100000 - Math.abs(cp)) / 1000));
    return (cp > 0 ? 'M' : '-M') + mtm;
  }
  const pawns = (cp / 100).toFixed(1);
  return (cp >= 0 ? '+' : '') + pawns;
}

/* ============================================================
   ENGINE
============================================================ */
const engine = {
  worker: null, ready: false, failed: false, queue: Promise.resolve(),
  lastErrors: [], activeLabel: null,

  async init() {
    this.failed = false;
    this.lastErrors = [];
    this.activeLabel = null;
    for (const source of ENGINE_SOURCES) {
      try {
        const worker = await this._tryCreateWorker(source);
        this.worker = worker;
        this.ready = true;
        this.activeLabel = source.label;
        return true;
      } catch (e) {
        const msg = (e && e.message) ? e.message : String(e);
        console.warn('Engine source failed:', source.label, msg);
        this.lastErrors.push(source.label + ' (' + source.url + ') — ' + msg);
      }
    }
    this.failed = true;
    return false;
  },

  _tryCreateWorker(source) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn, arg) => { if (settled) return; settled = true; clearTimeout(timeout); fn(arg); };

      const wasmRedirect = source.wasmBase
        ? "var Module = { locateFile: function(path) { return " + JSON.stringify(source.wasmBase) + " + path; } };\n"
        : '';
      const bootstrap =
        wasmRedirect +
        "try { importScripts(" + JSON.stringify(source.url) + "); } " +
        "catch (e) { postMessage('__BOOT_ERROR__:' + (e && e.message ? e.message : e)); }";
      let worker;
      try {
        const blob = new Blob([bootstrap], { type: 'application/javascript' });
        worker = new Worker(URL.createObjectURL(blob));
      } catch (e) { reject(e); return; }

      const timeoutMs = source.wasmBase ? 25000 : 12000;
      const timeout = setTimeout(() => {
        try { worker.terminate(); } catch (e2) {}
        finish(reject, new Error('timed out loading engine'));
      }, timeoutMs);

      const onUci = (e) => {
        const line = typeof e.data === 'string' ? e.data : (e.data && e.data.data) || '';
        if (!line) return;
        if (line.indexOf('__BOOT_ERROR__') === 0) {
          worker.removeEventListener('message', onUci);
          try { worker.terminate(); } catch (e2) {}
          finish(reject, new Error(line.replace('__BOOT_ERROR__:', '')));
          return;
        }
        if (line.indexOf('uciok') !== -1) {
          worker.removeEventListener('message', onUci);
          worker.postMessage('setoption name MultiPV value 2');
          const onReady = (e2) => {
            const l2 = typeof e2.data === 'string' ? e2.data : (e2.data && e2.data.data) || '';
            if (l2.indexOf('readyok') !== -1) {
              worker.removeEventListener('message', onReady);
              finish(resolve, worker);
            }
          };
          worker.addEventListener('message', onReady);
          worker.postMessage('isready');
        }
      };
      worker.addEventListener('message', onUci);
      worker.onerror = (err) => {
        try { worker.terminate(); } catch (e2) {}
        finish(reject, new Error((err && err.message) ? err.message : 'worker error'));
      };
      worker.postMessage('uci');
    });
  },

  analyze(fen, depth, multipv) {
    this.queue = this.queue.then(() => this._analyzeNow(fen, depth || 15, multipv || 2));
    return this.queue;
  },

  _analyzeNow(fen, depth) {
    return new Promise((resolve) => {
      if (!this.worker) { resolve({ bestMove: null, best: null, second: null }); return; }
      const results = {};
      const handler = (e) => {
        const line = typeof e.data === 'string' ? e.data : (e.data && e.data.data) || '';
        if (!line) return;
        if (line.indexOf('info') === 0 && line.indexOf(' pv ') !== -1) {
          const mpvMatch = /multipv (\d+)/.exec(line);
          const mpv = mpvMatch ? parseInt(mpvMatch[1], 10) : 1;
          const cpMatch = /score cp (-?\d+)/.exec(line);
          const mateMatch = /score mate (-?\d+)/.exec(line);
          const pvMatch = / pv (.+)/.exec(line);
          const entry = {};
          if (cpMatch) entry.score = { type: 'cp', value: parseInt(cpMatch[1], 10) };
          else if (mateMatch) entry.score = { type: 'mate', value: parseInt(mateMatch[1], 10) };
          if (pvMatch) entry.move = pvMatch[1].trim().split(' ')[0];
          if (entry.score && entry.move) results[mpv] = entry;
        } else if (line.indexOf('bestmove') === 0) {
          this.worker.removeEventListener('message', handler);
          const parts = line.split(' ');
          const bm = parts[1];
          resolve({
            bestMove: (!bm || bm === '(none)') ? null : bm,
            best: results[1] ? results[1].score : null,
            second: results[2] ? results[2].score : null
          });
        }
      };
      this.worker.addEventListener('message', handler);
      this.worker.postMessage('position fen ' + fen);
      this.worker.postMessage('go depth ' + depth);
    });
  }
};

function waitForEngine() {
  return new Promise((resolve) => {
    if (engine.ready || engine.failed) return resolve();
    const iv = setInterval(() => {
      if (engine.ready || engine.failed) { clearInterval(iv); resolve(); }
    }, 200);
  });
}

function setEngineStatus(state, text) {
  el.engineStatusText.textContent = text;
  el.engineStatusDot.className = 'w-2.5 h-2.5 rounded-full ' +
    (state === 'ready' ? 'bg-green-500' : state === 'error' ? 'bg-red-500' : 'bg-yellow-400 animate-pulse');
  el.retryEngineBtn.classList.toggle('hidden', state !== 'error');
  if (state === 'error' && engine.lastErrors && engine.lastErrors.length) {
    el.engineStatusText.title = engine.lastErrors.join(' | ');
  }
}
function engineReadyText() {
  return engine.activeLabel ? ('Engine ready — ' + engine.activeLabel) : 'Engine ready';
}

async function retryEngineInit() {
  el.retryEngineBtn.classList.add('hidden');
  setEngineStatus('loading', 'Retrying engine…');
  const ok = await engine.init();
  if (ok) setEngineStatus('ready', engineReadyText());
  else setEngineStatus('error', 'Engine unavailable');
}

/* ============================================================
   AUDIO
============================================================ */
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function tone(freq, dur, type, startGain, delay) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + (delay || 0);
    gain.gain.setValueAtTime(startGain || 0.16, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.03);
  } catch (e) { /* audio unsupported — ignore */ }
}
function noiseBurst(dur, startGain) {
  try {
    const ctx = getAudioCtx();
    const size = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = startGain || 0.18;
    src.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch (e) { /* ignore */ }
}
function playMoveSound(opts) {
  opts = opts || {};
  if (opts.isCapture) { tone(210, 0.07, 'square', 0.14, 0); noiseBurst(0.06, 0.16); }
  else { tone(540, 0.055, 'sine', 0.15, 0); }
  if (opts.isCheck) tone(900, 0.13, 'triangle', 0.13, 0.06);
}
function playGameEndSound() {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, 'sine', 0.14, i * 0.12));
}

/* ============================================================
   PGN LOADING
============================================================ */
function extractFirstPgn(text) {
  const first = text.indexOf('[Event ');
  if (first === -1) return text.trim();
  const second = text.indexOf('[Event ', first + 1);
  return (second > 0 ? text.slice(first, second) : text.slice(first)).trim();
}

function extractPgnHeaders(pgnText) {
  const result = {};
  const re = /\[(\w+)\s+"((?:[^"\\]|\\.)*)"\]/g;
  let m;
  while ((m = re.exec(pgnText))) {
    result[m[1]] = m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return result;
}
function formatResultLabel(result) {
  if (result === '1-0') return '1–0';
  if (result === '0-1') return '0–1';
  if (result === '1/2-1/2') return '½–½';
  return result || '*';
}

function loadGameFromPGN(pgnText, meta) {
  const src = new Chess();
  const ok = src.load_pgn(pgnText, { sloppy: true });
  if (!ok) throw new Error('Invalid or unsupported PGN format');
  const hist = src.history({ verbose: true });
  if (!hist.length) throw new Error('PGN contains no moves');
  const newHeaders = src.header() || {};
  const newGameMeta = Object.assign({ whiteAvatar: null, blackAvatar: null, endTime: null, source: null, rawPgn: null }, meta || {});
  if (!newGameMeta.endTime) newGameMeta.endTime = deriveDateFromHeaders(newHeaders);
  newGameMeta.rawPgn = pgnText;

  let startFen;
  if (newHeaders.SetUp === '1' && newHeaders.FEN) {
    try { new Chess(newHeaders.FEN); startFen = newHeaders.FEN; } catch (e) { startFen = undefined; }
  }
  const replay = startFen ? new Chess(startFen) : new Chess();

  const newPositions = [replay.fen()];
  const newMoveHistory = [];
  for (let i = 0; i < hist.length; i++) {
    const m = hist[i];
    const fenBeforeMove = replay.fen();
    const moveResult = replay.move(m.san);
    if (!moveResult) throw new Error('Could not replay move ' + (i + 1) + ' (' + m.san + ')');
    newPositions.push(replay.fen());
    const fullmoveBefore = parseInt(fenBeforeMove.split(' ')[5], 10) || (Math.floor(i / 2) + 1);
    newMoveHistory.push({
      ply: i + 1,
      moveNumber: fullmoveBefore,
      color: m.color,
      san: m.san,
      from: m.from,
      to: m.to,
      piece: m.piece,
      captured: m.captured || null,
      promotion: m.promotion || null,
      uci: m.from + m.to + (m.promotion || ''),
      classification: null,
      moveAccuracy: null,
      wpl: null,
      evalAfterWhiteCp: null,
      evalAfterMate: null
    });
  }

  exitPlayMode(true);
  headers = newHeaders;
  gameMeta = newGameMeta;
  positions = newPositions;
  moveHistory = newMoveHistory;
  currentPly = 0;
  flipped = false;
  analysisResults = new Array(positions.length).fill(null);
  classCounts = null;
  gameAccuracy = { w: null, b: null };

  renderGameHeader();
  renderBoard();
  renderMoveList();
  renderClassBreakdown();
  renderAccuracy();
  updateEvalDisplays();
  drawEvalGraph();
  el.reviewEmptyState.classList.add('hidden');
  el.reviewContent.classList.remove('hidden');
}

function handleNewPgn(pgnText, meta) {
  const cleaned = extractFirstPgn(pgnText);
  loadGameFromPGN(cleaned, meta);
  switchTab('review');
  runAnalysis();
}

/* ============================================================
   SAVE / EXPORT PGN
============================================================ */
function pgnResultTag(game) {
  if (game.in_checkmate()) return game.turn() === 'w' ? '0-1' : '1-0';
  if (game.in_draw() || game.in_stalemate() || game.in_threefold_repetition() || game.insufficient_material()) return '1/2-1/2';
  return '*';
}

function buildPgnForDownload() {
  if (playMode && playGame) {
    const whiteLabel = humanColor === 'w' ? 'You' : 'Stockfish (local)';
    const blackLabel = humanColor === 'w' ? 'Stockfish (local)' : 'You';
    try {
      playGame.header(
        'Event', 'Play vs Engine',
        'Site', 'BuddyChess2 (local)',
        'Date', new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
        'White', whiteLabel,
        'Black', blackLabel,
        'Result', pgnResultTag(playGame)
      );
      if (playStartFen && playStartFen !== START_FEN) {
        playGame.header('SetUp', '1', 'FEN', playStartFen);
      }
    } catch (e) {}
    return playGame.pgn({ max_width: 0 });
  }
  return gameMeta.rawPgn || null;
}

function sanitizeFilenamePart(s) {
  return String(s || '').trim().replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40) || 'game';
}

function buildPgnFilename() {
  if (playMode) {
    const w = sanitizeFilenamePart(humanColor === 'w' ? 'You' : 'Stockfish');
    const b = sanitizeFilenamePart(humanColor === 'w' ? 'Stockfish' : 'You');
    return w + '_vs_' + b + '_' + new Date().toISOString().slice(0, 10) + '.pgn';
  }
  const h = headers || {};
  const w = sanitizeFilenamePart(h.White || 'White');
  const b = sanitizeFilenamePart(h.Black || 'Black');
  let dateStr = '';
  const d = gameMeta.endTime || deriveDateFromHeaders(h);
  if (d) { try { dateStr = d.toISOString().slice(0, 10); } catch (e) {} }
  return w + '_vs_' + b + (dateStr ? ('_' + dateStr) : '') + '.pgn';
}

function downloadCurrentPgn() {
  const pgnText = buildPgnForDownload();
  if (!pgnText) return;
  const blob = new Blob([pgnText], { type: 'application/x-chess-pgn' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildPgnFilename();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ============================================================
   IMPORT — Chess.com / Lichess / Paste
============================================================ */
function setImportStatus(text, isError) {
  el.importStatus.textContent = text;
  el.importStatus.className = 'text-xs min-h-[18px] ' + (isError ? 'text-red-400' : 'text-green-400');
}
function setBtnLoading(btn, loading, label) {
  btn.disabled = loading;
  btn.innerHTML = loading ? '<span class="spinner"></span> Loading…' : label;
}

let importBusy = false;
function setImportControlsDisabled(disabled) {
  el.fetchChesscomBtn.disabled = disabled;
  el.fetchLichessBtn.disabled = disabled;
  el.loadPgnBtn.disabled = disabled;
}

async function fetchChesscomAvatar(username) {
  try {
    const r = await fetch('https://api.chess.com/pub/player/' + encodeURIComponent(username));
    if (!r.ok) return null;
    const j = await r.json();
    return j.avatar || null;
  } catch (e) { return null; }
}

const RECENT_GAMES_LIMIT = 20;

async function fetchChesscomGameList(username) {
  const archResp = await fetch('https://api.chess.com/pub/player/' + encodeURIComponent(username.toLowerCase()) + '/games/archives');
  if (!archResp.ok) throw new Error('User not found or API unavailable');
  const archJson = await archResp.json();
  if (!archJson.archives || !archJson.archives.length) throw new Error('No games found for this user');
  const archives = archJson.archives.slice().reverse();
  const maxArchivesToScan = 12;
  const collected = [];
  for (let i = 0; i < archives.length && i < maxArchivesToScan && collected.length < RECENT_GAMES_LIMIT; i++) {
    const resp = await fetch(archives[i]);
    if (!resp.ok) continue;
    const json = await resp.json();
    const games = (json.games || []).slice().reverse();
    for (const g of games) {
      if (g.pgn) collected.push(g.pgn);
      if (collected.length >= RECENT_GAMES_LIMIT) break;
    }
  }
  if (!collected.length) throw new Error('No games found for this user');
  return collected;
}

async function fetchLichessGameList(username) {
  const resp = await fetch('https://lichess.org/api/games/user/' + encodeURIComponent(username) + '?max=' + RECENT_GAMES_LIMIT + '&pgnInJson=true', {
    headers: { 'Accept': 'application/x-ndjson' }
  });
  if (!resp.ok) throw new Error('User not found or API unavailable');
  const text = await resp.text();
  if (!text || !text.trim()) throw new Error('No games found for this user');
  const collected = [];
  text.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    try {
      const obj = JSON.parse(line);
      if (obj && obj.pgn) collected.push(obj.pgn);
    } catch (e) { /* skip malformed line */ }
  });
  if (!collected.length) throw new Error('No games found for this user');
  return collected;
}

function gameListItemHtml(it, idx) {
  const h = it.headers || {};
  const white = h.White || 'White';
  const black = h.Black || 'Black';
  const wElo = h.WhiteElo ? ' <span class="text-zinc-500 font-normal">(' + escapeHtml(h.WhiteElo) + ')</span>' : '';
  const bElo = h.BlackElo ? ' <span class="text-zinc-500 font-normal">(' + escapeHtml(h.BlackElo) + ')</span>' : '';
  const resultLabel = formatResultLabel(h.Result);
  const d = deriveDateFromHeaders(h);
  let dateStr = '';
  if (d) { try { dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); } catch (e) {} }
  return '<button data-game-idx="' + idx + '" class="w-full text-left px-2.5 py-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/70 border border-zinc-700/60 transition-colors">' +
    '<div class="flex items-center justify-between gap-2 text-xs">' +
      '<span class="truncate text-zinc-200 font-medium">' + escapeHtml(white) + wElo + ' <span class="text-zinc-500 font-normal">vs</span> ' + escapeHtml(black) + bElo + '</span>' +
      '<span class="flex-shrink-0 font-semibold text-zinc-300">' + escapeHtml(resultLabel) + '</span>' +
    '</div>' +
    (dateStr ? '<div class="text-[10px] text-zinc-500 mt-0.5">' + escapeHtml(dateStr) + '</div>' : '') +
    '</button>';
}

function renderGameList(items, sourceLabel) {
  currentGameListItems = items;
  el.gameListMeta.textContent = items.length + ' game' + (items.length === 1 ? '' : 's') + ' · ' + sourceLabel;
  el.gameListItems.innerHTML = items.map((it, idx) => gameListItemHtml(it, idx)).join('');
  el.gameListItems.querySelectorAll('[data-game-idx]').forEach(btn => {
    btn.addEventListener('click', () => loadGameFromList(parseInt(btn.dataset.gameIdx, 10)));
  });
  el.gameListWrap.classList.remove('hidden');
}

async function loadGameFromList(idx) {
  if (importBusy) return;
  const item = currentGameListItems[idx];
  if (!item) return;
  importBusy = true;
  setImportControlsDisabled(true);
  setImportStatus('Loading game…');
  try {
    let whiteAvatar = null, blackAvatar = null;
    if (item.source === 'chesscom') {
      const h = item.headers || {};
      try {
        const avatars = await Promise.all([
          h.White ? fetchChesscomAvatar(h.White) : null,
          h.Black ? fetchChesscomAvatar(h.Black) : null
        ]);
        whiteAvatar = avatars[0]; blackAvatar = avatars[1];
      } catch (e) { /* avatars are optional polish — ignore failures */ }
    }
    handleNewPgn(item.pgn, { whiteAvatar: whiteAvatar, blackAvatar: blackAvatar, source: item.source });
    setImportStatus('Game loaded ✓');
  } catch (err) {
    setImportStatus('Error loading game: ' + err.message, true);
  } finally {
    importBusy = false;
    setImportControlsDisabled(false);
  }
}

async function fetchChesscom() {
  if (importBusy) return;
  const username = el.chesscomUsername.value.trim();
  if (!username) { setImportStatus('Enter a Chess.com username first.', true); return; }
  importBusy = true;
  setBtnLoading(el.fetchChesscomBtn, true);
  setImportControlsDisabled(true);
  el.gameListWrap.classList.add('hidden');
  setImportStatus('Fetching recent games from Chess.com…');
  try {
    const pgns = await fetchChesscomGameList(username);
    const items = pgns.map(pgn => ({ pgn: pgn, headers: extractPgnHeaders(pgn), source: 'chesscom' }));
    renderGameList(items, 'Chess.com: ' + username);
    setImportStatus('Pick a game below to load it.');
  } catch (err) {
    setImportStatus('Error: ' + err.message, true);
  } finally {
    importBusy = false;
    setBtnLoading(el.fetchChesscomBtn, false, 'Fetch');
    setImportControlsDisabled(false);
  }
}

async function fetchLichess() {
  if (importBusy) return;
  const username = el.lichessUsername.value.trim();
  if (!username) { setImportStatus('Enter a Lichess username first.', true); return; }
  importBusy = true;
  setBtnLoading(el.fetchLichessBtn, true);
  setImportControlsDisabled(true);
  el.gameListWrap.classList.add('hidden');
  setImportStatus('Fetching recent games from Lichess…');
  try {
    const pgns = await fetchLichessGameList(username);
    const items = pgns.map(pgn => ({ pgn: pgn, headers: extractPgnHeaders(pgn), source: 'lichess' }));
    renderGameList(items, 'Lichess: ' + username);
    setImportStatus('Pick a game below to load it.');
  } catch (err) {
    setImportStatus('Error: ' + err.message, true);
  } finally {
    importBusy = false;
    setBtnLoading(el.fetchLichessBtn, false, 'Fetch');
    setImportControlsDisabled(false);
  }
}

function loadPastedPgn() {
  if (importBusy) return;
  const text = el.pgnInput.value.trim();
  if (!text) { setImportStatus('Please paste a PGN first.', true); return; }
  importBusy = true;
  setImportControlsDisabled(true);
  el.gameListWrap.classList.add('hidden');
  try {
    handleNewPgn(text);
    setImportStatus('PGN loaded ✓');
  } catch (err) {
    setImportStatus('Error parsing PGN: ' + err.message, true);
  } finally {
    importBusy = false;
    setImportControlsDisabled(false);
  }
}

/* ============================================================
   CLASSIFICATION & ANALYSIS PIPELINE
============================================================ */
function isSacrifice(m, fenAfter) {
  const movedVal = PIECE_VALUES[m.piece] || 0;
  if (movedVal < 3) return false;
  let tmp;
  try { tmp = new Chess(fenAfter); } catch (e) { return false; }
  const oppMoves = tmp.moves({ verbose: true });
  const caps = oppMoves.filter(mv => mv.to === m.to && mv.flags.indexOf('c') !== -1);
  if (!caps.length) return false;
  const cheapest = Math.min.apply(null, caps.map(mv => PIECE_VALUES[mv.piece] || 0));
  const gained = m.captured ? (PIECE_VALUES[m.captured] || 0) : 0;
  const netLoss = movedVal - gained;
  return netLoss >= 2 && cheapest <= movedVal;
}

function classifyMoveAt(k) {
  const m = moveHistory[k];
  const before = analysisResults[k];
  const after = analysisResults[k + 1];
  if (!before) return;
  const fenBefore = positions[k];
  const fenAfter = positions[k + 1];
  const sideToMove = fenBefore.split(' ')[1];
  const afterSide = fenAfter.split(' ')[1];

  if (!before.best) { m.classification = 'good'; m.moveAccuracy = 100; m.wpl = 0; return; }

  const whiteCpBest = toWhiteCp(before.best, sideToMove);
  const isMatingMove = m.san.indexOf('#') !== -1;
  const whiteCpActual = isMatingMove
    ? (sideToMove === 'w' ? 100000 : -100000)
    : ((after && after.best) ? toWhiteCp(after.best, afterSide) : whiteCpBest);
  const whiteMateActual = isMatingMove
    ? (sideToMove === 'w' ? 1 : -1)
    : ((after && after.best) ? toWhiteMate(after.best, afterSide) : null);

  const winBest = winPercent(whiteCpBest);
  const winActual = winPercent(whiteCpActual);
  const moverWinBest = sideToMove === 'w' ? winBest : 100 - winBest;
  const moverWinActual = sideToMove === 'w' ? winActual : 100 - winActual;
  const wpl = Math.max(0, moverWinBest - moverWinActual);

  const isBest = before.bestMove === m.uci;

  let legalCountBefore = 2;
  try { legalCountBefore = new Chess(fenBefore).moves().length; } catch (e) {}

  let cls;
  if (isBest) cls = 'best';
  else if (wpl < 1.5) cls = 'excellent';
  else if (wpl < 4.5) cls = 'good';
  else if (wpl < 9) cls = 'inaccuracy';
  else if (wpl < 18) cls = 'mistake';
  else cls = 'blunder';

  if (cls === 'blunder' || cls === 'mistake') {
    const decidedBefore = moverWinBest >= 92 || moverWinBest <= 8;
    const decidedAfter = moverWinActual >= 85 || moverWinActual <= 15;
    const sameSide = (moverWinBest >= 50) === (moverWinActual >= 50);
    if (decidedBefore && decidedAfter && sameSide) {
      cls = cls === 'blunder' ? 'mistake' : 'inaccuracy';
    }
  }

  const sanHistory = moveHistory.slice(0, k + 1).map(x => x.san);
  const inBook = isBookMove(sanHistory, k + 1);

  if (inBook && (cls === 'best' || cls === 'excellent' || cls === 'good')) {
    cls = 'book';
  } else {
    if (cls === 'best' && before.second) {
      const secondWhiteCp = toWhiteCp(before.second, sideToMove);
      const secondWin = winPercent(secondWhiteCp);
      const moverSecondWin = sideToMove === 'w' ? secondWin : 100 - secondWin;
      if (moverWinBest - moverSecondWin > 10) cls = 'great';
    }

    const positionDecided = moverWinBest > 95 || moverWinBest < 5;
    if (
      (cls === 'best' || cls === 'great') &&
      !positionDecided &&
      legalCountBefore > 1 &&
      isSacrifice(m, fenAfter) &&
      moverWinActual >= 50
    ) {
      cls = 'brilliant';
    }
  }

  m.classification = cls;
  m.wpl = wpl;
  m.moveAccuracy = moveAccuracyFromLoss(wpl);
  m.evalAfterWhiteCp = whiteCpActual;
  m.evalAfterMate = whiteMateActual;
  m.bestMoveUci = before.bestMove;
}

function computeAccuracyAndBreakdown() {
  const whiteAcc = [], blackAcc = [];
  const counts = { w: {}, b: {} };
  CLASS_KEYS.forEach(k => { counts.w[k] = 0; counts.b[k] = 0; });
  moveHistory.forEach(m => {
    if (!m.classification) return;
    counts[m.color][m.classification] = (counts[m.color][m.classification] || 0) + 1;
    if (m.moveAccuracy != null) (m.color === 'w' ? whiteAcc : blackAcc).push(m.moveAccuracy);
  });
  gameAccuracy.w = computeSideAccuracy(whiteAcc);
  gameAccuracy.b = computeSideAccuracy(blackAcc);
  classCounts = counts;
}

async function runAnalysis() {
  await waitForEngine();
  if (engine.failed) {
    setReviewProgressMessage('Engine unavailable — classifications & accuracy disabled (board and move list still work). Try "Retry" in the header.');
    return;
  }
  if (analysisInProgress) return;
  analysisCancelled = false;
  analysisInProgress = true;
  showAnalysisProgress(true);
  analysisResults = new Array(positions.length).fill(null);
  moveHistory.forEach(m => { m.classification = null; m.moveAccuracy = null; m.wpl = null; });
  const depth = parseInt(el.depthSelect.value || '15', 10);
  try { engine.worker.postMessage('ucinewgame'); } catch (e) {}

  for (let i = 0; i < positions.length; i++) {
    if (analysisCancelled) break;
    const fen = positions[i];
    const res = await engine.analyze(fen, depth, 2);
    analysisResults[i] = res;
    updateAnalysisProgress(i + 1, positions.length);
    if (i > 0) classifyMoveAt(i - 1);
    computeAccuracyAndBreakdown();
    renderMoveList();
    renderClassBreakdown();
    renderAccuracy();
    if (!playMode) renderBoard();
    drawEvalGraph();
    await new Promise(r => setTimeout(r, 0));
  }
  analysisInProgress = false;
  showAnalysisProgress(false);
  computeAccuracyAndBreakdown();
  renderMoveList(); renderClassBreakdown(); renderAccuracy();
  if (!playMode) renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
}

function showAnalysisProgress(show) {
  el.analysisProgressWrap.classList.toggle('hidden', !show);
}
function updateAnalysisProgress(done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  el.analysisProgressBar.style.width = pct + '%';
  el.analysisProgressText.textContent = 'Analyzing… ' + done + '/' + total + ' (depth ' + el.depthSelect.value + ')';
}
function setReviewProgressMessage(text) {
  el.analysisProgressWrap.classList.remove('hidden');
  el.cancelAnalysisBtn.classList.add('hidden');
  el.analysisProgressText.textContent = text;
  el.analysisProgressBar.style.width = '0%';
}

/* ============================================================
   RENDERING — BOARD
============================================================ */
function squareFromFileRank(fileIdx, rank) { return 'abcdefgh'[fileIdx] + rank; }

function renderBoard() {
  const fen = playMode ? playGame.fen() : positions[currentPly];
  const board = fenToBoard(fen);
  let inCheck = false, turnColor = 'w', kingSquare = null;
  try {
    const tmp = new Chess(fen);
    turnColor = tmp.turn();
    inCheck = tmp.in_check();
  } catch (e) {}
  if (inCheck) {
    outer:
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === 'k' && p.color === turnColor) { kingSquare = squareFromFileRank(c, 8 - r); break outer; }
    }
  }
  const lastMove = playMode ? playLastMove : (currentPly > 0 ? { from: moveHistory[currentPly - 1].from, to: moveHistory[currentPly - 1].to } : null);
  const badgeMove = (!playMode && currentPly > 0) ? moveHistory[currentPly - 1] : null;
  const legalToSquares = legalTargets.map(t => t.to);

  el.board.style.setProperty('--sq-size', (el.board.clientWidth / 8) + 'px');
  el.board.innerHTML = '';
  const frag = document.createDocumentFragment();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = squareAt(row, col, flipped);
      const isLight = isLightSquare(square);
      const piece = pieceAt(board, square);
      const div = document.createElement('div');
      div.className = 'square ' + (isLight ? 'light' : 'dark');
      div.dataset.square = square;

      if (lastMove && (square === lastMove.from || square === lastMove.to)) {
        div.classList.add(square === lastMove.from ? 'sq-highlight-from' : 'sq-highlight-to');
      }
      if (square === selectedSquare) div.classList.add('sq-selected');
      if (kingSquare === square) div.classList.add('sq-check');
      if (legalToSquares.indexOf(square) !== -1) {
        const mv = legalTargets.find(t => t.to === square);
        div.classList.add((mv.flags.indexOf('c') !== -1 || mv.flags.indexOf('e') !== -1) ? 'move-capture' : 'move-dot');
      }
      if (row === 7) {
        const f = document.createElement('span');
        f.className = 'coord-file ' + (isLight ? 'coord-dark' : 'coord-light');
        f.textContent = square[0];
        div.appendChild(f);
      }
      if (col === 0) {
        const rr = document.createElement('span');
        rr.className = 'coord-rank ' + (isLight ? 'coord-dark' : 'coord-light');
        rr.textContent = square[1];
        div.appendChild(rr);
      }
      if (piece) {
        const pEl = createPieceElement(piece.color, piece.type);
        if (playMode && playGame && piece.color === playGame.turn()) pEl.classList.add('cursor-pointer');
        div.appendChild(pEl);
      }
      if (badgeMove && square === badgeMove.to && badgeMove.classification) {
        const info = CLASS_INFO[badgeMove.classification];
        const b = document.createElement('div');
        b.className = 'move-badge';
        b.style.background = info.color;
        b.style.color = info.text || '#fff';
        b.textContent = info.symbol;
        b.title = info.label;
        div.appendChild(b);
      }
      frag.appendChild(div);
    }
  }
  el.board.appendChild(frag);
}

/* ============================================================
   RENDERING — EVAL BAR / GRAPH
============================================================ */
function updateEvalDisplays() {
  let cp = 0, mate = null;
  if (playMode) {
    cp = lastPlayEvalWhiteCp || 0;
    mate = lastPlayEvalMate;
  } else {
    const r = analysisResults[currentPly];
    if (r && r.best) {
      const side = positions[currentPly].split(' ')[1];
      cp = toWhiteCp(r.best, side);
      mate = toWhiteMate(r.best, side);
    } else if (currentPly > 0 && moveHistory[currentPly - 1] && moveHistory[currentPly - 1].evalAfterWhiteCp != null) {
      cp = moveHistory[currentPly - 1].evalAfterWhiteCp;
      mate = moveHistory[currentPly - 1].evalAfterMate;
    }
  }
  const pct = clamp(winPercent(cp), 1, 99);
  el.evalBarWhite.style.height = pct + '%';
  el.evalLabel.textContent = formatEval(cp, mate);
  el.evalLabel.classList.toggle('label-top', pct < 12);
}

function drawEvalGraph() {
  const canvas = el.evalGraph;
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 300;
  const cssH = canvas.clientHeight || 64;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  ctx.fillStyle = '#1a1b1e';
  ctx.fillRect(0, 0, cssW, cssH);

  const n = positions.length;
  if (n < 2) return;
  const mid = cssH / 2;
  const vals = positions.map((fen, i) => {
    const r = analysisResults[i];
    if (!r || !r.best) return null;
    const side = fen.split(' ')[1];
    return clamp(toWhiteCp(r.best, side), -1000, 1000);
  });
  let lastVal = 0;
  const filled = vals.map(v => { if (v != null) lastVal = v; return lastVal; });

  ctx.beginPath();
  ctx.moveTo(0, cssH);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * cssW;
    const y = mid - (filled[i] / 1000) * mid;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(cssW, cssH);
  ctx.closePath();
  ctx.fillStyle = '#e8e8e2';
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(cssW, mid); ctx.stroke();

  if (!playMode) {
    const cx = (currentPly / (n - 1)) * cssW;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, cssH); ctx.stroke();
  }
}

/* ============================================================
   RENDERING — SIDEBAR
============================================================ */
function renderGameHeader() {
  el.btnSavePgn.disabled = false;
  const h = headers || {};
  const white = h.White || 'White';
  const black = h.Black || 'Black';
  const wr = h.WhiteElo ? ' (' + h.WhiteElo + ')' : '';
  const br = h.BlackElo ? ' (' + h.BlackElo + ')' : '';
  const result = h.Result || '*';
  const dateStr = formatDateTime(gameMeta.endTime);

  let html = '<div class="flex items-center justify-between gap-2">' +
    '<div class="flex items-center gap-2 min-w-0">' +
      avatarImgHtml(gameMeta.whiteAvatar, white) +
      '<span class="font-semibold text-zinc-100 text-base truncate">' + escapeHtml(white) + wr + '</span>' +
    '</div>' +
    '<span class="text-zinc-500 text-xs flex-shrink-0 px-1">' + escapeHtml(result) + '</span>' +
    '<div class="flex items-center gap-2 min-w-0 justify-end">' +
      '<span class="font-semibold text-zinc-100 text-base truncate text-right">' + escapeHtml(black) + br + '</span>' +
      avatarImgHtml(gameMeta.blackAvatar, black) +
    '</div>' +
    '</div>';
  if (h.Event || dateStr) {
    html += '<div class="text-xs text-zinc-500 mt-2 text-center truncate">' +
      (h.Event ? escapeHtml(h.Event) : '') + (h.Event && dateStr ? ' • ' : '') + (dateStr ? escapeHtml(dateStr) : '') +
      '</div>';
  }
  el.gameHeader.innerHTML = html;
}

function renderAccuracy() {
  const w = gameAccuracy.w, b = gameAccuracy.b;
  el.accuracyWhiteVal.textContent = w != null ? w.toFixed(1) + '%' : '—';
  el.accuracyBlackVal.textContent = b != null ? b.toFixed(1) + '%' : '—';
  el.accuracyWhiteBar.style.width = (w || 0) + '%';
  el.accuracyBlackBar.style.width = (b || 0) + '%';
}

function renderClassBreakdown() {
  const counts = classCounts || { w: {}, b: {} };
  let html = '';
  CLASS_KEYS.forEach(k => {
    const info = CLASS_INFO[k];
    const wc = counts.w[k] || 0, bc = counts.b[k] || 0;
    html += '<div class="flex items-center justify-between text-sm py-2 border-b border-zinc-800/60">' +
      '<span class="flex items-center gap-2.5"><span class="inline-flex items-center justify-center rounded-full text-[12px] font-bold" style="background:' + info.color + ';color:' + (info.text || '#fff') + ';width:24px;height:24px;">' + info.symbol + '</span><span class="text-zinc-300">' + info.label + '</span></span>' +
      '<span class="flex gap-4 tabular-nums text-zinc-400 font-medium"><span class="w-6 text-right">' + wc + '</span><span class="w-6 text-right">' + bc + '</span></span>' +
      '</div>';
  });
  el.classBreakdown.innerHTML = html;
}

function moveButtonHtml(m) {
  const info = m.classification ? CLASS_INFO[m.classification] : null;
  const active = m.ply === currentPly;
  return '<button data-ply="' + m.ply + '" class="move-item text-left text-[15px] px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-zinc-700/50 ' + (active ? 'bg-zinc-700/80 ring-1 ring-amber-400/50' : '') + '">' +
    '<span class="text-zinc-200 font-medium">' + escapeHtml(m.san) + '</span>' +
    (info ? '<span class="inline-flex items-center justify-center rounded-full text-[10px] font-bold leading-none" style="background:' + info.color + ';color:' + (info.text || '#fff') + ';width:17px;height:17px;">' + info.symbol + '</span>' : '') +
    '</button>';
}

function renderMoveList() {
  if (!moveHistory.length) {
    el.moveList.innerHTML = '<p class="text-zinc-500 text-sm text-center py-10">No game loaded yet.<br>Import a game to see moves here.</p>';
    return;
  }
  let html = '';
  let i = 0;
  if (moveHistory[0].color === 'b') {
    html += '<div class="grid grid-cols-[2.1rem_1fr_1fr] items-center gap-1">' +
      '<span class="text-zinc-500 text-sm">' + moveHistory[0].moveNumber + '.</span>' +
      '<span class="text-zinc-600 text-sm italic px-2">…</span>' +
      moveButtonHtml(moveHistory[0]) +
      '</div>';
    i = 1;
  }
  for (; i < moveHistory.length; i += 2) {
    const w = moveHistory[i];
    const b = moveHistory[i + 1];
    html += '<div class="grid grid-cols-[2.1rem_1fr_1fr] items-center gap-1">' +
      '<span class="text-zinc-500 text-sm">' + w.moveNumber + '.</span>' +
      moveButtonHtml(w) +
      (b ? moveButtonHtml(b) : '<span></span>') +
      '</div>';
  }
  el.moveList.innerHTML = html;
  el.moveList.querySelectorAll('[data-ply]').forEach(btn => {
    btn.addEventListener('click', () => goToPly(parseInt(btn.dataset.ply, 10)));
  });
}

/* ============================================================
   NAVIGATION
============================================================ */
function goToPly(n) {
  if (playMode) return;
  if (!moveHistory.length) return;
  const target = clamp(n, 0, moveHistory.length);
  if (target === currentPly) return;
  currentPly = target;
  renderBoard();
  renderMoveList();
  updateEvalDisplays();
  drawEvalGraph();
  if (currentPly > 0) {
    const mv = moveHistory[currentPly - 1];
    let isCheck = false;
    try { isCheck = new Chess(positions[currentPly]).in_check(); } catch (e) {}
    playMoveSound({ isCapture: !!mv.captured, isCheck: isCheck });
  }
}

function switchTab(name) {
  ['import', 'review', 'moves'].forEach(t => {
    q('tab-' + t).classList.toggle('hidden', t !== name);
    q('tabBtn-' + t).classList.toggle('tab-active', t === name);
  });
}

/* ============================================================
   PLAY VS ENGINE MODE
============================================================ */
function setPlayStatus(text) {
  if (!text) { el.playStatusBanner.classList.add('hidden'); return; }
  el.playStatusBanner.classList.remove('hidden');
  el.playStatusBanner.textContent = text;
}

function enterPlayMode() {
  if (!engine.ready) { setPlayStatus('Engine is still loading — please wait a moment.'); return; }
  if (analysisInProgress) {
    analysisCancelled = true;
  }
  const fen = positions[currentPly];
  playGame = new Chess(fen);
  playStartFen = fen;
  humanColor = playGame.turn();
  playLastMove = currentPly > 0 ? { from: moveHistory[currentPly - 1].from, to: moveHistory[currentPly - 1].to } : null;
  playMode = true;
  selectedSquare = null; legalTargets = [];

  const curRes = analysisResults[currentPly];
  if (curRes && curRes.best) {
    const side = fen.split(' ')[1];
    lastPlayEvalWhiteCp = toWhiteCp(curRes.best, side);
    lastPlayEvalMate = toWhiteMate(curRes.best, side);
  } else if (currentPly > 0 && moveHistory[currentPly - 1] && moveHistory[currentPly - 1].evalAfterWhiteCp != null) {
    lastPlayEvalWhiteCp = moveHistory[currentPly - 1].evalAfterWhiteCp;
    lastPlayEvalMate = moveHistory[currentPly - 1].evalAfterMate;
  } else {
    lastPlayEvalWhiteCp = 0;
    lastPlayEvalMate = null;
  }

  el.playControls.classList.remove('hidden');
  el.playControls.classList.add('flex');
  el.reviewControls.classList.add('hidden');
  setPlayStatus('Play mode — you are ' + (humanColor === 'w' ? 'White' : 'Black') + '. Make your move.');
  renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
}

function exitPlayMode(silent) {
  playMode = false; playGame = null; selectedSquare = null; legalTargets = []; pendingPromotion = null;
  el.promotionPicker.classList.add('hidden');
  if (!silent) {
    el.playControls.classList.add('hidden');
    el.playControls.classList.remove('flex');
    el.reviewControls.classList.remove('hidden');
    setPlayStatus('');
    renderBoard();
    renderMoveList();
    updateEvalDisplays();
    drawEvalGraph();
  }
}

function clearSelection() { selectedSquare = null; legalTargets = []; renderBoard(); }
function selectSquare(square) {
  selectedSquare = square;
  legalTargets = playGame.moves({ square: square, verbose: true });
  renderBoard();
}

function handleSquareClick(square) {
  if (!playMode || pendingPromotion) return;
  const piece = playGame.get(square);
  if (selectedSquare) {
    if (selectedSquare === square) { clearSelection(); return; }
    const move = legalTargets.find(m => m.to === square);
    if (move) {
      if (move.flags.indexOf('p') !== -1) {
        showPromotionPicker(square, move.color);
      } else {
        applyHumanMove(selectedSquare, square);
        clearSelection();
      }
      return;
    }
    if (piece && piece.color === playGame.turn()) selectSquare(square);
    else clearSelection();
  } else {
    if (piece && piece.color === playGame.turn()) selectSquare(square);
  }
}

function showPromotionPicker(square, color) {
  pendingPromotion = { to: square, color: color, from: selectedSquare };
  el.promotionButtons.innerHTML = '';
  ['q', 'r', 'b', 'n'].forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'promo-btn';
    btn.dataset.p = p;
    btn.appendChild(createPieceElement(color, p));
    el.promotionButtons.appendChild(btn);
  });
  el.promotionPicker.classList.remove('hidden');
}
function bindPromotionPicker() {
  el.promotionButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.promo-btn');
    if (!btn || !pendingPromotion) return;
    const promo = btn.dataset.p;
    const from = pendingPromotion.from, to = pendingPromotion.to;
    el.promotionPicker.classList.add('hidden');
    pendingPromotion = null;
    applyHumanMove(from, to, promo);
    clearSelection();
  });
}

function applyHumanMove(from, to, promotion) {
  const moveObj = playGame.move({ from: from, to: to, promotion: promotion || 'q' });
  if (!moveObj) return;
  playLastMove = { from: from, to: to };
  playMoveSound({ isCapture: !!moveObj.captured, isCheck: playGame.in_check() });
  renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
  if (!playGame.game_over()) {
    requestEngineReply();
  } else {
    showGameOverMessage();
    playGameEndSound();
  }
}

async function requestEngineReply() {
  setPlayStatus('Engine is thinking…');
  const fenForSearch = playGame.fen();
  const searchSide = fenForSearch.split(' ')[1];
  try {
    const res = await engine.analyze(fenForSearch, 15, 2);
    if (!playMode) return;
    if (res && res.best) {
      lastPlayEvalWhiteCp = toWhiteCp(res.best, searchSide);
      lastPlayEvalMate = toWhiteMate(res.best, searchSide);
    }
    if (res && res.bestMove) {
      const from = res.bestMove.slice(0, 2), to = res.bestMove.slice(2, 4);
      const promo = res.bestMove.length > 4 ? res.bestMove.slice(4, 5) : undefined;
      const mv = playGame.move({ from: from, to: to, promotion: promo });
      if (mv) {
        playLastMove = { from: from, to: to };
        playMoveSound({ isCapture: !!mv.captured, isCheck: playGame.in_check() });
      }
    }
  } catch (e) { console.error(e); }
  renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
  if (playGame.game_over()) { showGameOverMessage(); playGameEndSound(); }
  else setPlayStatus('Your move (' + (humanColor === 'w' ? 'White' : 'Black') + ').');
}

function showGameOverMessage() {
  let msg = 'Game over — draw.';
  if (playGame.in_checkmate()) msg = (playGame.turn() === 'w' ? 'Black' : 'White') + ' wins by checkmate!';
  else if (playGame.in_stalemate()) msg = 'Draw by stalemate.';
  else if (playGame.in_threefold_repetition()) msg = 'Draw by repetition.';
  else if (playGame.insufficient_material()) msg = 'Draw — insufficient material.';
  setPlayStatus(msg);
}

/* ============================================================
   EVENT BINDING
============================================================ */
function bindEvents() {
  el.board.addEventListener('click', (e) => {
    const sqEl = e.target.closest('.square');
    if (!sqEl) return;
    handleSquareClick(sqEl.dataset.square);
  });

  el.btnFirst.addEventListener('click', () => goToPly(0));
  el.btnPrev.addEventListener('click', () => goToPly(currentPly - 1));
  el.btnNext.addEventListener('click', () => goToPly(currentPly + 1));
  el.btnLast.addEventListener('click', () => goToPly(moveHistory.length));
  el.btnFlip.addEventListener('click', () => { flipped = !flipped; renderBoard(); });
  el.btnFlip2.addEventListener('click', () => { flipped = !flipped; renderBoard(); });
  el.btnPlayEngine.addEventListener('click', enterPlayMode);
  el.btnResetReview.addEventListener('click', () => exitPlayMode(false));
  el.btnSavePgn.addEventListener('click', downloadCurrentPgn);
  el.btnSavePgnPlay.addEventListener('click', downloadCurrentPgn);
  el.cancelAnalysisBtn.addEventListener('click', () => { analysisCancelled = true; });
  el.reanalyzeBtn.addEventListener('click', () => { if (moveHistory.length) runAnalysis(); });
  el.retryEngineBtn.addEventListener('click', retryEngineInit);

  el.fetchChesscomBtn.addEventListener('click', fetchChesscom);
  el.fetchLichessBtn.addEventListener('click', fetchLichess);
  el.loadPgnBtn.addEventListener('click', loadPastedPgn);
  el.chesscomUsername.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchChesscom(); });
  el.lichessUsername.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchLichess(); });

  q('tabBtn-import').addEventListener('click', () => switchTab('import'));
  q('tabBtn-review').addEventListener('click', () => switchTab('review'));
  q('tabBtn-moves').addEventListener('click', () => switchTab('moves'));

  bindPromotionPicker();

  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (playMode) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goToPly(currentPly + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goToPly(currentPly - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goToPly(0); }
    else if (e.key === 'End') { e.preventDefault(); goToPly(moveHistory.length); }
  });

  window.addEventListener('resize', () => { renderBoard(); drawEvalGraph(); });
}

/* ============================================================
   INITIALIZATION
============================================================ */
(function init() {
  initElements();
  bindEvents();
  setEngineStatus('loading', 'Loading engine…');
  engine.init().then(ok => {
    if (ok) {
      setEngineStatus('ready', engineReadyText());
    } else {
      setEngineStatus('error', 'Engine unavailable');
    }
  });
  
  // Render initial empty board
  renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
})();

})();
