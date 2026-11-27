'use strict';
// Quay màn hình Văn phòng ảo 3D trong lúc đội AI làm việc.
// Dùng: node quay-van-phong.js <url> <file-ra.mp4> <file-dung> [giây-tối-đa]
// Tạo <file-dung> để kết thúc. Cần playwright-core và Chromium có sẵn trong máy (không cài thêm), ffmpeg để đổi sang mp4.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');

const [url, out, stopFile, maxArg] = process.argv.slice(2);
if (!url || !out || !stopFile) { console.error('Dùng: node quay-van-phong.js <url> <file-ra.mp4> <file-dung> [giây-tối-đa]'); process.exit(2); }
const maxSec = Number(maxArg) || 7200;

function findPlaywright() {
  if (process.env.PLAYWRIGHT_CORE) return process.env.PLAYWRIGHT_CORE;
  const root = path.join(process.env.LOCALAPPDATA || '', 'npm-cache', '_npx');
  const found = fs.existsSync(root) ? fs.readdirSync(root)
    .map((d) => path.join(root, d, 'node_modules', 'playwright-core'))
    .filter((p) => fs.existsSync(path.join(p, 'package.json'))) : [];
  for (const p of found) {
    try { const pw = require(p); if (fs.existsSync(pw.chromium.executablePath())) return p; } catch { /* thử bản khác */ }
  }
  throw new Error('Không tìm thấy playwright-core có Chromium. Đặt biến PLAYWRIGHT_CORE.');
}

(async () => {
  const { chromium } = require(findPlaywright());
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'quay-'));
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: tmp, size: { width: 1280, height: 720 } } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load' });
  // Phóng gần cho thấy rõ robot đi lại; nút không có thì quay khung mặc định.
  await page.getByText('Nhìn gần', { exact: true }).first().click({ timeout: 5000 }).catch(() => {});
  const t0 = Date.now();
  console.log('dang quay ' + url);
  while (!fs.existsSync(stopFile) && (Date.now() - t0) / 1000 < maxSec) {
    await page.waitForTimeout(1000);
  }
  const video = page.video();
  await context.close();
  await browser.close();
  const webm = await video.path();
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
    fs.rmSync(tmp, { recursive: true, force: true });
  } catch (e) {
    const fallback = out.replace(/\.mp4$/i, '') + '.webm';
    fs.copyFileSync(webm, fallback);
    console.error('ffmpeg lỗi, giữ bản webm: ' + fallback);
  }
  console.log('xong ' + Math.round((Date.now() - t0) / 1000) + ' giây -> ' + out);
})().catch((e) => { console.error(e); process.exit(1); });
