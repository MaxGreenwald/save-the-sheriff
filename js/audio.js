/* Original chiptune-style audio. No Miniclip samples. */
var musicOn = true;
var vibraOn = false;
var AC = null;
var musicTimer = 0;
var musicStep = 0;
var currentTune = 'title';

function audioCtx() {
  if (AC) return AC;
  var Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  try { AC = new Ctx(); } catch (e) { AC = null; }
  return AC;
}

function unlockAudio() {
  var ctx = audioCtx();
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

function beep(opts) {
  if (opts.music && !musicOn) return;
  if (!opts.music && window.STS && STS.silent) return;
  if (opts.sfx && !sfxOn()) return;
  var ctx = audioCtx();
  if (!ctx) return;
  try {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    var f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = opts.cut || 1800;
    o.type = opts.wave || 'square';
    o.frequency.setValueAtTime(opts.freq, ctx.currentTime);
    if (opts.to) o.frequency.exponentialRampToValueAtTime(Math.max(40, opts.to), ctx.currentTime + opts.dur);
    g.gain.setValueAtTime(opts.vol || 0.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + opts.dur);
    o.connect(f); f.connect(g); g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + opts.dur + 0.02);
  } catch (e) {}
}

function sfxOn() { return musicOn || true; }

function sfx(name) {
  if (window.STS && STS.silent) return;
  var m = {
    jump: { freq: 320, to: 540, dur: 0.12, vol: 0.06, wave: 'square', sfx: 1 },
    coin: { freq: 880, to: 1320, dur: 0.09, vol: 0.05, wave: 'square', sfx: 1 },
    stomp: { freq: 220, to: 90, dur: 0.12, vol: 0.07, wave: 'triangle', sfx: 1 },
    hurt: { freq: 180, to: 70, dur: 0.18, vol: 0.08, wave: 'sawtooth', sfx: 1 },
    key: { freq: 660, to: 990, dur: 0.16, vol: 0.06, wave: 'square', sfx: 1 },
    boom: { freq: 140, to: 40, dur: 0.28, vol: 0.09, wave: 'sawtooth', sfx: 1 },
    great: { freq: 523, to: 784, dur: 0.22, vol: 0.06, wave: 'square', sfx: 1 },
    win: { freq: 523, to: 1046, dur: 0.35, vol: 0.07, wave: 'square', sfx: 1 },
    die: { freq: 300, to: 80, dur: 0.4, vol: 0.08, wave: 'triangle', sfx: 1 },
    click: { freq: 740, to: 520, dur: 0.05, vol: 0.04, wave: 'square', sfx: 1 },
    spring: { freq: 280, to: 720, dur: 0.18, vol: 0.06, wave: 'square', sfx: 1 },
    splash: { freq: 200, to: 60, dur: 0.22, vol: 0.07, wave: 'sine', sfx: 1 }
  };
  if (m[name]) beep(m[name]);
}

/* Short original loops. Pentatonic, not from the Flash game. */
var TUNES = {
  title:  { every: 14, notes: [60, 64, 67, 72, 67, 64, 60, 55, 57, 60, 64, 67] },
  desert: { every: 12, notes: [60, 64, 67, 64, 69, 67, 64, 60, 55, 57, 60, 64, 67, 72, 67, 64] },
  town:   { every: 11, notes: [62, 65, 69, 74, 69, 65, 62, 57, 60, 62, 65, 69] },
  cave:   { every: 16, notes: [48, 51, 55, 58, 55, 51, 48, 46, 48, 51, 55, 51] },
  water:  { every: 13, notes: [63, 67, 70, 75, 70, 67, 63, 58, 60, 63, 67, 70] },
  sunset: { every: 12, notes: [57, 60, 64, 69, 64, 60, 57, 52, 55, 57, 60, 64] },
  boss:   { every: 10, notes: [40, 40, 47, 40, 43, 40, 47, 52, 40, 47, 43, 40] }
};

function midiHz(n) { return 440 * Math.pow(2, (n - 69) / 12); }

function setTune(name) {
  currentTune = name || 'title';
  musicStep = 0;
  musicTimer = 0;
}

function musicTick() {
  if (!musicOn) return;
  if (window.STS && STS.silent) return;
  var tune = TUNES[currentTune] || TUNES.title;
  musicTimer++;
  if (musicTimer < tune.every) return;
  musicTimer = 0;
  var n = tune.notes[musicStep % tune.notes.length];
  musicStep++;
  beep({ freq: midiHz(n), dur: 0.16, vol: 0.035, wave: 'square', cut: 1400, music: 1 });
  if (musicStep % 2 === 0) {
    beep({ freq: midiHz(n - 24), dur: 0.18, vol: 0.03, wave: 'triangle', cut: 500, music: 1 });
  }
}

function setMusicEnabled(on) {
  musicOn = !!on;
  if (!musicOn) return;
  unlockAudio();
}
