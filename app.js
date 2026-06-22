(function () {
'use strict';

/* ================= CONSTANTS & ASSETS ================= */
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// OPENGAMEART ASSETS (Direct Links)
// Source: https://opengameart.org/content/chess-pieces-and-board-squares
const PIECE_ASSETS = {
  w: {
    k: 'https://opengameart.org/sites/default/files/king_w.svg',
    q: 'https://opengameart.org/sites/default/files/queen_w.svg',
    r: 'https://opengameart.org/sites/default/files/rook_w.svg',
    b: 'https://opengameart.org/sites/default/files/bishop_w.svg',
    n: 'https://opengameart.org/sites/default/files/knight_w.svg',
    p: 'https://opengameart.org/sites/default/files/pawn_w.svg'
  },
  b: {
    k: 'https://opengameart.org/sites/default/files/king_b.svg',
    q: 'https://opengameart.org/sites/default/files/queen_b.svg',
    r: 'https://opengameart.org/sites/default/files/rook_b.svg',
    b: 'https://opengameart.org/sites/default/files/bishop_b.svg',
    n: 'https://opengameart.org/sites/default/files/knight_b.svg',
    p: 'https://opengameart.org/sites/default/files/pawn_b.svg'
  }
};

// Fallback inline SVGs if CDN fails
const FALLBACK_SVG = {
  w: '<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" stroke="#000" stroke-width="1.5"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 2-8 2-4-2-8-2-5-3-8-2c-3 6 6 10.5 6 10.5v7z"/></g></svg>',
  b: '<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g fill="#000" stroke="#fff" stroke-width="1.5"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 2-8 2-4-2-8-2-5-3-8-2c-3 6 6 10.5 6 10.5v7z"/></g></svg>'
};
// Simple fallback generator for other pieces if needed
function getFallback(color, type) {
  // Reusing King shape as generic fallback for simplicity in this snippet, 
  // but in production you'd have all 12. For now, we rely on CDN.
  return FALLBACK_SVG[color]; 
}

const CLASS_INFO = {
  brilliant:  { label:'Brilliant',   color:'#1baca6', symbol:'!!', text:'#fff' },
  great:      { label:'Great',       color:'#5c8bb0', symbol:'!',  text:'#fff' },
  best:       { label:'Best',        color:'#3aab59', symbol:'✓',  text:'#fff' },
  excellent:  { label:'Excellent',   color:'#81b64c', symbol:'✓',  text:'#fff' },
  good:       { label:'Good',        color:'#8bab5c', symbol:'✓',  text:'#fff' },
  book:       { label:'Book',        color:'#a88865', symbol:'B',  text:'#fff' },
  inaccuracy: { label:'Inaccuracy',  color:'#f0c93d', symbol:'?!', text:'#1a1a1a' },
  mistake:    { label:'Mistake',     color:'#ffa15c', symbol:'?',  text:'#1a1a1a' },
  blunder:    { label:'Blunder',     color:'#fa4f4f', symbol:'??', text:'#fff' }
};
const CLASS_KEYS = Object.keys(CLASS_INFO);
const PIECE_VALUES = { p:1, n:3, b:3, r:5, q:9, k:0 };

// ENGINE SOURCES - Prioritize Stockfish 16 NNUE
const ENGINE_SOURCES = [
  {
    label: 'Stockfish 16 NNUE (jsDelivr)',
    url: 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16-single.js',
    wasmBase: 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/'
  },
  {
    label: 'Stockfish 16 NNUE (Unpkg)',
    url: 'https://unpkg.com/stockfish@16.0.0/src/stockfish-nnue-16-single.js',
    wasmBase: 'https://unpkg.com/stockfish@16.0.0/src/'
  }
];

/* ================= STATE ================= */
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

/* ================= DOM REFS ================= */
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

/* ================= UTILS ================= */
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

const DEFAULT_AVATAR = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#3f3f46"/><circle cx="20" cy="16" r="7" fill="#a1a1aa"/><path d="M6 36c0-8 6-13 14-13s14 5 14 13" fill="#a1a1aa"/></svg>');

function avatarImgHtml(url, alt) {
  const src = url || DEFAULT_AVATAR;
  return `<img src="${src}" alt="${escapeHtml(alt||'')}" class="w-9 h-9 rounded-full object-cover border border-zinc-700 bg-zinc-800 flex-shrink-0" referrerpolicy="no-referrer">`;
}

function createPieceElement(color, type) {
  const wrap = document.createElement('div');
  wrap.className = 'piece-wrap';
  
  const img = document.createElement('img');
  img.className = 'piece-img';
  img.alt = type;
  
  const url = PIECE_ASSETS[color] && PIECE_ASSETS[color][type];
  if (url) {
    img.src = url;
    img.onerror = () => { 
      // Fallback to inline SVG if image fails
      img.src = 'data:image/svg+xml;base64,' + btoa(getFallback(color, type)); 
    };
  } else {
    img.src = 'data:image/svg+xml;base64,' + btoa(getFallback(color, type));
  }
  
  wrap.appendChild(img);
  return wrap;
}

/* ================= EVAL MATH ================= */
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
  if (mate != null && mate !== 0) return (mate > 0 ? 'M' : '-M') + Math.abs(mate);
  if (Math.abs(cp) >= 90000) {
    const mtm = Math.max(1, Math.round((100000 - Math.abs(cp)) / 1000));
    return (cp > 0 ? 'M' : '-M') + mtm;
  }
  const pawns = (cp / 100).toFixed(1);
  return (cp >= 0 ? '+' : '') + pawns;
}

/* ================= ENGINE (STOCKFISH 16) ================= */
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
        console.warn('Engine source failed:', source.label, e.message);
        this.lastErrors.push(source.label + ': ' + e.message);
      }
    }
    this.failed = true;
    return false;
  },

  _tryCreateWorker(source) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn, arg) => { if (settled) return; settled = true; clearTimeout(timeout); fn(arg); };

      // BLOB PROXY PATTERN FOR COOP/CORS
      const wasmRedirect = source.wasmBase
        ? `var Module={locateFile:function(p){return "${source.wasmBase}"+p;}};\n`
        : '';
      
      const bootstrap =
        wasmRedirect +
        `try{importScripts("${source.url}");}catch(e){postMessage("__BOOT_ERROR__:"+e.message);}`;
      
      let worker;
      try {
        const blob = new Blob([bootstrap], { type: 'application/javascript' });
        worker = new Worker(URL.createObjectURL(blob));
      } catch (e) { reject(e); return; }

      const timeoutMs = 25000;
      const timeout = setTimeout(() => {
        try { worker.terminate(); } catch(e){}
        finish(reject, new Error('Timeout loading engine'));
      }, timeoutMs);

      const onUci = (e) => {
        const line = typeof e.data === 'string' ? e.data : (e.data && e.data.data) || '';
        if (!line) return;
        
        if (line.indexOf('__BOOT_ERROR__') === 0) {
          worker.removeEventListener('message', onUci);
          try { worker.terminate(); } catch(e){}
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
  if (state === 'error' && engine.lastErrors.length) {
    el.engineStatusText.title = engine.lastErrors.join(' | ');
  }
}

async function retryEngineInit() {
  el.retryEngineBtn.classList.add('hidden');
  setEngineStatus('loading', 'Retrying engine…');
  const ok = await engine.init();
  if (ok) setEngineStatus('ready', 'Engine ready — ' + engine.activeLabel);
  else setEngineStatus('error', 'Engine unavailable');
}

/* ================= AUDIO ================= */
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
  } catch (e) {}
}
function playMoveSound(opts) {
  opts = opts || {};
  if (opts.isCapture) { tone(210, 0.07, 'square', 0.14, 0); }
  else { tone(540, 0.055, 'sine', 0.15, 0); }
  if (opts.isCheck) tone(900, 0.13, 'triangle', 0.06, 0.06);
}
function playGameEndSound() {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, 'sine', 0.14, i * 0.12));
}

/* ================= PGN & IMPORT ================= */
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

function loadGameFromPGN(pgnText, meta) {
  const src = new Chess();
  const ok = src.load_pgn(pgnText, { sloppy: true });
  if (!ok) throw new Error('Invalid PGN');
  const hist = src.history({ verbose: true });
  if (!hist.length) throw new Error('No moves');
  
  const newHeaders = src.header() || {};
  const newGameMeta = Object.assign({ whiteAvatar: null, blackAvatar: null, endTime: null, source: null, rawPgn: null }, meta || {});
  if (!newGameMeta.endTime) {
    // Simple date parse
    if(newHeaders.Date && !newHeaders.Date.includes('?')) {
       try { newGameMeta.endTime = new Date(newHeaders.Date.replace(/\./g, '-')); } catch(e){}
    }
  }
  newGameMeta.rawPgn = pgnText;

  let startFen;
  if (newHeaders.SetUp === '1' && newHeaders.FEN) {
    try { new Chess(newHeaders.FEN); startFen = newHeaders.FEN; } catch (e) {}
  }
  const replay = startFen ? new Chess(startFen) : new Chess();

  const newPositions = [replay.fen()];
  const newMoveHistory = [];
  
  for (let i = 0; i < hist.length; i++) {
    const m = hist[i];
    const fenBefore = replay.fen();
    const moveResult = replay.move(m.san);
    if (!moveResult) throw new Error('Replay error at move ' + (i+1));
    
    newPositions.push(replay.fen());
    const fullmove = parseInt(fenBefore.split(' ')[5], 10) || (Math.floor(i/2)+1);
    
    newMoveHistory.push({
      ply: i + 1,
      moveNumber: fullmove,
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

/* ================= CHESS.COM / LICHESS API ================= */
function setImportStatus(text, isError) {
  el.importStatus.textContent = text;
  el.importStatus.className = 'text-xs min-h-[18px] ' + (isError ? 'text-red-400' : 'text-green-400');
}

let importBusy = false;
function setImportControlsDisabled(disabled) {
  el.fetchChesscomBtn.disabled = disabled;
  el.fetchLichessBtn.disabled = disabled;
  el.loadPgnBtn.disabled = disabled;
}

async function fetchChesscomGameList(username) {
  // FIXED: Removed trailing space in URL
  const archResp = await fetch('https://api.chess.com/pub/player/' + encodeURIComponent(username.toLowerCase()) + '/games/archives');
  if (!archResp.ok) throw new Error('User not found');
  const archJson = await archResp.json();
  if (!archJson.archives || !archJson.archives.length) throw new Error('No games');
  
  const archives = archJson.archives.slice().reverse();
  const collected = [];
  const limit = 20;
  
  for (let i = 0; i < archives.length && collected.length < limit; i++) {
    const resp = await fetch(archives[i]);
    if (!resp.ok) continue;
    const json = await resp.json();
    const games = (json.games || []).slice().reverse();
    for (const g of games) {
      if (g.pgn) collected.push(g.pgn);
      if (collected.length >= limit) break;
    }
  }
  if (!collected.length) throw new Error('No games found');
  return collected;
}

async function fetchLichessGameList(username) {
  // FIXED: Removed trailing space in URL
  const resp = await fetch('https://lichess.org/api/games/user/' + encodeURIComponent(username) + '?max=20&pgnInJson=true', {
    headers: { 'Accept': 'application/x-ndjson' }
  });
  if (!resp.ok) throw new Error('User not found');
  const text = await resp.text();
  if (!text.trim()) throw new Error('No games');
  
  const collected = [];
  text.split('\n').forEach(line => {
    if (!line.trim()) return;
    try {
      const obj = JSON.parse(line);
      if (obj && obj.pgn) collected.push(obj.pgn);
    } catch (e) {}
  });
  if (!collected.length) throw new Error('No games');
  return collected;
}

function gameListItemHtml(it, idx) {
  const h = it.headers || {};
  const white = h.White || 'White';
  const black = h.Black || 'Black';
  const result = h.Result || '*';
  return `<button data-game-idx="${idx}" class="w-full text-left px-2.5 py-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/70 border border-zinc-700/60 transition-colors">
    <div class="flex items-center justify-between gap-2 text-xs">
      <span class="truncate text-zinc-200 font-medium">${escapeHtml(white)} vs ${escapeHtml(black)}</span>
      <span class="flex-shrink-0 font-semibold text-zinc-300">${result}</span>
    </div>
  </button>`;
}

function renderGameList(items, sourceLabel) {
  currentGameListItems = items;
  el.gameListMeta.textContent = items.length + ' games · ' + sourceLabel;
  el.gameListItems.innerHTML = items.map((it, idx) => gameListItemHtml(it, idx)).join('');
  el.gameListItems.querySelectorAll('[data-game-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      if(importBusy) return;
      importBusy = true;
      setImportControlsDisabled(true);
      try {
        handleNewPgn(items[idx].pgn, { source: items[idx].source });
        setImportStatus('Loaded ✓');
      } catch(e) {
        setImportStatus('Error: ' + e.message, true);
      } finally {
        importBusy = false;
        setImportControlsDisabled(false);
      }
    });
  });
  el.gameListWrap.classList.remove('hidden');
}

async function fetchChesscom() {
  if (importBusy) return;
  const username = el.chesscomUsername.value.trim();
  if (!username) { setImportStatus('Enter username', true); return; }
  
  importBusy = true;
  setImportControlsDisabled(true);
  el.gameListWrap.classList.add('hidden');
  setImportStatus('Fetching...');
  
  try {
    const pgns = await fetchChesscomGameList(username);
    const items = pgns.map(pgn => ({ pgn, headers: extractPgnHeaders(pgn), source: 'chesscom' }));
    renderGameList(items, 'Chess.com');
    setImportStatus('Pick a game');
  } catch (err) {
    setImportStatus('Error: ' + err.message, true);
  } finally {
    importBusy = false;
    setImportControlsDisabled(false);
  }
}

async function fetchLichess() {
  if (importBusy) return;
  const username = el.lichessUsername.value.trim();
  if (!username) { setImportStatus('Enter username', true); return; }
  
  importBusy = true;
  setImportControlsDisabled(true);
  el.gameListWrap.classList.add('hidden');
  setImportStatus('Fetching...');
  
  try {
    const pgns = await fetchLichessGameList(username);
    const items = pgns.map(pgn => ({ pgn, headers: extractPgnHeaders(pgn), source: 'lichess' }));
    renderGameList(items, 'Lichess');
    setImportStatus('Pick a game');
  } catch (err) {
    setImportStatus('Error: ' + err.message, true);
  } finally {
    importBusy = false;
    setImportControlsDisabled(false);
  }
}

function loadPastedPgn() {
  if (importBusy) return;
  const text = el.pgnInput.value.trim();
  if (!text) { setImportStatus('Paste PGN first', true); return; }
  importBusy = true;
  setImportControlsDisabled(true);
  try {
    handleNewPgn(text);
    setImportStatus('Loaded ✓');
  } catch (err) {
    setImportStatus('Error: ' + err.message, true);
  } finally {
    importBusy = false;
    setImportControlsDisabled(false);
  }
}

/* ================= ANALYSIS LOGIC ================= */
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
    
  const winBest = winPercent(whiteCpBest);
  const winActual = winPercent(whiteCpActual);
  const moverWinBest = sideToMove === 'w' ? winBest : 100 - winBest;
  const moverWinActual = sideToMove === 'w' ? winActual : 100 - winActual;
  const wpl = Math.max(0, moverWinBest - moverWinActual);

  const isBest = before.bestMove === m.uci;
  let cls = isBest ? 'best' : (wpl < 1.5 ? 'excellent' : (wpl < 4.5 ? 'good' : (wpl < 9 ? 'inaccuracy' : (wpl < 18 ? 'mistake' : 'blunder'))));

  // Soften severity in decided games
  if ((cls === 'blunder' || cls === 'mistake') && (moverWinBest >= 92 || moverWinBest <= 8) && (moverWinActual >= 85 || moverWinActual <= 15)) {
    cls = cls === 'blunder' ? 'mistake' : 'inaccuracy';
  }

  m.classification = cls;
  m.wpl = wpl;
  m.moveAccuracy = moveAccuracyFromLoss(wpl);
  m.evalAfterWhiteCp = whiteCpActual;
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
    setEngineStatus('error', 'Engine unavailable');
    return;
  }
  if (analysisInProgress) return;
  
  analysisCancelled = false;
  analysisInProgress = true;
  el.analysisProgressWrap.classList.remove('hidden');
  
  analysisResults = new Array(positions.length).fill(null);
  moveHistory.forEach(m => { m.classification = null; m.moveAccuracy = null; });
  
  const depth = parseInt(el.depthSelect.value || '15', 10);
  try { engine.worker.postMessage('ucinewgame'); } catch (e) {}

  for (let i = 0; i < positions.length; i++) {
    if (analysisCancelled) break;
    const res = await engine.analyze(positions[i], depth, 2);
    analysisResults[i] = res;
    
    const pct = Math.round(((i + 1) / positions.length) * 100);
    el.analysisProgressBar.style.width = pct + '%';
    el.analysisProgressText.textContent = `Analyzing... ${i+1}/${positions.length}`;
    
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
  el.analysisProgressWrap.classList.add('hidden');
  computeAccuracyAndBreakdown();
  renderMoveList(); renderClassBreakdown(); renderAccuracy();
  if (!playMode) renderBoard();
  updateEvalDisplays();
  drawEvalGraph();
}

/* ================= RENDERING ================= */
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
    } else if (currentPly > 0 && moveHistory[currentPly - 1]) {
      cp = moveHistory[currentPly - 1].evalAfterWhiteCp || 0;
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

function renderGameHeader() {
  el.btnSavePgn.disabled = false;
  const h = headers || {};
  const white = h.White || 'White';
  const black = h.Black || 'Black';
  const wr = h.WhiteElo ? ' (' + h.WhiteElo + ')' : '';
  const br = h.BlackElo ? ' (' + h.BlackElo + ')' : '';
  const result = h.Result || '*';

  let html = `<div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-2 min-w-0">
      ${avatarImgHtml(gameMeta.whiteAvatar, white)}
      <span class="font-semibold text-zinc-100 text-base truncate">${escapeHtml(white)}${wr}</span>
    </div>
    <span class="text-zinc-500 text-xs flex-shrink-0 px-1">${result}</span>
    <div class="flex items-center gap-2 min-w-0 justify-end">
      <span class="font-semibold text-zinc-100 text-base truncate text-right">${escapeHtml(black)}${br}</span>
      ${avatarImgHtml(gameMeta.blackAvatar, black)}
    </div>
  </div>`;
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
    html += `<div class="flex items-center justify-between text-sm py-2 border-b border-zinc-800/60">
      <span class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center rounded-full text-[12px] font-bold" style="background:${info.color};color:${info.text||'#fff'};width:24px;height:24px;">${info.symbol}</span>
        <span class="text-zinc-300">${info.label}</span>
      </span>
      <span class="flex gap-4 tabular-nums text-zinc-400 font-medium">
        <span class="w-6 text-right">${wc}</span>
        <span class="w-6 text-right">${bc}</span>
      </span>
    </div>`;
  });
  el.classBreakdown.innerHTML = html;
}

function moveButtonHtml(m) {
  const info = m.classification ? CLASS_INFO[m.classification] : null;
  const active = m.ply === currentPly;
  return `<button data-ply="${m.ply}" class="move-item text-left text-[15px] px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-zinc-700/50 ${active ? 'bg-zinc-700/80 ring-1 ring-amber-400/50' : ''}">
    <span class="text-zinc-200 font-medium">${escapeHtml(m.san)}</span>
    ${info ? `<span class="inline-flex items-center justify-center rounded-full text-[10px] font-bold leading-none" style="background:${info.color};color:${info.text||'#fff'};width:17px;height:17px;">${info.symbol}</span>` : ''}
  </button>`;
}

function renderMoveList() {
  if (!moveHistory.length) {
    el.moveList.innerHTML = '<p class="text-zinc-500 text-sm text-center py-10">No game loaded.</p>';
    return;
  }
  let html = '';
  let i = 0;
  if (moveHistory[0].color === 'b') {
    html += `<div class="grid grid-cols-[2.1rem_1fr_1fr] items-center gap-1">
      <span class="text-zinc-500 text-sm">${moveHistory[0].moveNumber}.</span>
      <span class="text-zinc-600 text-sm italic px-2">…</span>
      ${moveButtonHtml(moveHistory[0])}
    </div>`;
    i = 1;
  }
  for (; i < moveHistory.length; i += 2) {
    const w = moveHistory[i];
    const b = moveHistory[i + 1];
    html += `<div class="grid grid-cols-[2.1rem_1fr_1fr] items-center gap-1">
      <span class="text-zinc-500 text-sm">${w.moveNumber}.</span>
      ${moveButtonHtml(w)}
      ${b ? moveButtonHtml(b) : '<span></span>'}
    </div>`;
  }
  el.moveList.innerHTML = html;
  el.moveList.querySelectorAll('[data-ply]').forEach(btn => {
    btn.addEventListener('click', () => goToPly(parseInt(btn.dataset.ply, 10)));
  });
}

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
      
      // Coordinates
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

/* ================= NAVIGATION & PLAY ================= */
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

function setPlayStatus(text) {
  if (!text) { el.playStatusBanner.classList.add('hidden'); return; }
  el.playStatusBanner.classList.remove('hidden');
  el.playStatusBanner.textContent = text;
}

function enterPlayMode() {
  if (!engine.ready) { setPlayStatus('Engine loading...'); return; }
  if (analysisInProgress) analysisCancelled = true;
  
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
  } else {
    lastPlayEvalWhiteCp = 0; lastPlayEvalMate = null;
  }

  el.playControls.classList.remove('hidden');
  el.playControls.classList.add('flex');
  el.reviewControls.classList.add('hidden');
  setPlayStatus('Play mode — You are ' + (humanColor === 'w' ? 'White' : 'Black'));
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
    const img = document.createElement('img');
    img.src = PIECE_ASSETS[color][p];
    img.onerror = () => { img.src = 'data:image/svg+xml;base64,' + btoa(FALLBACK_SVG[color]); };
    btn.appendChild(img);
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
  setPlayStatus('Engine thinking...');
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
  if (playGame.in_checkmate()) msg = (playGame.turn() === 'w' ? 'Black' : 'White') + ' wins!';
  else if (playGame.in_stalemate()) msg = 'Draw by stalemate.';
  else if (playGame.in_threefold_repetition()) msg = 'Draw by repetition.';
  else if (playGame.insufficient_material()) msg = 'Draw — insufficient material.';
  setPlayStatus(msg);
}

function downloadCurrentPgn() {
  let pgnText = gameMeta.rawPgn || '';
  if (playMode && playGame) {
    try {
      playGame.header('Event', 'Play vs Engine', 'White', humanColor==='w'?'You':'Stockfish', 'Black', humanColor==='w'?'Stockfish':'You');
      pgnText = playGame.pgn({ max_width: 0 });
    } catch(e){}
  }
  if (!pgnText) return;
  const blob = new Blob([pgnText], { type: 'application/x-chess-pgn' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'game.pgn';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ================= INIT ================= */
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
  });

  window.addEventListener('resize', () => { renderBoard(); drawEvalGraph(); });
}

// Start
initElements();
bindEvents();
retryEngineInit(); // Initial load

})();
