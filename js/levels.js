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
    cols: 100,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Desert from the level 5 frames: cactus, a rope over a gap, stairs,
       a spring, boulders on a ledge, a standing bandit, a plunger that is
       not required. No water trench and no rolling boulder ride. */
    ground: [[0, 24, 15], [28, 99, 15]],
    ropes: [[25, 14, 3]],
    plats: [[8, 13, 5], [36, 13, 4], [40, 12, 4], [44, 11, 5], [70, 13, 6], [88, 12, 6]],
    tokens: [[4, 12], [10, 11], [16, 13], [22, 12], [34, 11], [42, 9], [52, 13], [66, 12], [76, 13], [92, 10]],
    frogs: [[12, 12]],
    snakes: [[72, 12, 2]],
    nets: [[90, 11, 1]],
    springs: [[50, 14]],
    plungers: [{ c: 80, r: 14, clears: [] }],
    boulders: [[45, 10], [46, 10]],
    crates: [[38, 12]],
    cacti: [[3, 14], [18, 14], [62, 14]],
    script: [
      ['goto', 14, 14],
      ['goto', 26, 14],
      ['goto', 40, 14],
      ['goto', 58, 14],
      ['goto', 76, 14],
      ['goto', 98, 14]
    ]
  },
  {
    id: 6,
    biome: 'town',
    sky: 'day',
    cols: 96,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Town from the level 6 frames: buildings, pegged poles, a wire with birds,
       a snake, and a caged bandit on a balcony. No plunger and no boulder wall. */
    ground: [[0, 95, 15]],
    buildings: [[2, 9, 8, 6], [26, 8, 8, 7], [50, 9, 7, 6], [72, 10, 8, 5]],
    poles: [[16, 14, 8], [42, 14, 8]],
    wires: [[16, 7, 30]],
    birds: [[20, 6, 12], [46, 6, 8]],
    plats: [[34, 13, 5], [58, 13, 4], [74, 11, 6]],
    tokens: [[6, 13], [12, 11], [20, 6], [24, 6], [30, 6], [38, 11], [54, 13], [64, 11], [80, 12], [90, 13]],
    frogs: [[36, 12]],
    snakes: [[60, 12, 2]],
    hostages: [[76, 10]],
    cacti: [[92, 14]],
    script: [
      ['goto', 12, 14],
      ['goto', 32, 14],
      ['goto', 52, 14],
      ['goto', 70, 14],
      ['goto', 94, 14]
    ]
  },
  {
    id: 7,
    biome: 'desert',
    sky: 'day',
    cols: 88,
    rows: 18,
    exit: 'door',
    goals: {},
    /* Outdoor pale steps from the level 7 frames, then a building with a blue
       door. Not a rainy cave. The key sits on the roof and is not required. */
    ground: [[0, 87, 15]],
    buildings: [[60, 9, 8, 6]],
    plats: [[8, 13, 4], [14, 12, 4], [20, 11, 4], [36, 13, 6], [52, 12, 5], [66, 11, 6]],
    tokens: [[4, 13], [10, 11], [18, 9], [30, 13], [40, 11], [54, 10], [70, 9]],
    frogs: [[16, 10]],
    snakes: [[22, 10, 2]],
    birds: [[40, 8, 6]],
    keys: [[68, 10]],
    doors: [{ c: 84, r: 14, exit: true, great: true, needKey: false }],
    cacti: [[2, 14], [32, 14]],
    script: [
      ['goto', 12, 14],
      ['goto', 34, 14],
      ['goto', 56, 14],
      ['goto', 84, 14]
    ]
  },
  {
    id: 8,
    biome: 'hill',
    sky: 'rain',
    cols: 86,
    rows: 18,
    exit: 'sign',
    goals: {},
    /* Rainy green hills from the level 8 frames. A cave mouth, frogs, one
       spiked stone pillar that stays put, a spring, and a swirl sign. */
    ground: [[0, 85, 15]],
    rects: [
      [6, 9, 6, 5, TILE.SOLID],
      [40, 11, 4, 3, TILE.SOLID]
    ],
    spikes: [[40, 10, 4]],
    plats: [[18, 13, 5], [28, 12, 4], [56, 13, 6]],
    tokens: [[4, 13], [14, 12], [22, 11], [34, 13], [48, 12], [60, 11], [72, 13]],
    frogs: [[20, 12], [58, 12]],
    springs: [[64, 14]],
    cacti: [[74, 14]],
    signs: [[80, 14]],
    script: [
      ['goto', 16, 14],
      ['goto', 36, 14],
      ['goto', 58, 14],
      ['goto', 80, 14]
    ]
  },
  {
    id: 9,
    biome: 'water',
    sky: 'day',
    cols: 108,
    rows: 18,
    exit: 'cave',
    goals: {},
    /* Play order from the level 9 frames: grass and a cactus, a drop onto tan
       islets, a snake, fish leaping out of the water, a net on the stair, crates, a cave mouth. */
    ground: [[0, 14, 10]],
    rects: [
      [18, 10, 11, 2, TILE.SOLID],
      [32, 10, 11, 2, TILE.SOLID],
      [46, 10, 9, 2, TILE.SOLID],
      [58, 10, 9, 2, TILE.SOLID],
      [70, 10, 11, 2, TILE.SOLID],
      [84, 10, 11, 2, TILE.SOLID],
      [98, 10, 10, 2, TILE.SOLID]
    ],
    plats: [[48, 8, 4], [72, 8, 5]],
    water: [[0, 14, 108, 4]],
    tokens: [[3, 7], [6, 6], [12, 8], [20, 8], [26, 7], [36, 8], [40, 6], [50, 6], [60, 8], [64, 6], [76, 6], [88, 8], [102, 8]],
    frogs: [[10, 9]],
    snakes: [[36, 9, 3]],
    nets: [[74, 7, 1]],
    fish: [[16], [30], [44], [56], [68], [82], [96]],
    cacti: [[4, 9], [34, 9], [100, 9]],
    caves: [[104, 9]],
    script: [
      ['goto', 12, 9],
      ['goto', 22, 9],
      ['goto', 36, 9],
      ['goto', 50, 9],
      ['goto', 62, 9],
      ['goto', 76, 9],
      ['goto', 90, 9],
      ['goto', 104, 9]
    ]
  },
  {
    id: 10,
    biome: 'canyon',
    sky: 'day',
    cols: 96,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Outdoor orange canyon from the level 10 frames. Boulder pile, a vertical
       coin shaft, a spring, a wooden building, and a star plunger that the
       playthrough walks past. No key is required to leave. */
    ground: [[0, 95, 15]],
    plats: [[10, 13, 5], [18, 11, 4], [36, 12, 6], [48, 13, 3], [50, 12, 3], [52, 11, 3], [66, 12, 5], [78, 11, 6]],
    tokens: [[4, 14], [8, 12], [14, 10], [22, 9], [40, 8], [40, 10], [40, 12], [40, 14], [46, 13], [46, 11], [46, 9], [60, 10], [70, 10], [84, 9], [90, 14]],
    boulders: [[36, 11], [37, 11], [38, 11], [37, 10], [38, 10], [38, 9]],
    springs: [[62, 14]],
    buildings: [[80, 9, 8, 6]],
    plungers: [{ c: 90, r: 14 }],
    cacti: [[2, 14]],
    script: [
      ['goto', 8, 14],
      ['goto', 16, 14],
      ['goto', 28, 14],
      ['goto', 44, 14],
      ['goto', 58, 14],
      ['goto', 74, 14],
      ['goto', 94, 14]
    ]
  },
  {
    id: 11,
    biome: 'sunset',
    sky: 'sunset',
    cols: 92,
    rows: 18,
    exit: 'edge',
    goals: { boss: 1 },
    /* The video cards call the cave LEVEL 11 and the boot LEVEL 12. This stage
       is that cave corridor, then the sunset arena and the flying boot. */
    ground: [[0, 91, 15]],
    plats: [[6, 12, 4], [14, 11, 3], [22, 13, 4]],
    rects: [
      [0, 0, 30, 10, TILE.SOLID],
      [72, 8, 2, 8, TILE.GATE]
    ],
    spikes: [[8, 12, 2]],
    tokens: [[4, 13], [12, 13], [18, 12], [26, 14], [84, 14]],
    frogs: [[16, 10]],
    snakes: [[10, 11, 2]],
    guns: [[24, 12, 2]],
    boss: { c: 52 },
    arena: [40, 70],
    script: [
      ['goto', 32, 14],
      ['boss'],
      ['goto', 90, 14]
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
