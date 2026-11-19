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
    goals: {},
    /* Level 1 packed to the stitched panorama, about 120 tiles.
       Flat sand, saguaro, rock and grass, the 4-tile frog block and four
       swirls, a cactus terrace, then a deep pit (rope, column, sphere,
       crate), a plateau with bushes and frogs, and the wood building. */
    ground: [[0, 119, 13]],
    rects: [
      [12, 12, 2, 1, TILE.SOLID],
      [14, 11, 2, 2, TILE.SOLID],
      [16, 10, 2, 3, TILE.SOLID],
      [18, 9, 2, 4, TILE.SOLID],
      [20, 9, 8, 4, TILE.SOLID],
      [28, 12, 2, 1, TILE.SOLID],
      [29, 11, 2, 2, TILE.SOLID],
      [30, 10, 2, 3, TILE.SOLID],
      [31, 9, 1, 1, TILE.SOLID],
      [32, 9, 8, 4, TILE.SOLID],
      [40, 12, 5, 1, TILE.SOLID],
      [46, 12, 2, 1, TILE.SOLID],
      [47, 11, 1, 2, TILE.SOLID],
      [48, 10, 2, 3, TILE.SOLID],
      [50, 9, 1, 4, TILE.SOLID],
      [51, 7, 6, 6, TILE.SOLID],
      [58, 4, 3, 2, TILE.SOLID],
      [57, 7, 4, 6, TILE.SOLID],
      [61, 12, 1, 1, TILE.SOLID],
      [62, 11, 1, 2, TILE.SOLID],
      [63, 10, 1, 3, TILE.SOLID],
      [64, 9, 1, 4, TILE.SOLID],
      [65, 8, 1, 5, TILE.SOLID],
      [65, 7, 1, 1, TILE.SOLID],
      [66, 7, 8, 6, TILE.SOLID],
      [78, 12, 3, 1, TILE.SOLID],
      [80, 11, 3, 2, TILE.SOLID],
      [80, 10, 2, 1, TILE.SOLID],
      [81, 9, 1, 1, TILE.SOLID],
      [82, 9, 18, 4, TILE.SOLID],
      [100, 10, 4, 3, TILE.SOLID],
      [104, 11, 4, 2, TILE.SOLID],
      [108, 11, 6, 2, TILE.SOLID]
    ],
    ropes: [[52, 6, 16]],
    tokens: [
      [8, 4],
      [20, 4], [22, 4], [25, 4], [27, 4],
      [54, 5], [60, 4], [63, 5],
      [75, 6], [75, 8],
      [84, 6], [88, 6], [92, 6],
      [110, 6]
    ],
    frogs: [[27, 8], [96, 8]],
    snakes: [[48, 9, 2]],
    cacti: [[7, 12], [33, 8], [74, 12], [86, 8], [109, 10]],
    buildings: [[114, 8, 6, 5, 'shed']],
    boulders: [[59, 3, 30]],
    crates: [[62, 12]],
    tufts: [[4, 12], [42, 11], [80, 8], [110, 10]],
    bushes: [[17, 12], [28, 12], [82, 8], [90, 8], [96, 8]],
    rocks: [[9, 12], [44, 11], [68, 6], [106, 12]],
    script: [
      ['goto', 7, 12],
      ['goto', 7, 6],
      ['goto', 22, 8],
      ['stomp', 'frog'],
      ['goto', 36, 8],
      ['goto', 42, 11],
      ['stomp', 'snake'],
      ['goto', 54, 6],
      ['goto', 70, 6],
      ['goto', 76, 12],
      ['goto', 84, 8],
      ['stomp', 'frog'],
      ['goto', 110, 10],
      ['goto', 118, 12]
    ]
  },
  {
    id: 2,
    biome: 'town',
    sky: 'day',
    cols: 128,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Town, about 128 tiles. Poles, saloon and the lady, brick and yellow
       fronts, a balcony cage beside a net, a hanging frame, then the plunger
       and the sphere pile on a raised sand shelf. No swirl sign. */
    ground: [[0, 127, 15]],
    buildings: [[4, 8, 12, 7, 'saloon'], [22, 8, 16, 7, 'brick'], [42, 9, 10, 6, 'white'], [56, 8, 14, 7, 'yellow'], [78, 9, 10, 6, 'wood'], [92, 8, 12, 7, 'brick']],
    women: [[8, 14]],
    poles: [[18, 14, 8], [48, 14, 8]],
    frames: [[40, 11], [70, 11]],
    plats: [[34, 12, 6], [58, 12, 10], [104, 12, 18]],
    tokens: [[6, 12], [14, 10], [20, 12], [28, 10], [36, 11], [44, 12], [52, 10], [64, 11], [74, 12], [86, 11], [98, 12], [120, 10]],
    frogs: [[36, 11], [60, 11]],
    birds: [[20, 6, 10], [50, 6, 8]],
    bugs: [[44, 8]],
    nets: [[62, 11, 1]],
    cages: [[58, 11]],
    rects: [[108, 9, 2, 3, TILE.TNT]],
    plungers: [{ c: 100, r: 14, clears: [{ c: 108, r: 9, w: 2, h: 3 }] }],
    boulders: [
      [112, 11, 30], [113, 11, 30], [114, 11, 30], [115, 11, 30], [116, 11, 30],
      [113, 10, 30], [114, 10, 30], [115, 10, 30], [116, 10, 30],
      [114, 9, 30], [115, 9, 30], [116, 9, 30],
      [115, 8, 30], [116, 8, 30],
      [116, 7, 30]
    ],
    script: [
      ['goto', 16, 14],
      ['goto', 46, 14],
      ['goto', 84, 14],
      ['goto', 126, 14]
    ]
  },
  {
    id: 3,
    biome: 'desert',
    sky: 'day',
    cols: 76,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Desert, about 76 tiles. Cactus, a 3-tile block with a frog, a pillar
       and a rock, stairs, a snake ledge, one gun on a terrace. No swirl sign. */
    ground: [[0, 75, 15]],
    plats: [[8, 12, 8], [22, 13, 6], [32, 12, 4], [40, 12, 6], [50, 14, 1], [51, 13, 1], [52, 12, 1], [53, 11, 1], [54, 12, 1], [55, 13, 1], [56, 14, 1], [62, 12, 8]],
    tokens: [[4, 12], [10, 9], [16, 13], [24, 11], [34, 8], [42, 9], [53, 9], [66, 9], [72, 13]],
    frogs: [[12, 11]],
    snakes: [[42, 11, 3]],
    guns: [[64, 11, 2]],
    boulders: [[33, 11]],
    cacti: [[2, 14], [24, 14], [68, 14]],
    script: [
      ['goto', 6, 14],
      ['goto', 20, 14],
      ['goto', 48, 14],
      ['goto', 74, 14]
    ]
  },
  {
    id: 4,
    biome: 'canyon',
    sky: 'day',
    cols: 76,
    rows: 18,
    exit: 'sign',
    goals: { plungers: 1 },
    /* Orange canyon, about 76 tiles. Plunger on the ground, dynamite beside
       a rope, a cliff of spheres, a net on the sand, and the swirl sign. */
    ground: [[0, 22, 15], [30, 44, 15], [56, 75, 15]],
    ropes: [[20, 13, 12], [44, 13, 14]],
    rects: [
      [24, 11, 3, 2, TILE.TNT],
      [60, 14, 2, 1, TILE.SOLID],
      [62, 13, 2, 2, TILE.SOLID],
      [64, 12, 1, 3, TILE.SOLID],
      [65, 11, 1, 4, TILE.SOLID],
      [66, 10, 4, 4, TILE.SOLID]
    ],
    plats: [[4, 13, 6], [8, 12, 4], [34, 12, 8], [36, 11, 5], [38, 10, 3]],
    tokens: [[6, 10], [16, 12], [26, 9], [40, 9], [48, 11], [62, 12], [70, 13]],
    snakes: [[36, 11, 2]],
    nets: [[38, 11, 1]],
    plungers: [{ c: 14, r: 14, clears: [{ c: 24, r: 11, w: 3, h: 2 }] }],
    boulders: [[34, 11, 30], [35, 11, 30], [36, 11, 30], [37, 11, 30], [38, 11, 30], [39, 11, 30], [72, 14]],
    cacti: [[2, 14], [58, 14], [70, 14]],
    signs: [[73, 14]],
    script: [
      ['goto', 8, 14],
      ['plunge', 14],
      ['goto', 36, 14],
      ['goto', 52, 14],
      ['goto', 73, 14]
    ]
  },
  {
    id: 5,
    biome: 'desert',
    sky: 'day',
    cols: 109,
    rows: 18,
    exit: 'sign',
    goals: {},
    /* Desert, about 109 tiles. Cliff and crate, springs, three stones on
       blocks, a rope to an open ledge with the net, then the porch and sign. */
    ground: [[0, 28, 15], [40, 72, 15], [82, 108, 15]],
    ropes: [[26, 13, 16], [70, 13, 14]],
    plats: [[8, 12, 8], [34, 11, 2], [37, 11, 2], [40, 11, 2], [60, 14, 8], [90, 12, 8]],
    tokens: [[4, 11], [10, 9], [16, 13], [30, 11], [44, 13], [60, 9], [76, 12], [94, 9], [102, 13]],
    frogs: [[12, 11]],
    snakes: [[92, 11, 2]],
    nets: [[64, 13, 1]],
    springs: [[20, 14], [50, 14], [96, 14]],
    plungers: [{ c: 86, r: 14, clears: [] }],
    boulders: [[34, 10, 22], [37, 10, 22], [40, 10, 22], [74, 14]],
    crates: [[14, 12]],
    cacti: [[2, 14], [46, 14], [100, 14]],
    buildings: [[98, 10, 8, 5]],
    signs: [[106, 14]],
    script: [
      ['goto', 6, 14],
      ['goto', 22, 14],
      ['goto', 48, 14],
      ['goto', 62, 13],
      ['stomp', 'net'],
      ['goto', 88, 14],
      ['goto', 106, 14]
    ]
  },
  {
    id: 6,
    biome: 'town',
    sky: 'day',
    cols: 81,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Town, about 81 tiles. The swirl sign is at the start and does not end
       the level. Poles, a wire with birds, the lady, a roof cage, then pale steps. */
    ground: [[0, 80, 15]],
    buildings: [[8, 9, 10, 6, 'wood'], [22, 8, 12, 7, 'white'], [40, 8, 12, 7, 'brick'], [56, 9, 10, 6, 'yellow']],
    women: [[26, 14]],
    poles: [[16, 14, 8], [38, 14, 8]],
    wires: [[16, 7, 26]],
    birds: [[18, 6, 10], [40, 6, 8]],
    plats: [[42, 12, 8], [66, 13, 8], [68, 12, 6], [70, 11, 4]],
    tokens: [[6, 12], [14, 10], [22, 12], [30, 10], [36, 8], [48, 9], [60, 13], [74, 9]],
    frogs: [[44, 11]],
    snakes: [[34, 14, 2]],
    nets: [[46, 11, 1]],
    cages: [[42, 11]],
    signs: [[4, 14, 0]],
    script: [
      ['goto', 12, 14],
      ['stomp', 'snake'],
      ['goto', 32, 14],
      ['goto', 58, 14],
      ['goto', 79, 14]
    ]
  },
  {
    id: 7,
    biome: 'desert',
    sky: 'day',
    cols: 56,
    rows: 18,
    exit: 'door',
    goals: {},
    /* Pale steps, about 56 tiles. Cage on the stone stair, then the yellow
       building. The key is on the roof. The blue door needs it. */
    ground: [[0, 55, 15]],
    buildings: [[36, 9, 12, 6, 'yellow']],
    women: [[30, 14]],
    cages: [[12, 11]],
    plats: [[6, 14, 4], [10, 13, 4], [12, 12, 8], [20, 11, 8], [28, 9, 8]],
    tokens: [[4, 12], [8, 10], [14, 9], [20, 12], [26, 8], [34, 12], [46, 7]],
    snakes: [[14, 11, 2]],
    birds: [[24, 7, 6]],
    keys: [[32, 8]],
    doors: [{ c: 42, r: 12, exit: true, great: true, needKey: true }],
    cacti: [[2, 14]],
    rocks: [[4, 14]],
    script: [
      ['goto', 4, 14],
      ['goto', 12, 11],
      ['stomp', 'snake'],
      ['goto', 24, 10],
      ['goto', 32, 8],
      ['goto', 42, 12]
    ]
  },
  {
    id: 8,
    biome: 'hill',
    sky: 'rain',
    cols: 108,
    rows: 18,
    exit: 'sign',
    goals: {},
    /* Green hills, about 108 tiles. Grey towers stand beside the path.
       A spring launches over the spikes. The swirl sign is the finish. */
    ground: [[0, 107, 15]],
    rects: [
      [8, 12, 5, 2, TILE.SOLID],
      [22, 12, 6, 2, TILE.SOLID],
      [46, 12, 5, 2, TILE.SOLID],
      [68, 12, 4, 2, TILE.SOLID],
      [86, 12, 5, 2, TILE.SOLID]
    ],
    spikes: [[40, 14, 3]],
    plats: [[16, 13, 4], [36, 13, 4], [58, 13, 6], [78, 13, 4]],
    tokens: [[4, 13], [12, 8], [18, 12], [28, 7], [38, 12], [52, 8], [62, 12], [74, 12], [92, 9], [100, 13]],
    frogs: [[10, 11], [48, 11]],
    springs: [[34, 14], [56, 14], [96, 14]],
    cacti: [[100, 14]],
    signs: [[104, 14]],
    script: [
      ['goto', 16, 14],
      ['goto', 36, 14],
      ['goto', 62, 14],
      ['goto', 104, 14]
    ]
  },
  {
    id: 9,
    biome: 'water',
    sky: 'day',
    cols: 128,
    rows: 18,
    exit: 'cave',
    goals: {},
    /* Water, about 128 tiles. Islets of 5, 4, 3, 2, 3 and 5 tiles with
       5-tile gaps, fish in the gaps, a long rope to the cage tower, stones,
       a net on the stair, and a spring before the cave. */
    ground: [[0, 16, 10], [104, 127, 10]],
    rects: [
      [22, 10, 5, 4, TILE.SOLID],
      [32, 10, 4, 4, TILE.SOLID],
      [41, 10, 3, 4, TILE.SOLID],
      [49, 10, 2, 4, TILE.SOLID],
      [56, 10, 3, 4, TILE.SOLID],
      [64, 10, 5, 4, TILE.SOLID],
      [78, 8, 6, 6, TILE.SOLID],
      [92, 10, 8, 4, TILE.SOLID],
      [104, 11, 4, 3, TILE.SOLID]
    ],
    plats: [[86, 12, 4], [88, 11, 4], [90, 10, 4], [100, 9, 4]],
    water: [[0, 14, 128, 4]],
    tokens: [[4, 7], [8, 6], [24, 7], [34, 7], [42, 7], [50, 7], [58, 7], [66, 7], [80, 5], [94, 7], [108, 8], [116, 7]],
    frogs: [[100, 8]],
    nets: [[90, 9, 1]],
    cages: [[80, 7]],
    boulders: [[64, 9], [65, 9], [66, 9]],
    plungers: [{ c: 74, r: 9, clears: [] }],
    springs: [[106, 10]],
    ropes: [[16, 9, 7], [26, 9, 7], [35, 9, 7], [43, 9, 7], [50, 9, 7], [58, 9, 7], [68, 9, 11], [99, 9, 6]],
    women: [[6, 9]],
    fish: [[19], [30], [39], [47], [54], [62]],
    cacti: [[4, 9], [112, 9]],
    caves: [[124, 9]],
    script: [
      ['goto', 8, 9],
      ['goto', 24, 9],
      ['goto', 34, 9],
      ['goto', 42, 9],
      ['goto', 50, 9],
      ['goto', 57, 9],
      ['goto', 66, 9],
      ['goto', 80, 7],
      ['goto', 94, 9],
      ['goto', 108, 9],
      ['goto', 124, 9]
    ]
  },
  {
    id: 10,
    biome: 'canyon',
    sky: 'day',
    cols: 105,
    rows: 18,
    exit: 'edge',
    goals: {},
    /* Orange canyon, about 105 tiles. A cliff mouth, a sphere wall, a coin
       shaft with a spring, a loose key, and a plunger on the roof. No sign. */
    ground: [[0, 104, 15]],
    rects: [[0, 9, 6, 5, TILE.SOLID]],
    plats: [[14, 12, 10], [30, 12, 8], [48, 13, 3], [52, 12, 4], [70, 11, 8], [88, 12, 12]],
    tokens: [[8, 13], [16, 9], [24, 12], [42, 8], [42, 9], [42, 10], [42, 11], [42, 13], [44, 10], [56, 11], [64, 9], [76, 8], [84, 12], [98, 10]],
    boulders: [
      [16, 11, 30], [17, 11, 30], [18, 11, 30], [19, 11, 30],
      [17, 10, 30], [18, 10, 30], [19, 10, 30],
      [18, 9, 30], [19, 9, 30],
      [90, 11, 30], [91, 11, 30], [92, 11, 30], [93, 11, 30],
      [91, 10, 30], [92, 10, 30], [93, 10, 30],
      [92, 9, 30], [93, 9, 30],
      [93, 8, 30]
    ],
    springs: [[48, 14]],
    keys: [[64, 9]],
    buildings: [[70, 9, 12, 6, 'blue']],
    plungers: [{ c: 74, r: 8, clears: [] }],
    cacti: [[10, 14]],
    script: [
      ['goto', 12, 14],
      ['goto', 28, 14],
      ['goto', 46, 14],
      ['goto', 60, 14],
      ['goto', 84, 14],
      ['goto', 103, 14]
    ]
  },
  {
    id: 11,
    biome: 'sunset',
    sky: 'rain',
    cols: 60,
    rows: 18,
    exit: 'edge',
    goals: { boss: 1 },
    wood: true,
    woodUntil: 24,
    /* Cave, then the boot, about 60 tiles. Spikes on a wood ledge, a key
       over a step, then the arena and the sheriff building. The boot still
       takes 4 stomps. No swirl sign. */
    ground: [[0, 59, 15]],
    plats: [[6, 12, 5], [12, 13, 2], [14, 11, 4], [20, 13, 4], [34, 13, 8]],
    rects: [
      [0, 0, 24, 10, TILE.SOLID],
      [52, 8, 2, 7, TILE.GATE]
    ],
    spikes: [[8, 12, 3]],
    buildings: [[54, 10, 6, 5, 'sheriff']],
    tokens: [[4, 10], [12, 9], [18, 12], [28, 13], [56, 13]],
    frogs: [[16, 10]],
    guns: [[22, 12, 2]],
    keys: [[18, 9]],
    boss: { c: 36 },
    arena: [28, 48],
    script: [
      ['goto', 26, 14],
      ['boss'],
      ['goto', 58, 14]
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
    platforms.push({ x: x, y: feet - 178, w: 34, h: 6, kind: 'cactus' });
    platforms.push({ x: x + 2, y: feet - 124, w: 30, h: 6, kind: 'cactus' });
    platforms.push({ x: x - 46, y: feet - 140, w: 16, h: 6, kind: 'cactus' });
    platforms.push({ x: x - 46, y: feet - 106, w: 78, h: 6, kind: 'cactus' });
    platforms.push({ x: x + 54, y: feet - 102, w: 16, h: 6, kind: 'cactus' });
    platforms.push({ x: x + 16, y: feet - 70, w: 52, h: 6, kind: 'cactus' });
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
    return {
      x: b[0] * 32, y: b[1] * 32, baseY: b[1] * 32, w: 28, h: 18,
      dir: 1, minX: b[0] * 32, maxX: (b[0] + (b[2] || 6)) * 32 - 28
    };
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
  function nearestSupport(x, feet) {
    var best = null;
    var c = Math.floor(x / 32);
    for (var r = 0; r < rows; r++) {
      if (!solidish(tiles, cols, c, r)) continue;
      var top = r * 32;
      if (top + 4 >= feet && (best === null || top < best)) best = top;
    }
    platforms.forEach(function (p) {
      if (x < p.x || x > p.x + p.w) return;
      if (p.y + 4 >= feet && (best === null || p.y < best)) best = p.y;
    });
    return best;
  }
  function ledgeSpan(e, span) {
    var feet = e.y + e.h;
    var row = Math.floor((feet + 1) / 32);
    var c = Math.floor((e.x + e.w / 2) / 32);
    var left = c, right = c, guard = 0;
    while (guard++ < span && left > 0 && solidish(tiles, cols, left - 1, row) && !solidish(tiles, cols, left - 1, row - 1)) left--;
    guard = 0;
    while (guard++ < span && right < cols - 1 && solidish(tiles, cols, right + 1, row) && !solidish(tiles, cols, right + 1, row - 1)) right++;
    e.minX = left * 32;
    e.maxX = Math.max(e.minX + 8, (right + 1) * 32 - e.w);
    e.homeX = e.x;
    e.face = e.dir || 1;
  }
  enemies.forEach(function (e) {
    var feet = e.y + e.h;
    var c = Math.floor((e.x + e.w / 2) / 32);
    var row = Math.floor((feet + 1) / 32);
    var support = nearestSupport(e.x + e.w / 2, e.y + e.h);
    if (support != null) e.y = support - e.h;
    if (e.kind === 'frog' || e.kind === 'snake' || e.kind === 'gun' || e.kind === 'net') ledgeSpan(e, 4);
  });

  var tokens = (def.tokens || []).map(function (t) { return cell(t[0], t[1], 'token', { got: false }); });
  var keys = (def.keys || []).map(function (k) { return cell(k[0], k[1], 'key', { got: false }); });
  var signs = (def.signs || []).map(function (s) {
    return cell(s[0], s[1], 'sign', { y: s[1] * 32 - 20, h: 52, finish: s[2] !== 0 });
  });
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
    var sz = b[2] || 22;
    var rock = { x: b[0] * 32 + (32 - sz) / 2, y: b[1] * 32 + (32 - sz), w: sz, h: sz, vx: 0, vy: 0, grounded: false, slot: -1, snapped: false, held: false, tumble: 0, kick: 0 };
    var bc = b[0], br = b[1];
    var reach = sz > 22 ? 8 : 3;
    for (var dy = -2; dy <= 2 && !rock.held; dy++) {
      for (var dx = -reach; dx <= reach; dx++) {
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
  (def.rocks || []).forEach(function (rk) {
    var szw = 28, szh = 22;
    boulders.push({
      x: rk[0] * 32 + 2,
      y: rk[1] * 32 + (32 - szh),
      w: szw, h: szh,
      vx: 0, vy: 0, grounded: false, slot: -1, snapped: false,
      held: false, tumble: 0, kick: 0, rock: true
    });
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
      pale: def.pale || [],
      tufts: def.tufts || [],
      bushes: def.bushes || [],
      rocks: []
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
