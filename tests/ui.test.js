// Kiểm thử nghiệm thu giao diện (index.html, style.css, assets) — do Quản lý điều phối viết. Agent không được sửa.
// Không phụ thuộc file JavaScript.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..', 'web');
const read = (f) => fs.readFileSync(path.join(WEB, f), 'utf8');
const html = () => read('index.html');
const css = () => read('style.css');
const TOPICS = ['so-thich-the-thao', 'gia-dinh', 'du-lich', 'an-uong', 'giai-tri', 'thoi-trang-mua-sam', 'noi-so-thich', 'noi-am-nhac',
  'noi-phim', 'noi-du-lich', 'noi-the-thao', 'noi-doc-sach', 'noi-mua-sam', 'noi-hoc-tap-cong-viec', 'noi-que-huong'];

function tpl(id) {
  const m = html().match(new RegExp('<template\\b[^>]*\\bid="' + id + '"[^>]*>([\\s\\S]*?)</template>'));
  assert.ok(m, 'thiếu <template id="' + id + '">');
  return m[1];
}
function rootTag(id) {
  const m = tpl(id).trim().match(/^<([a-z]+)\b/);
  assert.ok(m, id + ': phải có đúng một phần tử gốc');
  return m[1];
}
function tag(text, sel) {
  const m = text.match(new RegExp('<[a-z]+\\b[^>]*' + sel + '[^>]*>'));
  assert.ok(m, 'thiếu phần tử ' + sel);
  return m[0];
}
const has = (text, list, where) => { for (const s of list) assert.ok(text.includes(s), where + ' thiếu ' + s); };
const meter = (text, field, where) => {
  const t = tag(text, 'data-field="' + field + '"');
  has(t, ['role="progressbar"', 'aria-valuemin="0"', 'aria-valuemax="100"', 'aria-valuenow="0"'], where + ' ' + field);
  const after = text.slice(text.indexOf(t) + t.length, text.indexOf(t) + t.length + 200);
  assert.ok(/<span\b[^>]*data-fill/.test(after), where + ' ' + field + ' thiếu span[data-fill]');
};

test('khung trang: tiếng Việt, tiêu đề, favicon, script đúng thứ tự', () => {
  const h = html();
  has(h, ['lang="vi"', 'name="viewport"', '<title>Ôn Luyện VSTEP cho BéIu</title>', 'href="assets/favicon.svg"', 'href="style.css"'], 'index.html');
  const scripts = [...h.matchAll(/<script\b[^>]*>/g)].map((m) => m[0]);
  assert.deepEqual(scripts, ['js/data.js', 'js/srs.js', 'js/quiz.js', 'js/store.js', 'js/app.js'].map((f) => '<script src="' + f + '" defer>'));
});

test('khung trang: điều hướng, view, toast, vùng đọc cho trình đọc màn hình', () => {
  const h = html();
  for (const [nav, href] of [['home', '#/'], ['review', '#/on-tap'], ['progress', '#/tien-do']]) {
    const a = tag(h, 'data-nav="' + nav + '"');
    assert.ok(a.startsWith('<a') && a.includes('href="' + href + '"'), 'liên kết ' + nav);
  }
  assert.ok(/<main\b[^>]*id="view"[^>]*tabindex="-1"[^>]*>\s*<\/main>|<main\b[^>]*tabindex="-1"[^>]*id="view"[^>]*>\s*<\/main>/.test(h), '#view phải rỗng, tabindex=-1');
  assert.ok(/id="streak-count"[^>]*>\s*0\s*</.test(h), '#streak-count ban đầu 0');
  const toast = tag(h, 'id="toast"');
  assert.ok(toast.includes('role="status"') && /\shidden(\s|>|=)/.test(toast), '#toast');
  const live = tag(h, 'id="sr-live"');
  assert.ok(live.includes('aria-live="polite"') && !/\shidden(\s|>|=)/.test(live), '#sr-live');
  assert.ok(/<footer\b[\s\S]*Dữ liệu học lưu trên máy này/.test(h), 'chân trang');
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids.filter((x, i) => ids.indexOf(x) !== i), [], 'id trùng');
});

test('template: gốc đúng loại phần tử', () => {
  const roots = {
    'tpl-home': 'section', 'tpl-topic-card': 'li', 'tpl-topic': 'section', 'tpl-word-row': 'li', 'tpl-structure-row': 'li',
    'tpl-session': 'section', 'tpl-q-card': 'div', 'tpl-q-choice': 'div', 'tpl-q-listen': 'div', 'tpl-q-typing': 'div',
    'tpl-q-match': 'div', 'tpl-match-item': 'li', 'tpl-summary': 'section', 'tpl-speaking': 'section',
    'tpl-outline-item': 'li', 'tpl-progress': 'section', 'tpl-progress-row': 'tr',
  };
  for (const [id, root] of Object.entries(roots)) assert.equal(rootTag(id), root, id);
});

test('template: trang chủ, thẻ chủ đề, chủ đề, dòng từ', () => {
  const home = tpl('tpl-home');
  has(home, ['data-field="greeting"', 'data-field="goal-text"', 'data-field="due-count"', 'data-action="start-review"',
    'data-action="start-new"', 'data-field="topic-list"', 'data-field="speaking-list"'], 'tpl-home');
  meter(home, 'goal-meter', 'tpl-home');
  const card = tpl('tpl-topic-card');
  has(card, ['data-field="link"', 'data-field="title-vi"', 'data-field="title-en"', 'data-field="count"', 'data-field="mastery-text"'], 'tpl-topic-card');
  assert.ok(/<img\b[^>]*data-field="icon"[^>]*alt=""|<img\b[^>]*alt=""[^>]*data-field="icon"/.test(card), 'img icon alt rỗng');
  meter(card, 'mastery-meter', 'tpl-topic-card');
  const topic = tpl('tpl-topic');
  has(topic, ['data-field="back"', 'data-field="title-vi"', 'data-field="title-en"', 'data-field="stats"', 'data-action="start-smart"',
    'data-field="word-list"', 'data-field="structure-list"'], 'tpl-topic');
  for (const m of ['the', 'trac-nghiem', 'nghe', 'go-tu', 'ghep-cap']) assert.ok(/<button\b/.test(tag(topic, 'data-mode="' + m + '"')), 'nút mode ' + m);
  const row = tpl('tpl-word-row');
  has(row, ['data-field="en"', 'data-field="vi"', 'data-field="note"', 'data-field="box"'], 'tpl-word-row');
  assert.ok(tag(row, 'data-action="speak"').includes('aria-label='), 'nút nghe cần aria-label');
  has(tpl('tpl-structure-row'), ['data-field="en"', 'data-field="vi"'], 'tpl-structure-row');
});

test('template: phiên học và các dạng câu hỏi', () => {
  const s = tpl('tpl-session');
  has(s, ['data-field="title"', 'data-field="progress-text"', 'data-field="stage"', 'data-field="feedback"', 'data-action="quit"'], 'tpl-session');
  meter(s, 'progress-meter', 'tpl-session');
  assert.ok(/\shidden(\s|>|=)/.test(tag(s, 'data-action="next"')), 'nút next ẩn ban đầu');
  const card = tpl('tpl-q-card');
  assert.ok(tag(card, 'data-field="card"').includes('data-side="front"'), 'thẻ bắt đầu ở mặt trước');
  has(card, ['data-field="front"', 'data-field="back"', 'data-action="speak"'], 'tpl-q-card');
  for (const [g, label] of [['sai', 'Chưa nhớ'], ['gan-dung', 'Hơi nhớ'], ['dung', 'Đã nhớ']]) {
    assert.ok(new RegExp('data-grade="' + g + '"[^>]*>\\s*[^<]*' + label).test(card), 'nút chấm ' + g);
  }
  for (const id of ['tpl-q-choice', 'tpl-q-listen']) {
    const t = tpl(id);
    for (let i = 0; i < 4; i += 1) assert.ok(/<button\b/.test(tag(t, 'data-choice="' + i + '"')), id + ' choice ' + i);
    has(t, ['data-action="speak"'], id);
  }
  has(tpl('tpl-q-choice'), ['data-field="direction"', 'data-field="prompt"'], 'tpl-q-choice');
  has(tpl('tpl-q-listen'), ['data-action="speak-slow"'], 'tpl-q-listen');
  const typing = tpl('tpl-q-typing');
  has(typing, ['data-field="prompt"', 'data-field="hint"', 'data-action="hint"', 'data-action="speak"', 'type="submit"'], 'tpl-q-typing');
  assert.ok(/<form\b[^>]*data-field="form"/.test(typing), 'form');
  const input = tag(typing, 'data-field="answer"');
  has(input, ['autocomplete="off"', 'autocapitalize="off"', 'spellcheck="false"', 'lang="en"'], 'ô trả lời');
  assert.ok(/<label\b/.test(typing), 'ô trả lời cần label');
  has(tpl('tpl-q-match'), ['data-field="left"', 'data-field="right"'], 'tpl-q-match');
  assert.ok(/<button\b[^>]*data-field="btn"/.test(tpl('tpl-match-item')), 'tpl-match-item');
  has(tpl('tpl-summary'), ['data-field="score"', 'data-field="detail"', 'data-field="wrong-list"', 'data-action="again"', 'data-action="home"'], 'tpl-summary');
});

test('template: luyện nói và tiến độ', () => {
  const sp = tpl('tpl-speaking');
  has(sp, ['data-field="back"', 'data-field="title"', 'data-field="question-en"', 'data-field="question-vi"', 'data-field="question-count"',
    'data-action="speak"', 'data-action="next-question"', 'data-field="outline"', 'data-field="ideas"', 'data-action="timer"',
    'data-action="record"', 'data-field="record-status"'], 'tpl-speaking');
  assert.ok(/data-field="timer"[^>]*>\s*0:45\s*</.test(sp), 'đồng hồ ban đầu 0:45');
  const audio = tag(sp, 'data-field="playback"');
  assert.ok(audio.startsWith('<audio') && audio.includes('controls') && /\shidden(\s|>|=)/.test(audio), 'audio playback');
  has(tpl('tpl-outline-item'), ['data-field="label"', 'data-field="en"', 'data-field="vi"'], 'tpl-outline-item');
  const p = tpl('tpl-progress');
  has(p, ['data-field="total"', 'data-field="learned"', 'data-field="mastered"', 'data-field="streak"', 'data-field="hard-list"',
    'data-action="export"', 'data-action="reset"', 'data-field="corrections"'], 'tpl-progress');
  assert.ok(/<tbody\b[^>]*data-field="topic-table"/.test(p), 'tbody topic-table');
  assert.ok(/<form\b[^>]*data-field="settings"/.test(p), 'form settings');
  has(tag(p, 'name="dailyGoal"'), ['type="number"', 'min="5"', 'max="100"'], 'dailyGoal');
  assert.ok(/<select\b[^>]*name="voice"/.test(p), 'select voice');
  has(tag(p, 'name="rate"'), ['type="range"', 'min="0.6"', 'max="1.2"', 'step="0.1"'], 'rate');
  has(tag(p, 'data-field="import"'), ['type="file"', 'accept=".json,application/json"'], 'import');
  const row = tpl('tpl-progress-row');
  has(row, ['data-field="topic"', 'data-field="learned"', 'data-field="mastered"'], 'tpl-progress-row');
  meter(row, 'meter', 'tpl-progress-row');
});

test('CSS: quy tắc bắt buộc, màu, trạng thái', () => {
  const c = css();
  const lower = c.toLowerCase();
  assert.match(c, /\[hidden\]\s*\{[^}]*display:\s*none\s*!important/);
  assert.match(c, /prefers-color-scheme:\s*dark/);
  assert.match(c, /prefers-reduced-motion/);
  assert.match(c, /:focus-visible/);
  assert.ok((c.match(/@media[^{]*\((?:max|min)-width/g) || []).length >= 2, 'cần ít nhất 2 mốc chiều rộng');
  for (const color of ['#5b3fd9', '#1e1b3a', '#f5f3ff', '#14866d', '#c42b4b', '#ffc83d']) assert.ok(lower.includes(color), 'thiếu màu ' + color);
  for (const st of ['[data-state="correct"]', '[data-state="wrong"]', '[data-state="done"]', '[data-state="selected"]', '[data-side="back"]']) {
    assert.ok(c.includes(st), 'thiếu kiểu cho ' + st);
  }
});

test('không tài nguyên ngoài; mọi file tham chiếu đều có', () => {
  for (const [name, text] of [['index.html', html()], ['style.css', css()]]) assert.equal(/https?:\/\//i.test(text), false, name + ' có liên kết ngoài');
  const refs = [...html().matchAll(/\s(?:src|href)="([^"#]+)"/g)].map((m) => m[1]).filter((r) => !r.startsWith('js/'));
  for (const r of refs) assert.ok(fs.existsSync(path.join(WEB, r)), 'không thấy ' + r);
});

test('SVG: favicon và 15 biểu tượng chủ đề, an toàn, dưới 4 KB', () => {
  const files = ['favicon', ...TOPICS.map((t) => 'topic-' + t)].map((n) => 'assets/' + n + '.svg');
  const contents = [];
  for (const f of files) {
    assert.ok(fs.existsSync(path.join(WEB, f)), 'thiếu ' + f);
    const s = read(f);
    contents.push(s);
    assert.match(s.trim(), /^<svg\b/, f);
    if (f !== 'assets/favicon.svg') assert.ok(s.includes('viewBox="0 0 64 64"'), f + ' viewBox');
    const rest = s.split('xmlns="http://www.w3.org/2000/svg"').join('');
    assert.equal(/<script|<image\b|<foreignObject|https?:\/\/|data:|\son\w+=/i.test(rest), false, f + ' có nội dung không được phép');
    assert.ok(Buffer.byteLength(s) < 4096, f + ' quá 4 KB');
  }
  assert.equal(new Set(contents).size, contents.length, 'có biểu tượng trùng nhau');
});
