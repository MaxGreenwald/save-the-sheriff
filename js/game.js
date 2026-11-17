/* Save the Sheriff fan remake. Original art, levels, and music. */
/* Square playfield, matching the game window in the playthrough (black bars on a 16:9 video). */
var VW = 480, VH = 480, T = 32;
/* 60 Hz. RUN is 1.00 screen width per second (480 px/s, 15 tiles/s).
   Jump apex is 3.75 tiles (120 px). Full air control at the same top speed. */
var RUN = 8.0, GRAV = 0.64, JUMPV = -12.4, MAXF = 13;
var canvas, ctx, frame = 0;
var gs = 'title', sceneT = 0;
var level = null, levelId = 1;
var camX = 0, camY = 0;
var score = 0, coins = 0, lives = 5, hearts = 4, keys = 0, timer = 300, timeAcc = 0;
var scriptI = 0, testing = false, wantTouch = false;
var mx = 0, my = 0, jumpQueue = 0, shake = 0;
var parts = [], floats = [], deathReason = '';
var runSnap = null, highs = [], nickStr = '';
var deadTimer = 0, bonusShow = 0, debugOn = false;
var BTNS = [];
var SAVE_KEY = 'sts-save-v2';

var key = { left: false, right: false, up: false, down: false, jump: false, shift: false };
var touch = { left: false, right: false, jump: false };
var auto = { left: false, right: false, up: false, creep: false, nojump: false };
var ptrs = {};

var P = blankPlayer();

var GFONT = {
  A:[14,17,17,31,17,17,17], B:[30,17,17,30,17,17,30], C:[14,17,16,16,16,17,14],
  D:[30,17,17,17,17,17,30], E:[31,16,16,30,16,16,31], F:[31,16,16,30,16,16,16],
  G:[14,17,16,23,17,17,14], H:[17,17,17,31,17,17,17], I:[14,4,4,4,4,4,14],
  J:[7,2,2,2,2,18,12], K:[17,18,20,24,20,18,17], L:[16,16,16,16,16,16,31],
  M:[17,27,21,21,17,17,17], N:[17,25,21,19,17,17,17], O:[14,17,17,17,17,17,14],
  P:[30,17,17,30,16,16,16], Q:[14,17,17,17,21,18,13], R:[30,17,17,30,20,18,17],
  S:[14,17,16,14,1,17,14], T:[31,4,4,4,4,4,4], U:[17,17,17,17,17,17,14],
  V:[17,17,17,17,17,10,4], W:[17,17,17,21,21,21,10], X:[17,17,10,4,10,17,17],
  Y:[17,17,10,4,4,4,4], Z:[31,1,2,4,8,16,31],
  '0':[14,17,19,21,25,17,14], '1':[4,12,4,4,4,4,14], '2':[14,17,1,6,8,16,31],
  '3':[30,1,1,14,1,1,30], '4':[2,6,10,18,31,2,2], '5':[31,16,30,1,1,17,14],
  '6':[6,8,16,30,17,17,14], '7':[31,1,2,4,8,8,8], '8':[14,17,17,14,17,17,14],
  '9':[14,17,17,15,1,2,12], '.':[0,0,0,0,0,12,12], ':':[0,6,6,0,6,6,0],
  '!':[4,4,4,4,4,0,4], '?':[14,17,1,6,4,0,4], "'":[4,4,8,0,0,0,0],
  '-':[0,0,0,14,0,0,0], '+':[0,4,4,14,4,4,0], '/':[1,2,4,4,8,8,16]
};

function blankPlayer() {
  return { x: 40, y: 400, w: 26, h: 28, vx: 0, vy: 0, dir: 1, ground: false, coyote: 0, iframes: 0, chain: 0, rideId: null, anim: 0, prevX: 40, prevY: 400 };
}

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function overlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function pad(n, w) { n = String(Math.max(0, n | 0)); while (n.length < w) n = '0' + n; return n; }

function loadStore() {
  try {
    var d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    if (typeof d.music === 'boolean') musicOn = d.music;
    if (typeof d.vibra === 'boolean') vibraOn = d.vibra;
    highs = d.highs || [];
    runSnap = d.run || null;
  } catch (e) { highs = []; runSnap = null; }
}
function persist() {
  if (testing) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ music: musicOn, vibra: vibraOn, highs: highs, run: runSnap }));
  } catch (e) {}
}

function tuneFor(biome) {
  if (biome === 'town') return 'town';
  if (biome === 'cave') return 'cave';
  if (biome === 'water') return 'water';
  if (biome === 'sunset') return 'boss';
  return 'desert';
}

function loadLevel(n) {
  levelId = n;
  var def = null;
  for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === n) def = LEVELS[i];
  level = compileLevel(def);
  P = blankPlayer();
  P.x = level.start.x;
  P.y = level.start.y;
  P.prevX = P.x; P.prevY = P.y;
  scriptI = 0;
  keys = 0;
  hearts = 4;
  timer = 300;
  timeAcc = 0;
  parts = []; floats = [];
  camX = Math.max(0, P.x + 16 - VW * 0.36);
  camY = 0;
  deathReason = '';
  jumpQueue = 0;
}

function begin(n, opt) {
  loadLevel(n);
  runSnap = { level: n, score: score, lives: lives, coins: coins };
  persist();
  setTune(n === 11 ? 'boss' : tuneFor(level.def.biome));
  if (opt && opt.instant) gs = 'play';
  else { gs = 'loading'; sceneT = 0; }
}

function respawn() {
  var s = score, l = lives, c = coins, id = levelId;
  loadLevel(id);
  score = s; lives = l; coins = c;
  P.iframes = 50;
  gs = 'play';
}

function tileAt(px, py) {
  if (!level) return TILE.AIR;
  var c = Math.floor(px / T), r = Math.floor(py / T);
  if (r < 0) return TILE.AIR;
  if (c < 0) return TILE.SOLID;
  if (c >= level.cols || r >= level.rows) return TILE.AIR;
  return level.tiles[r * level.cols + c];
}
function tIndex(px, py) {
  var c = Math.floor(px / T), r = Math.floor(py / T);
  if (c < 0 || r < 0 || c >= level.cols || r >= level.rows) return -1;
  return r * level.cols + c;
}
function solidT(t) {
  return t === TILE.SOLID || t === TILE.CRUMBLE || t === TILE.SPIKE || t === TILE.WALL || t === TILE.TNT || t === TILE.GATE;
}
function isSolid(px, py) { return solidT(tileAt(px, py)); }

function clearTiles(c, r, w, h) {
  for (var y = r; y < r + h; y++) for (var x = c; x < c + w; x++) {
    if (x >= 0 && y >= 0 && x < level.cols && y < level.rows) level.tiles[y * level.cols + x] = TILE.AIR;
  }
}
function clearKind(kind) {
  for (var i = 0; i < level.tiles.length; i++) if (level.tiles[i] === kind) level.tiles[i] = TILE.AIR;
}

function phase01(f, period, pause) {
  var full = (period + pause) * 2;
  var t = ((f % full) + full) % full;
  if (t < pause) return 0;
  if (t < pause + period) return (t - pause) / period;
  if (t < pause + period + pause) return 1;
  return 1 - (t - (pause + period + pause)) / period;
}

function moveMovers() {
  var dx = 0, dy = 0, id = P.rideId;
  if (level.plank) {
    var pl = level.plank;
    var prev = pl.x;
    var ph = phase01(frame, pl.period, pl.pause);
    pl.x = pl.origin + ph * pl.dist;
    if (id === 'plank') dx += pl.x - prev;
  }
  for (var i = 0; i < level.pillars.length; i++) {
    var p = level.pillars[i];
    var px0 = p.x, py0 = p.y;
    var ph2 = phase01(frame, p.period, p.pause);
    if (p.axis === 'y') p.y = p.originY + ph2 * p.dist;
    else p.x = p.originX + ph2 * p.dist;
    if (id === p.id) { dx += p.x - px0; dy += p.y - py0; }
  }
  if (level.ride) {
    var r = level.ride;
    var dir = 0;
    if (id === 'ride') {
      if (heldRight()) dir += 1;
      if (heldLeft()) dir -= 1;
      r.vx = dir * 2.15;
    } else r.vx *= 0.8;
    var nx = clamp(r.x + r.vx, r.minX, r.maxX - r.w);
    if (id === 'ride') dx += nx - r.x;
    r.x = nx;
  }
  if (id) { P.x += dx; P.y += dy; }
}

function tops() {
  var list = [];
  if (level.plank) list.push({ id: 'plank', x: level.plank.x, y: level.plank.y, w: level.plank.w, h: 12 });
  for (var i = 0; i < level.pillars.length; i++) {
    var p = level.pillars[i];
    list.push({ id: p.id, x: p.x, y: p.y, w: p.w, h: 16 });
  }
  if (level.ride) list.push({ id: 'ride', x: level.ride.x, y: level.ride.y, w: level.ride.w, h: 16 });
  for (var b = 0; b < level.boulders.length; b++) {
    var bo = level.boulders[b];
    list.push({ id: 'b' + b, x: bo.x, y: bo.y, w: bo.w, h: bo.h, body: bo });
  }
  for (var c = 0; c < level.crates.length; c++) {
    if (level.crates[c].alive) list.push({ id: 'c' + c, x: level.crates[c].x, y: level.crates[c].y, w: 32, h: 32, crate: level.crates[c] });
  }
  for (var s = 0; s < level.springs.length; s++) {
    var sp = level.springs[s];
    list.push({ id: 's' + s, x: sp.x, y: sp.y, w: sp.w, h: sp.h, spring: true });
  }
  return list;
}

function heldLeft() { return key.left || touch.left || auto.left; }
function heldRight() { return key.right || touch.right || auto.right; }
function heldUp() { return key.up || touch.up || auto.up; }

function onLadder() {
  var pts = [[P.x + 8, P.y + 8], [P.x + P.w - 8, P.y + 10], [P.x + P.w / 2, P.y + P.h - 6]];
  for (var i = 0; i < pts.length; i++) if (tileAt(pts[i][0], pts[i][1]) === TILE.LADDER) return true;
  return false;
}

function updatePlayer() {
  var feet = P.y + P.h;
  P.prevX = P.x; P.prevY = P.y;
  var climbing = heldUp() && onLadder() && !auto.nojump;
  var can = P.ground || P.coyote > 0 || !!P.rideId;
  if (jumpQueue > 0 && can && !climbing) {
    P.vy = JUMPV; P.ground = false; P.rideId = null; P.coyote = 0; jumpQueue = 0;
    sfx('jump');
  } else if (jumpQueue > 0) jumpQueue--;

  var speed = auto.creep ? RUN * 0.55 : (key.shift ? RUN * 0.40 : RUN);
  var ridingRoll = P.rideId === 'ride';
  if (!ridingRoll) {
    if (heldLeft()) { P.vx = -speed; P.dir = -1; P.anim++; }
    else if (heldRight()) { P.vx = speed; P.dir = 1; P.anim++; }
    else P.vx *= 0.12;
  } else P.vx = 0;
  if (Math.abs(P.vx) < 0.08) P.vx = 0;

  if (climbing) {
    P.vy = key.down || auto.down ? 2.2 : -2.3;
    P.ground = false; P.rideId = null;
  } else {
    P.vy = Math.min(MAXF, P.vy + GRAV);
  }

  P.x += P.vx;
  if (P.x < 0) { P.x = 0; P.vx = 0; }
  collideX();
  pushBoulders();

  var prevFeet = P.prevY + P.h;
  P.y += P.vy;
  P.ground = false;
  var landedId = null;
  if (!climbing) {
    if (P.vy >= 0) {
      var ropeY = ropeCatch(prevFeet, P.y + P.h);
      var hit = ropeY || groundY(prevFeet, P.y + P.h);
      if (hit !== null) {
        P.y = hit - P.h; P.vy = 0; P.ground = true;
      }
      var list = tops();
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var top = s.y;
        if (s.spring && P.x + P.w - 4 > s.x && P.x + 4 < s.x + s.w && P.y + P.h > s.y && P.y < s.y + s.h + 8 && P.vy >= 0) {
          P.vy = -16.8; P.ground = false; P.rideId = null; sfx('spring');
          burst(s.x + 14, s.y, '#e86bff', 6);
          landedId = null;
          break;
        }
        if (P.x + P.w - 4 > s.x && P.x + 4 < s.x + s.w && prevFeet <= top + 6 && P.y + P.h >= top && P.y + P.h <= top + 22) {
          P.y = top - P.h; P.vy = 0; P.ground = true; landedId = s.id;
        }
      }
    } else {
      if (isSolid(P.x + 6, P.y) || isSolid(P.x + P.w - 6, P.y)) {
        P.y = Math.floor(P.y / T) * T + T;
        P.vy = 0;
      }
    }
  }
  P.rideId = landedId;
  if (P.ground) P.coyote = 6; else if (P.coyote > 0) P.coyote--;
  stepUp();
  hazards();
  if (P.iframes > 0) P.iframes--;
  if (P.y > level.rows * T + 8) loseLife('pit');
}

function collideX() {
  var y1 = P.y + 4, y2 = P.y + P.h - 8;
  if (P.vx > 0) {
    if (isSolid(P.x + P.w, y1) || isSolid(P.x + P.w, y2)) {
      P.x = Math.floor((P.x + P.w) / T) * T - P.w;
      P.vx = 0;
    }
  } else if (P.vx < 0) {
    if (isSolid(P.x, y1) || isSolid(P.x, y2)) {
      P.x = Math.floor(P.x / T) * T + T;
      P.vx = 0;
    }
  }
}

function groundY(prevFeet, feet) {
  if (feet < prevFeet) return null;
  var found = null;
  var x1 = P.x + 5, x2 = P.x + P.w - 5;
  for (var s = Math.ceil((prevFeet + 0.01) / T) * T; s <= feet + 0.01; s += T) {
    if (supportAt(x1, s) || supportAt(x2, s)) found = s;
  }
  if (found === null && (supportAt(x1, feet + 1) || supportAt(x2, feet + 1))) {
    found = Math.floor(feet / T) * T;
    if (found < prevFeet - 2) found = null;
  }
  return found;
}
function ropeCatch(prevFeet, feet) {
  if (feet < prevFeet - 1) return 0;
  var xs = [P.x + 6, P.x + P.w - 6];
  for (var i = 0; i < xs.length; i++) {
    var c = Math.floor(xs[i] / T);
    if (c < 0 || c >= level.cols) continue;
    var r0 = Math.max(0, Math.floor((feet - 20) / T));
    var r1 = Math.min(level.rows - 1, Math.floor(feet / T));
    for (var r = r0; r <= r1; r++) {
      var t = level.tiles[r * level.cols + c];
      if (t !== TILE.ROPE && t !== TILE.WIRE) continue;
      var bottom = (r + 1) * T;
      if (prevFeet <= bottom + 8 && feet >= bottom - 18) return bottom;
    }
  }
  return 0;
}
function supportAt(x, surfaceY) {
  var t = tileAt(x, surfaceY + 1);
  if (solidT(t)) return true;
  var above = tileAt(x, surfaceY - 1);
  if (above !== TILE.ROPE && above !== TILE.WIRE) return false;
  var bottom = (Math.floor((surfaceY - 1) / T) + 1) * T;
  return Math.abs(surfaceY - bottom) < 1.6;
}

function pushBoulders() {
  for (var i = 0; i < level.boulders.length; i++) {
    var b = level.boulders[i];
    if (b.snapped || b.slot >= 0) continue;
    if (!overlap(P, b)) continue;
    if (P.y + P.h > b.y + 12 && P.y < b.y + b.h - 6) {
      var dir = (P.x + P.w / 2) < (b.x + b.w / 2) ? 1 : -1;
      b.vx = dir * 1.85;
      if (dir > 0) P.x = b.x - P.w - 0.5;
      else P.x = b.x + b.w + 0.5;
      P.vx = 0;
    }
  }
  for (var c = 0; c < level.crates.length; c++) {
    var cr = level.crates[c];
    if (!cr.alive || !overlap(P, cr)) continue;
    if (P.y + P.h > cr.y + 10 && P.prevY + P.h <= cr.y + 8) continue;
    if (P.x + P.w / 2 < cr.x + cr.w / 2) P.x = cr.x - P.w - 0.2;
    else P.x = cr.x + cr.w + 0.2;
    P.vx = 0;
  }
}

function stepUp() {
  if (!P.ground) return;
  var dir = heldRight() ? 1 : heldLeft() ? -1 : 0;
  if (!dir) return;
  var feet = P.y + P.h;
  var front = dir > 0 ? P.x + P.w + 1 : P.x - 1;
  if (isSolid(front, feet - 8) && !isSolid(front, feet - 36) && !isSolid(P.x + 8, feet - 36) && !isSolid(P.x + P.w - 8, feet - 36)) {
    var top = Math.floor((feet - 8) / T) * T;
    if (feet - top <= 34 && feet - top >= 8) { P.y = top - P.h; P.vy = 0; return; }
  }
  var list = tops();
  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    if (s.spring) continue;
    if (front < s.x - 2 || front > s.x + s.w + 2) continue;
    if (s.y < feet - 36 || s.y > feet - 8) continue;
    if (isSolid(P.x + 6, s.y - 10) || isSolid(P.x + P.w - 6, s.y - 10)) continue;
    P.y = s.y - P.h; P.vy = 0; P.ground = true; P.rideId = s.id;
    return;
  }
}

function hazards() {
  if (gs !== 'play') return;
  var feet = P.y + P.h;
  var i1 = tIndex(P.x + 8, feet - 2), i2 = tIndex(P.x + P.w - 8, feet - 2);
  if (P.ground) {
    if ((i1 >= 0 && level.tiles[i1] === TILE.SPIKE) || (i2 >= 0 && level.tiles[i2] === TILE.SPIKE)) hurt('spike');
    [i1, i2].forEach(function (i) {
      if (i >= 0 && level.tiles[i] === TILE.CRUMBLE && level.crumble[i] === 0) level.crumble[i] = 46;
    });
  }
  var samples = [[P.x + P.w / 2, feet - 4], [P.x + 6, P.y + P.h / 2], [P.x + P.w - 6, feet - 8]];
  for (var s = 0; s < samples.length; s++) {
    if (tileAt(samples[s][0], samples[s][1]) === TILE.WATER) { sfx('splash'); loseLife('water'); return; }
  }
}

function tickCrumble() {
  for (var i = 0; i < level.crumble.length; i++) {
    if (level.crumble[i] > 0) {
      level.crumble[i]--;
      if (level.crumble[i] === 0 && level.tiles[i] === TILE.CRUMBLE) {
        level.tiles[i] = TILE.AIR;
        burst((i % level.cols) * T + 16, Math.floor(i / level.cols) * T + 16, '#d9c08a', 5);
      }
    }
  }
}

function updateBoulders() {
  var basin = level.def.basin;
  for (var i = 0; i < level.boulders.length; i++) {
    var b = level.boulders[i];
    if (b.snapped) continue;
    if (b.slot >= 0) {
      var sl = level.slots[b.slot];
      b.x += clamp(sl.x - b.x, -3, 3);
      b.y += clamp(sl.y - b.y, -3, 3);
      if (Math.abs(sl.x - b.x) < 2 && Math.abs(sl.y - b.y) < 2) {
        b.x = sl.x; b.y = sl.y; b.snapped = true; b.vx = 0; b.vy = 0;
        level.counters.slots++;
      }
      continue;
    }
    b.vy = Math.min(9, b.vy + 0.5);
    b.x += b.vx;
    if (hitBoxX(b)) b.vx = 0;
    b.y += b.vy;
    b.grounded = false;
    if (hitBoxY(b)) { b.grounded = true; b.vy = 0; b.vx *= 0.9; }
    if (Math.abs(b.vx) < 0.06) b.vx = 0;
    for (var o = 0; o < level.boulders.length; o++) {
      if (o === i) continue;
      var oth = level.boulders[o];
      if (oth.snapped || oth.slot >= 0) continue;
      if (b.x < oth.x + oth.w && b.x + b.w > oth.x && b.y < oth.y + oth.h && b.y + b.h > oth.y) {
        if (b.x <= oth.x && b.vx > 0) oth.vx = Math.max(oth.vx, b.vx);
        if (b.x > oth.x && b.vx < 0) oth.vx = Math.min(oth.vx, b.vx);
        if (b.x < oth.x) b.x = oth.x - b.w; else oth.x = b.x - oth.w;
      }
    }
    if (basin && b.grounded && b.y > basin.y) {
      for (var s = 0; s < level.slots.length; s++) if (!level.slots[s].taken) {
        level.slots[s].taken = true; b.slot = s; break;
      }
    }
    for (var c = 0; c < level.crates.length; c++) {
      var cr = level.crates[c];
      if (!cr.alive) continue;
      var near = b.x < cr.x + cr.w + 8 && b.x + b.w > cr.x - 8 && b.y < cr.y + cr.h + 6 && b.y + b.h > cr.y - 6;
      if (near && (Math.abs(b.vx) > 0.3 || b.vy > 1 || b.grounded)) {
        cr.alive = false;
        level.counters.crates++;
        sfx('boom'); burst(cr.x + 16, cr.y + 16, '#c4944a', 10); shake = 6;
      }
    }
  }
}
function hitBoxX(b) {
  var y1 = b.y + 4, y2 = b.y + b.h - 6;
  if (b.vx > 0 && (isSolid(b.x + b.w - 1, y1) || isSolid(b.x + b.w - 1, y2))) {
    b.x = Math.floor((b.x + b.w - 1) / T) * T - b.w; return true;
  }
  if (b.vx < 0 && (isSolid(b.x, y1) || isSolid(b.x, y2))) {
    b.x = Math.floor(b.x / T) * T + T; return true;
  }
  return false;
}
function hitBoxY(b) {
  if (b.vy <= 0) return false;
  var x1 = b.x + 4, x2 = b.x + b.w - 4, fy = b.y + b.h;
  if (isSolid(x1, fy) || isSolid(x2, fy)) {
    b.y = Math.floor(fy / T) * T - b.h; return true;
  }
  return false;
}

function updateEnemies() {
  for (var i = 0; i < level.enemies.length; i++) {
    var e = level.enemies[i];
    if (!e.alive) continue;
    if (e.kind === 'frog') {
      e.flip++;
      if (e.flip % 70 === 0) e.dir *= -1;
    } else if (e.kind === 'snake' || e.kind === 'bird' || e.kind === 'gun') {
      var sp = e.kind === 'bird' ? 1.5 : e.kind === 'snake' ? 1.15 : 0.85;
      e.x += e.dir * sp;
      if (e.x <= e.minX) { e.x = e.minX; e.dir = 1; }
      if (e.x >= e.maxX) { e.x = e.maxX; e.dir = -1; }
      if (e.kind === 'bird') e.y = e.r * T + Math.sin(frame * 0.12 + i) * 6;
      if (e.kind === 'gun') {
        e.cool--;
        if (e.cool <= 0) {
          e.cool = 115;
          level.bullets.push({ x: e.x + (e.dir > 0 ? e.w : 0), y: e.y + 16, vx: e.dir * 3.3, life: 110 });
        }
      }
    } else if (e.kind === 'net') {
      e.swing = Math.sin(frame * 0.08 + i);
    } else if (e.kind === 'bug') {
      if (!e.swoop) {
        e.x = e.homeX; e.y = e.homeY + Math.sin(frame * 0.05 + i) * 3;
        if (Math.abs(P.x - e.homeX) < 100 && P.y > e.homeY - 10 && frame % 10 === 0) {
          e.swoop = 1; e.swoopT = 0; e.lockX = P.x;
        }
      } else {
        e.swoopT += 0.018;
        if (e.swoopT >= 1) e.swoop = 0;
        else {
          e.x = e.homeX + (e.lockX - e.homeX) * e.swoopT;
          e.y = e.homeY + Math.sin(e.swoopT * Math.PI) * 64;
        }
      }
    } else if (e.kind === 'hostage') {
      e.y = e.r * T - 8;
    }
  }
  for (var b = level.bullets.length - 1; b >= 0; b--) {
    var bul = level.bullets[b];
    bul.x += bul.vx; bul.life--;
    if (bul.life <= 0 || isSolid(bul.x, bul.y)) level.bullets.splice(b, 1);
  }
  for (var f = 0; f < level.fish.length; f++) {
    var fish = level.fish[f];
    var cyc = (frame + fish.phase) % 160;
    fish.on = cyc < 74;
    fish.y = 15 * T - (fish.on ? Math.sin((cyc / 74) * Math.PI) * 58 : -10);
    fish.x = fish.x;
  }
  for (var h = 0; h < level.sheriffs.length; h++) {
    var sh = level.sheriffs[h];
    if (sh.got) continue;
    sh.vy = Math.min(8, (sh.vy || 0) + 0.45);
    sh.y += sh.vy;
    if (isSolid(sh.x + 8, sh.y + 36)) { sh.y = Math.floor((sh.y + 36) / T) * T - 36; sh.vy = 0; }
  }
}

function combat() {
  if (P.iframes > 0) return;
  var feet = P.y + P.h;
  var prevFeet = P.prevY + P.h;
  for (var i = 0; i < level.enemies.length; i++) {
    var e = level.enemies[i];
    if (!e.alive) continue;
    var hb = { x: e.x + 2, y: e.y + 2, w: e.w - 4, h: e.h - 4 };
    var stomp = P.vy > 0 && P.x < e.x + e.w - 2 && P.x + P.w > e.x + 2 && feet < e.y + e.h * 0.62 && feet > e.y - 10 && prevFeet <= e.y + e.h * 0.45;
    if (stomp) {
      P.vy = -10.6; P.ground = false; P.chain++; P.rideId = null;
      score += 100 * P.chain;
      floatText(e.x, e.y - 12, String(100 * P.chain), '#ffe14a');
      sfx('stomp'); burst(e.x + 10, e.y, '#ffd0a8', 6);
      if (e.kind === 'hostage') {
        e.alive = false;
        level.counters.hostages++;
        level.sheriffs.push({ x: e.x, y: e.y, vy: -2, got: false });
        great();
      } else e.alive = false;
      continue;
    }
    var hurtBox = hb;
    if (e.kind === 'net' && (P.x - e.x) * e.dir > 0 && Math.abs(P.x - e.x) < 78) {
      hurtBox = { x: e.x + (e.dir > 0 ? e.w - 4 : -22), y: e.y + 10, w: 26, h: 16 };
      if (overlap(P, hurtBox)) { hurt('net'); return; }
      hurtBox = hb;
    }
    if (overlap(P, hurtBox)) { hurt(e.kind); return; }
  }
  for (var b = 0; b < level.bullets.length; b++) {
    var bul = level.bullets[b];
    if (Math.abs(bul.x - (P.x + P.w / 2)) < 12 && Math.abs(bul.y - (P.y + 12)) < 14) { hurt('bullet'); return; }
  }
  for (var f = 0; f < level.fish.length; f++) {
    var fish = level.fish[f];
    if (!fish.on) continue;
    if (Math.abs(fish.x - (P.x + 13)) < 18 && Math.abs(fish.y - (P.y + 14)) < 16) { hurt('fish'); return; }
  }
  if (P.ground) P.chain = 0;
}

function updateBoss() {
  var b = level.boss;
  if (!b || !b.alive) return;
  var ground = 15 * T;
  b.timer--;
  if (b.state === 'hover') {
    var dx = (P.x + P.w / 2) - (b.x + b.w / 2);
    b.x += clamp(dx * 0.05, -1.8, 1.8);
    b.x = clamp(b.x, level.def.arena[0] * T, level.def.arena[1] * T - b.w);
    b.y = b.hoverY;
    if (b.timer <= 0) { b.state = 'pause'; b.timer = 70; }
  } else if (b.state === 'pause') {
    if (b.timer <= 0) { b.state = 'shake'; b.timer = 42; }
  } else if (b.state === 'shake') {
    b.x += Math.sin(frame * 1.3) * 1.4;
    if (b.timer <= 0) { b.state = 'slam'; b.vy = 0; }
  } else if (b.state === 'slam') {
    b.vy = 8.2; b.y += b.vy;
    if (b.y + b.h >= ground) {
      b.y = ground - b.h; b.state = 'landed'; b.timer = 120; sfx('boom'); shake = 8;
    }
  } else if (b.state === 'landed') {
    if (b.timer <= 0) b.state = 'rise';
  } else if (b.state === 'rise') {
    b.y -= 3.4;
    if (b.y <= b.hoverY) { b.y = b.hoverY; b.state = 'hover'; b.timer = 50; }
  }
  if (P.iframes > 0 || gs !== 'play') return;
  var head = { x: b.x + b.w / 2 - 20, y: b.y - 22, w: 40, h: 24 };
  var body = { x: b.x + 8, y: b.y + 8, w: b.w - 16, h: b.h - 10 };
  var feet = P.y + P.h;
  var headWide = P.x + P.w > b.x && P.x < b.x + b.w && P.vy > 0 && feet < b.y + 28 && P.y < b.y + 20;
  if (b.state === 'landed' && (headWide || (P.vy > 0 && overlap(P, head) && feet < b.y + 8))) {
    P.vy = -10.6; P.ground = false; P.chain++;
    score += 100 * P.chain;
    floatText(b.x + 20, b.y - 36, String(100 * P.chain), '#ffe14a');
    sfx('stomp'); b.hp--; shake = 6; P.iframes = 28;
    if (b.hp <= 0) {
      b.alive = false; level.counters.boss = 1; clearKind(TILE.GATE);
      great(); sfx('boom'); burst(b.x + 40, b.y + 20, '#ffb020', 18); shake = 12;
    }
  } else if (b.state === 'slam' && P.y + P.h > b.y + b.h - 18 && P.x + P.w > b.x + 24 && P.x < b.x + b.w - 24) hurt('boss');
  else if (b.state === 'landed' && P.ground && overlap(P, body)) hurt('boss');
}

function pickups() {
  for (var i = 0; i < level.tokens.length; i++) {
    var t = level.tokens[i];
    if (t.got) continue;
    if (overlap(P, t)) {
      t.got = true; coins++; score += 100; sfx('coin');
      floatText(t.x, t.y, '100', '#9fd7ff'); burst(t.x + 16, t.y + 16, '#7ec8ff', 5);
    }
  }
  for (var k = 0; k < level.keys.length; k++) {
    var keyItem = level.keys[k];
    if (keyItem.got) continue;
    if (overlap(P, keyItem)) { keyItem.got = true; keys++; sfx('key'); floatText(keyItem.x, keyItem.y - 8, 'KEY', '#ffd24a'); }
  }
  for (var p = 0; p < level.plungers.length; p++) {
    var pl = level.plungers[p];
    if (pl.used || !overlap(P, pl)) continue;
    pl.used = true; level.counters.plungers++;
    if (pl.clears) pl.clears.forEach(function (c) { clearTiles(c.c, c.r, c.w, c.h); });
    else { clearKind(TILE.WALL); clearKind(TILE.TNT); }
    sfx('boom'); great(); shake = 7; burst(pl.x, pl.y, '#ff7a22', 12);
  }
  for (var d = 0; d < level.doors.length; d++) {
    var door = level.doors[d];
    if (door.used || !overlap(P, door)) continue;
    if (door.needKey && keys <= 0) { if (frame % 40 === 0) floatText(door.x - 10, door.y - 16, 'NEED KEY', '#ff8a8a'); continue; }
    if (door.needKey) { keys--; level.counters.keyed++; }
    door.used = true;
    if (door.great) great();
    sfx('key');
    if (door.exit) { completeLevel(); return; }
    if (door.toC != null) {
      P.x = door.toC * T + 4;
      P.y = (door.toR + 1) * T - P.h;
      P.vx = 0; P.vy = 0; P.ground = false;
      var st = level.script[scriptI];
      if (st && st[0] === 'goto') scriptI++;
    }
  }
  for (var s = 0; s < level.signs.length; s++) if (overlap(P, level.signs[s])) { completeLevel(); return; }
  for (var c = 0; c < level.caves.length; c++) if (overlap(P, level.caves[c])) { completeLevel(); return; }
  if (level.def.exit === 'edge' && P.ground && P.x + P.w >= level.cols * T - 6) completeLevel();
  for (var h = 0; h < level.sheriffs.length; h++) {
    var sh = level.sheriffs[h];
    if (sh.got) continue;
    if (overlap(P, { x: sh.x, y: sh.y, w: 28, h: 36 })) {
      sh.got = true; if (hearts < 4) hearts++; sfx('coin'); floatText(sh.x, sh.y - 10, 'HEART', '#ff5a6a');
    }
  }
}

function hurt(why) {
  if (P.iframes > 0 || gs !== 'play') return;
  hearts--;
  P.iframes = 84;
  P.vy = -4.2;
  P.vx = P.dir * -1.5;
  deathReason = why || 'hurt';
  sfx('hurt');
  shake = 5;
  if (vibraOn && navigator.vibrate) try { navigator.vibrate(28); } catch (e) {}
  if (hearts <= 0) loseLife(why || 'hearts');
}
function loseLife(why) {
  if (gs !== 'play') return;
  lives--;
  deathReason = why || deathReason || 'dead';
  sfx('die');
  if (lives <= 0) { gs = 'gameover'; runSnap = null; persist(); }
  else { gs = 'dead'; deadTimer = 42; }
}
function great() { floatText(P.x - 10, P.y - 28, 'GREAT!', '#ffe14a'); sfx('great'); }
function floatText(x, y, t, c) { floats.push({ x: x, y: y, t: t, c: c || '#fff', life: 48 }); }
function burst(x, y, c, n) {
  for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: (Math.random() - 0.5) * 4.2, vy: (Math.random() - 0.85) * 3.4, life: 18 + (i % 5) * 3, c: c, s: 2 + (i % 3) });
}

function completeLevel() {
  if (gs !== 'play') return;
  bonusShow = timer * 10;
  score += bonusShow;
  sfx('win');
  gs = 'leveldone';
  sceneT = 0;
  setTune('title');
}

function updatePlay() {
  if (!level) return;
  tickCrumble();
  moveMovers();
  updatePlayer();
  if (gs !== 'play') return;
  updateBoulders();
  updateEnemies();
  combat();
  if (gs !== 'play') return;
  updateBoss();
  if (gs !== 'play') return;
  pickups();
  timeAcc++;
  if (timeAcc >= 60) {
    timeAcc = 0;
    if (timer > 0) timer--;
    else loseLife('time');
  }
  updateCam();
  parts = parts.filter(function (p) { p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life--; return p.life > 0; });
  floats = floats.filter(function (f) { f.y -= 0.7; f.life--; return f.life > 0; });
  if (shake > 0) shake--;
}
function updateCam() {
  /* Horizontal follow is quick so a 1-screen-per-second run does not leave the pig behind.
     Vertical follow stays put during a normal jump and only scrolls when the pig
     climbs into the top of the view or drops near the bottom, which is how the
     playthrough keeps the ground band glued to the bottom of the square. */
  var tx = P.x + P.w * 0.5 - VW * 0.36;
  var head = P.y - camY;
  var feet = P.y + P.h - camY;
  var ty = camY;
  if (head < VH * 0.22) ty = P.y - VH * 0.22;
  if (feet > VH * 0.86) ty = P.y + P.h - VH * 0.86;
  camX += (tx - camX) * 0.34;
  camY += (ty - camY) * 0.2;
  camX = clamp(camX, 0, Math.max(0, level.cols * T - VW));
  camY = clamp(camY, 0, Math.max(0, level.rows * T - VH));
}

function updateScene() {
  sceneT++;
  if (gs === 'loading' && sceneT > 72) { gs = 'presskey'; sceneT = 0; }
  if (gs === 'levelcard') {
    if (sceneT > 78) gs = 'play';
  }
  if (gs === 'leveldone' && sceneT > 150) advance();
  if (gs === 'victory' && sceneT === 1) setTune('title');
}

function advance() {
  if (levelId >= 11) { gs = 'victory'; sceneT = 0; runSnap = null; persist(); return; }
  begin(levelId + 1);
}

function anyPress() {
  if (gs === 'presskey') { gs = 'levelcard'; sceneT = 0; sfx('click'); return; }
  if (gs === 'levelcard') { gs = 'play'; return; }
  if (gs === 'leveldone') advance();
  if (gs === 'dead') { /* wait */ }
}

/* ---------------- draw ---------------- */
function round(x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}
function glyphText(str, x, y, s, col) {
  str = String(str).toUpperCase();
  var cx = x;
  ctx.fillStyle = col;
  for (var i = 0; i < str.length; i++) {
    var ch = str.charAt(i);
    if (ch === ' ') { cx += 4 * s; continue; }
    var g = GFONT[ch];
    if (!g) { cx += 6 * s; continue; }
    for (var row = 0; row < 7; row++) for (var colb = 0; colb < 5; colb++) {
      if ((g[row] >> (4 - colb)) & 1) ctx.fillRect(cx + colb * s, y + row * s, s, s);
    }
    cx += 6 * s;
  }
}
function text(str, x, y, s, col, outline) {
  if (outline) {
    glyphText(str, x - s, y, s, outline); glyphText(str, x + s, y, s, outline);
    glyphText(str, x, y - s, s, outline); glyphText(str, x, y + s, s, outline);
  }
  glyphText(str, x, y, s, col);
}
function textWidth(str, s) {
  var w = 0;
  str = String(str).toUpperCase();
  for (var i = 0; i < str.length; i++) w += (str.charAt(i) === ' ' ? 4 : 6) * s;
  return w;
}
function textC(str, cx, y, s, col, outline) { text(str, cx - textWidth(str, s) / 2, y, s, col, outline); }

function drawSky() {
  var playing = gs === 'play' || gs === 'pause' || gs === 'dead' || gs === 'leveldone';
  var sky = playing && level ? level.def.sky : 'day';
  ctx.fillStyle = sky === 'sunset' ? '#f0b06a' : sky === 'rain' ? '#9eb8cc' : '#8ecff2';
  ctx.fillRect(0, 0, VW, VH);
  if (sky === 'rain') {
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    for (var r = 0; r < 28; r++) {
      var rx = (r * 37 + frame * 5) % VW, ry = (r * 53 + frame * 8) % VH;
      ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx, ry + 10); ctx.stroke();
    }
  }
}

function biomeColors() {
  var b = level ? level.def.biome : 'desert';
  if (b === 'town') return { fill: '#d4894e', top: '#e2a868', edge: '#7a3d22', brick: '#b85a3a' };
  if (b === 'cave') return { fill: '#8e93a0', top: '#67c24a', edge: '#3e4452', brick: '#6d7382' };
  if (b === 'water') return { fill: '#e0b45e', top: '#73d04e', edge: '#3d6a28', brick: '#c49a48' };
  if (b === 'sunset') return { fill: '#f0c15a', top: '#ffe08a', edge: '#a85a20', brick: '#e0a040' };
  if (b === 'canyon') return { fill: '#e8a04a', top: '#f2c56a', edge: '#8a4a18', brick: '#d09040' };
  return { fill: '#efc56e', top: '#f6d78a', edge: '#a87430', brick: '#e2b25c' };
}

function drawWorld() {
  var col = biomeColors();
  var c0 = Math.max(0, Math.floor(camX / T) - 1), c1 = Math.min(level.cols, Math.ceil((camX + VW) / T) + 1);
  var r0 = Math.max(0, Math.floor(camY / T) - 1), r1 = Math.min(level.rows, Math.ceil((camY + VH) / T) + 1);
  for (var r = r0; r < r1; r++) for (var c = c0; c < c1; c++) {
    var t = level.tiles[r * level.cols + c];
    if (!t) continue;
    var x = c * T, y = r * T;
    if (t === TILE.WATER) {
      ctx.fillStyle = 'rgba(32,110,210,0.85)'; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = 'rgba(180,230,255,0.5)'; ctx.fillRect(x, y, T, 4);
      continue;
    }
    if (t === TILE.LADDER) {
      ctx.fillStyle = '#8a5a2a'; ctx.fillRect(x + 4, y, 4, T); ctx.fillRect(x + 24, y, 4, T);
      ctx.fillStyle = '#c48a44'; ctx.fillRect(x + 4, y + 8, 24, 3); ctx.fillRect(x + 4, y + 20, 24, 3);
      continue;
    }
    if (t === TILE.ROPE || t === TILE.WIRE) {
      var yy = y + T - 6;
      ctx.fillStyle = t === TILE.WIRE ? '#222' : '#8a6230';
      ctx.fillRect(x, yy, T, t === TILE.WIRE ? 2 : 4);
      if (t === TILE.ROPE) { ctx.fillStyle = '#c09058'; ctx.fillRect(x, yy + 1, T, 2); }
      continue;
    }
    var cracked = t === TILE.CRUMBLE && level.crumble[r * level.cols + c] > 0 && (frame % 4 < 2);
    var above = r > 0 ? level.tiles[(r - 1) * level.cols + c] : 0;
    var below = r < level.rows - 1 ? level.tiles[(r + 1) * level.cols + c] : 0;
    var leftN = c > 0 ? level.tiles[r * level.cols + c - 1] : 0;
    var rightN = c < level.cols - 1 ? level.tiles[r * level.cols + c + 1] : 0;
    var skyC = level.def.sky === 'sunset' ? '#f0b06a' : level.def.sky === 'rain' ? '#9eb8cc' : '#8ecff2';
    var merged = solidT(t) && t !== TILE.TNT && t !== TILE.WALL && t !== TILE.GATE && t !== TILE.SPIKE;
    if (merged) {
      ctx.fillStyle = col.fill;
      ctx.fillRect(x, y, T, T);
      ctx.fillStyle = 'rgba(90,50,20,0.22)';
      for (var sy = (y + 4) - ((y + 4) % 4); sy < y + T; sy += 4) ctx.fillRect(x, sy, T, 1);
      ctx.fillStyle = '#5a3d22';
      if (!solidT(above)) ctx.fillRect(x, y, T, 2);
      if (!solidT(below)) ctx.fillRect(x, y + T - 2, T, 2);
      if (!solidT(leftN)) ctx.fillRect(x, y, 2, T);
      if (!solidT(rightN)) ctx.fillRect(x + T - 2, y, 2, T);
      if (!solidT(above)) {
        ctx.fillStyle = col.top;
        ctx.fillRect(x + (solidT(leftN) ? 0 : 3), y + 2, T - (solidT(leftN) ? 0 : 3) - (solidT(rightN) ? 0 : 3), 3);
        if ((c % 4) === 0) {
          ctx.fillStyle = '#3d9a40';
          ctx.fillRect(x + 8, y - 4, 2, 4); ctx.fillRect(x + 12, y - 6, 2, 6); ctx.fillRect(x + 16, y - 3, 2, 3);
        }
        ctx.fillStyle = skyC;
        if (!solidT(leftN)) { ctx.fillRect(x, y, 4, 1); ctx.fillRect(x, y + 1, 2, 1); ctx.fillRect(x, y + 2, 1, 1); }
        if (!solidT(rightN)) { ctx.fillRect(x + T - 4, y, 4, 1); ctx.fillRect(x + T - 2, y + 1, 2, 1); ctx.fillRect(x + T - 1, y + 2, 1, 1); }
      }
    } else {
      var fill = t === TILE.TNT ? '#c4442a' : t === TILE.WALL || t === TILE.GATE ? '#b7bcc6' : t === TILE.SPIKE ? '#c8c2b4' : col.fill;
      ctx.fillStyle = '#5a3d22'; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = fill; ctx.fillRect(x + 1, y + 1, T - 2, T - 2);
    }
    if (t === TILE.CRUMBLE) {
      ctx.strokeStyle = '#6d5a34'; ctx.strokeRect(x + 6, y + 8, 8, 8); ctx.strokeRect(x + 16, y + 16, 8, 6);
    }
    if (t === TILE.SPIKE) {
      ctx.fillStyle = '#eee';
      for (var k = 0; k < 3; k++) ctx.fillRect(x + 6 + k * 8, y - 8, 4, 10);
    }
    if (t === TILE.TNT) { ctx.fillStyle = '#ffe14a'; ctx.fillRect(x + 8, y + 12, 16, 8); ctx.fillStyle = '#222'; ctx.fillRect(x + 14, y + 4, 4, 8); }
    if (cracked) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 4, y + 4, T - 8, T - 8); }
  }
  if (level.def.water) {
    /* water tiles already drawn */
  }
}

function drawPig(x, y, dir, anim, air) {
  ART.pig(ctx, x - 4, y - 2, Math.floor(anim / 5), dir, air);
}
function box(x, y, w, h, fill) {
  ctx.fillStyle = '#1a120c'; ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
}

function drawActors() {
  level.decals.buildings.forEach(function (b) {
    var x = b[0] * T, y = b[1] * T, w = b[2] * T, h = b[3] * T;
    ctx.fillStyle = '#1a120c'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#c47a45'; ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
    ctx.fillStyle = '#8d4a28';
    for (var wy = y + 16; wy < y + h - 16; wy += 28) for (var wx = x + 10; wx < x + w - 14; wx += 26) {
      ctx.fillStyle = '#203040'; ctx.fillRect(wx, wy, 14, 16);
      ctx.fillStyle = '#9fd0ea'; ctx.fillRect(wx + 2, wy + 2, 10, 12);
    }
  });
  level.decals.cacti.forEach(function (c) { drawCactus(c[0] * T, (c[1] + 1) * T); });
  if (level.decals.saloon) drawSaloon(level.decals.saloon[0] * T, (level.decals.saloon[1] + 1) * T);
  level.decals.poles.forEach(function (p) { drawPole(p[0] * T, (p[1] + 1) * T, p[2] * T); });

  if (level.plank) {
    var pl = level.plank;
    ctx.fillStyle = '#1a120c'; ctx.fillRect(pl.x, pl.y - 8, pl.w, 10);
    ctx.fillStyle = '#d7a15a'; ctx.fillRect(pl.x + 1, pl.y - 7, pl.w - 2, 8);
    ctx.fillStyle = '#2a6ec2';
    ctx.beginPath(); ctx.arc(pl.x + 10, pl.y + 2, 5, 0, 7); ctx.arc(pl.x + pl.w - 10, pl.y + 2, 5, 0, 7); ctx.fill();
  }
  level.pillars.forEach(function (p) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(p.x + 6, p.y, p.w - 12, p.h);
    ctx.fillStyle = '#b7bcc8'; ctx.fillRect(p.x + 8, p.y + 2, p.w - 16, p.h - 4);
    ctx.fillStyle = '#8b919e'; ctx.fillRect(p.x, p.y, p.w, 14);
  });
  if (level.ride) {
    var rd = level.ride;
    ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.arc(rd.x + rd.w / 2, rd.y + 20, 30, 0, 7); ctx.fill();
    ctx.fillStyle = '#9aa0aa'; ctx.beginPath(); ctx.arc(rd.x + rd.w / 2, rd.y + 18, 26, 0, 7); ctx.fill();
    ctx.fillStyle = '#d5d8e0'; ctx.beginPath(); ctx.arc(rd.x + rd.w / 2 - 8, rd.y + 8, 8, 0, 7); ctx.fill();
  }
  level.springs.forEach(function (s) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(s.x, s.y + 8, s.w, 14);
    ctx.fillStyle = '#d0d4dc'; ctx.fillRect(s.x + 4, s.y + 10, s.w - 8, 4); ctx.fillRect(s.x + 6, s.y + 4, s.w - 12, 4); ctx.fillRect(s.x + 4, s.y + 16, s.w - 8, 4);
    ctx.fillStyle = '#f2f4f8'; ctx.fillRect(s.x - 2, s.y, s.w + 4, 5);
  });
  level.boulders.forEach(function (b) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = '#8e949e'; ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, b.h - 4);
    ctx.fillStyle = '#c5cad2'; ctx.fillRect(b.x + 6, b.y + 5, 8, 6);
  });
  level.crates.forEach(function (c) {
    if (!c.alive) return;
    ctx.fillStyle = '#1a120c'; ctx.fillRect(c.x, c.y, 32, 32);
    ctx.fillStyle = '#e2b56a'; ctx.fillRect(c.x + 2, c.y + 2, 28, 28);
    ctx.strokeStyle = '#7a5428'; ctx.strokeRect(c.x + 6, c.y + 6, 20, 20);
  });
  level.tokens.forEach(function (t) {
    if (t.got) return;
    var by = t.y + Math.sin(frame * 0.1 + t.x) * 3;
    ctx.save();
    ctx.translate(t.x + 6, by + 2);
    ctx.scale(1.7, 1.7);
    ART.coin(ctx, 0, 0);
    ctx.restore();
  });
  level.keys.forEach(function (k) {
    if (k.got) return;
    var y = k.y + Math.sin(frame * 0.08) * 2;
    ctx.fillStyle = '#1a120c'; ctx.fillRect(k.x + 6, y + 4, 12, 12); ctx.fillRect(k.x + 14, y + 14, 12, 4);
    ctx.fillStyle = '#ffd24a'; ctx.fillRect(k.x + 8, y + 6, 8, 8); ctx.fillRect(k.x + 16, y + 16, 8, 2);
  });
  level.enemies.forEach(function (e) { if (e.alive) drawEnemy(e); });
  level.signs.forEach(function (s) { drawSign(s.x, s.y + 20); });
  level.caves.forEach(function (s) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(s.x, s.y, s.w, s.h);
    ctx.fillStyle = '#12141c'; ctx.fillRect(s.x + 4, s.y + 6, s.w - 8, s.h - 6);
    ctx.fillStyle = '#6a7388'; ctx.fillRect(s.x, s.y, s.w, 6);
  });
  level.doors.forEach(function (d) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(d.x, d.y, d.w, d.h);
    ctx.fillStyle = d.needKey && keys <= 0 ? '#3a6ea5' : '#49a0e8';
    ctx.fillRect(d.x + 3, d.y + 3, d.w - 6, d.h - 6);
    drawSwirl(d.x + 16, d.y + 18, 6);
  });
  level.plungers.forEach(function (p) {
    if (p.used) return;
    ctx.fillStyle = '#1a120c'; ctx.fillRect(p.x + 4, p.y + 8, 24, 22);
    ctx.fillStyle = '#e23b3b'; ctx.fillRect(p.x + 6, p.y + 10, 20, 18);
    ctx.fillStyle = '#ffe14a'; ctx.fillRect(p.x + 12, p.y, 8, 12);
  });
  level.sheriffs.forEach(function (sh) {
    if (sh.got) return;
    drawSheriff(sh.x, sh.y, true);
  });
  level.bullets.forEach(function (b) {
    ctx.fillStyle = '#1a120c'; ctx.fillRect(b.x - 4, b.y - 3, 8, 6);
    ctx.fillStyle = '#ffe14a'; ctx.fillRect(b.x - 3, b.y - 2, 6, 4);
  });
  level.fish.forEach(function (f) {
    if (!f.on) return;
    ART.fish(ctx, f.x, f.y, frame);
  });
  if (level.boss && level.boss.alive) drawBoss(level.boss);
  else if (level.boss && !level.boss.alive) {
    /* freed sheriff stands where the boot was */
  }
  if (P.iframes <= 0 || Math.floor(P.iframes / 4) % 2 === 0) {
    if (gs === 'play' || gs === 'dead' || gs === 'leveldone') drawPig(P.x, P.y, P.dir, P.anim, !P.ground);
  }
}

function drawEnemy(e) {
  var f = Math.floor(frame / 8);
  if (e.kind === 'frog' || e.kind === 'dark') ART.frog(ctx, e.x, e.y, f + (e.kind === 'dark' ? 1 : 0));
  else if (e.kind === 'snake') ART.snake(ctx, e.x, e.y - 4, f);
  else if (e.kind === 'bird') ART.bird(ctx, e.x, e.y, f);
  else if (e.kind === 'bug') ART.bug(ctx, e.x, e.y, f);
  else ART.bandit(ctx, e.x, e.y, e.kind, frame);
}
function drawBoss(b) {
  var x = b.x + (b.state === 'shake' ? Math.sin(frame) * 2 : 0);
  ART.boot(ctx, x, b.y, frame, b.state === 'landed');
  ctx.fillStyle = '#333'; ctx.fillRect(x + 10, b.y - 8, b.w - 20, 5);
  ctx.fillStyle = '#e23b3b'; ctx.fillRect(x + 11, b.y - 7, (b.w - 22) * (b.hp / 4), 3);
}
function drawSheriff(x, y, heart) {
  ctx.fillStyle = '#1a120c'; ctx.fillRect(x + 4, y, 16, 14); ctx.fillRect(x + 2, y + 14, 20, 16);
  ctx.fillStyle = '#f0c2a4'; ctx.fillRect(x + 6, y + 2, 12, 10);
  ctx.fillStyle = '#6a4a22'; ctx.fillRect(x + 2, y - 4, 20, 4); ctx.fillRect(x + 6, y - 10, 12, 6);
  ctx.fillStyle = '#2450c8'; ctx.fillRect(x + 4, y + 16, 16, 12);
  if (heart) { ctx.fillStyle = '#e23b3b'; ctx.fillRect(x + 8, y - 18, 8, 6); ctx.fillRect(x + 6, y - 16, 4, 4); ctx.fillRect(x + 14, y - 16, 4, 4); }
}
function drawCactus(x, y) {
  /* Tall saguaro, about five tiles, with arms a pig can read as ledges. Drawn, not traced. */
  function arm(ax, ay, dir) {
    ctx.fillStyle = '#145218';
    ctx.fillRect(ax, ay, 22, 10);
    ctx.fillRect(ax + (dir < 0 ? 0 : 12), ay - 26, 10, 28);
    ctx.fillStyle = '#3aaa42';
    ctx.fillRect(ax + 2, ay + 2, 18, 6);
    ctx.fillRect(ax + (dir < 0 ? 2 : 14), ay - 24, 6, 26);
  }
  ctx.fillStyle = '#145218';
  ctx.fillRect(x + 10, y - 132, 18, 132);
  ctx.fillStyle = '#2f9a34';
  ctx.fillRect(x + 12, y - 130, 14, 128);
  ctx.fillStyle = '#8fd98a';
  ctx.fillRect(x + 14, y - 126, 4, 120);
  arm(x - 8, y - 78, -1);
  arm(x + 16, y - 52, 1);
  ctx.fillStyle = '#145218';
  ctx.fillRect(x + 8, y - 140, 22, 12);
  ctx.fillStyle = '#2f9a34';
  ctx.fillRect(x + 10, y - 138, 18, 8);
}
function drawPole(x, y, h) {
  ctx.fillStyle = '#6b4424'; ctx.fillRect(x + 12, y - h, 8, h);
  ctx.fillStyle = '#222'; ctx.fillRect(x - 20, y - h + 8, 64, 2);
}
function drawSaloon(x, y) {
  ctx.fillStyle = '#1a120c'; ctx.fillRect(x, y - 70, 70, 70);
  ctx.fillStyle = '#c4844a'; ctx.fillRect(x + 3, y - 66, 64, 66);
  ctx.fillStyle = '#8a3a28'; ctx.fillRect(x + 8, y - 78, 54, 12);
  ctx.fillStyle = '#203040'; ctx.fillRect(x + 12, y - 48, 16, 18); ctx.fillRect(x + 40, y - 48, 16, 18);
}
function drawSign(x, y) {
  ctx.fillStyle = '#1a120c'; ctx.fillRect(x + 12, y - 36, 6, 36);
  ctx.fillStyle = '#2f74d0'; ctx.fillRect(x, y - 48, 30, 22);
  drawSwirl(x + 15, y - 37, 6);
}
function drawSwirl(x, y, r) {
  ctx.fillStyle = '#1d4e9c'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, y, r * 0.62, 0.4, 4.2); ctx.stroke();
  ctx.fillStyle = '#d7f4ff'; ctx.beginPath(); ctx.arc(x, y, r * 0.22, 0, 7); ctx.fill();
}

function renderPlay() {
  ctx.save();
  if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  drawSky();
  ctx.save();
  ctx.translate(-Math.round(camX), -Math.round(camY));
  drawWorld();
  drawActors();
  parts.forEach(function (p) { ctx.globalAlpha = Math.max(0, p.life / 24); ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s); ctx.globalAlpha = 1; });
  floats.forEach(function (f) { ctx.globalAlpha = Math.max(0, f.life / 48); text(f.t, f.x, f.y, 2, f.c, '#1a120c'); ctx.globalAlpha = 1; });
  ctx.restore();
  drawHUD();
  if (wantTouch && gs === 'play') drawTouch();
  ctx.restore();
}

function drawHUD() {
  ART.pigHead(ctx, 6, 6);
  text('x' + lives, 24, 8, 2, '#fff', '#1a120c');
  for (var h = 0; h < 4; h++) ART.heart(ctx, 6 + h * 14, 26, h < hearts);
  ART.coin(ctx, 96, 4);
  text('x' + coins, 112, 8, 2, '#fff', '#1a120c');
  text(pad(score, 6), (VW - textWidth(pad(score, 6), 2)) / 2, 8, 2, '#fff', '#1a120c');
  ART.clock(ctx, VW - 58, 4);
  text(String(timer), VW - 42, 8, 2, timer < 30 ? '#ffb0b0' : '#fff', '#1a120c');
  var pb = pauseBtn();
  ctx.fillStyle = 'rgba(10,16,28,0.35)'; round(pb.x, pb.y, pb.w, pb.h, 8); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillRect(pb.x + 12, pb.y + 8, 5, 16); ctx.fillRect(pb.x + 22, pb.y + 8, 5, 16);
  if (gs === 'pause') {
    ctx.fillStyle = 'rgba(8,12,20,0.55)'; ctx.fillRect(0, 0, VW, VH);
    textC('PAUSED', VW / 2, 180, 4, '#ffe14a', '#1a120c');
    menuButtons();
    BTNS.forEach(drawPill);
  }
  if (debugOn && level) {
    text('L' + levelId + ' S' + scriptI + ' ' + Math.round(P.x) + ',' + Math.round(P.y), 8, VH - 24, 1, '#fff', '#000');
  }
}
function pauseBtn() { return { x: VW - 58, y: VH - 52, w: 42, h: 36 }; }
function drawTouch() {
  var pads = touchPads();
  ctx.globalAlpha = 0.55;
  pads.forEach(function (p) {
    ctx.fillStyle = '#123'; round(p.x, p.y, p.w, p.h, 12); ctx.fill();
    textC(p.label, p.x + p.w / 2, p.y + p.h / 2 - 7, 2, '#fff', '#000');
  });
  ctx.globalAlpha = 1;
}
function touchPads() {
  return [
    { id: 'left', x: 12, y: VH - 100, w: 64, h: 64, label: '<' },
    { id: 'right', x: 84, y: VH - 100, w: 64, h: 64, label: '>' },
    { id: 'jump', x: VW - 84, y: VH - 108, w: 72, h: 72, label: 'UP' }
  ];
}

function drawPill(b) {
  var hov = b.hover && !b.disabled;
  ctx.fillStyle = '#0c2744'; round(b.x, b.y, b.w, b.h, 18); ctx.fill();
  var g = ctx.createLinearGradient(0, b.y, 0, b.y + b.h);
  if (b.disabled) { g.addColorStop(0, '#9aa8b4'); g.addColorStop(1, '#667480'); }
  else { g.addColorStop(0, hov ? '#8ad4ff' : '#5ec0f4'); g.addColorStop(1, hov ? '#1d74c8' : '#1a62ae'); }
  ctx.fillStyle = g; round(b.x + 3, b.y + 3, b.w - 6, b.h - 6, 15); ctx.fill();
  if (hov) { ctx.lineWidth = 4; ctx.strokeStyle = '#f08a24'; round(b.x + 1, b.y + 1, b.w - 2, b.h - 2, 18); ctx.stroke(); }
  textC(b.label, b.x + b.w / 2, b.y + (b.h / 2) - 7, 2, '#fff', '#102033');
}
function addBtn(x, y, w, h, id, label, disabled) {
  var hover = mx >= x && mx <= x + w && my >= y && my <= y + h;
  BTNS.push({ x: x, y: y, w: w, h: h, id: id, label: label, disabled: !!disabled, hover: hover });
}

function centerBtn(y, h, id, label, disabled) {
  var w = Math.min(250, VW - 36);
  addBtn((VW - w) / 2, y, w, h, id, label, disabled);
}
function renderTitle() {
  drawSky();
  ctx.fillStyle = '#e6c36a'; ctx.fillRect(0, VH - 96, VW, 96);
  ctx.fillStyle = '#c89a40'; ctx.fillRect(0, VH - 96, VW, 6);
  for (var gy = VH - 90; gy < VH; gy += 3) { ctx.fillStyle = 'rgba(120,70,20,0.18)'; ctx.fillRect(0, gy, VW, 1); }
  drawSaloon(4, VH - 96);
  drawCactus(VW - 36, VH - 96);
  drawPig(VW / 2 - 70, VH - 124, 1, frame, false);
  textC('SAVE THE', VW / 2, 28, 4, '#e8a05a', '#4a240c');
  textC('SHERIFF', VW / 2, 64, 4, '#e8a05a', '#4a240c');
  BTNS = [];
  var labels = [['CONTINUE', 'continue', !runSnap], ['NEW GAME', 'new', false], ['SETTINGS', 'settings', false], ['HIGH SCORES', 'scores', false], ['HELP', 'help', false], ['ABOUT', 'about', false]];
  for (var i = 0; i < labels.length; i++) centerBtn(108 + i * 40, 34, labels[i][1], labels[i][0], labels[i][2]);
  BTNS.forEach(drawPill);
  textC('ARROWS  SPACE  P  M  SHIFT', VW / 2, VH - 18, 1, '#3a2a14', null);
}

function menuButtons() {
  BTNS = [];
  if (gs === 'pause') {
    centerBtn(VH * 0.42, 40, 'resume', 'RESUME', false);
    centerBtn(VH * 0.42 + 48, 40, 'music', musicOn ? 'MUSIC ON' : 'MUSIC OFF', false);
    centerBtn(VH * 0.42 + 96, 40, 'quit', 'QUIT', false);
  }
}
function renderMenu(title, lines, extra) {
  drawSky();
  ctx.fillStyle = 'rgba(8,16,28,0.35)'; ctx.fillRect(0, 0, VW, VH);
  textC(title, VW / 2, 36, 3, '#ffe14a', '#1a120c');
  lines.forEach(function (line, i) { textC(line, VW / 2, 90 + i * 22, 2, '#fff', '#1a120c'); });
  BTNS = [];
  if (extra) extra();
  centerBtn(VH - 70, 40, 'back', 'BACK', false);
  BTNS.forEach(drawPill);
}
function wrap(s, n) {
  var words = s.split(' '), lines = [], cur = '';
  words.forEach(function (w) {
    if ((cur + ' ' + w).trim().length > n) { lines.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  });
  if (cur) lines.push(cur);
  return lines;
}

function renderSettings() {
  renderMenu('SETTINGS', [], function () {
    centerBtn(90, 40, 'music', musicOn ? 'MUSIC ON' : 'MUSIC OFF', false);
    centerBtn(138, 40, 'vibra', vibraOn ? 'VIBRA ON' : 'VIBRA OFF', false);
    centerBtn(186, 40, 'lang', 'LANGUAGE ENGLISH', false);
    centerBtn(234, 40, 'stages', 'PICK STAGE', false);
    centerBtn(282, 40, 'reset', 'RESET SCORES', false);
  });
}
function renderHelp() {
  var lines = []
    .concat(wrap('Bandits grabbed the sheriff. You are his pig. Reach the exit of each level.', 42))
    .concat(wrap('Move with arrows or WASD, or the on screen buttons. Jump with up, W, or space.', 42))
    .concat(wrap('Stomp enemies from above. A chain in the air scores 100, then 200, then 300.', 42))
    .concat(wrap('Side bumps and spikes cost a heart. Pits and water cost a life.', 42))
    .concat(wrap('Blue swirls are worth 100. Time left at the exit is added as bonus.', 42))
    .concat(wrap('P pauses. M toggles music. Push boulders, ride springs, and stomp plungers.', 42));
  renderMenu('HELP', lines, null);
}
function renderAbout() {
  var lines = wrap('A fan remake of the 2007 pig platformer. Not affiliated with Miniclip or Playdo. The pictures, levels, and music in this version are original.', 40);
  renderMenu('ABOUT', lines, null);
}
function renderScores() {
  var lines = highs.length ? highs.slice(0, 8).map(function (h, i) { return (i + 1) + '  ' + h.nick + '   ' + pad(h.score, 6); }) : ['NO SCORES YET'];
  renderMenu('HIGH SCORES', lines, null);
}
function renderConfirm() {
  drawSky();
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0, 0, VW, VH);
  textC('ARE YOU SURE YOU WANT', VW / 2, 160, 3, '#fff', '#1a120c');
  textC('TO START A NEW GAME?', VW / 2, 200, 3, '#fff', '#1a120c');
  BTNS = [];
  addBtn(36, VH - 160, 80, 64, 'yes', 'OK', false);
  addBtn(VW - 116, VH - 160, 80, 64, 'no', 'X', false);
  BTNS.forEach(function (b) {
    ctx.fillStyle = b.id === 'yes' ? '#2f9a3a' : '#d03030';
    round(b.x, b.y, b.w, b.h, 16); ctx.fill();
    ctx.lineWidth = b.hover ? 5 : 3; ctx.strokeStyle = '#1a120c'; round(b.x, b.y, b.w, b.h, 16); ctx.stroke();
    textC(b.id === 'yes' ? 'YES' : 'NO', b.x + b.w / 2, b.y + 26, 2, '#fff', '#1a120c');
  });
}
function renderLoading() {
  ctx.fillStyle = '#9ad8fb'; ctx.fillRect(0, 0, VW, VH);
  drawPig(VW / 2 - 16, VH * 0.42, 1, frame * 2, false);
  var barW = Math.min(360, VW - 80), barX = (VW - barW) / 2, barY = VH * 0.62;
  ctx.fillStyle = '#0c3f74'; round(barX, barY, barW, 36, 18); ctx.fill();
  var g = ctx.createLinearGradient(0, barY, 0, barY + 36);
  g.addColorStop(0, '#8ad4ff'); g.addColorStop(1, '#1a62ae');
  ctx.fillStyle = g; round(barX + 4, barY + 4, Math.max(12, (barW - 8) * (sceneT / 72)), 28, 14); ctx.fill();
  textC('LOADING', VW / 2, barY + 10, 2, '#fff', '#102033');
}
function renderPress() {
  ctx.fillStyle = '#bfe6fb'; ctx.fillRect(0, 0, VW, VH);
  textC('PRESS ANY KEY', VW / 2, 250, 3, '#1a120c', '#fff');
}
function renderCard() {
  ctx.fillStyle = '#c7ebfd'; ctx.fillRect(0, 0, VW, VH);
  var y = 300 - sceneT * 2.2;
  textC('LEVEL ' + levelId, VW / 2, y, 5, '#1a120c', '#fff');
}
function renderDone() {
  renderPlay();
  var y = Math.min(150, -80 + sceneT * 6);
  ctx.fillStyle = '#f7f7f7'; round((VW - 300) / 2, y, 300, 140, 8); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 4; round((VW - 300) / 2, y, 300, 140, 8); ctx.stroke();
  textC('LEVEL DONE!', VW / 2, y + 32, 3, '#1a120c', null);
  textC('BONUS: ' + bonusShow, VW / 2, y + 80, 3, '#1a5a9a', null);
}
function renderOver() {
  drawSky();
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, VW, VH);
  textC('GAME OVER', VW / 2, 150, 5, '#ff5a5a', '#1a120c');
  textC('SCORE ' + pad(score, 6), VW / 2, 220, 3, '#fff', '#1a120c');
  BTNS = [];
  centerBtn(VH * 0.5, 40, 'retry', 'RETRY', false);
  centerBtn(VH * 0.5 + 50, 40, 'title', 'TITLE', false);
  BTNS.forEach(drawPill);
}
function renderVictory() {
  ctx.fillStyle = '#d7a15c'; ctx.fillRect(0, 0, VW, VH);
  for (var x = 0; x < VW; x += 16) { ctx.fillStyle = x % 32 ? '#c48b48' : '#e0b06a'; ctx.fillRect(x, 0, 16, VH - 140); }
  ctx.fillStyle = '#3e9a40'; ctx.fillRect(0, VH - 140, VW, 140);
  textC('GAME COMPLETED!', VW / 2, 36, 2, '#ffe14a', '#4a240c');
  textC('THANK YOU FOR', VW / 2, 70, 2, '#fff8e8', '#4a240c');
  textC('SAVING THE SHERIFF', VW / 2, 96, 2, '#fff8e8', '#4a240c');
  drawPig(VW / 2 - 40, VH - 170, 1, frame, false);
  drawSheriff(VW / 2 + 10, VH - 190, false);
  textC('SCORE ' + pad(score, 6), VW / 2, 140, 2, '#fff', '#4a240c');
  if (gs === 'victory') textC('PRESS ANY KEY', VW / 2, 180, 2, '#fff', '#4a240c');
}
function renderNick() {
  renderVictory();
  textC('ENTER NICK:', VW / 2, 200, 2, '#fff', '#4a240c');
  var rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  BTNS = [];
  rows.forEach(function (row, ri) {
    var kw = 30, gap = 2;
    var total = row.length * (kw + gap);
    var x0 = (VW - total) / 2;
    for (var i = 0; i < row.length; i++) {
      var ch = row.charAt(i);
      addBtn(x0 + i * (kw + gap), 240 + ri * 36, kw, 32, 'k:' + ch, ch, false);
    }
  });
  centerBtn(360, 32, 'del', 'DEL', false);
  centerBtn(398, 32, 'ok', 'OK', false);
  BTNS.forEach(drawPill);
}
function renderStages() {
  drawSky();
  textC('PICK STAGE', VW / 2, 28, 3, '#ffe14a', '#1a120c');
  BTNS = [];
  for (var i = 0; i < 11; i++) {
    var col = i % 3, row = Math.floor(i / 3);
    addBtn(30 + col * 110, 80 + row * 70, 90, 52, 'stage:' + (i + 1), String(i + 1), false);
  }
  centerBtn(VH - 70, 40, 'back', 'BACK', false);
  BTNS.forEach(drawPill);
}
function renderBoard() {
  renderVictory();
  textC('HIGH SCORES', VW / 2, 220, 2, '#ffe14a', '#4a240c');
  highs.slice(0, 6).forEach(function (h, i) {
    textC((i + 1) + '  ' + h.nick + '  ' + pad(h.score, 6), VW / 2, 255 + i * 22, 2, '#fff', '#4a240c');
  });
  BTNS = [];
  centerBtn(VH - 80, 40, 'title', 'MENU', false);
  BTNS.forEach(drawPill);
}

function render() {
  ctx.clearRect(0, 0, VW, VH);
  if (gs === 'title') { BTNS = []; renderTitle(); }
  else if (gs === 'confirm') renderConfirm();
  else if (gs === 'settings') renderSettings();
  else if (gs === 'help') renderHelp();
  else if (gs === 'about') renderAbout();
  else if (gs === 'scores') renderScores();
  else if (gs === 'stages') renderStages();
  else if (gs === 'loading') renderLoading();
  else if (gs === 'presskey') renderPress();
  else if (gs === 'levelcard') renderCard();
  else if (gs === 'play' || gs === 'dead') renderPlay();
  else if (gs === 'pause') { renderPlay(); }
  else if (gs === 'leveldone') renderDone();
  else if (gs === 'gameover') renderOver();
  else if (gs === 'victory') renderVictory();
  else if (gs === 'nick') renderNick();
  else if (gs === 'board') renderBoard();
  var nickEl = document.getElementById('nick');
  if (nickEl) nickEl.style.display = 'none';
}

function hitBtn(x, y) {
  for (var i = BTNS.length - 1; i >= 0; i--) {
    var b = BTNS[i];
    if (!b.disabled && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return b.id;
  }
  return null;
}
function onUI(id) {
  if (!id) return;
  sfx('click'); unlockAudio();
  if (id === 'continue' && runSnap) { score = runSnap.score; lives = runSnap.lives; coins = runSnap.coins; begin(runSnap.level); }
  else if (id === 'new') gs = 'confirm';
  else if (id === 'yes') { score = 0; lives = 5; coins = 0; begin(1); }
  else if (id === 'no' || id === 'back' || id === 'title' || id === 'quit') { gs = 'title'; setTune('title'); persist(); }
  else if (id === 'settings') gs = 'settings';
  else if (id === 'stages') gs = 'stages';
  else if (id.indexOf('stage:') === 0) { score = 0; lives = 5; coins = 0; begin(parseInt(id.slice(6), 10)); }
  else if (id === 'scores') gs = 'scores';
  else if (id === 'help') gs = 'help';
  else if (id === 'about') gs = 'about';
  else if (id === 'music') { setMusicEnabled(!musicOn); persist(); }
  else if (id === 'vibra') { vibraOn = !vibraOn; persist(); }
  else if (id === 'lang') { floatText(VW / 2, 80, 'ENGLISH', '#fff'); }
  else if (id === 'reset') { highs = []; persist(); }
  else if (id === 'resume') gs = 'play';
  else if (id === 'retry') { score = runSnap ? runSnap.score : 0; lives = 5; coins = runSnap ? runSnap.coins : 0; begin(levelId || 1); }
  else if (id.indexOf('k:') === 0) { if (nickStr.length < 8) nickStr += id.slice(2); }
  else if (id === 'del') nickStr = nickStr.slice(0, -1);
  else if (id === 'ok' || id === 'nickok') submitNick();
}
function submitNick() {
  var nick = (nickStr || 'PIG').slice(0, 8);
  highs.push({ nick: nick, score: score });
  highs.sort(function (a, b) { return b.score - a.score; });
  highs = highs.slice(0, 8);
  runSnap = null; persist();
  gs = 'board';
}

function canvasPos(e) {
  var r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) * (VW / r.width), y: (e.clientY - r.top) * (VH / r.height) };
}
function refreshTouch() {
  touch.left = touch.right = touch.jump = false;
  if (!wantTouch) return;
  var pads = touchPads();
  Object.keys(ptrs).forEach(function (id) {
    var p = ptrs[id];
    for (var i = 0; i < pads.length; i++) {
      var b = pads[i];
      if (p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h) touch[b.id] = true;
    }
  });
}

function step() {
  frame++;
  refreshTouch();
  if (gs === 'play') updatePlay();
  else if (gs === 'dead') { deadTimer--; if (deadTimer <= 0) respawn(); }
  else updateScene();
  if (gs === 'play' || gs === 'title' || gs === 'victory' || gs === 'loading') musicTick();
}

function loop(t) {
  if (!testing) {
    step();
  }
  render();
  requestAnimationFrame(loop);
}

/* ---------------- autopilot ---------------- */
var stuckT = 0, stuckX = 0, stuckStep = -1;
function think() {
  auto.left = auto.right = auto.up = auto.creep = auto.nojump = auto.down = false;
  if (!level) return;
  if (scriptI !== stuckStep) { stuckStep = scriptI; stuckT = 0; }
  if (Math.abs(P.x - stuckX) < 0.8 && P.ground) stuckT++; else stuckT = 0;
  stuckX = P.x;
  var step = level.script[scriptI];
  if (!step) { edgeSeek(); return; }
  var op = step[0];
  if (op === 'goto') moveToward(step[1] * T + T / 2, (step[2] + 1) * T, true);
  else if (op === 'plank') stepPlank(step[1]);
  else if (op === 'push') stepPush(step[1], step[2]);
  else if (op === 'stomp') stepStomp(step[1]);
  else if (op === 'climb') stepClimb(step[1], step[2]);
  else if (op === 'ride') stepRide(step[1]);
  else if (op === 'vpillar') stepPillar(step[1], 'y');
  else if (op === 'hpillar') stepPillar(step[1], 'x');
  else if (op === 'boss') stepBoss();
  if (auto.nojump) jumpQueue = 0;
}
function stepPush(dir, until) {
  if (pushDone(until)) { scriptI++; return; }
  auto.nojump = true;
  var b = null;
  for (var bi = 0; bi < level.boulders.length; bi++) {
    var bb = level.boulders[bi];
    if (!bb.snapped && bb.slot < 0) { b = bb; break; }
  }
  if (!b) { if (dir > 0) auto.right = true; else auto.left = true; return; }
  var feet = P.y + P.h;
  var floorY = b.y + b.h;
  var onIt = P.x + 4 < b.x + b.w && P.x + P.w > b.x + 4 && feet <= b.y + 10 && feet >= b.y - 6;
  if (onIt) { auto.left = true; return; }
  if (Math.abs(feet - floorY) > 18 || (dir > 0 && P.x > b.x - 4)) {
    if (dir > 0 && P.x > b.x) { auto.left = true; return; }
    moveToward(b.x - 22, floorY, false);
    return;
  }
  if (dir > 0) auto.right = true; else auto.left = true;
}
function pushDone(kind) {
  if (kind === 'crates') return level.counters.crates >= (level.def.goals.crates || 1);
  if (kind === 'slots') return level.counters.slots >= (level.def.goals.slots || level.slots.length);
  return false;
}
function moveToward(tx, feetY, arrive) {
  var cx = P.x + P.w / 2;
  var dx = tx - cx;
  var dy = feetY - (P.y + P.h);
  if (feetY < P.y + P.h - 8 && onLadder()) {
    auto.up = true;
    if (Math.abs(dx) > 16) { if (dx > 0) auto.right = true; else auto.left = true; }
    if (arrive && Math.abs(dx) < 18 && P.y + P.h <= feetY + 16) scriptI++;
    return;
  }
  if (Math.abs(dx) > 7 || (feetY < P.y + P.h - 20 && Math.abs(dx) > 2)) { if (dx > 0) auto.right = true; else auto.left = true; }
  var dir = dx >= 0 ? 1 : -1;
  var deep = dy < -8 && isSolid(P.x + 4, P.y - 6) && isSolid(P.x + P.w - 4, P.y - 6);
  if (deep) {
    if (dx > 0) { auto.left = true; auto.right = false; dir = -1; }
    else { auto.right = true; auto.left = false; dir = 1; }
  }
  var lip = !deep && dy < -8 && lipAhead(dir);
  if (lip || (dy < -16 && Math.abs(dx) < 48)) auto.creep = true;
  if (!P.ground && dy < -10 && Math.abs(dx) < 12 && !deep) { auto.left = auto.right = false; }
  if ((P.ground || P.coyote > 0) && (lip || shouldJump(dir, feetY, dx))) jumpQueue = 8;
  if (arrive && Math.abs(dx) < 16 && (P.ground || P.rideId) && (Math.abs(dy) < 30 || dy > 6)) scriptI++;
}
function lipAhead(dir) {
  var feet = P.y + P.h;
  var x = dir > 0 ? P.x + P.w + 10 : P.x - 10;
  var ahead = false;
  for (var up = 12; up <= 100; up += 8) if (isSolid(x, feet - up) && !isSolid(x, feet - up - 12)) ahead = true;
  if (!ahead) return false;
  if (isSolid(P.x + P.w / 2, P.y - 6)) return false;
  return true;
}
function shouldJump(dir, feetY, dx) {
  var feet = P.y + P.h;
  var under = tileAt(P.x + P.w / 2, feet - 8);
  if ((under === TILE.ROPE || under === TILE.WIRE) && feetY > feet - 48) return false;
  var ax = dir > 0 ? P.x + P.w + 8 : P.x - 8;
  if (isSolid(ax, P.y + 8) && !isSolid(ax, P.y - 20)) return true;
  if (tileAt(ax, feet + 2) === TILE.SPIKE) return true;
  var gap = true;
  for (var gy = 0; gy <= 48; gy += 8) if (supportAt(ax, feet + gy)) { gap = false; break; }
  if (gap && feetY + 8 >= feet) return true;
  if (feetY < feet - 28 && Math.abs(dx) < 86) return true;
  if (enemyClose(dir)) return true;
  return false;
}
function enemyClose(dir) {
  for (var i = 0; i < level.enemies.length; i++) {
    var e = level.enemies[i];
    if (!e.alive) continue;
    var dx = (e.x + e.w / 2) - (P.x + P.w / 2);
    if (dir > 0 && dx > 6 && dx < 42 && Math.abs((e.y + e.h) - (P.y + P.h)) < 30) return true;
    if (dir < 0 && dx < -6 && dx > -42 && Math.abs((e.y + e.h) - (P.y + P.h)) < 30) return true;
  }
  return false;
}
function edgeSeek() {
  if (level.def.exit === 'edge') moveToward(level.cols * T - 10, P.y + P.h, false);
  else if (level.signs[0]) moveToward(level.signs[0].x + 10, P.y + P.h, false);
  else if (level.caves[0]) moveToward(level.caves[0].x + 10, P.y + P.h, false);
}
function stepPlank(destCol) {
  var pl = level.plank;
  var dest = destCol * T;
  var leftLip = (level.def.ground[0][1] + 1) * T;
  var rightBank = level.def.ground[1][0] * T;
  if (!pl) { scriptI++; return; }
  auto.nojump = true;
  if (P.x > dest && P.ground && P.rideId !== 'plank') { scriptI++; return; }
  if (P.rideId === 'plank') {
    if (pl.x + pl.w >= rightBank - 2) auto.right = true;
    return;
  }
  if (P.x + P.w < leftLip - 6) { auto.right = true; return; }
  if (pl.x < P.x + P.w - 2 && pl.x + pl.w > leftLip + 8) auto.right = true;
}
function stepStomp(kind) {
  var e = null;
  for (var i = 0; i < level.enemies.length; i++) if (level.enemies[i].alive && level.enemies[i].kind === kind) { e = level.enemies[i]; break; }
  if (!e) { scriptI++; return; }
  var stand = e.y + e.h;
  if (P.y + P.h > stand + 16) { moveToward(e.x - 140, stand, false); return; }
  var tx = e.x + e.w / 2, dx = tx - (P.x + P.w / 2);
  if (Math.abs(dx) > 8) { if (dx > 0) auto.right = true; else auto.left = true; }
  if (Math.abs(dx) < 30 && (P.ground || P.coyote > 0)) jumpQueue = 8;
  if (!P.ground && Math.abs(dx) < 16) auto.left = auto.right = false;
}
function stepClimb(col, row) {
  var tx = col * T + 16;
  if (Math.abs(P.x + P.w / 2 - tx) > 8) { moveToward(tx, P.y + P.h, false); return; }
  auto.up = true;
  if (P.y + P.h <= (row + 1) * T + 8) scriptI++;
}
function stepRide(destCol) {
  var r = level.ride;
  if (!r) { scriptI++; return; }
  if (P.rideId !== 'ride') { moveToward(r.x + 24, r.y, false); return; }
  auto.right = true;
  if (r.x + r.w >= destCol * T) { level.counters.ride = 1; scriptI++; }
}
function stepPillar(index, axis) {
  var p = level.pillars[index];
  if (!p) { scriptI++; return; }
  var atTop = axis === 'y' ? p.y < p.originY - Math.abs(p.dist) * 0.82 : p.x > p.originX + Math.abs(p.dist) * 0.82;
  if (axis === 'x') {
    if (P.rideId !== p.id) {
      if (p.x < p.originX + 28) moveToward(p.x + 20, p.originY, false);
      return;
    }
    auto.nojump = true;
    if (p.x > p.originX + Math.abs(p.dist) * 0.72) {
      auto.right = true;
      if (P.x > p.x + p.w - 18) scriptI++;
    }
    return;
  }
  var alreadyUp = (P.y + P.h) < p.originY - 36;
  if (P.rideId !== p.id && !alreadyUp) {
    if (!atTop) moveToward(p.originX + p.w / 2, p.originY, false);
    return;
  }
  auto.nojump = true;
  auto.right = true;
  if (P.x > p.originX + p.w + 4) scriptI++;
}
function stepBoss() {
  var b = level.boss;
  if (!b || !b.alive) { scriptI++; return; }
  var px = P.x + P.w / 2;
  var cx = b.x + b.w / 2;
  var left = level.def.arena[0] * T + 56;
  var right = level.def.arena[1] * T - 90;
  auto.nojump = b.state !== 'landed';
  if (b.state === 'landed') {
    var dx = cx - px;
    if (!P.ground) {
      auto.creep = true;
      if (dx > 20) auto.right = true;
      else if (dx < -20) auto.left = true;
      return;
    }
    /* Jump while still outside the sole. A full-speed walk into the boot is a hit. */
    if (dx > 84) auto.right = true;
    else if (dx < -84) auto.left = true;
    else jumpQueue = 8;
    return;
  }
  var dest = left;
  if (b.state === 'hover') dest = Math.abs(cx - left) < 150 ? right : left;
  else dest = px >= cx ? right : left;
  if (px < dest - 8) auto.right = true;
  else if (px > dest + 8) auto.left = true;
}

function goalsMet() {
  var g = (level && level.def.goals) || {};
  var c = level.counters;
  if ((g.crates || 0) > c.crates) return false;
  if ((g.hostages || 0) > c.hostages) return false;
  if ((g.plungers || 0) > c.plungers) return false;
  if ((g.keyed || 0) > c.keyed) return false;
  if ((g.slots || 0) > c.slots) return false;
  if ((g.boss || 0) > c.boss) return false;
  if ((g.ride || 0) > c.ride) return false;
  return true;
}

function boot() {
  canvas = document.getElementById('g');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  debugOn = /[?&]debug=1/.test(location.search);
  try { wantTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900; } catch (e) { wantTouch = false; }
  loadStore();
  setTune('title');
  window.addEventListener('keydown', function (e) {
    unlockAudio();
    if (e.repeat && e.code !== 'Backspace') {}
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].indexOf(e.code) >= 0) e.preventDefault();
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') key.shift = true;
    if (e.metaKey || e.code === 'MetaLeft' || e.code === 'MetaRight') key.shift = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') key.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') key.right = true;
    if (e.code === 'ArrowUp' || e.code === 'KeyW') key.up = true;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') key.down = true;
    if ((e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') && !e.repeat) jumpQueue = 8;
    if (e.code === 'KeyP' && !e.repeat) { if (gs === 'play') gs = 'pause'; else if (gs === 'pause') gs = 'play'; }
    if (e.code === 'KeyM' && !e.repeat) { setMusicEnabled(!musicOn); persist(); }
    if (e.code === 'BracketRight' && gs === 'play') forceComplete();
    if (e.code === 'Escape') { if (gs === 'play' || gs === 'pause') { gs = 'title'; setTune('title'); } }
    if (gs === 'nick') {
      if (e.code === 'Backspace') nickStr = nickStr.slice(0, -1);
      else if (e.code === 'Enter') submitNick();
      else if (e.key && e.key.length === 1 && /[a-z0-9]/i.test(e.key) && nickStr.length < 8) nickStr += e.key.toUpperCase();
    }
    if (!e.repeat && (gs === 'presskey' || gs === 'levelcard' || gs === 'leveldone' || gs === 'victory')) anyPress();
    if (gs === 'victory' && !e.repeat) { gs = 'nick'; nickStr = ''; }
  });
  window.addEventListener('keyup', function (e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'MetaLeft' || e.code === 'MetaRight' || e.metaKey) key.shift = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') key.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') key.right = false;
    if (e.code === 'ArrowUp' || e.code === 'KeyW') key.up = false;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') key.down = false;
    if (e.code === 'Space') key.jump = false;
  });
  canvas.addEventListener('pointerdown', function (e) {
    unlockAudio(); wantTouch = wantTouch || e.pointerType === 'touch';
    var p = canvasPos(e); mx = p.x; my = p.y; ptrs[e.pointerId] = p;
    if (gs === 'play') {
      var pb = pauseBtn();
      if (p.x >= pb.x && p.y >= pb.y) gs = 'pause';
      var pads = touchPads();
      for (var i = 0; i < pads.length; i++) if (p.x >= pads[i].x && p.x <= pads[i].x + pads[i].w && p.y >= pads[i].y && p.y <= pads[i].y + pads[i].h && pads[i].id === 'jump') jumpQueue = 8;
    }
  });
  canvas.addEventListener('pointermove', function (e) {
    var p = canvasPos(e); mx = p.x; my = p.y;
    if (ptrs[e.pointerId]) ptrs[e.pointerId] = p;
  });
  function release(e) {
    var p = canvasPos(e); mx = p.x; my = p.y;
    delete ptrs[e.pointerId];
    if (gs !== 'play') onUI(hitBtn(p.x, p.y));
    if (gs === 'pause') onUI(hitBtn(p.x, p.y));
    if (gs === 'presskey' || gs === 'levelcard' || gs === 'leveldone') anyPress();
    if (gs === 'victory') { gs = 'nick'; nickStr = ''; }
  }
  canvas.addEventListener('pointerup', release);
  window.addEventListener('blur', function () { key.left = key.right = key.up = key.down = key.jump = false; });
  requestAnimationFrame(loop);
}

function forceComplete() {
  if (!level || gs !== 'play') return;
  var g = level.def.goals || {};
  if (g.crates) level.counters.crates = g.crates;
  if (g.hostages) level.counters.hostages = g.hostages;
  if (g.plungers) level.counters.plungers = g.plungers;
  if (g.keyed) level.counters.keyed = g.keyed;
  if (g.slots) level.counters.slots = g.slots;
  if (g.boss) { level.counters.boss = 1; if (level.boss) level.boss.alive = false; clearKind(TILE.GATE); }
  if (g.ride) level.counters.ride = 1;
  completeLevel();
}

window.STS = {
  silent: false,
  startLevel: function (n, opt) {
    score = 0; lives = 5; coins = 0;
    begin(n, { instant: !opt || opt.instant !== false });
  },
  state: function () {
    return { gs: gs, level: levelId, x: P.x, y: P.y, lives: lives, hearts: hearts, scriptI: scriptI, score: score, reason: deathReason, counters: level && level.counters };
  },
  testAll: function (max) {
    testing = true; STS.silent = true;
    var out = [];
    max = max || 9000;
    for (var n = 1; n <= 11; n++) {
      STS.startLevel(n, { instant: true });
      var log = [];
      var i = 0;
      for (; i < max; i++) {
        if (gs === 'gameover' || gs === 'leveldone' || gs === 'victory') break;
        auto.left = auto.right = auto.up = false;
        if (gs === 'play') think();
        step();
        if (i % 40 === 0) log.push([scriptI, Math.round(P.x), Math.round(P.y), gs, deathReason, lives]);
        if (log.length > 40) log.shift();
      }
      out.push({ level: n, ok: (gs === 'leveldone' || gs === 'victory') && goalsMet(), gs: gs, frames: i, x: Math.round(P.x), y: Math.round(P.y), scriptI: scriptI, lives: lives, reason: deathReason, counters: Object.assign({}, level.counters), need: level.def.goals, log: log });
    }
    testing = false;
    return out;
  }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
