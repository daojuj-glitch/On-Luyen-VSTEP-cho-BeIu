// Kiểm thử nghiệm thu logic (srs.js, quiz.js, store.js) — do Quản lý điều phối viết. Agent không được sửa.
// Dùng dữ liệu giả, không phụ thuộc data.js.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const JS = path.join(__dirname, '..', 'web', 'js');
const srs = () => require(path.join(JS, 'srs.js'));
const quiz = () => require(path.join(JS, 'quiz.js'));
const store = () => require(path.join(JS, 'store.js'));

const DAY = 86400000;
const NOW = new Date(2026, 10, 27, 9, 0).getTime();
const snap = (v) => JSON.stringify(v);
function fakeStorage(init) {
  const s = Object.assign({}, init || {});
  return { s, getItem: (k) => (k in s ? s[k] : null), setItem: (k, v) => { s[k] = String(v); } };
}
function seq(...vals) { let i = 0; return () => vals[i++ % vals.length]; }
const ITEMS = [
  { id: 'a-cat', topic: 'a', en: 'cat', alt: [], vi: 'con mèo' },
  { id: 'a-dog', topic: 'a', en: 'dog', alt: [], vi: 'con chó' },
  { id: 'a-bird', topic: 'a', en: 'bird', alt: [], vi: 'con chim' },
  { id: 'a-fish', topic: 'a', en: 'fish', alt: [], vi: 'con cá' },
  { id: 'b-tea', topic: 'b', en: 'tea', alt: [], vi: 'trà' },
  { id: 'b-soccer', topic: 'b', en: 'soccer', alt: ['football'], vi: 'bóng đá' },
  { id: 'b-greengrocer', topic: 'b', en: "greengrocer's", alt: [], vi: 'cửa hàng rau quả' },
  { id: 'b-computer-games', topic: 'b', en: 'computer games', alt: [], vi: 'trò chơi điện tử' },
];

// ---------- srs ----------
test('srs: hằng số và thẻ mới', () => {
  const s = srs();
  assert.deepEqual(s.BOX_DAYS, [0, 1, 2, 4, 8, 16]);
  assert.equal(s.MASTERED_BOX, 4);
  assert.deepEqual(s.newCard(), { box: 0, due: 0, right: 0, wrong: 0, last: 0 });
});

test('srs: review đúng lên hộp và giãn lịch, trần hộp 5', () => {
  const s = srs();
  let c = s.newCard();
  const before = snap(c);
  c = s.review(c, 'dung', NOW);
  assert.deepEqual(c, { box: 1, due: NOW + DAY, right: 1, wrong: 0, last: NOW });
  c = s.review(c, 'dung', NOW);
  assert.equal(c.box, 2); assert.equal(c.due, NOW + 2 * DAY);
  const top = s.review({ box: 5, due: 0, right: 9, wrong: 0, last: 0 }, 'dung', NOW);
  assert.equal(top.box, 5); assert.equal(top.due, NOW + 16 * DAY);
  assert.equal(snap(s.newCard()), before);
});

test('srs: review gần đúng giữ hộp, sai về hộp 1, kết quả lạ không đổi', () => {
  const s = srs();
  const c = { box: 3, due: 5, right: 4, wrong: 1, last: 1 };
  assert.deepEqual(s.review(c, 'gan-dung', NOW), { box: 3, due: NOW + DAY, right: 5, wrong: 1, last: NOW });
  assert.deepEqual(s.review(s.newCard(), 'gan-dung', NOW).box, 1);
  assert.deepEqual(s.review(c, 'sai', NOW), { box: 1, due: NOW, right: 4, wrong: 2, last: NOW });
  assert.deepEqual(s.review(c, 'xyz', NOW), c);
  assert.deepEqual(c, { box: 3, due: 5, right: 4, wrong: 1, last: 1 });
});

test('srs: isDue và pickMode', () => {
  const s = srs();
  assert.equal(s.isDue(s.newCard(), NOW), false);
  assert.equal(s.isDue({ box: 2, due: NOW, right: 0, wrong: 0, last: 0 }, NOW), true);
  assert.equal(s.isDue({ box: 2, due: NOW + 1, right: 0, wrong: 0, last: 0 }, NOW), false);
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((b) => s.pickMode({ box: b })), ['the', 'trac-nghiem', 'nghe', 'go-tu', 'go-tu', 'go-tu']);
});

test('srs: buildSession ưu tiên thẻ đến hạn, rồi từ mới, đúng giới hạn', () => {
  const s = srs();
  const ids = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8'];
  const cards = {
    x2: { box: 2, due: NOW - 10, right: 0, wrong: 0, last: 0 },
    x5: { box: 1, due: NOW - 99, right: 0, wrong: 0, last: 0 },
    x7: { box: 3, due: NOW + DAY, right: 0, wrong: 0, last: 0 },
    x3: { box: 0, due: 0, right: 0, wrong: 0, last: 0 },
  };
  const before = snap(cards);
  assert.deepEqual(s.buildSession(ids, cards, NOW, { size: 10, newLimit: 3 }), ['x5', 'x2', 'x1', 'x3', 'x4']);
  assert.deepEqual(s.buildSession(ids, cards, NOW, { size: 3, newLimit: 5 }), ['x5', 'x2', 'x1']);
  assert.deepEqual(s.buildSession(ids, cards, NOW, { newLimit: 0 }), ['x5', 'x2']);
  assert.equal(s.buildSession(ids, cards, NOW).length, 7);
  assert.equal(snap(cards), before);
});

test('srs: stats, hardest, streak', () => {
  const s = srs();
  const cards = {
    'a-cat': { box: 4, due: NOW + DAY, right: 5, wrong: 1, last: 0 },
    'a-dog': { box: 1, due: NOW - 1, right: 1, wrong: 3, last: 0 },
    'b-tea': { box: 2, due: NOW - 1, right: 2, wrong: 3, last: 0 },
    'zz-ghost': { box: 5, due: 0, right: 0, wrong: 9, last: 0 },
  };
  const st = s.stats(cards, ITEMS, NOW);
  assert.equal(st.total, 8); assert.equal(st.learned, 3); assert.equal(st.mastered, 1); assert.equal(st.due, 2);
  assert.deepEqual(st.byTopic.a, { total: 4, learned: 2, mastered: 1 });
  assert.deepEqual(st.byTopic.b, { total: 4, learned: 1, mastered: 0 });
  assert.deepEqual(s.hardest(cards, ITEMS).map((x) => x.id), ['a-dog', 'b-tea', 'a-cat']);
  assert.deepEqual(s.hardest(cards, ITEMS, 1).map((x) => x.id), ['a-dog']);
  assert.equal(s.streak(['2026-11-25', '2026-11-26', '2026-11-27'], '2026-11-27'), 3);
  assert.equal(s.streak(['2026-11-25', '2026-11-26'], '2026-11-27'), 2);
  assert.equal(s.streak(['2026-11-24', '2026-11-25'], '2026-11-27'), 0);
  assert.equal(s.streak([], '2026-11-27'), 0);
  assert.equal(s.streak(['2026-02-28', '2026-03-01'], '2026-03-01'), 2);
});

// ---------- quiz ----------
test('quiz: normalize, stripAccents, levenshtein', () => {
  const q = quiz();
  assert.equal(q.normalize('  Greengrocer’s,  SHOP! '), "greengrocer's shop");
  assert.equal(q.normalize(null), '');
  assert.equal(q.stripAccents('Đồ CỔ  '), 'do co');
  assert.equal(q.levenshtein('kitten', 'sitting'), 3);
  assert.equal(q.levenshtein('', 'abc'), 3);
});

test('quiz: checkTyping đúng, gần đúng, sai', () => {
  const q = quiz();
  const [, , , , , soccer, greengrocer, games] = ITEMS;
  assert.equal(q.checkTyping(' Soccer ', soccer), 'dung');
  assert.equal(q.checkTyping('football', soccer), 'dung');
  assert.equal(q.checkTyping('soccor', soccer), 'gan-dung');
  assert.equal(q.checkTyping('greengrocer’s', greengrocer), 'dung');
  assert.equal(q.checkTyping('computr gams', games), 'gan-dung');
  assert.equal(q.checkTyping('computer', games), 'sai');
  assert.equal(q.checkTyping('dg', ITEMS[1]), 'sai');
  assert.equal(q.checkTyping('', ITEMS[0]), 'sai');
  assert.equal(q.checkTyping('cot', ITEMS[0]), 'sai');
});

test('quiz: shuffle không đổi đầu vào, giữ phần tử', () => {
  const q = quiz();
  const a = [1, 2, 3, 4, 5];
  const out = q.shuffle(a, seq(0.1, 0.9, 0.5, 0.3));
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
  assert.deepEqual([...out].sort(), [1, 2, 3, 4, 5]);
  assert.notEqual(out, a);
});

test('quiz: makeChoice hai hướng, 4 lựa chọn khác nhau, một đáp án, ưu tiên cùng chủ đề', () => {
  const q = quiz();
  const before = snap(ITEMS);
  for (let k = 0; k < 20; k += 1) {
    const r = q.makeChoice(ITEMS[0], ITEMS, 'en-vi', seq(k / 20, 0.37, 0.71, 0.13));
    assert.equal(r.id, 'a-cat'); assert.equal(r.prompt, 'cat');
    assert.equal(r.choices.length, 4);
    assert.equal(new Set(r.choices).size, 4);
    assert.equal(r.choices[r.answer], 'con mèo');
    assert.deepEqual([...r.choices].sort(), ['con chim', 'con chó', 'con cá', 'con mèo'].sort());
  }
  const r2 = q.makeChoice(ITEMS[4], ITEMS, 'vi-en', Math.random);
  assert.equal(r2.prompt, 'trà'); assert.equal(r2.choices[r2.answer], 'tea');
  const few = q.makeChoice(ITEMS[0], ITEMS.slice(0, 2), 'en-vi', Math.random);
  assert.equal(few.choices.length, 2);
  assert.equal(snap(ITEMS), before);
});

test('quiz: makeMatch và hintFor', () => {
  const q = quiz();
  const m = q.makeMatch(ITEMS.slice(0, 3), seq(0.5, 0.2));
  assert.deepEqual(m.left, [{ id: 'a-cat', text: 'cat' }, { id: 'a-dog', text: 'dog' }, { id: 'a-bird', text: 'bird' }]);
  assert.deepEqual(m.right.map((x) => x.id).sort(), ['a-bird', 'a-cat', 'a-dog']);
  for (const r of m.right) assert.equal(r.text, ITEMS.find((i) => i.id === r.id).vi);
  const g = ITEMS[7];
  assert.equal(q.hintFor(g, 1), 'c_______ g____');
  assert.equal(q.hintFor(g, 2), 'c______r g___s');
  assert.equal(q.hintFor(g, 3), 'computer games');
  assert.equal(q.hintFor(g, 9), 'computer games');
  assert.equal(q.hintFor({ en: 'go to' }, 2), 'go to');
  assert.equal(q.hintFor({ en: 'high-heel shoes' }, 1), 'h___-h___ s____');
});

// ---------- store ----------
test('store: defaults, todayKey', () => {
  const st = store();
  assert.equal(st.STORE_KEY, 'vsep-beiu-v1');
  assert.deepEqual(st.defaults(), { version: 1, cards: {}, days: [], answers: {}, settings: { dailyGoal: 20, rate: 0.9, voice: '' } });
  assert.equal(st.todayKey(NOW), '2026-11-27');
  assert.equal(st.todayKey(new Date(2026, 0, 5, 23, 59).getTime()), '2026-01-05');
});

test('store: sanitize lọc dữ liệu hỏng', () => {
  const st = store();
  const d = st.sanitize({
    version: 1,
    cards: { ok: { box: 2, due: 5, right: 1, wrong: 0, last: 3 }, bad1: { box: 9, due: 0, right: 0, wrong: 0, last: 0 }, bad2: { box: 1, due: 'x' }, bad3: null },
    days: ['2026-11-27', 'xx', '2026-11-25', '2026-11-27'],
    answers: { '2026-11-27': 5, bad: 'x' },
    settings: { dailyGoal: 500, rate: 3, voice: 7 },
  });
  assert.deepEqual(Object.keys(d.cards), ['ok']);
  assert.deepEqual(d.days, ['2026-11-25', '2026-11-27']);
  assert.equal(d.answers['2026-11-27'], 5);
  assert.equal(d.settings.dailyGoal, 20); assert.equal(d.settings.rate, 0.9); assert.equal(d.settings.voice, '');
  assert.deepEqual(st.sanitize(null), st.defaults());
});

test('store: load/save chịu lỗi', () => {
  const st = store();
  assert.deepEqual(st.load(null), st.defaults());
  assert.deepEqual(st.load(fakeStorage({ 'vsep-beiu-v1': '{hong' })), st.defaults());
  assert.deepEqual(st.load({ getItem: () => { throw new Error('x'); } }), st.defaults());
  const fs1 = fakeStorage();
  const d = st.defaults(); d.settings.dailyGoal = 30;
  assert.equal(st.save(fs1, d), true);
  assert.equal(st.load(fs1).settings.dailyGoal, 30);
  assert.equal(st.save(null, d), false);
  assert.equal(st.save({ setItem: () => { throw new Error('quota'); } }, d), false);
});

test('store: recordAnswer cập nhật thẻ, ngày học, lượt trả lời, không đổi đầu vào', () => {
  const st = store();
  const d0 = st.defaults();
  const before = snap(d0);
  const d1 = st.recordAnswer(d0, 'a-cat', 'dung', NOW);
  const d2 = st.recordAnswer(d1, 'a-cat', 'sai', NOW + 1000);
  assert.equal(snap(d0), before);
  assert.equal(d1.cards['a-cat'].box, 1);
  assert.equal(d2.cards['a-cat'].box, 1); assert.equal(d2.cards['a-cat'].wrong, 1);
  assert.deepEqual(d2.days, ['2026-11-27']);
  assert.equal(d2.answers['2026-11-27'], 2);
});

test('store: exportText / importText', () => {
  const st = store();
  const d = st.recordAnswer(st.defaults(), 'a-cat', 'dung', NOW);
  const text = st.exportText(d);
  assert.ok(text.includes('\n  "version": 1'));
  assert.deepEqual(st.importText(text), st.sanitize(d));
  assert.equal(st.importText('không phải json'), null);
  assert.equal(st.importText('[1,2]'), null);
  assert.equal(st.importText('{"version":2}'), null);
});

test('quiz: makeChoice không lấy nhiễu trùng nghĩa hoặc trùng từ với câu hỏi', () => {
  const q = quiz();
  const pool = [
    { id: 'm-classic', topic: 'm', en: 'classic', alt: [], vi: 'cổ điển' },
    { id: 'm-classical', topic: 'm', en: 'classical music', alt: [], vi: 'Cổ điển' },
    { id: 'm-tasty', topic: 'm', en: 'tasty', alt: ['delicious'], vi: 'ngon' },
    { id: 'm-delicious', topic: 'm', en: 'delicious', alt: [], vi: 'thơm ngon' },
    { id: 'm-pop', topic: 'm', en: 'pop', alt: [], vi: 'nhạc pop' },
    { id: 'm-rock', topic: 'm', en: 'rock', alt: [], vi: 'nhạc rock' },
    { id: 'm-jazz', topic: 'm', en: 'jazz', alt: [], vi: 'nhạc jazz' },
  ];
  for (let k = 0; k < 30; k += 1) {
    for (const dir of ['en-vi', 'vi-en']) {
      const a = q.makeChoice(pool[0], pool, dir, Math.random);
      assert.ok(!a.choices.includes(dir === 'en-vi' ? 'Cổ điển' : 'classical music'), dir + ': có hai đáp án cùng nghĩa');
      const b = q.makeChoice(pool[2], pool, dir, Math.random);
      assert.ok(!b.choices.includes(dir === 'en-vi' ? 'thơm ngon' : 'delicious'), dir + ': nhiễu trùng từ đồng nghĩa');
      assert.equal(b.choices.length, 4);
    }
  }
});