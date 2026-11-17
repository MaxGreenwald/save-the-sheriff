/* Original pixel art for the fan remake. Shapes are drawn, not traced from the Flash game. */
var ART = (function () {
  function blob(ctx, cx, cy, rx, ry, fill, edge) {
    var x0 = Math.floor(cx - rx - 1), x1 = Math.ceil(cx + rx + 1);
    var y0 = Math.floor(cy - ry - 1), y1 = Math.ceil(cy + ry + 1);
    var ox = (rx + 1) * (rx + 1), oy = (ry + 1) * (ry + 1);
    for (var y = y0; y <= y1; y++) {
      for (var x = x0; x <= x1; x++) {
        var dx = x + 0.5 - cx, dy = y + 0.5 - cy;
        var inside = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
        var rim = (dx * dx) / ox + (dy * dy) / oy <= 1;
        if (inside) { ctx.fillStyle = fill; ctx.fillRect(x, y, 1, 1); }
        else if (rim && edge) { ctx.fillStyle = edge; ctx.fillRect(x, y, 1, 1); }
      }
    }
  }
  function pix(ctx, x, y, c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); }

  var INK = '#1c140c';
  var PEACH = '#f2c7a2';
  var SHADE = '#c48a5c';
  var BELLY = '#f8dcc0';
  var SNOUT = '#e7a888';
  var EAR = '#d9a078';

  function pig(ctx, x, y, frame, dir, air) {
    ctx.save();
    ctx.translate(x + 16, y + 22);
    if (dir < 0) ctx.scale(-1, 1);
    var f = air ? 4 : (frame % 4);
    var bob = air ? -1 : [0, -1, 0, 1][f];
    blob(ctx, -2, -8 + bob, 11, 7, PEACH, INK);
    blob(ctx, -2, -5 + bob, 8, 4, BELLY, null);
    blob(ctx, -4, -6 + bob, 6, 3, SHADE, null);
    blob(ctx, 9, -11 + bob, 7, 6, PEACH, INK);
    blob(ctx, 6, -14 + bob, 2.2, 3.1, EAR, INK);
    blob(ctx, 12, -15 + bob, 2.2, 3.2, EAR, INK);
    blob(ctx, 14, -10 + bob, 4.2, 3.2, SNOUT, INK);
    pix(ctx, 13, -10 + bob, INK); pix(ctx, 15, -10 + bob, INK);
    pix(ctx, 8, -12 + bob, '#fff'); pix(ctx, 11, -12 + bob, '#fff');
    pix(ctx, 8, -12 + bob, INK); pix(ctx, 11, -11 + bob, INK);
    var tail = [[-12, -10], [-14, -12], [-15, -10], [-13, -8]];
    for (var i = 0; i < tail.length; i++) pix(ctx, tail[i][0], tail[i][1] + bob, INK);
    pix(ctx, -13, -11 + bob, SHADE);
    var legs;
    if (air) legs = [[-8, 0, 2], [-3, 2, -2], [3, 1, 3], [7, 2, -3]];
    else legs = [
      [[-8, 1], [-2, -1], [4, 2], [8, 0]],
      [[-8, -1], [-2, 2], [4, -1], [8, 2]],
      [[-7, 2], [-1, 0], [5, -1], [9, 1]],
      [[-8, 0], [-2, 2], [4, 1], [8, -1]]
    ][f];
    for (var L = 0; L < legs.length; L++) {
      var lx = legs[L][0], ly = legs[L][1] || 0;
      blob(ctx, lx, 0 + ly, 2.1, 3.4, SHADE, INK);
    }
    ctx.restore();
  }

  function pigHead(ctx, x, y) {
    blob(ctx, x + 8, y + 8, 7, 6, PEACH, INK);
    blob(ctx, x + 5, y + 4, 2, 2.4, EAR, INK);
    blob(ctx, x + 11, y + 4, 2, 2.4, EAR, INK);
    blob(ctx, x + 12, y + 9, 3, 2.4, SNOUT, INK);
    pix(ctx, x + 6, y + 7, INK); pix(ctx, x + 9, y + 7, INK);
  }

  function frog(ctx, x, y, frame) {
    var puff = (frame % 2) ? 2 : 0;
    blob(ctx, x + 14, y + 16, 12, 8, '#6fbf45', INK);
    blob(ctx, x + 14, y + 18, 8, 4, '#dfe8a8', null);
    blob(ctx, x + 14, y + 12 - puff, 6, 4 + puff, '#8ed85a', INK);
    blob(ctx, x + 8, y + 6, 4, 4, '#fff', INK);
    blob(ctx, x + 18, y + 6, 4, 4, '#fff', INK);
    pix(ctx, x + 8, y + 6, INK); pix(ctx, x + 18, y + 6, INK);
    blob(ctx, x + 4, y + 20, 4, 2.2, '#3e8a30', INK);
    blob(ctx, x + 22, y + 20, 4, 2.2, '#3e8a30', INK);
  }

  function snake(ctx, x, y, frame) {
    var wave = frame % 2;
    for (var i = 0; i < 7; i++) {
      var oy = (i % 2 === wave ? 1 : -1);
      blob(ctx, x + 4 + i * 5, y + 18 + oy, 3.2, 2.6, i % 2 ? '#2f9a3a' : '#46c04e', INK);
    }
    blob(ctx, x + 34, y + 8, 3.2, 8, '#2f9a3a', INK);
    blob(ctx, x + 36, y + 2, 5, 4.5, '#3cb844', INK);
    pix(ctx, x + 38, y + 1, '#ffe14a'); pix(ctx, x + 38, y + 2, INK);
    pix(ctx, x + 42, y + 3, '#e23b3b'); pix(ctx, x + 44, y + 2, '#e23b3b');
  }

  function bird(ctx, x, y, frame) {
    var flap = (frame % 2) ? -3 : 2;
    blob(ctx, x + 10, y + 10, 7, 4, '#3e9a34', INK);
    blob(ctx, x + 16, y + 8, 4, 3.2, '#6fbf45', INK);
    pix(ctx, x + 18, y + 7, INK);
    pix(ctx, x + 20, y + 8, '#f0a020'); pix(ctx, x + 21, y + 8, '#f0a020');
    blob(ctx, x + 8, y + 6 + flap, 6, 2, '#2f7a28', INK);
  }

  function bandit(ctx, x, y, kind, frame) {
    blob(ctx, x + 14, y + 22, 7, 8, '#6b4a32', INK);
    blob(ctx, x + 14, y + 10, 8, 7, '#f0c8a8', INK);
    blob(ctx, x + 14, y + 4, 9, 3, '#3a2a18', INK);
    pix(ctx, x + 11, y + 10, INK); pix(ctx, x + 16, y + 10, INK);
    if (kind === 'hostage') {
      blob(ctx, x - 2, y + 16, 5, 6, '#c9a15a', INK);
      pix(ctx, x - 2, y + 14, '#3e9a34');
    } else if (kind === 'gun') {
      ctx.fillStyle = INK; ctx.fillRect(x + 20, y + 16, 10, 3);
      ctx.fillStyle = '#888'; ctx.fillRect(x + 28, y + 15, 4, 4);
    } else if (kind === 'net') {
      var s = Math.sin(frame * 0.3) * 4;
      ctx.strokeStyle = '#6b4424'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + 18, y + 12); ctx.lineTo(x + 28, y + 4 + s); ctx.stroke();
      ctx.strokeStyle = '#ddd'; ctx.strokeRect(x + 26, y + s, 12, 10);
    }
  }

  function bug(ctx, x, y, frame) {
    var w = (frame % 2) ? -2 : 2;
    blob(ctx, x + 12, y + 10, 8, 5, '#3c7ed6', INK);
    blob(ctx, x + 6, y + 6 + w, 5, 2, '#9fd0ff', INK);
    blob(ctx, x + 16, y + 5 - w, 5, 2, '#9fd0ff', INK);
    pix(ctx, x + 10, y + 9, INK); pix(ctx, x + 15, y + 9, INK);
  }

  function fish(ctx, x, y, frame) {
    blob(ctx, x, y, 10, 5, '#3aa0e8', INK);
    blob(ctx, x + 8, y - 1, 4, 3, '#7ec8f0', INK);
    blob(ctx, x - 10, y, 3, 4, '#1d6cb8', INK);
    pix(ctx, x + 6, y - 1, INK);
    pix(ctx, x + 11, y, '#fff'); pix(ctx, x + 11, y + 2, '#fff');
  }

  function boot(ctx, x, y, frame, landed) {
    blob(ctx, x + 40, y + 36, 36, 16, '#d7c4a4', INK);
    blob(ctx, x + 54, y + 28, 22, 10, '#eee', INK);
    ctx.fillStyle = '#9aa'; for (var i = 0; i < 7; i++) ctx.fillRect(x + 16 + i * 8, y + 48, 3, 6);
    if (frame % 8 < 4) { ctx.fillStyle = '#bbb'; ctx.fillRect(x + 62, y + 8, 6, 6); }
    blob(ctx, x + 48, y + 8, 10, 8, '#4a4038', INK);
    pix(ctx, x + 45, y + 6, '#f0c8a8'); pix(ctx, x + 50, y + 6, '#f0c8a8');
    if (landed) {
      blob(ctx, x + 48, y - 8, 8, 7, '#f0c8a8', INK);
      blob(ctx, x + 48, y - 14, 10, 3, '#222', INK);
      pix(ctx, x + 45, y - 8, INK); pix(ctx, x + 51, y - 8, INK);
    }
    blob(ctx, x + 70, y + 40, 6, 5, PEACH, INK);
  }

  function heart(ctx, x, y, on) {
    var c = on ? '#e23b4a' : '#c8b0b4';
    blob(ctx, x + 3, y + 4, 3, 3, c, on ? '#8a1020' : null);
    blob(ctx, x + 8, y + 4, 3, 3, c, on ? '#8a1020' : null);
    blob(ctx, x + 5, y + 8, 4, 3, c, null);
  }

  function clock(ctx, x, y) {
    blob(ctx, x + 6, y + 6, 6, 6, '#f4f7fb', INK);
    pix(ctx, x + 6, y + 4, INK); pix(ctx, x + 6, y + 6, INK); pix(ctx, x + 8, y + 6, INK);
  }

  function coin(ctx, x, y) {
    blob(ctx, x + 6, y + 8, 4, 7, '#2f74d8', '#14325f');
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x + 6, y + 8, 2.2, 0.4, 4); ctx.stroke();
  }

  function sphere(ctx, x, y) {
    blob(ctx, x + 16, y + 16, 14.2, 14.2, '#d7dee6', INK);
    blob(ctx, x + 16, y + 18, 11.2, 10, '#b4bec8', null);
    blob(ctx, x + 17, y + 22, 7.5, 5.2, '#8e98a3', null);
    blob(ctx, x + 11, y + 10, 4.2, 3, '#f7fbff', null);
  }

  function lady(ctx, x, y) {
    blob(ctx, x + 10, y - 7, 3, 5, '#e7b898', INK);
    blob(ctx, x + 18, y - 7, 3, 5, '#e7b898', INK);
    blob(ctx, x + 14, y - 16, 9, 8, '#3d8a40', INK);
    blob(ctx, x + 14, y - 18, 6, 4, '#2f6e34', null);
    blob(ctx, x + 14, y - 28, 8, 6.5, '#f7f4ee', INK);
    blob(ctx, x + 8, y - 30, 2.4, 3, '#f7f4ee', INK);
    blob(ctx, x + 20, y - 30, 2.4, 3, '#f7f4ee', INK);
    blob(ctx, x + 14, y - 40, 6.2, 5.5, '#f0c2a4', INK);
    blob(ctx, x + 14, y - 46, 7.5, 4.8, '#f2d48a', INK);
    blob(ctx, x + 8, y - 47, 2.8, 3.4, '#e2c070', INK);
    blob(ctx, x + 20, y - 47, 2.8, 3.4, '#e2c070', INK);
    pix(ctx, x + 12, y - 41, INK);
    pix(ctx, x + 16, y - 41, INK);
    pix(ctx, x + 14, y - 38, '#e09090');
  }

  return { pig: pig, pigHead: pigHead, frog: frog, snake: snake, bird: bird, bandit: bandit, bug: bug, fish: fish, boot: boot, heart: heart, clock: clock, coin: coin, sphere: sphere, lady: lady };
})();
