import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--autoplay-policy=no-user-gesture-required']
});
const page = await browser.newPage();
page.on('pageerror', (err) => console.log('PAGEERROR', err.message));
page.on('console', (msg) => { if (msg.type() === 'error') console.log('CONSOLE', msg.text()); });
await page.setViewport({ width: 1280, height: 800 });
const url = process.argv[2] || 'http://127.0.0.1:8765/';
await page.goto(url, { waitUntil: 'networkidle0' });
await page.screenshot({ path: '/tmp/sts-title.png' });
const ready = await page.evaluate(() => !!(window.STS && STS.testAll));
if (!ready) {
  console.log('STS missing');
  await browser.close();
  process.exit(1);
}
const only = process.argv[3];
const results = await page.evaluate(async (onlyLevel) => {
  if (onlyLevel) {
    const n = Number(onlyLevel);
    STS.silent = true;
    const max = 9000;
    STS.startLevel(n, { instant: true });
    const log = [];
    let i = 0;
    for (; i < max; i++) {
      if (['gameover', 'leveldone', 'victory'].includes(STS.state().gs)) break;
      if (STS.state().gs === 'play') {
        /* think is inside testAll; call the full runner for one level by simulating */
      }
      break;
    }
    return STS.testAll(9000).filter((r) => r.level === n);
  }
  return STS.testAll(9000);
}, only || '');
let failed = 0;
for (const r of results) {
  console.log(JSON.stringify({ level: r.level, ok: r.ok, gs: r.gs, frames: r.frames, x: r.x, y: r.y, scriptI: r.scriptI, lives: r.lives, reason: r.reason, counters: r.counters, need: r.need }));
  if (!r.ok) {
    failed++;
    console.log('LOG', JSON.stringify(r.log));
  }
}
if (!only) {
  await page.evaluate(() => { STS.silent = true; STS.startLevel(1, { instant: true }); });
  await page.evaluate(() => { for (let i = 0; i < 8; i++) { /* render a settled frame */ } });
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({ path: '/tmp/sts-level.png' });
}
console.log(failed ? 'FAILED ' + failed : 'ALL OK');
await browser.close();
process.exit(failed ? 1 : 0);
