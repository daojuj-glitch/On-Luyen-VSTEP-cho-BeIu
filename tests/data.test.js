// Kiểm thử nghiệm thu dữ liệu (tests/ai-coordination/VSTEP/web/js/data.js) — do Quản lý điều phối viết. Agent không được sửa.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const data = () => require(path.join(ROOT, 'web', 'js', 'data.js'));
const SOURCE = fs.readFileSync(path.join(ROOT, 'nguon', 'tu-vung.txt'), 'utf8');

const TOPICS = [
  ['so-thich-the-thao', 'vocab'], ['gia-dinh', 'vocab'], ['du-lich', 'vocab'], ['an-uong', 'vocab'],
  ['giai-tri', 'vocab'], ['thoi-trang-mua-sam', 'vocab'], ['noi-so-thich', 'speaking'], ['noi-am-nhac', 'speaking'],
  ['noi-phim', 'speaking'], ['noi-du-lich', 'speaking'], ['noi-the-thao', 'speaking'], ['noi-doc-sach', 'speaking'],
  ['noi-mua-sam', 'speaking'], ['noi-hoc-tap-cong-viec', 'speaking'], ['noi-que-huong', 'speaking'],
];

// Bảng hiệu đính ở SPEC mục 5: [topic, en, dùng]
const CORRECTIONS = [
  ['so-thich-the-thao', 'basketball', 'bóng rổ'], ['so-thich-the-thao', 'jogging', 'chạy bộ'],
  ['so-thich-the-thao', 'hiking', 'đi bộ đường dài'], ['so-thich-the-thao', 'going to karaoke bar', 'đi hát karaoke'],
  ['so-thich-the-thao', 'computer games', 'trò chơi điện tử'],
  ['gia-dinh', 'immediate family', 'gia đình ruột thịt (bố mẹ, anh chị em, con)'], ['gia-dinh', 'in-laws', 'họ hàng bên vợ hoặc chồng'],
  ['gia-dinh', 'make ends meet', 'xoay xở đủ sống'],
  ['du-lich', 'market', 'chợ'], ['du-lich', 'souvenir shops', 'cửa hàng đồ lưu niệm'], ['du-lich', 'bar', 'quán bar'],
  ['du-lich', 'have a picnic', 'đi dã ngoại'], ['du-lich', 'go for a walk', 'đi dạo'], ['du-lich', 'go hiking', 'đi bộ đường dài'],
  ['du-lich', 'spend a lot of money', 'tiêu nhiều tiền'], ['du-lich', 'look round the shops', 'dạo xem các cửa hàng'],
  ['du-lich', 'go shopping', 'đi mua sắm'],
  ['an-uong', 'cuttlefish', 'mực nang'], ['an-uong', 'mussels', 'con vẹm (trai biển)'], ['an-uong', 'green beans', 'đậu que'],
  ['an-uong', 'spinach', 'rau chân vịt (rau bina)'], ['an-uong', 'melon', 'dưa lưới'], ['an-uong', 'cherry', 'quả anh đào'],
  ['an-uong', 'coffee', 'cà phê'], ['an-uong', 'beer', 'bia'], ['an-uong', 'wine', 'rượu vang'], ['an-uong', 'awesome', 'rất ngon, tuyệt'],
  ['giai-tri', 'thriller', 'phim giật gân'], ['giai-tri', 'powerful', 'mạnh mẽ, ấn tượng sâu sắc'],
  ['giai-tri', 'wildlife program', 'chương trình về thế giới hoang dã'], ['giai-tri', 'game show', 'trò chơi truyền hình'],
  ['giai-tri', 'music program', 'chương trình âm nhạc'], ['giai-tri', 'sports program', 'chương trình thể thao'], ['giai-tri', 'jazz', 'nhạc jazz'],
  ['thoi-trang-mua-sam', 'handmade clothes', 'quần áo may thủ công'], ['thoi-trang-mua-sam', 'skirt', 'chân váy'],
  ['thoi-trang-mua-sam', 'high-heel shoes', 'giày cao gót'], ['thoi-trang-mua-sam', 'tights', 'quần tất'],
  ['thoi-trang-mua-sam', 'woollen cap', 'mũ len'], ['thoi-trang-mua-sam', 'sandals', 'dép quai hậu, xăng-đan'],
  ['thoi-trang-mua-sam', 'earrings', 'bông tai'], ['thoi-trang-mua-sam', 'navy blue', 'màu xanh hải quân (xanh đậm)'],
  ['thoi-trang-mua-sam', 'green', 'màu xanh lá cây'], ['thoi-trang-mua-sam', 'light', 'màu nhạt'],
  ['thoi-trang-mua-sam', 'helpful', 'nhiệt tình, hay giúp đỡ'], ['thoi-trang-mua-sam', 'window shopping', 'đi ngắm hàng (không mua)'],
  ['thoi-trang-mua-sam', 'department store', 'cửa hàng bách hóa'], ['thoi-trang-mua-sam', "greengrocer's", 'cửa hàng rau quả'],
  ['thoi-trang-mua-sam', 'shoe shop', 'cửa hàng giày'],
  ['gia-dinh', 'grandfather', 'ông'], ['gia-dinh', 'grandmother', 'bà'], ['gia-dinh', 'uncle', 'chú, bác, cậu'],
  ['gia-dinh', 'aunt', 'cô, dì, bác gái'], ['gia-dinh', 'cousin', 'anh chị em họ'],
  ['gia-dinh', 'nephew', 'cháu trai (con của anh chị em)'], ['gia-dinh', 'niece', 'cháu gái (con của anh chị em)'],
  ['gia-dinh', 'father-in-law', 'bố chồng, bố vợ'], ['gia-dinh', 'mother-in-law', 'mẹ chồng, mẹ vợ'],
  ['gia-dinh', 'brother-in-law', 'anh rể, em rể, anh em bên vợ hoặc chồng'],
  ['gia-dinh', 'sister-in-law', 'chị dâu, em dâu, chị em bên vợ hoặc chồng'],
  ['gia-dinh', 'widower', 'người đàn ông góa vợ'], ['gia-dinh', 'widow', 'người phụ nữ góa chồng'],
  ['gia-dinh', 'step-father', 'bố dượng'], ['gia-dinh', 'step-mother', 'mẹ kế'],
  ['du-lich', 'check-in desk', 'quầy làm thủ tục'], ['du-lich', 'luggage', 'hành lý'], ['du-lich', 'excess baggage', 'hành lý quá cước'],
  ['du-lich', 'boarding card', 'thẻ lên máy bay'], ['du-lich', 'passport control', 'khu kiểm tra hộ chiếu'],
  ['du-lich', 'departure lounge', 'phòng chờ lên máy bay'], ['du-lich', 'duty-free', 'cửa hàng miễn thuế'],
  ['du-lich', 'gate', 'cửa ra máy bay'], ['du-lich', 'hand luggage', 'hành lý xách tay'],
  ['du-lich', 'overhead locker', 'ngăn hành lý phía trên ghế'], ['du-lich', 'runway', 'đường băng'], ['du-lich', 'take off', 'cất cánh'],
  ['giai-tri', 'classical music', 'nhạc cổ điển'],
];
// Từ tiếng Anh mà tài liệu gốc viết sai chính tả.
const EN_FIXED = new Set(['awesome', 'tights', 'woollen cap', 'shoe shop', 'woollen', 'shoe']);

// Một số mục lấy nguyên văn tài liệu: [topic, en, vi]
const SAMPLES = [
  ['so-thich-the-thao', 'stamps', 'tem thư'], ['so-thich-the-thao', 'antiques', 'đồ cổ'], ['so-thich-the-thao', 'gardening', 'làm vườn'],
  ['so-thich-the-thao', 'martial arts', 'võ thuật'], ['gia-dinh', 'breadwinner', 'trụ cột'],
  ['gia-dinh', 'nuclear family', 'gia đình hạt nhân'], ['du-lich', 'pagoda', 'chùa'], ['du-lich', 'boarding card', null],
  ['du-lich', 'take photos', 'chụp ảnh'], ['an-uong', 'oyster', 'hàu'], ['an-uong', 'pumpkin', 'bí ngô'],
  ['an-uong', 'steam', 'hấp'], ['an-uong', 'nutritious', 'giàu dinh dưỡng'], ['giai-tri', 'blockbuster', 'bom tấn'],
  ['giai-tri', 'documentary', 'phim tài liệu'], ['giai-tri', 'composer', 'nhà soạn nhạc'], ['giai-tri', 'comic books', 'truyện tranh'],
  ['thoi-trang-mua-sam', 'conical hat', 'nón lá'], ['thoi-trang-mua-sam', 'necklace', 'vòng đeo cổ'],
];

const norm = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").normalize('NFC');
const tokens = (s) => norm(s).split(/[^\p{L}\p{N}'&-]+/u).filter(Boolean);
const SOURCE_TOKENS = new Set(tokens(SOURCE));
const slug = (s) => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

test('topics: đúng 15 chủ đề, đúng thứ tự và loại', () => {
  const t = data().topics;
  assert.deepEqual(t.map((x) => [x.id, x.kind]), TOPICS);
  for (const x of t) assert.ok(x.vi && x.en, 'thiếu tên ' + x.id);
});

test('vocab: cấu trúc mục, id duy nhất, không trùng en trong chủ đề', () => {
  const v = data().vocab;
  const ids = new Set();
  const topicIds = new Set(TOPICS.map((x) => x[0]));
  for (const x of v) {
    assert.deepEqual(Object.keys(x).sort(), ['alt', 'en', 'group', 'id', 'note', 'topic', 'vi'], 'trường sai: ' + x.id);
    assert.ok(topicIds.has(x.topic), 'topic lạ: ' + x.id);
    assert.equal(x.id, x.topic + '-' + slug(x.en), 'id sai: ' + x.id);
    assert.ok(!ids.has(x.id), 'id trùng: ' + x.id);
    ids.add(x.id);
    assert.ok(Array.isArray(x.alt));
    for (const f of ['group', 'en', 'vi']) assert.ok(typeof x[f] === 'string' && x[f].trim(), f + ' rỗng: ' + x.id);
    assert.equal(typeof x.note, 'string');
  }
});

test('vocab: đủ số lượng theo chủ đề', () => {
  const v = data().vocab;
  assert.ok(v.length >= 300, 'tổng ' + v.length);
  for (const [id, kind] of TOPICS) {
    const n = v.filter((x) => x.topic === id).length;
    assert.ok(n >= (kind === 'vocab' ? 25 : 4), id + ' chỉ có ' + n);
  }
});

test('vocab: mọi từ tiếng Anh đều có trong tài liệu (trừ lỗi chính tả đã sửa)', () => {
  const missing = [];
  for (const x of data().vocab) {
    for (const phrase of [x.en, ...x.alt]) {
      if (EN_FIXED.has(norm(phrase))) continue;
      for (const t of tokens(phrase)) if (!SOURCE_TOKENS.has(t) && !EN_FIXED.has(t)) missing.push(x.id + ': ' + t);
    }
  }
  assert.deepEqual(missing, []);
});

test('vocab: nghĩa tiếng Việt lấy từ tài liệu, trừ mục hiệu đính', () => {
  const fixed = new Set(CORRECTIONS.map(([t, en]) => t + '|' + en));
  const missing = [];
  for (const x of data().vocab) {
    if (fixed.has(x.topic + '|' + x.en)) continue;
    const bad = tokens(x.vi).filter((t) => !SOURCE_TOKENS.has(t));
    if (bad.length) missing.push(x.id + ': ' + bad.join(' '));
  }
  assert.deepEqual(missing, []);
});

test('vocab: dùng đúng bảng hiệu đính', () => {
  const v = data().vocab;
  for (const [topic, en, vi] of CORRECTIONS) {
    const x = v.find((i) => i.topic === topic && i.en === en);
    assert.ok(x, 'thiếu ' + topic + '/' + en);
    assert.equal(x.vi, vi, topic + '/' + en);
  }
});

test('vocab: các mục mẫu lấy đúng tài liệu', () => {
  const v = data().vocab;
  for (const [topic, en, vi] of SAMPLES) {
    const x = v.find((i) => i.topic === topic && (i.en === en || i.alt.includes(en)));
    assert.ok(x, 'thiếu ' + topic + '/' + en);
    if (vi) assert.equal(x.vi, vi, topic + '/' + en);
  }
  const soccer = v.find((i) => i.topic === 'so-thich-the-thao' && i.en === 'soccer');
  assert.ok(soccer && soccer.alt.includes('football'), 'soccer phải có alt football');
  const tennis = v.find((i) => i.topic === 'so-thich-the-thao' && i.en === 'tennis');
  assert.equal(tennis.note, 'play tennis');
  assert.equal(v.find((i) => i.topic === 'so-thich-the-thao' && i.en === 'yoga').note, 'do yoga');
  assert.equal(v.find((i) => i.topic === 'so-thich-the-thao' && i.en === 'swimming').note, 'go swimming');
  for (const pair of ['salty', 'bland', 'sour', 'sweet']) assert.ok(v.find((i) => i.topic === 'an-uong' && i.en === pair), 'thiếu ' + pair);
});

test('corrections: đúng bảng hiệu đính và thứ tự', () => {
  const c = data().corrections;
  assert.deepEqual(c.map((x) => [x.topic, x.en, x.to]), CORRECTIONS);
  for (const x of c) {
    assert.ok(['nghĩa', 'chính tả', 'bổ sung'].includes(x.kind), 'kind sai: ' + x.en);
    assert.equal(typeof x.from, 'string');
  }
});

test('structures: đủ và đúng chủ đề', () => {
  const s = data().structures;
  assert.ok(s.length >= 15, 'chỉ có ' + s.length);
  const topicIds = new Set(TOPICS.map((x) => x[0]));
  for (const x of s) {
    assert.deepEqual(Object.keys(x).sort(), ['en', 'id', 'topic', 'vi']);
    assert.ok(topicIds.has(x.topic) && x.en.trim() && x.vi.trim(), 'mẫu câu hỏng: ' + x.id);
  }
  assert.ok(s.some((x) => /prefer/i.test(x.en)), 'thiếu mẫu prefer … to …');
});

test('speaking: 9 chủ đề nói, đủ câu hỏi, khung, ý', () => {
  const sp = data().speaking;
  const speakingTopics = TOPICS.filter((x) => x[1] === 'speaking').map((x) => x[0]);
  assert.deepEqual(sp.map((x) => x.topic), speakingTopics);
  for (const x of sp) {
    assert.ok(x.questions.length >= 1 && x.outline.length >= 2 && x.ideas.length >= 3, 'thiếu nội dung: ' + x.topic);
    for (const q of x.questions) assert.ok(q.en.includes('?') && q.vi.trim(), 'câu hỏi hỏng: ' + x.topic);
    for (const o of x.outline) assert.ok(o.label && o.en && typeof o.vi === 'string', 'khung hỏng: ' + x.topic);
    for (const i of x.ideas) assert.ok(i.en && i.vi, 'ý hỏng: ' + x.topic);
  }
  const hometown = sp.find((x) => x.topic === 'noi-que-huong');
  assert.ok(hometown.questions.some((q) => /Where are you from\?/.test(q.en)));
  const all = JSON.stringify(sp);
  for (const typo of ['rãnh', 'sence', 'newess', 'beasties', 'Arvil', 'milions', 'keep us with']) assert.ok(!all.includes(typo), 'còn lỗi chính tả: ' + typo);
});

test('data.js chạy được trong trình duyệt: gắn window.VSEP_DATA', () => {
  const vm = require('node:vm');
  const box = { window: {} };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'web', 'js', 'data.js'), 'utf8'), box);
  assert.equal(box.window.VSEP_DATA.topics.length, 15);
});

test('nhóm Hàng không đủ 12 mục; nghĩa không được là chính từ tiếng Anh', () => {
  const v = data().vocab;
  const air = ['check-in desk', 'luggage', 'excess baggage', 'boarding card', 'passport control', 'departure lounge', 'duty-free',
    'gate', 'hand luggage', 'overhead locker', 'runway', 'take off'];
  for (const en of air) {
    const x = v.find((i) => i.topic === 'du-lich' && i.en === en);
    assert.ok(x, 'thiếu ' + en);
    assert.equal(x.group, 'Hàng không', en + ' phải thuộc nhóm Hàng không');
  }
  const sameAsEn = v.filter((x) => norm(x.vi) === norm(x.en) && x.en.split(' ').length > 1).map((x) => x.id);
  assert.deepEqual(sameAsEn, [], 'cụm từ có nghĩa là chính nó');
});