/* Level configs for the fan remake.
   Layouts are original. They follow the playthrough spec's mechanics,
   exits, and enemy roster. They are not a tile copy of the Flash game.
*/
var TILE = {
  AIR: 0, SOLID: 1, CRUMBLE: 2, WATER: 3, SPIKE: 4,
  LADDER: 5, WIRE: 6, ROPE: 7, WALL: 8, TNT: 9, GATE: 10
};

var LEVELS = [
  {
    id: 1,
    biome: 'desert',
    sky: 'day',
    cols: 96,
    rows: 18,
    exit: 'edge',
    goals: { crates: 1 },
    ground: [[0, 20, 15], [28, 95, 15]],
    /* Tall tan block with the frog and the row of four swirls, then a step down,
       matching the 1:00 to 1:10 stretch. The pillar, plank, and crate are the 1:16 beat. */
    plats: [[34, 13, 5], [38, 12, 6], [68, 12, 8], [74, 10, 6]],
    rects: [
      [6, 12, 8, 3, TILE.SOLID]
    ],
    tokens: [[2, 11], [4, 9], [7, 8], [9, 8], [11, 8], [13, 8], [22, 13], [36, 10], [42, 9], [49, 8], [56, 14], [64, 11], [72, 9], [80, 12], [88, 14]],
    frogs: [[10, 11]],
    snakes: [[70, 11, 3], [78, 14, 3]],
    cacti: [[2, 14], [40, 11], [66, 14], [84, 14]],
    saloon: [90, 14],
    boulders: [[44, 14]],
    crates: [[50, 14]],
    plank: { c: 18, len: 6, dist: 8, period: 150, pause: 36 },
    script: [
      ['goto', 4, 14],
      ['goto', 8, 11],
      ['goto', 16, 14],
      ['plank', 30],
      ['goto', 42, 14],
      ['push', 1, 'crates'],
      ['goto', 94, 14]
    ]
  },
  {
    id: 2,
    biome: 'town',
    sky: 'day',
    cols: 86,
    rows: 18,
    exit: 'edge',
    goals: { hostages: 2, plungers: 1 },
    ground: [[0, 85, 15]],
    plats: [[8, 13, 6], [22, 12, 6], [40, 13, 5], [48, 12, 5]],
    rects: [[74, 8, 3, 8, TILE.WALL]],
    buildings: [[6, 10, 7, 5], [20, 8, 7, 7], [46, 9, 6, 6]],
    tokens: [[4, 14], [10, 12], [24, 11], [42, 12], [50, 11], [66, 14]],
    frogs: [[16, 14]],
    birds: [[30, 10, 6]],
    hostages: [[12, 12], [50, 11]],
    poles: [[34, 14, 6]],
    ladders: [[18, 14, 4]],
    plungers: [{ c: 70, r: 14 }],
    cacti: [],
    script: [
      ['goto', 12, 12],
      ['stomp', 'hostage'],
      ['goto', 18, 14],
      ['climb', 18, 10],
      ['goto', 34, 14],
      ['climb', 34, 8],
      ['stomp', 'hostage'],
      ['goto', 70, 14],
      ['goto', 84, 14]
    ]
  },
  {
    id: 3,
    biome: 'desert',
    sky: 'day',
    cols: 72,
    rows: 18,
    exit: 'sign',
    goals: {},
    ground: [[0, 71, 15]],
    plats: [[10, 13, 6], [28, 12, 8], [48, 13, 6]],
    tokens: [[4, 14], [12, 12], [30, 11], [40, 14], [50, 12], [64, 14]],
    frogs: [[8, 14], [44, 14]],
    snakes: [[28, 11]],
    guns: [[34, 11]],
    cacti: [[2, 14], [60, 14]],
    signs: [[68, 14]],
    script: [
      ['goto', 20, 14],
      ['goto', 46, 14],
      ['goto', 68, 14]
    ]
  },
  {
    id: 4,
    biome: 'desert',
    sky: 'day',
    cols: 88,
    rows: 18,
    exit: 'sign',
    goals: { plungers: 1, slots: 4 },
    ground: [[0, 16, 15], [22, 40, 15], [46, 87, 15]],
    plats: [[49, 14, 4], [53, 13, 4], [57, 12, 8]],
    rects: [
      [47, 10, 2, 6, TILE.TNT],
      [71, 11, 17, 7, TILE.SOLID]
    ],
    ropes: [[15, 14, 8], [38, 14, 8]],
    tokens: [[6, 14], [18, 14], [26, 14], [36, 14], [58, 11], [80, 10]],
    frogs: [[10, 14], [30, 14]],
    snakes: [[24, 14]],
    plungers: [{ c: 44, r: 14, clears: [{ c: 47, r: 10, w: 2, h: 6 }] }],
    boulders: [[57, 11], [58, 11], [59, 11], [60, 11]],
    basin: { x: 62 * 32, y: 400 },
    slots: [[64, 14], [66, 13], [68, 12], [70, 11]],
    signs: [[82, 10]],
    cacti: [[4, 14]],
    script: [
      ['goto', 14, 14],
      ['goto', 24, 14],
      ['goto', 44, 14],
      ['goto', 50, 13],
      ['goto', 54, 12],
      ['goto', 58, 10],
      ['push', 1, 'slots'],
      ['goto', 64, 13],
      ['goto', 66, 12],
      ['goto', 68, 11],
      ['goto', 71, 10],
      ['goto', 82, 10]
    ]
  },
  {
    id: 5,
    biome: 'desert',
    sky: 'day',
    cols: 92,
    rows: 18,
    exit: 'sign',
    goals: { ride: 1 },
    ground: [[0, 34, 15], [44, 48, 15], [74, 91, 15]],
    plats: [[31, 9, 10]],
    rects: [[30, 11, 2, 5, TILE.SOLID]],
    crumble: [[35, 15, 9]],
    water: [[35, 16, 9, 2], [49, 15, 25, 3]],
    tokens: [[6, 14], [22, 8], [30, 8], [46, 14], [84, 14]],
    frogs: [[10, 14]],
    nets: [[14, 14, 1]],
    springs: [[26, 14]],
    cacti: [[2, 14], [86, 14]],
    ride: { c: 45, len: 30 },
    signs: [[86, 14]],
    script: [
      ['goto', 18, 14],
      ['goto', 34, 8],
      ['goto', 46, 14],
      ['goto', 46, 14],
      ['ride', 74],
      ['goto', 86, 14]
    ]
  },
  {
    id: 6,
    biome: 'town',
    sky: 'day',
    cols: 84,
    rows: 18,
    exit: 'edge',
    goals: { plungers: 1 },
    ground: [[0, 22, 15], [36, 83, 15]],
    rects: [[70, 8, 3, 8, TILE.WALL]],
    buildings: [[4, 9, 7, 6], [14, 11, 5, 4], [40, 10, 7, 5]],
    tokens: [[6, 8], [16, 10], [28, 8], [44, 9], [60, 14], [78, 14]],
    frogs: [[46, 14]],
    birds: [[24, 6, 8]],
    snakes: [[50, 14]],
    nets: [[58, 14, -1]],
    poles: [[10, 14, 7], [32, 14, 7]],
    wires: [[10, 8, 27]],
    plungers: [{ c: 66, r: 14 }],
    script: [
      ['goto', 10, 14],
      ['climb', 10, 8],
      ['goto', 32, 8],
      ['goto', 40, 14],
      ['goto', 66, 14],
      ['goto', 82, 14]
    ]
  },
  {
    id: 7,
    biome: 'cave',
    sky: 'rain',
    cols: 96,
    rows: 18,
    exit: 'door',
    goals: { keyed: 1 },
    ground: [[0, 37, 15], [38, 71, 15], [72, 95, 15]],
    plats: [[8, 13, 5], [18, 12, 5], [48, 13, 6], [84, 13, 4]],
    rects: [
      [32, 0, 6, 18, TILE.SOLID]
    ],
    tokens: [[4, 14], [10, 12], [20, 11], [50, 12], [64, 14], [86, 12]],
    frogs: [[14, 14], [54, 14]],
    bugs: [[22, 9], [60, 10]],
    keys: [[20, 11]],
    doors: [
      { c: 28, r: 14, toC: 44, toR: 14, needKey: true, great: true },
      { c: 90, r: 14, exit: true, great: true, needKey: false }
    ],
    script: [
      ['goto', 20, 11],
      ['goto', 28, 14],
      ['goto', 60, 14],
      ['goto', 90, 14]
    ]
  },
  {
    id: 8,
    biome: 'cave',
    sky: 'rain',
    cols: 84,
    rows: 18,
    exit: 'sign',
    goals: {},
    ground: [[0, 18, 15], [40, 46, 15], [62, 83, 15]],
    rects: [
      [20, 13, 4, 5, TILE.SOLID],
      [16, 11, 24, 1, TILE.SOLID]
    ],
    spikes: [[42, 15, 3]],
    water: [[47, 15, 14, 3]],
    tokens: [[6, 14], [24, 10], [32, 10], [66, 14], [76, 14]],
    frogs: [[8, 14], [68, 14]],
    snakes: [[28, 10]],
    bugs: [[34, 7]],
    pillars: [
      { c: 15, surface: 15, w: 4, h: 6, axis: 'y', dist: -4, period: 120, pause: 100 },
      { c: 44, surface: 15, w: 4, h: 4, axis: 'x', dist: 16, period: 140, pause: 100 }
    ],
    signs: [[78, 14]],
    script: [
      ['goto', 14, 14],
      ['vpillar', 0],
      ['goto', 30, 10],
      ['goto', 37, 10],
      ['goto', 42, 14],
      ['hpillar', 1],
      ['goto', 78, 14]
    ]
  },
  {
    id: 9,
    biome: 'water',
    sky: 'day',
    cols: 90,
    rows: 18,
    exit: 'cave',
    goals: {},
    ground: [[0, 12, 13], [16, 26, 13], [30, 40, 13], [44, 54, 13], [58, 68, 13], [72, 89, 13]],
    water: [[0, 15, 90, 3]],
    tokens: [[4, 12], [18, 12], [30, 11], [42, 12], [55, 11], [68, 12], [84, 11]],
    frogs: [[6, 12], [44, 12]],
    snakes: [[32, 12]],
    bugs: [[20, 9]],
    nets: [[60, 12, 1]],
    fish: [[14], [28], [42], [56], [70]],
    caves: [[84, 12]],
    script: [
      ['goto', 10, 12],
      ['goto', 20, 12],
      ['goto', 34, 12],
      ['goto', 48, 12],
      ['goto', 62, 12],
      ['goto', 84, 12]
    ]
  },
  {
    id: 10,
    biome: 'cave',
    sky: 'rain',
    cols: 100,
    rows: 18,
    exit: 'cave',
    goals: { keyed: 2, plungers: 1, slots: 3 },
    ground: [[0, 34, 15], [35, 70, 15], [71, 99, 15]],
    plats: [[40, 13, 4], [44, 12, 6]],
    rects: [
      [30, 0, 5, 18, TILE.SOLID],
      [66, 0, 5, 18, TILE.SOLID],
      [86, 10, 2, 6, TILE.TNT]
    ],
    tokens: [[6, 14], [18, 14], [42, 11], [58, 14], [80, 14], [94, 10]],
    frogs: [[10, 14], [50, 14]],
    snakes: [[20, 14]],
    bugs: [[48, 9], [76, 10]],
    keys: [[22, 14], [54, 11]],
    ladders: [[42, 14, 5]],
    doors: [
      { c: 26, r: 14, toC: 40, toR: 14, needKey: true, great: true },
      { c: 60, r: 14, toC: 76, toR: 14, needKey: true, great: true }
    ],
    plungers: [{ c: 80, r: 14, clears: [{ c: 86, r: 10, w: 2, h: 6 }] }],
    boulders: [[45, 11], [46, 11], [47, 11]],
    basin: { x: 40 * 32, y: 400 },
    slots: [[50, 14], [52, 13], [54, 12]],
    caves: [[94, 14]],
    script: [
      ['goto', 22, 14],
      ['goto', 26, 14],
      ['goto', 42, 14],
      ['climb', 42, 10],
      ['goto', 46, 11],
      ['push', 1, 'slots'],
      ['goto', 50, 13],
      ['goto', 52, 12],
      ['goto', 54, 11],
      ['goto', 60, 14],
      ['goto', 80, 14],
      ['goto', 90, 14],
      ['goto', 94, 14]
    ]
  },
  {
    id: 11,
    biome: 'sunset',
    sky: 'sunset',
    cols: 78,
    rows: 18,
    exit: 'edge',
    goals: { boss: 1 },
    ground: [[0, 77, 15]],
    plats: [[4, 13, 3], [8, 13, 5]],
    rects: [[58, 8, 2, 8, TILE.GATE]],
    tokens: [[4, 14], [10, 12], [20, 14], [70, 14]],
    frogs: [[10, 12]],
    snakes: [[5, 12, 2]],
    guns: [[12, 12, 3]],
    boss: { c: 40 },
    arena: [28, 56],
    script: [
      ['goto', 20, 14],
      ['boss'],
      ['goto', 76, 14]
    ]
  }
];

function compileLevel(def) {
  var cols = def.cols, rows = def.rows;
  var tiles = new Uint8Array(cols * rows);
  var crumble = new Uint8Array(cols * rows);
  function I(c, r) { return r * cols + c; }
  function inside(c, r) { return c >= 0 && r >= 0 && c < cols && r < rows; }
  function fill(c, r, w, h, code) {
    for (var y = r; y < r + h; y++) {
      for (var x = c; x < c + w; x++) {
        if (inside(x, y)) tiles[I(x, y)] = code;
      }
    }
  }
  (def.ground || []).forEach(function (g) { fill(g[0], g[2], g[1] - g[0] + 1, rows - g[2], TILE.SOLID); });
  (def.plats || []).forEach(function (p) { fill(p[0], p[1], p[2], 1, TILE.SOLID); });
  (def.rects || []).forEach(function (r) { fill(r[0], r[1], r[2], r[3], r[4]); });
  (def.crumble || []).forEach(function (c) { fill(c[0], c[1], c[2], 1, TILE.CRUMBLE); });
  (def.spikes || []).forEach(function (s) { fill(s[0], s[1], s[2], 1, TILE.SPIKE); });
  (def.water || []).forEach(function (w) { fill(w[0], w[1], w[2], w[3], TILE.WATER); });
  (def.ropes || []).forEach(function (r) { fill(r[0], r[1], r[2], 1, TILE.ROPE); });
  (def.wires || []).forEach(function (r) { fill(r[0], r[1], r[2], 1, TILE.WIRE); });
  (def.ladders || []).forEach(function (L) { fill(L[0], L[1] - L[2] + 1, 1, L[2], TILE.LADDER); });
  (def.poles || []).forEach(function (L) { fill(L[0], L[1] - L[2] + 1, 1, L[2], TILE.LADDER); });

  function cell(c, r, kind, extra) {
    var o = { kind: kind, c: c, r: r, x: c * 32, y: r * 32, w: 32, h: 32, alive: true };
    if (extra) Object.keys(extra).forEach(function (k) { o[k] = extra[k]; });
    return o;
  }

  var enemies = [];
  (def.frogs || []).forEach(function (f) {
    enemies.push(cell(f[0], f[1], 'frog', { dir: 1, flip: 0, w: 30, h: 26, y: f[1] * 32 + 6 }));
  });
  (def.snakes || []).forEach(function (s) {
    var span = s[2] || 5;
    var left = s[0], right = s[0];
    while (left > Math.max(0, s[0] - span) && solidish(tiles, cols, left - 1, s[1] + 1) && !solidish(tiles, cols, left - 1, s[1])) left--;
    while (right < Math.min(cols - 1, s[0] + span) && solidish(tiles, cols, right + 1, s[1] + 1) && !solidish(tiles, cols, right + 1, s[1])) right++;
    enemies.push(cell(s[0], s[1], 'snake', { dir: 1, minX: left * 32, maxX: (right + 1) * 32 - 36, w: 36, h: 18, y: s[1] * 32 + 14 }));
  });
  (def.birds || []).forEach(function (b) {
    enemies.push(cell(b[0], b[1], 'bird', { dir: 1, minX: b[0] * 32, maxX: (b[0] + (b[2] || 6)) * 32, w: 28, h: 18, y: b[1] * 32 }));
  });
  (def.hostages || []).forEach(function (h) {
    enemies.push(cell(h[0], h[1], 'hostage', { dir: 1, w: 30, h: 40, y: h[1] * 32 - 8, freed: false }));
  });
  (def.guns || []).forEach(function (g) {
    var span = g[2] || 4;
    var left = g[0], right = g[0];
    while (left > Math.max(0, g[0] - span) && solidish(tiles, cols, left - 1, g[1] + 1) && !solidish(tiles, cols, left - 1, g[1])) left--;
    while (right < Math.min(cols - 1, g[0] + span) && solidish(tiles, cols, right + 1, g[1] + 1) && !solidish(tiles, cols, right + 1, g[1])) right++;
    enemies.push(cell(g[0], g[1], 'gun', {
      dir: -1, minX: left * 32, maxX: (right + 1) * 32 - 30,
      w: 28, h: 40, y: g[1] * 32 - 8, cool: 40
    }));
  });
  (def.nets || []).forEach(function (n) {
    enemies.push(cell(n[0], n[1], 'net', { dir: n[2] || 1, w: 28, h: 40, y: n[1] * 32 - 8, swing: 0 }));
  });
  (def.bugs || []).forEach(function (b) {
    enemies.push(cell(b[0], b[1], 'bug', { w: 26, h: 18, homeX: b[0] * 32, homeY: b[1] * 32, swoop: 0, lockX: 0 }));
  });

  var tokens = (def.tokens || []).map(function (t) { return cell(t[0], t[1], 'token', { got: false }); });
  var keys = (def.keys || []).map(function (k) { return cell(k[0], k[1], 'key', { got: false }); });
  var signs = (def.signs || []).map(function (s) { return cell(s[0], s[1], 'sign', { y: s[1] * 32 - 20, h: 52 }); });
  var caves = (def.caves || []).map(function (s) { return cell(s[0], s[1], 'cave', { y: s[1] * 32 - 16, h: 48, w: 36 }); });
  var doors = (def.doors || []).map(function (d) {
    return cell(d.c, d.r, 'door', {
      toC: d.toC, toR: d.toR, needKey: !!d.needKey, great: !!d.great, exit: !!d.exit,
      used: false, y: d.r * 32 - 20, h: 52, w: 34
    });
  });
  var plungers = (def.plungers || []).map(function (p) {
    return cell(p.c, p.r, 'plunger', { used: false, clears: p.clears || null, y: p.r * 32 - 4, h: 36 });
  });
  var springs = (def.springs || []).map(function (s) {
    return { x: s[0] * 32 + 2, y: s[1] * 32 + 8, w: 28, h: 24 };
  });
  var boulders = (def.boulders || []).map(function (b) {
    return { x: b[0] * 32, y: b[1] * 32, w: 32, h: 32, vx: 0, vy: 0, grounded: false, slot: -1, snapped: false };
  });
  var crates = (def.crates || []).map(function (c) {
    return { x: c[0] * 32, y: c[1] * 32, w: 32, h: 32, alive: true };
  });
  var slots = (def.slots || []).map(function (s) { return { x: s[0] * 32, y: s[1] * 32, taken: false }; });
  var fish = (def.fish || []).map(function (f, i) {
    return { x: f[0] * 32 + 16, phase: i * 37, alive: true };
  });
  var sheriffs = [];

  var plank = null;
  if (def.plank) {
    plank = {
      id: 'plank',
      x: def.plank.c * 32,
      y: 15 * 32,
      w: def.plank.len * 32,
      h: 10,
      dist: def.plank.dist * 32,
      period: def.plank.period,
      pause: def.plank.pause,
      origin: def.plank.c * 32
    };
  }
  var pillars = (def.pillars || []).map(function (p, i) {
    var surface = (p.surface != null ? p.surface : (p.r || 15)) * 32;
    return {
      id: 'pillar' + i,
      x: p.c * 32,
      y: surface,
      originX: p.c * 32,
      originY: surface,
      w: p.w * 32,
      h: (p.h || 4) * 32,
      axis: p.axis,
      dist: p.dist * 32,
      period: p.period,
      pause: p.pause,
      topH: 18
    };
  });
  var ride = null;
  if (def.ride) {
    ride = {
      id: 'ride',
      x: def.ride.c * 32,
      y: 15 * 32,
      w: 72,
      h: 58,
      minX: def.ride.c * 32 - 8,
      maxX: (def.ride.c + def.ride.len) * 32,
      vx: 0,
      traveled: false
    };
  }
  var boss = null;
  if (def.boss) {
    boss = {
      x: def.boss.c * 32,
      y: 15 * 32 - 150,
      hoverY: 15 * 32 - 150,
      w: 108,
      h: 78,
      vx: 0,
      vy: 0,
      state: 'hover',
      timer: 50,
      hp: 4,
      alive: true,
      shake: 0
    };
  }

  var start = { x: 2 * 32 + 4, y: 15 * 32 - 28 };
  if (def.ground && def.ground[0]) {
    var gy = def.ground[0][2] * 32;
    start.y = gy - 28;
  }

  return {
    def: def,
    cols: cols,
    rows: rows,
    tiles: tiles,
    crumble: crumble,
    enemies: enemies,
    tokens: tokens,
    keys: keys,
    signs: signs,
    caves: caves,
    doors: doors,
    plungers: plungers,
    springs: springs,
    boulders: boulders,
    crates: crates,
    slots: slots,
    fish: fish,
    sheriffs: sheriffs,
    plank: plank,
    pillars: pillars,
    ride: ride,
    boss: boss,
    bullets: [],
    start: start,
    decals: {
      cacti: def.cacti || [],
      saloon: def.saloon || null,
      poles: def.poles || [],
      ladders: def.ladders || [],
      buildings: def.buildings || []
    },
    script: (def.script || []).map(function (s) { return s.slice(); }),
    counters: { crates: 0, hostages: 0, plungers: 0, keyed: 0, slots: 0, boss: 0, ride: 0 }
  };
}

function solidish(tiles, cols, c, r) {
  if (c < 0 || r < 0) return false;
  var t = tiles[r * cols + c];
  return t === TILE.SOLID || t === TILE.CRUMBLE || t === TILE.SPIKE || t === TILE.WALL || t === TILE.TNT || t === TILE.GATE;
}
