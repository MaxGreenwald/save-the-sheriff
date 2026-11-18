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
    cols: 120,
    rows: 18,
    exit: 'edge',
    goals: { crates: 1 },
    /* Desert from the full level 1 frames: cactus, the frog block and four
       coins, a plank over the pit, stairs, a snake ledge, and the wood
       building at the end. */
    ground: [[0, 20, 15], [28, 119, 15]],
    plats: [[34, 13, 5], [38, 12, 6], [60, 14, 4], [64, 13, 4], [68, 12, 6], [78, 13, 8], [90, 12, 6]],
    rects: [
      [6, 12, 8, 3, TILE.SOLID],
      [22, 13, 2, 1, TILE.SOLID],
      [21, 16, 7, 2, TILE.SOLID]
    ],
    ropes: [[21, 14, 7]],
    tokens: [[2, 11], [4, 9], [7, 8], [9, 8], [11, 8], [13, 8], [22, 13], [36, 10], [42, 9], [49, 8], [56, 14], [64, 11], [72, 9], [80, 12], [88, 14]],
    frogs: [[10, 11]],
    snakes: [[70, 11, 3], [78, 14, 3]],
    cacti: [[2, 14], [40, 11], [66, 14], [84, 14], [104, 14]],
    saloon: [112, 14],
    signs: [[116, 14]],
    boulders: [[44, 14]],
    crates: [[24, 15], [50, 14]],
    plank: { c: 18, len: 6, dist: 8, period: 150, pause: 36 },
    script: [
      ['goto', 4, 14],
      ['goto', 8, 11],
      ['goto', 16, 14],
      ['plank', 30],
      ['goto', 42, 14],
      ['push', 1, 'crates'],
      ['goto', 118, 14]
    ]
  },
  {
    id: 2,
    biome: 'town',
    sky: 'day',
    cols: 96,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Town from the level 2 frames: pegged poles, a balcony cage beside a
       net bandit, the lady at the saloon, a hanging frame, and a star
       plunger that frees the sphere pile. The bird quest is optional. */
    ground: [[0, 95, 15]],
    buildings: [[6, 8, 12, 7, 'saloon'], [22, 8, 18, 7, 'brick'], [44, 9, 8, 6, 'white'], [74, 10, 7, 5, 'yellow']],
    women: [[11, 14]],
    poles: [[18, 14, 8], [46, 14, 7]],
    frames: [[40, 11]],
    plats: [[8, 12, 6], [32, 12, 6], [56, 13, 5], [78, 11, 5], [84, 12, 2], [88, 12, 4]],
    tokens: [[6, 13], [12, 10], [16, 10], [24, 13], [36, 10], [40, 10], [50, 12], [62, 13], [70, 11], [86, 13]],
    frogs: [[10, 11]],
    birds: [[20, 6, 8], [34, 6, 8]],
    bugs: [[42, 8]],
    guns: [[58, 11, 2]],
    nets: [[81, 10, 1]],
    cages: [[78, 10]],
    rects: [[86, 11, 2, 2, TILE.TNT]],
    plungers: [{ c: 84, r: 11, clears: [{ c: 86, r: 11, w: 2, h: 2 }] }],
    boulders: [[88, 11], [89, 11], [89, 10], [90, 11]],
    signs: [[92, 14]],
    script: [
      ['goto', 14, 14],
      ['goto', 40, 14],
      ['goto', 66, 14],
      ['goto', 94, 14]
    ]
  },
  {
    id: 3,
    biome: 'desert',
    sky: 'day',
    cols: 92,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Desert canyon from the level 3 frames: cactus, a raised ledge with a
       frog, a snake, a gun bandit on a terrace, then stairs. No sign was in
       the frames before the level-done card. */
    ground: [[0, 16, 15], [22, 91, 15]],
    plats: [[8, 12, 6], [28, 13, 5], [48, 14, 1], [49, 13, 1], [50, 12, 1], [51, 11, 1], [52, 10, 1], [53, 11, 1], [54, 12, 1], [55, 13, 1], [56, 14, 1], [64, 12, 4], [70, 11, 5]],
    tokens: [[4, 12], [12, 9], [18, 13], [26, 11], [32, 9], [40, 9], [52, 10], [66, 9], [78, 13], [86, 12]],
    frogs: [[11, 11]],
    snakes: [[30, 12, 3]],
    guns: [[30, 12, 2], [72, 10, 2]],
    boulders: [[28, 12]],
    cacti: [[3, 14], [14, 14], [84, 14]],
    signs: [[88, 14]],
    script: [
      ['goto', 14, 14],
      ['goto', 24, 14],
      ['goto', 50, 14],
      ['goto', 90, 14]
    ]
  },
  {
    id: 4,
    biome: 'canyon',
    sky: 'day',
    cols: 100,
    rows: 18,
    exit: 'sign',
    goals: { plungers: 1 },
    /* Orange canyon from the level 4 frames. A high block and a cactus, a
       snake in the notch, TNT on the rope, a plunger, boulder steps, a tower,
       and the swirl sign at the end. */
    ground: [[0, 12, 15], [16, 40, 15], [64, 99, 15]],
    ropes: [[13, 14, 4], [42, 14, 22]],
    rects: [
      [14, 12, 2, 2, TILE.TNT],
      [18, 12, 2, 2, TILE.TNT],
      [82, 9, 4, 4, TILE.SOLID]
    ],
    plats: [[2, 14, 6], [4, 13, 4], [66, 12, 6], [68, 11, 4], [70, 10, 2], [88, 12, 4]],
    tokens: [[6, 10], [15, 12], [19, 12], [30, 13], [46, 8], [60, 12], [74, 12], [76, 12], [92, 13]],
    snakes: [[36, 12, 2]],
    nets: [[56, 11, 1]],
    plungers: [{ c: 28, r: 14, clears: [{ c: 14, r: 12, w: 6, h: 2 }, { c: 13, r: 14, w: 4, h: 1 }] }],
    boulders: [[5, 12], [66, 11], [67, 11], [68, 11], [69, 11], [67, 10], [68, 10], [69, 10], [68, 9], [83, 8]],
    cacti: [[4, 12], [64, 14]],
    signs: [[96, 14]],
    script: [
      ['goto', 6, 12],
      ['goto', 20, 14],
      ['plunge', 28],
      ['goto', 36, 14],
      ['goto', 66, 14],
      ['goto', 96, 14]
    ]
  },
  {
    id: 5,
    biome: 'desert',
    sky: 'day',
    cols: 100,
    rows: 18,
    exit: 'sign',
    goals: {},
    /* Desert from the level 5 frames. The swirl by the porch is the exit.
       Earlier signs in the video are mid-level and are not the end. */
    ground: [[0, 20, 15], [40, 99, 15]],
    ropes: [[21, 14, 19]],
    rects: [[21, 16, 19, 2, TILE.TNT]],
    plats: [[8, 13, 5], [36, 13, 4], [40, 12, 4], [44, 11, 5], [70, 13, 6], [88, 12, 6]],
    tokens: [[4, 12], [10, 11], [16, 13], [22, 12], [34, 11], [42, 9], [52, 13], [66, 12], [76, 13], [92, 10]],
    frogs: [[12, 12]],
    snakes: [[72, 12, 2]],
    nets: [[72, 12, 1]],
    springs: [[50, 14]],
    plungers: [{ c: 80, r: 14, clears: [] }],
    boulders: [[38, 12], [45, 10], [46, 10]],
    crates: [[38, 12]],
    cacti: [[3, 14], [18, 14], [62, 14]],
    buildings: [[88, 10, 7, 5]],
    signs: [[96, 14]],
    script: [
      ['goto', 14, 14],
      ['goto', 26, 14],
      ['goto', 40, 14],
      ['goto', 58, 14],
      ['goto', 76, 14],
      ['goto', 96, 14]
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
    buildings: [[10, 9, 8, 6], [26, 8, 8, 7], [50, 9, 7, 6], [72, 10, 8, 5]],
    poles: [[16, 14, 8], [42, 14, 8]],
    wires: [[16, 7, 30]],
    birds: [[20, 6, 12], [46, 6, 8]],
    plats: [[34, 13, 5], [58, 13, 4], [74, 11, 6]],
    tokens: [[6, 13], [12, 11], [20, 6], [24, 6], [30, 8], [31, 8], [32, 8], [30, 9], [31, 9], [32, 9], [30, 10], [31, 10], [32, 10], [38, 11], [54, 13], [64, 11], [80, 12], [90, 13]],
    pale: [[84, 13, 8], [86, 12, 6], [88, 11, 4]],
    frogs: [[36, 12]],
    snakes: [[60, 12, 2]],
    hostages: [[76, 10]],
    cacti: [[92, 14]],
    signs: [[90, 14]],
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
       door. A caged bird on the steps can be walked back to the woman.
       The key sits on the roof and is not required. */
    ground: [[0, 87, 15]],
    buildings: [[60, 9, 8, 6, 'blue']],
    women: [[54, 14]],
    cages: [[15, 11]],
    plats: [[8, 13, 4], [14, 12, 4], [20, 11, 4], [36, 13, 6], [52, 14, 4], [56, 13, 4], [60, 12, 4], [64, 11, 8]],
    tokens: [[4, 13], [10, 11], [18, 9], [30, 13], [40, 11], [54, 10], [70, 9]],
    frogs: [[16, 10]],
    snakes: [[22, 10, 2]],
    birds: [[40, 8, 6]],
    keys: [[15, 11]],
    doors: [{ c: 70, r: 10, exit: true, great: true, needKey: true }],
    signs: [[70, 10]],
    cacti: [[2, 14], [32, 14]],
    script: [
      ['goto', 12, 14],
      ['goto', 15, 11],
      ['goto', 34, 14],
      ['goto', 56, 14],
      ['goto', 70, 10]
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
    /* Rainy green hills. A cave mouth, a flat pillar and a spiked pillar that
       stay put, two springs, and the swirl sign. */
    ground: [[0, 85, 15]],
    rects: [
      [6, 9, 6, 4, TILE.SOLID],
      [18, 8, 16, 5, TILE.SOLID],
      [28, 11, 4, 3, TILE.SOLID],
      [44, 11, 4, 3, TILE.SOLID]
    ],
    carve: [[20, 10, 10, 2]],
    spikes: [[40, 14, 3]],
    plats: [[18, 13, 5], [36, 13, 4], [56, 13, 6]],
    tokens: [[4, 13], [10, 12], [14, 12], [18, 12], [22, 11], [34, 13], [48, 12], [60, 11], [72, 13]],
    frogs: [[20, 12], [58, 12]],
    springs: [[34, 14], [52, 14], [66, 14]],
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
    /* Water crossing: cactus, islets, fish, a cage, a row of stones, a net
       on the stair, and a spring in the last shaft. The plunger is not required. */
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
    cages: [[49, 7]],
    boulders: [[48, 7], [49, 7], [50, 7], [51, 7]],
    plungers: [{ c: 46, r: 7, clears: [] }],
    springs: [[100, 8]],
    ropes: [[15, 9, 3], [29, 9, 3], [44, 9, 2], [55, 9, 3], [67, 9, 3], [81, 9, 3], [95, 9, 3]],
    women: [[6, 9]],
    fish: [[16], [30], [44], [56], [68], [82], [96]],
    cacti: [[4, 9], [34, 9], [100, 9]],
    caves: [[104, 9]],
    signs: [[104, 9]],
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
    /* Orange canyon. Cave mouth, a sphere pile, a vertical coin shaft, a
       spring, a floating key that is not required, and a star plunger on the roof. */
    ground: [[0, 95, 15]],
    rects: [[0, 9, 4, 4, TILE.SOLID]],
    plats: [[10, 13, 5], [18, 11, 4], [36, 12, 6], [48, 13, 3], [50, 12, 3], [52, 11, 3], [66, 12, 5], [78, 11, 6]],
    tokens: [[4, 14], [8, 12], [14, 10], [22, 9], [40, 7], [40, 8], [40, 9], [40, 10], [40, 11], [40, 12], [40, 13], [40, 14], [46, 13], [46, 11], [46, 9], [60, 10], [70, 10], [84, 9], [90, 14]],
    boulders: [[36, 11], [37, 11], [38, 11], [39, 11], [40, 11], [37, 10], [38, 10], [39, 10], [38, 9], [39, 9], [38, 8]],
    springs: [[62, 14]],
    keys: [[68, 10]],
    buildings: [[80, 9, 8, 6, 'blue']],
    plungers: [{ c: 90, r: 14, clears: [] }],
    cacti: [[2, 14]],
    signs: [[92, 14]],
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
    sky: 'rain',
    cols: 92,
    rows: 18,
    exit: 'edge',
    goals: { boss: 1 },
    wood: true,
    woodUntil: 30,
    /* Wood cave, then the boot. The fight has rain over orange ground.
       The boot still takes 4 stomps. */
    ground: [[0, 91, 15]],
    plats: [[6, 12, 4], [14, 11, 3], [22, 13, 4], [48, 13, 5]],
    rects: [
      [0, 0, 30, 10, TILE.SOLID],
      [56, 11, 5, 3, TILE.WALL],
      [72, 8, 2, 8, TILE.GATE]
    ],
    spikes: [[8, 12, 2]],
    buildings: [[78, 10, 8, 5, 'sheriff']],
    tokens: [[4, 13], [12, 13], [18, 12], [26, 14], [84, 14]],
    frogs: [[16, 10]],
    snakes: [[10, 11, 2]],
    guns: [[24, 12, 2]],
    boss: { c: 52 },
    arena: [40, 70],
    signs: [[88, 14]],
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
  (def.carve || []).forEach(function (c) { fill(c[0], c[1], c[2], c[3], TILE.AIR); });
  (def.crumble || []).forEach(function (c) { fill(c[0], c[1], c[2], 1, TILE.CRUMBLE); });
  (def.spikes || []).forEach(function (s) { fill(s[0], s[1], s[2], 1, TILE.SPIKE); });
  (def.water || []).forEach(function (w) { fill(w[0], w[1], w[2], w[3], TILE.WATER); });
  (def.ropes || []).forEach(function (r) { fill(r[0], r[1], r[2], 1, TILE.ROPE); });
  (def.wires || []).forEach(function (r) { fill(r[0], r[1], r[2], 1, TILE.WIRE); });
  (def.ladders || []).forEach(function (L) { fill(L[0], L[1] - L[2] + 1, 1, L[2], TILE.LADDER); });

  var platforms = [];
  (def.cacti || []).forEach(function (c) {
    var x = c[0] * 32, feet = (c[1] + 1) * 32;
    platforms.push({ x: x + 4, y: feet - 156, w: 22, h: 6, kind: 'cactus' });
    platforms.push({ x: x - 14, y: feet - 124, w: 14, h: 6, kind: 'cactus' });
    platforms.push({ x: x - 10, y: feet - 96, w: 20, h: 6, kind: 'cactus' });
    platforms.push({ x: x + 20, y: feet - 96, w: 16, h: 6, kind: 'cactus' });
    platforms.push({ x: x + 18, y: feet - 70, w: 20, h: 6, kind: 'cactus' });
  });
  (def.poles || []).forEach(function (p) {
    var x = p[0] * 32, y = (p[1] + 1) * 32, h = p[2] * 32;
    var pegs = Math.max(3, Math.floor(h / 36));
    var step = Math.floor((h - 28) / pegs);
    for (var i = 0; i < pegs; i++) {
      var py = y - h + 18 + i * step;
      var left = i % 2 === 0;
      platforms.push({ x: left ? x - 10 : x + 20, y: py, w: 18, h: 6, kind: 'peg' });
    }
  });
  (def.buildings || []).forEach(function (b) {
    var x = b[0] * 32, y = b[1] * 32, w = b[2] * 32, h = b[3] * 32;
    platforms.push({ x: x, y: y, w: w, h: 6, kind: 'roof' });
    platforms.push({ x: x + 8, y: y + Math.floor(h * 0.42), w: Math.max(16, w - 16), h: 6, kind: 'balcony' });
    platforms.push({ x: x + Math.floor(w / 2) - 20, y: y + h - 8, w: 40, h: 6, kind: 'stoop' });
  });
  (def.frames || []).forEach(function (f) {
    platforms.push({ x: f[0] * 32, y: f[1] * 32, w: 32, h: 8, kind: 'frame' });
  });
  var cages = (def.cages || []).map(function (c) {
    var box = { x: c[0] * 32 + 2, y: c[1] * 32, w: 28, h: 32, open: false };
    platforms.push({ x: box.x, y: box.y, w: box.w, h: 6, kind: 'cage' });
    return box;
  });
  var npc = null;
  if (cages.length && def.women && def.women.length) {
    var w0 = def.women[0];
    var feet = (w0[1] + 1) * 32;
    npc = {
      x: w0[0] * 32, y: feet - 52, w: 46, h: 56, bubble: 0,
      perchX: w0[0] * 32 - 20, perchY: feet - 32
    };
  }

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
  var perchers = (def.birds || []).map(function (b) {
    return { x: b[0] * 32, y: b[1] * 32, w: 28, h: 18 };
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
  enemies.forEach(function (e) {
    var feet = e.y + e.h;
    var c = Math.floor((e.x + e.w / 2) / 32);
    var row = Math.floor((feet + 1) / 32);
    if (solidish(tiles, cols, c, row)) return;
    for (var rr = row; rr < rows; rr++) {
      if (solidish(tiles, cols, c, rr)) { e.y = rr * 32 - e.h; break; }
    }
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
  var boulders = (def.boulders || []).map(function (b, i) {
    var rock = { x: b[0] * 32 + 5, y: b[1] * 32 + 10, w: 22, h: 22, vx: 0, vy: 0, grounded: false, slot: -1, snapped: false, held: false, tumble: 0, kick: 0 };
    var bc = b[0], br = b[1];
    for (var dy = -2; dy <= 2 && !rock.held; dy++) {
      for (var dx = -3; dx <= 3; dx++) {
        var tx = bc + dx, ty = br + dy;
        if (!inside(tx, ty)) continue;
        if (tiles[I(tx, ty)] !== TILE.TNT) continue;
        rock.held = true;
        rock.anchorC = tx;
        rock.anchorR = ty;
        rock.kick = ((tx * 32 + 16) < (rock.x + 16) ? -1 : 1) * (0.75 + (i % 4) * 0.22);
        break;
      }
    }
    return rock;
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
    perchers: perchers,
    tokens: tokens,
    keys: keys,
    signs: signs,
    caves: caves,
    doors: doors,
    plungers: plungers,
    platforms: platforms,
    cages: cages,
    npc: npc,
    pet: null,
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
      buildings: def.buildings || [],
      women: def.women || [],
      pale: def.pale || []
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
