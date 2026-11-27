// Kiểm thử tích hợp — chỉ chạy được sau khi gộp đủ data.js, logic, app.js và giao diện. Do Quản lý điều phối viết.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const WEB = path.join(__dirname, '..', 'web');
const read = (f) => fs.readFileSync(path.join(WEB, f), 'utf8');
const JS_FILES = ['js/data.js', 'js/srs.js', 'js/quiz.js', 'js/store.js', 'js/app.js'];

test('mọi id và móc data-* mà app.js dùng đều có trong HTML', () => {
  const js = read('js/app.js');
  const html = read('index.html');
  const ids = new Set([
    ...[...js.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map((m) => m[1]),
    ...[...js.matchAll(/['"`]#([a-z][a-z0-9-]*)['"`]/g)].map((m) => m[1]),
  ]);
  assert.ok(ids.size > 0, 'app.js không tham chiếu id nào theo cách nhận diện được');
  for (const id of ids) {
    if (/^\/|^(on-tap|tien-do)$/.test(id)) continue; // hash định tuyến, không phải id
    assert.ok(html.includes('id="' + id + '"'), 'app.js dùng id không có trong HTML: ' + id);
  }
  for (const m of js.matchAll(/\[data-(field|action|mode|grade|nav|choice)=\\?["']([a-z0-9-]+)\\?["']\]/g)) {
    assert.ok(html.includes('data-' + m[1] + '="' + m[2] + '"'), 'HTML thiếu data-' + m[1] + '=' + m[2]);
  }
});

test('ba file logic chạy trong trình duyệt, gắn đúng biến toàn cục', () => {
  const box = {};
  box.window = box; // như trình duyệt: biến toàn cục chính là window
  vm.createContext(box);
  for (const f of JS_FILES.slice(0, 4)) vm.runInContext(read(f), box);
  const w = box;
  assert.equal(w.VSEP_DATA.topics.length, 15);
  for (const [name, fn] of [['VsepSrs', 'buildSession'], ['VsepQuiz', 'makeChoice'], ['VsepStore', 'recordAnswer']]) {
    assert.equal(typeof w[name][fn], 'function', name + '.' + fn);
  }
});

test('dữ liệu thật dùng được với logic: tạo câu hỏi cho mọi từ', () => {
  const data = require(path.join(WEB, 'js', 'data.js'));
  const quiz = require(path.join(WEB, 'js', 'quiz.js'));
  for (const item of data.vocab) {
    const q = quiz.makeChoice(item, data.vocab, 'en-vi', Math.random);
    assert.equal(q.choices.length, 4, 'không đủ 4 lựa chọn: ' + item.id);
    assert.equal(q.choices[q.answer], item.vi);
    assert.equal(quiz.checkTyping(item.en, item), 'dung', 'gõ đúng mà không nhận: ' + item.id);
  }
});

test('JavaScript an toàn: không dựng HTML bằng chuỗi, không mạng, không đổi class, không module', () => {
  for (const f of JS_FILES) {
    const js = read(f);
    assert.equal(/innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function/.test(js), false, f + ' dựng HTML/mã bằng chuỗi');
    assert.equal(/https?:\/\//.test(js), false, f + ' có liên kết ngoài');
    assert.equal(/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|^\s*(import|export)\s/m.test(js), false, f + ' dùng mạng hoặc ES module');
    assert.equal(/\.classList\.|\.className\s*=/.test(js), false, f + ' đổi class');
  }
});

test('chỉ store.js ghi localStorage; không cookie, không IndexedDB', () => {
  assert.equal(/\.setItem\s*\(/.test(read('js/app.js')), false, 'app.js tự ghi storage');
  for (const f of JS_FILES) assert.equal(/document\.cookie|indexedDB|sessionStorage/.test(read(f)), false, f);
});

test('biểu tượng của mọi chủ đề tồn tại', () => {
  const data = require(path.join(WEB, 'js', 'data.js'));
  for (const t of data.topics) assert.ok(fs.existsSync(path.join(WEB, 'assets', 'topic-' + t.id + '.svg')), 'thiếu icon ' + t.id);
});

test('dữ liệu thật: không câu trắc nghiệm nào có hai đáp án cùng đúng', () => {
  const data = require(path.join(WEB, 'js', 'data.js'));
  const quiz = require(path.join(WEB, 'js', 'quiz.js'));
  const key = (s) => quiz.stripAccents(s);
  const bad = [];
  for (const item of data.vocab) {
    for (const dir of ['en-vi', 'vi-en']) {
      const q = quiz.makeChoice(item, data.vocab, dir, Math.random);
      q.choices.forEach((c, idx) => {
        if (idx === q.answer) return;
        const owners = data.vocab.filter((v) => (dir === 'en-vi' ? key(v.vi) === key(c) : key(v.en) === key(c)));
        if (owners.some((v) => key(v.vi) === key(item.vi) || [v.en, ...v.alt].some((e) => [item.en, ...item.alt].map(key).includes(key(e))))) bad.push(item.id + ' ' + dir + ': ' + c);
      });
    }
  }
  assert.deepEqual(bad.slice(0, 10), []);
});