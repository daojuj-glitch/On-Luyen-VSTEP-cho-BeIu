# Ôn Luyện VSTEP cho BéIu — spec

Đợt `vsep`, viết ngày 27/11/2026. Cỡ việc: **M lớn** (một web tĩnh, 3 người làm song song, 1 người kiểm tra). Quy trình: `tests/ai-coordination/quy-trinh/QUY-TRINH.md`.

## 1. Mục tiêu

Một website giúp **BéIu** thuộc khoảng 350 từ và cụm từ trong file `TU VUNG THEO CHU DE.docx`, rồi dùng được chúng khi **nói** về 9 chủ đề quen thuộc của phần 1 bài thi nói (sở thích, âm nhạc, phim, du lịch, thể thao, đọc sách, mua sắm, học tập/công việc, quê hương).

Người học mở web mỗi ngày 10–15 phút: ôn các từ đến hạn, học thêm vài từ mới, luyện nói một chủ đề. Web nhớ tiến độ trên máy, nhắc chuỗi ngày học liên tiếp.

**Không làm:** tài khoản, máy chủ, đồng bộ nhiều máy (chỉ có xuất/nhập file), chấm điểm phát âm, AI chấm bài nói, quảng cáo, gửi dữ liệu ra ngoài.

**Thất bại nếu:** dạy nghĩa sai; người học không biết hôm nay nên học gì; phải bấm nhiều bước mới vào được bài học; mất tiến độ khi tải lại trang; vỡ giao diện trên điện thoại; lặp lại toàn câu hỏi giống nhau khiến người học thuộc vị trí đáp án thay vì thuộc từ.

## 2. Nguyên tắc học tập (quyết định của chuyên gia EdTech)

| Nguyên tắc | Cách thể hiện trong web |
|---|---|
| Nhớ lại chủ động (active recall) | Mọi chế độ đều bắt người học tự trả lời trước khi xem đáp án; thẻ ghi nhớ có bước tự chấm |
| Lặp lại ngắt quãng | Hệ 5 hộp Leitner: đúng thì lên hộp và giãn lịch 1–2–4–8–16 ngày; sai về hộp 1 |
| Độ khó tăng dần theo mức nhớ | Từ mới: thẻ ghi nhớ → trắc nghiệm → nghe → gõ chính tả (chọn chế độ theo hộp) |
| Học xen kẽ | Phiên "Ôn tập" trộn từ của nhiều chủ đề và nhiều dạng câu hỏi |
| Phản hồi tức thì, cụ thể | Đúng/sai hiện ngay kèm nghĩa và cách viết đúng; câu sai được hỏi lại cuối phiên |
| Mã hóa kép | Mỗi từ đều nghe được bằng giọng đọc của máy (Web Speech API), có chậm |
| Phiên ngắn, mục tiêu nhỏ | Phiên 10 câu; mục tiêu ngày mặc định 20 lượt trả lời; chuỗi ngày học |
| Học từ trong ngữ cảnh | Sở thích chơi thể thao học kèm động từ play/do/go; luyện nói dùng lại cụm từ của chủ đề |
| Nội dung đáng tin | Giữ đúng nội dung tài liệu; nghĩa sai được hiệu đính và liệt kê minh bạch (mục 5) |

## 3. Cách làm đã chọn

| Cách | Được | Mất | Chọn |
|---|---|---|---|
| Web tĩnh HTML/CSS/JS thuần, dữ liệu nhúng trong file JS | Mở `index.html` là chạy, không cài gì, kiểm thử bằng `node --test`, chia việc song song | Tự viết phần hiển thị | **Chọn** |
| React/Vite | Nhiều thành phần dựng sẵn | Cần cài gói và bước build; agent không được cài gói | Không |
| Ứng dụng có máy chủ và tài khoản | Đồng bộ nhiều máy | Tốn công, cần hosting, dữ liệu cá nhân | Không (ngoài phạm vi) |

## 4. Phân công và quyền sở hữu file

Đường dẫn tính từ gốc repo. Ứng dụng nằm trong `tests/ai-coordination/VSTEP/web/`.

| Vai | Agent | Được tạo/sửa |
|---|---|---|
| Quản lý điều phối | Claude | `tests/ai-coordination/VSTEP/docs/*`, `tests/ai-coordination/VSTEP/tests/*.test.js` (trừ file dưới), `tests/ai-coordination/VSTEP/nguon/*`, `tests/ai-coordination/VSTEP/doi-ai/*`, `tests/ai-coordination/VSTEP/cong-cu/*`, `tests/ai-coordination/VSTEP/video/*` |
| Nội dung (`nd`) | DeepSeek (OpenCode, miễn phí) | `tests/ai-coordination/VSTEP/web/js/data.js` |
| Phụ trách backend (`be`) | Codex | `tests/ai-coordination/VSTEP/web/js/srs.js`, `quiz.js`, `store.js`, `app.js`, `tests/ai-coordination/VSTEP/tests/be.extra.test.js` |
| Phụ trách frontend (`fe`) | Antigravity | `tests/ai-coordination/VSTEP/web/index.html`, `tests/ai-coordination/VSTEP/web/style.css`, `tests/ai-coordination/VSTEP/web/assets/*` |
| Phụ trách kiểm tra | DeepSeek (phiên khác) | không sửa file |

## 5. Dữ liệu (`tests/ai-coordination/VSTEP/web/js/data.js`)

Nguồn duy nhất: `tests/ai-coordination/VSTEP/nguon/tu-vung.txt` (văn bản trích từ file docx). Không thêm từ ngoài tài liệu.

```js
// Trình duyệt: window.VSEP_DATA = DATA; Node: module.exports = DATA
const DATA = { topics: [...], vocab: [...], structures: [...], speaking: [...], corrections: [...] };
```

**corrections** — đúng các dòng của bảng hiệu đính bên dưới, cùng thứ tự: `{ topic, en, from, to, kind }` (`kind` là `nghĩa`, `chính tả` hoặc `bổ sung`).

**topics** — đúng 15 mục, đúng thứ tự:

| id | vi | en | kind |
|---|---|---|---|
| so-thich-the-thao | Sở thích & thể thao | Hobbies and sports | vocab |
| gia-dinh | Gia đình | Family | vocab |
| du-lich | Đi lại & du lịch | Travel and tourism | vocab |
| an-uong | Ăn uống | Food and eating habits | vocab |
| giai-tri | Giải trí | Entertainment | vocab |
| thoi-trang-mua-sam | Thời trang & mua sắm | Fashion and shopping | vocab |
| noi-so-thich | Nói về sở thích | Hobbies and interests | speaking |
| noi-am-nhac | Nói về âm nhạc | Music | speaking |
| noi-phim | Nói về phim | Movies | speaking |
| noi-du-lich | Nói về du lịch | Travelling | speaking |
| noi-the-thao | Nói về thể thao | Sports | speaking |
| noi-doc-sach | Nói về đọc sách | Reading | speaking |
| noi-mua-sam | Nói về mua sắm | Shopping | speaking |
| noi-hoc-tap-cong-viec | Nói về học tập, công việc | Study and work | speaking |
| noi-que-huong | Nói về quê hương | Hometown | speaking |

Mỗi topic: `{ id, vi, en, kind }`.

**vocab** — mỗi mục `{ id, topic, group, en, alt, vi, note }`:
- `id` = `topic + '-' + slug(en)` (chữ thường, không dấu, khoảng trắng và ký tự khác thành `-`), duy nhất.
- `group`: tên nhóm nhỏ bằng tiếng Việt theo tài liệu (ví dụ `Hoạt động trong nhà`, `Rau`, `Thể loại phim`).
- `en`: từ hoặc cụm từ tiếng Anh chính. Nhiều từ đồng nghĩa nối bằng `=` thì lấy từ đầu làm `en`, các từ còn lại vào `alt` (ví dụ `soccer = football` → `en: 'soccer'`, `alt: ['football']`). Cặp trái nghĩa `salty >< bland` tách thành hai mục.
- `alt`: mảng (có thể rỗng).
- `vi`: nghĩa tiếng Việt ngắn gọn, lấy từ tài liệu; mục có trong bảng hiệu đính thì dùng nghĩa đã hiệu đính.
- `note`: chuỗi, có thể rỗng. Môn thể thao ghi động từ đi kèm: `play tennis`, `do yoga`, `go swimming`. Từ có cách dùng riêng trong tài liệu (travel/trip/tour/journey/voyage, take up/give up) ghi tóm tắt cách dùng.
- Mỗi topic `vocab` có **ít nhất 25 mục**; mỗi topic `speaking` có **ít nhất 4 mục** (các cụm từ ở phần "Why"/gợi ý, ví dụ `release my pressure` — `giải tỏa áp lực`). Tổng **ít nhất 300 mục**. Trong cùng một topic không trùng `en`.
- Mọi từ trong `en`, `alt` phải có trong tài liệu (sau khi sửa chính tả theo bảng dưới).

**structures** — `{ id, topic, en, vi }`: các mẫu câu trong phần USEFUL STRUCTURES, "Describing films", "Talking about books", "Describing places". Ít nhất 15 mục. `en` giữ chỗ trống bằng `…`.

**speaking** — đúng 9 mục, mỗi topic `speaking` một mục: `{ id, topic, questions: [{en, vi}], outline: [{label, en, vi}], ideas: [{en, vi}] }`. `questions` là các "Câu hỏi điển hình" (ít nhất 1); `outline` là khung trả lời (A, What, Where, When, Who, Why… hoặc Vị trí, Quy mô… với hometown; ít nhất 2); `ideas` là các ý trả lời có sẵn (ít nhất 3). Lấy nguyên văn tài liệu, chỉ sửa lỗi chính tả rõ ràng (`rãnh` → `rảnh`, `sence` → `sense`, `newess` → `newness`, `beasties` → `besties`, `Arvil` → `Avril`, `milions` → `millions`, `keep us with` → `keep up with`).

### Bảng hiệu đính (bắt buộc dùng đúng)

Tài liệu gốc có lỗi. Dạy sai nghĩa là lỗi nghiêm trọng, nên các mục dưới đây **thay** nội dung gốc.

| topic | en | Gốc ghi | Dùng | Loại |
|---|---|---|---|---|
| so-thich-the-thao | basketball | bỏng rổ | bóng rổ | chính tả |
| so-thich-the-thao | jogging | đi bộ | chạy bộ | nghĩa |
| so-thich-the-thao | hiking | leo núi | đi bộ đường dài | nghĩa |
| so-thich-the-thao | going to karaoke bar | đi hát hò | đi hát karaoke | nghĩa |
| so-thich-the-thao | computer games | (không có) | trò chơi điện tử | bổ sung |
| gia-dinh | immediate family | gia đình hòa thuận, đoàn kết | gia đình ruột thịt (bố mẹ, anh chị em, con) | nghĩa |
| gia-dinh | in-laws | dâu/rể | họ hàng bên vợ hoặc chồng | nghĩa |
| gia-dinh | make ends meet | xoay sở kiếm sống | xoay xở đủ sống | chính tả |
| du-lich | market | siêu thị | chợ | nghĩa |
| du-lich | souvenir shops | shops đồ lưu niệm | cửa hàng đồ lưu niệm | nghĩa |
| du-lich | bar | quán ba | quán bar | chính tả |
| du-lich | have a picnic | đi dạo | đi dã ngoại | nghĩa |
| du-lich | go for a walk | đi bộ | đi dạo | nghĩa |
| du-lich | go hiking | đi leo núi | đi bộ đường dài | nghĩa |
| du-lich | spend a lot of money | tiêu tiền | tiêu nhiều tiền | nghĩa |
| du-lich | look round the shops | lòng vòng các shops | dạo xem các cửa hàng | nghĩa |
| du-lich | go shopping | (không rõ) | đi mua sắm | bổ sung |
| an-uong | cuttlefish | sứa | mực nang | nghĩa |
| an-uong | mussels | con trai | con vẹm (trai biển) | nghĩa |
| an-uong | green beans | đậu xanh | đậu que | nghĩa |
| an-uong | spinach | cải thìa | rau chân vịt (rau bina) | nghĩa |
| an-uong | melon | dưa gang | dưa lưới | nghĩa |
| an-uong | cherry | (không có) | quả anh đào | bổ sung |
| an-uong | coffee | (không có) | cà phê | bổ sung |
| an-uong | beer | (không có) | bia | bổ sung |
| an-uong | wine | rượu | rượu vang | nghĩa |
| an-uong | awesome | (gốc viết awsome) | rất ngon, tuyệt | chính tả |
| giai-tri | thriller | hài kịch | phim giật gân | nghĩa |
| giai-tri | powerful | sức vang lớn | mạnh mẽ, ấn tượng sâu sắc | nghĩa |
| giai-tri | wildlife program | chương trình động vật hoang giã | chương trình về thế giới hoang dã | chính tả |
| giai-tri | game show | giải trí | trò chơi truyền hình | nghĩa |
| giai-tri | music program | (không có) | chương trình âm nhạc | bổ sung |
| giai-tri | sports program | (không có) | chương trình thể thao | bổ sung |
| giai-tri | jazz | (không có) | nhạc jazz | bổ sung |
| thoi-trang-mua-sam | handmade clothes | quần áo tự tự may | quần áo may thủ công | chính tả |
| thoi-trang-mua-sam | skirt | váy ngắn | chân váy | nghĩa |
| thoi-trang-mua-sam | high-heel shoes | dày cao gót | giày cao gót | chính tả |
| thoi-trang-mua-sam | tights | (gốc viết tight) quần tất | quần tất | chính tả |
| thoi-trang-mua-sam | woollen cap | (gốc viết wollen) mũ len | mũ len | chính tả |
| thoi-trang-mua-sam | sandals | dép | dép quai hậu, xăng-đan | nghĩa |
| thoi-trang-mua-sam | earrings | vòng tai | bông tai | nghĩa |
| thoi-trang-mua-sam | navy blue | màu xanh nhạt | màu xanh hải quân (xanh đậm) | nghĩa |
| thoi-trang-mua-sam | green | xanh da trời | màu xanh lá cây | nghĩa |
| thoi-trang-mua-sam | light | màu sáng | màu nhạt | nghĩa |
| thoi-trang-mua-sam | helpful | hữu dụng | nhiệt tình, hay giúp đỡ | nghĩa |
| thoi-trang-mua-sam | window shopping | đi ngắm | đi ngắm hàng (không mua) | nghĩa |
| thoi-trang-mua-sam | department store | khu mua sắm | cửa hàng bách hóa | nghĩa |
| thoi-trang-mua-sam | greengrocer's | cửa hàng tạp hóa | cửa hàng rau quả | nghĩa |
| thoi-trang-mua-sam | shoe shop | (gốc viết shoes shops) cửa hàng dày | cửa hàng giày | chính tả |
| gia-dinh | grandfather | (không có) | ông | bổ sung |
| gia-dinh | grandmother | (không có) | bà | bổ sung |
| gia-dinh | uncle | (không có) | chú, bác, cậu | bổ sung |
| gia-dinh | aunt | (không có) | cô, dì, bác gái | bổ sung |
| gia-dinh | cousin | (không có) | anh chị em họ | bổ sung |
| gia-dinh | nephew | (không có) | cháu trai (con của anh chị em) | bổ sung |
| gia-dinh | niece | (không có) | cháu gái (con của anh chị em) | bổ sung |
| gia-dinh | father-in-law | (không có) | bố chồng, bố vợ | bổ sung |
| gia-dinh | mother-in-law | (không có) | mẹ chồng, mẹ vợ | bổ sung |
| gia-dinh | brother-in-law | (không có) | anh rể, em rể, anh em bên vợ hoặc chồng | bổ sung |
| gia-dinh | sister-in-law | (không có) | chị dâu, em dâu, chị em bên vợ hoặc chồng | bổ sung |
| gia-dinh | widower | (không có) | người đàn ông góa vợ | bổ sung |
| gia-dinh | widow | (không có) | người phụ nữ góa chồng | bổ sung |
| gia-dinh | step-father | (không có) | bố dượng | bổ sung |
| gia-dinh | step-mother | (không có) | mẹ kế | bổ sung |
| du-lich | check-in desk | (không có) | quầy làm thủ tục | bổ sung |
| du-lich | luggage | (không có) | hành lý | bổ sung |
| du-lich | excess baggage | (không có) | hành lý quá cước | bổ sung |
| du-lich | boarding card | (không có) | thẻ lên máy bay | bổ sung |
| du-lich | passport control | (không có) | khu kiểm tra hộ chiếu | bổ sung |
| du-lich | departure lounge | (không có) | phòng chờ lên máy bay | bổ sung |
| du-lich | duty-free | (không có) | cửa hàng miễn thuế | bổ sung |
| du-lich | gate | (không có) | cửa ra máy bay | bổ sung |
| du-lich | hand luggage | (không có) | hành lý xách tay | bổ sung |
| du-lich | overhead locker | (không có) | ngăn hành lý phía trên ghế | bổ sung |
| du-lich | runway | (không có) | đường băng | bổ sung |
| du-lich | take off | (không có) | cất cánh | bổ sung |
| giai-tri | classical music | cổ điển | nhạc cổ điển | nghĩa |

Phần "Departure on air" (hàng không) và bảng họ hàng trong tài liệu chỉ có tiếng Anh, nên nghĩa tiếng Việt của các mục trên là phần bổ sung, cần giáo viên xem lại. Nhóm `Hàng không` phải có đủ 12 mục trên.

Bảng này cũng hiện trong web, ở trang Tiến độ, mục "Ghi chú nội dung", để người học hoặc giáo viên đối chiếu.

## 6. Hợp đồng logic (Codex)

Mọi file trong `tests/ai-coordination/VSTEP/web/js/` là script thường (không ES module), chạy được qua `file://` và trong Node:

```js
// srs.js:   trình duyệt window.VsepSrs = api;   Node module.exports = api
// quiz.js:  window.VsepQuiz
// store.js: window.VsepStore
```

Không hàm nào sửa đầu vào. Thời gian tính bằng mili giây (`now`), `DAY = 86400000`.

### srs.js

| Hằng/hàm | Hành vi |
|---|---|
| `BOX_DAYS = [0, 1, 2, 4, 8, 16]` | số ngày chờ theo hộp (chỉ số = hộp; hộp 0 là chưa học) |
| `MASTERED_BOX = 4` | hộp từ 4 trở lên là "đã thuộc" |
| `newCard()` | `{ box: 0, due: 0, right: 0, wrong: 0, last: 0 }` |
| `review(card, result, now)` | `result` là `'dung'`, `'gan-dung'` hoặc `'sai'`; trả thẻ mới. `dung`: `box = min(box + 1, 5)`, `due = now + BOX_DAYS[box] * DAY`, `right + 1`. `gan-dung`: `box = max(box, 1)` giữ nguyên hộp, `due = now + DAY`, `right + 1`. `sai`: `box = 1`, `due = now`, `wrong + 1`. Luôn đặt `last = now`. `result` lạ → trả thẻ cũ không đổi |
| `isDue(card, now)` | `card.box > 0 && card.due <= now` |
| `pickMode(card)` | hộp 0 → `'the'`; 1 → `'trac-nghiem'`; 2 → `'nghe'`; 3 trở lên → `'go-tu'` |
| `buildSession(ids, cards, now, opts)` | `opts = { size = 10, newLimit = 5 }`. Trả mảng id: trước hết các thẻ đến hạn (due tăng dần, cùng due giữ thứ tự `ids`), sau đó id chưa học (thẻ không có hoặc box 0) theo thứ tự `ids`, tối đa `newLimit` từ mới, tổng tối đa `size`. `cards` là object `{ id: card }` |
| `stats(cards, vocab, now)` | `{ total, learned, mastered, due, byTopic }`; `learned` = số mục có box ≥ 1; `mastered` = box ≥ 4; `due` = số thẻ `isDue`; `byTopic[topicId] = { total, learned, mastered }` cho mọi topic xuất hiện trong `vocab`. Chỉ đếm id có trong `vocab` |
| `hardest(cards, vocab, limit = 10)` | mục có `wrong > 0`, xếp `wrong` giảm dần rồi `right` tăng dần, tối đa `limit` |
| `streak(days, todayKey)` | `days`: mảng `'YYYY-MM-DD'`. Đếm số ngày liên tiếp kết thúc ở hôm nay; hôm nay chưa học thì kết thúc ở hôm qua; không có thì 0 |

### quiz.js

| Hàm | Hành vi |
|---|---|
| `normalize(s)` | chữ thường; `’` `‘` thành `'`; bỏ `. , ! ? ; : "`; gộp khoảng trắng; cắt hai đầu. Không phải chuỗi → `''` |
| `stripAccents(s)` | bỏ dấu tiếng Việt, `đ` → `d`, rồi `normalize` |
| `levenshtein(a, b)` | khoảng cách sửa chuỗi |
| `checkTyping(input, item)` | so `normalize(input)` với `en` và từng `alt` của `item`. Trùng → `'dung'`. Không trùng nhưng khoảng cách ≤ 1 với đáp án có độ dài ≥ 4 (hoặc ≤ 2 khi độ dài ≥ 9) → `'gan-dung'`. Còn lại, kể cả rỗng → `'sai'` |
| `shuffle(arr, rng)` | mảng mới xáo theo Fisher–Yates dùng `rng()` trong [0, 1) |
| `makeChoice(item, pool, direction, rng)` | `direction` `'en-vi'` (hỏi `en`, chọn `vi`) hoặc `'vi-en'`. Trả `{ id, prompt, choices, answer }`: `choices` gồm 4 chuỗi khác nhau (so sau `stripAccents`), có đúng một đáp án; **không lấy làm nhiễu mục nào có `vi` trùng `vi` của câu hỏi (so sau `stripAccents`) hoặc có `en`/`alt` trùng của câu hỏi**, để không có hai đáp án cùng đúng; nhiễu ưu tiên cùng topic, thiếu thì lấy topic khác; `answer` là chỉ số đáp án. Pool không đủ 4 lựa chọn khác nhau → ít hơn 4 nhưng không dưới 2 |
| `makeMatch(items, rng)` | `{ left: [{id, text}], right: [{id, text}] }`; trái là `en` theo thứ tự đầu vào, phải là `vi` đã xáo |
| `hintFor(item, level)` | gợi ý gõ từ cho `item.en`, mỗi "từ" là đoạn chữ ngăn bởi khoảng trắng hoặc `-`; ký tự không phải chữ giữ nguyên. Level 1 → chữ cái đầu mỗi từ, còn lại `_` (`computer games` → `c_______ g____`, `high-heel shoes` → `h___-h___ s____`); level 2 → thêm chữ cái cuối mỗi từ (`c______r g___s`), từ ≤ 2 chữ hiện đủ; level ≥ 3 → toàn bộ `en` |

### store.js

| Hằng/hàm | Hành vi |
|---|---|
| `STORE_KEY = 'vsep-beiu-v1'` | |
| `defaults()` | `{ version: 1, cards: {}, days: [], answers: {}, settings: { dailyGoal: 20, rate: 0.9, voice: '' } }`; `answers` là `{ 'YYYY-MM-DD': số lượt trả lời }` |
| `todayKey(now)` | ngày theo giờ máy, dạng `YYYY-MM-DD` |
| `sanitize(obj)` | trả bản hợp lệ: thẻ hỏng bị bỏ (box ngoài 0–5, số không hữu hạn); `days` chỉ giữ chuỗi đúng dạng, bỏ trùng, xếp tăng; `answers` chỉ giữ khóa đúng dạng ngày có giá trị số nguyên ≥ 0; `dailyGoal` số nguyên 5–100 (sai → 20); `rate` 0.6–1.2 (sai → 0.9); `voice` chuỗi |
| `load(storage)` | đọc JSON ở `STORE_KEY`, qua `sanitize`; mọi lỗi → `defaults()` |
| `save(storage, data)` | `true` nếu ghi được, ngược lại `false`, không ném lỗi |
| `recordAnswer(data, id, result, now)` | trả dữ liệu mới: thẻ đã `review`, thêm `todayKey` vào `days` nếu chưa có, tăng `answers[todayKey]` |
| `exportText(data)` | chuỗi JSON đẹp (thụt 2) |
| `importText(text)` | dữ liệu đã `sanitize`, hoặc `null` nếu không phải JSON object có `version === 1` |

`store.js` dùng `VsepSrs` (Node: `require('./srs.js')`).

## 7. Hợp đồng giao diện

`app.js` (Codex) dựng mọi màn hình bằng cách clone các `<template>` do Antigravity viết trong `index.html`, chỉ tìm phần tử qua các móc dưới đây. `app.js` không thêm hay bỏ class; trạng thái thể hiện bằng `hidden`, `disabled`, `aria-pressed`, `aria-valuenow`, `aria-current`, `data-state`, `data-side`, `data-box`, `data-mode` và `style.width` của phần tử `[data-fill]` trong thanh tiến độ. Chữ người dùng nhập và chữ dữ liệu đưa vào bằng `textContent`.

**Thanh tiến độ** (gọi tắt "meter"): phần tử có `role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"` chứa đúng một `span[data-fill]`.

### Khung trang (`index.html`)

- `<html lang="vi">`, viewport, `<title>Ôn Luyện VSTEP cho BéIu</title>`, `<link rel="icon" href="assets/favicon.svg">`, `<link rel="stylesheet" href="style.css">`, rồi đúng thứ tự: `js/data.js`, `js/srs.js`, `js/quiz.js`, `js/store.js`, `js/app.js`, tất cả `defer`.
- Header: tên phần mềm "Ôn Luyện VSTEP cho BéIu"; điều hướng có 3 liên kết `a[data-nav="home"]` (`#/`, "Trang chủ"), `a[data-nav="review"]` (`#/on-tap`, "Ôn tập"), `a[data-nav="progress"]` (`#/tien-do`, "Tiến độ"); `#streak-count` (số, ban đầu `0`).
- `<main id="view" tabindex="-1"></main>` rỗng.
- `#toast` (`role="status"`, ban đầu `hidden`); `#sr-live` (`aria-live="polite"`, ẩn khỏi mắt nhưng không `hidden`).
- Chân trang: "Nội dung từ tài liệu Từ vựng theo chủ đề. Dữ liệu học lưu trên máy này."

### Các template (mỗi template đúng một phần tử gốc)

| id | Gốc | Móc bên trong |
|---|---|---|
| `tpl-home` | `section` | `[data-field="greeting"]`, `[data-field="goal-text"]`, meter `[data-field="goal-meter"]`, `[data-field="due-count"]`, `button[data-action="start-review"]`, `button[data-action="start-new"]`, `ul[data-field="topic-list"]`, `ul[data-field="speaking-list"]` |
| `tpl-topic-card` | `li` | `a[data-field="link"]`, `img[data-field="icon"]` (`alt=""`), `[data-field="title-vi"]`, `[data-field="title-en"]`, `[data-field="count"]`, meter `[data-field="mastery-meter"]`, `[data-field="mastery-text"]` |
| `tpl-topic` | `section` | `a[data-field="back"]`, `[data-field="title-vi"]`, `[data-field="title-en"]`, `[data-field="stats"]`, 5 nút `button[data-mode]` giá trị `the`, `trac-nghiem`, `nghe`, `go-tu`, `ghep-cap`, `button[data-action="start-smart"]`, `ul[data-field="word-list"]`, `ul[data-field="structure-list"]` |
| `tpl-word-row` | `li` | `[data-field="en"]`, `[data-field="vi"]`, `[data-field="note"]`, `[data-field="box"]`, `button[data-action="speak"]` (có `aria-label`) |
| `tpl-structure-row` | `li` | `[data-field="en"]`, `[data-field="vi"]` |
| `tpl-session` | `section` | `[data-field="title"]`, `[data-field="progress-text"]`, meter `[data-field="progress-meter"]`, `[data-field="stage"]`, `[data-field="feedback"]`, `button[data-action="next"]` (`hidden`), `button[data-action="quit"]` |
| `tpl-q-card` | `div` | `button[data-field="card"]` có `data-side="front"`, bên trong `[data-field="front"]` và `[data-field="back"]`; `button[data-action="speak"]`; 3 nút `button[data-grade]` giá trị `sai` ("Chưa nhớ"), `gan-dung` ("Hơi nhớ"), `dung` ("Đã nhớ") |
| `tpl-q-choice` | `div` | `[data-field="direction"]`, `[data-field="prompt"]`, `button[data-action="speak"]`, 4 nút `button[data-choice]` giá trị `0`–`3` |
| `tpl-q-listen` | `div` | `button[data-action="speak"]`, `button[data-action="speak-slow"]`, 4 nút `button[data-choice]` giá trị `0`–`3` |
| `tpl-q-typing` | `div` | `[data-field="prompt"]`, `[data-field="hint"]`, `form[data-field="form"]` chứa `input[data-field="answer"]` (có `<label>`, `autocomplete="off"`, `autocapitalize="off"`, `spellcheck="false"`, `lang="en"`) và `button[type="submit"]` ("Kiểm tra"); `button[data-action="hint"]` ("Gợi ý"); `button[data-action="speak"]` |
| `tpl-q-match` | `div` | `ul[data-field="left"]`, `ul[data-field="right"]` |
| `tpl-match-item` | `li` | `button[data-field="btn"]` |
| `tpl-summary` | `section` | `[data-field="score"]`, `[data-field="detail"]`, `ul[data-field="wrong-list"]`, `button[data-action="again"]`, `a[data-action="home"]` |
| `tpl-speaking` | `section` | `a[data-field="back"]`, `[data-field="title"]`, `[data-field="question-en"]`, `[data-field="question-vi"]`, `[data-field="question-count"]`, `button[data-action="speak"]`, `button[data-action="next-question"]`, `ul[data-field="outline"]`, `ul[data-field="ideas"]`, `[data-field="timer"]` (ban đầu `0:45`), `button[data-action="timer"]`, `button[data-action="record"]`, `[data-field="record-status"]`, `audio[data-field="playback"]` (`controls`, `hidden`) |
| `tpl-outline-item` | `li` | `[data-field="label"]`, `[data-field="en"]`, `[data-field="vi"]` |
| `tpl-progress` | `section` | `[data-field="total"]`, `[data-field="learned"]`, `[data-field="mastered"]`, `[data-field="streak"]`, `tbody[data-field="topic-table"]`, `ul[data-field="hard-list"]`, `form[data-field="settings"]` chứa `input[name="dailyGoal"]` (`type="number" min="5" max="100"`), `select[name="voice"]`, `input[name="rate"]` (`type="range" min="0.6" max="1.2" step="0.1"`); `button[data-action="export"]`, `input[data-field="import"]` (`type="file" accept=".json,application/json"`), `button[data-action="reset"]`, `ul[data-field="corrections"]` |
| `tpl-progress-row` | `tr` | `[data-field="topic"]`, `[data-field="learned"]`, `[data-field="mastered"]`, meter `[data-field="meter"]` |

### Màn hình và hành vi (`app.js`)

Định tuyến bằng `location.hash`. Đổi màn hình thì thay nội dung `#view`, cuộn lên đầu trang, chuyển focus vào `#view` bằng `focus({ preventScroll: true })`, đặt `aria-current="page"` cho liên kết điều hướng tương ứng.

| Hash | Màn hình |
|---|---|
| `#/` hoặc rỗng | Trang chủ |
| `#/chu-de/<topicId>` | Chủ đề (cả `vocab` và `speaking` đều có danh sách từ) |
| `#/hoc/<topicId>/<mode>` | Phiên học một chủ đề; `mode` là `the`, `trac-nghiem`, `nghe`, `go-tu`, `ghep-cap` hoặc `thong-minh` |
| `#/on-tap` | Phiên ôn tập trộn mọi chủ đề, chế độ theo `pickMode` |
| `#/noi/<topicId>` | Luyện nói |
| `#/tien-do` | Tiến độ và cài đặt |
| khác | về Trang chủ |

**Trang chủ.** `greeting`: `Chào BéIu! Hôm nay mình học gì nào?`. `goal-text`: `Hôm nay: {n}/{goal} lượt`. `due-count`: `{n} từ cần ôn`. Nút `start-review` → `#/on-tap`, bị `disabled` khi không có từ đến hạn. `start-new` → phiên `thong-minh` của chủ đề vocab đầu tiên còn từ chưa học. Danh sách chủ đề vocab và speaking dùng `tpl-topic-card`; `count` = `{n} từ`; `mastery-text` = `Thuộc {m}/{n}`. Thẻ chủ đề speaking liên kết tới `#/noi/<id>`, vocab tới `#/chu-de/<id>`.

**Chủ đề.** `stats` = `{learned} đã học · {mastered} đã thuộc · {due} cần ôn`. `word-list` liệt kê mọi từ của chủ đề (`box` hiển thị `Mới` khi hộp 0, ngược lại `Hộp {n}`; `data-box` đặt theo số hộp). `structure-list` liệt kê mẫu câu cùng topic; không có thì `hidden`. Nút `data-mode` → `#/hoc/<id>/<mode>`; `start-smart` → `#/hoc/<id>/thong-minh`.

**Phiên học.**
- Danh sách câu hỏi: `thong-minh` và `on-tap` dùng `buildSession` (`on-tap` lấy mọi id, chỉ thẻ đến hạn, `newLimit: 0`; nếu không có thẻ đến hạn thì hiện tổng kết với `detail` = `Không có từ nào cần ôn lúc này.`). Chế độ cố định lấy 10 từ đầu của `buildSession(ids, cards, now, { size: 10, newLimit: 10 })` của chủ đề; nếu ít hơn 4 từ thì lấy thêm ngẫu nhiên từ đã học trong chủ đề cho đủ 4 (hoặc hết).
- Chế độ mỗi câu: chế độ cố định; `thong-minh`/`on-tap` dùng `pickMode`. Không có giọng đọc tiếng Anh thì `nghe` đổi thành `trac-nghiem`.
- `ghep-cap`: 5 cặp mỗi lượt; chọn một bên trái rồi một bên phải; đúng thì cả hai `data-state="done"` và `disabled`; sai thì `data-state="wrong"` 0,6 giây rồi bỏ chọn; mỗi cặp nối đúng ngay lần đầu tính `dung`, có sai trước đó tính `sai`.
- `trac-nghiem`: hướng xen kẽ `en-vi`, `vi-en`; `direction` = `Chọn nghĩa tiếng Việt` hoặc `Chọn từ tiếng Anh`. `nghe`: phát âm tự động khi hiện câu, chọn nghĩa tiếng Việt.
- Bàn phím: phím `1`–`4` chọn đáp án; `Enter` sang câu tiếp khi đã trả lời; `Space` lật thẻ ghi nhớ.
- Phản hồi trong `feedback` và `#sr-live`: đúng `Chính xác! {en} = {vi}`; gần đúng `Gần đúng — viết đúng là: {en}`; sai `Chưa đúng — đáp án: {en} = {vi}`. Nút đã chọn `data-state="correct"` hoặc `"wrong"`, đáp án đúng luôn `data-state="correct"`; các nút chọn `disabled` sau khi trả lời. Hiện `next`.
- Thẻ ghi nhớ: bấm thẻ hoặc `Space` → `data-side="back"`; 3 nút chấm chỉ bật khi đã lật; chấm xong sang câu tiếp ngay.
- Gõ từ: `hint` mỗi lần bấm tăng level của `hintFor`; dùng gợi ý level 3 thì kết quả tối đa `gan-dung`; ô trả lời được focus khi hiện câu.
- Mỗi lượt trả lời gọi `recordAnswer` rồi `save`. Câu trả lời `sai` (trừ `ghep-cap`) được hỏi lại một lần ở cuối phiên (không tính lại vào SRS lần thứ hai nếu lại sai, nhưng vẫn hiện phản hồi).
- `progress-text`: `Câu {i}/{n}`. `quit` → về trang trước (chủ đề hoặc trang chủ).
- **Tổng kết**: `score` = `{đúng}/{tổng}`; `detail` = `Bạn đã trả lời đúng {p}%. ` + (`p ≥ 80`: `Tuyệt vời!` ; `p ≥ 50`: `Cố lên, gần thuộc rồi!` ; còn lại: `Mình ôn lại các từ dưới đây nhé.`); `wrong-list` các từ sai (dùng `tpl-word-row`); `again` lặp lại đúng chế độ đó với danh sách mới.

**Luyện nói.** Hiện câu hỏi thứ nhất; `question-count` = `Câu {i}/{n}`; `next-question` xoay vòng. `outline` và `ideas` lấy từ `speaking`; `ideas` thêm các mục vocab cùng topic (không trùng). Nút `timer` bắt đầu đếm ngược 45 giây (`0:45` … `0:00`), bấm lần nữa thì dừng và đặt lại; hết giờ: toast `Hết giờ! Thử nói lại với ý mới nhé.`. Nút `record` dùng `MediaRecorder`: lần 1 xin micro và ghi (`aria-pressed="true"`, chữ `Dừng ghi`), lần 2 dừng và hiện `playback`; bản ghi chỉ ở bộ nhớ trang, không lưu. Không có `MediaRecorder` hoặc bị từ chối: `record` `disabled`, `record-status` = `Không dùng được micro. Bạn vẫn có thể tập nói theo gợi ý và đồng hồ.`

**Tiến độ.** Số liệu từ `stats`, `streak`; bảng theo chủ đề vocab và speaking; `hard-list` từ `hardest` (rỗng thì một dòng `Chưa có từ nào sai. Giỏi lắm!`). Cài đặt lưu ngay khi đổi. `voice` liệt kê giọng có `lang` bắt đầu bằng `en`, thêm lựa chọn rỗng `Tự chọn`. `export` tải file `on-luyen-vstep-<YYYY-MM-DD>.json` (gắn thẻ `a` vào trang trước khi bấm, rồi gỡ); `import` đọc file, `importText` thành công → lưu và toast `Đã nhập tiến độ.`, thất bại → toast `File không hợp lệ.`. `reset` hỏi `confirm('Xóa toàn bộ tiến độ học? Không hoàn tác được.')` trước khi xóa. `corrections` liệt kê `VSEP_DATA.corrections` dạng `{en}: {from} → {to}`.

**Phát âm.** `speechSynthesis` với giọng đã chọn hoặc giọng `en-US`/`en-GB` đầu tiên, `rate` theo cài đặt (`speak-slow` dùng 0.6). Huỷ câu đang đọc trước khi đọc câu mới. Không có giọng tiếng Anh: nút `speak` `disabled` và toast một lần `Máy chưa có giọng đọc tiếng Anh.`

**Chung.** Bọc mọi truy cập `localStorage` trong `try`; không có storage thì vẫn học được trong phiên. `#streak-count` cập nhật sau mỗi lượt trả lời. Toast tự ẩn sau 2,5 giây.

## 8. Thiết kế (Antigravity)

**Ý chính:** "bộ thẻ từ của BéIu" — chồng thẻ ghi nhớ là hình ảnh nhận diện. Thẻ ở màn học to, lật được, có bóng như thẻ giấy thật. Mọi thứ khác gọn và yên để người học tập trung.

**Màu** (biến CSS):

| Tên | Giá trị | Dùng cho |
|---|---|---|
| Tím mộng | `#5B3FD9` | màu chính, nút chính, liên kết |
| Mực đêm | `#1E1B3A` | chữ |
| Sương tím | `#F5F3FF` | nền trang |
| Bạc hà | `#14866D` | đúng, đã thuộc |
| Đỏ dâu | `#C42B4B` | sai |
| Vàng bơ | `#FFC83D` | chuỗi ngày, ngôi sao, điểm nhấn |

Chế độ tối. Tương phản chữ đạt WCAG AA (chữ thường ≥ 4,5:1). Trạng thái đúng/sai không chỉ dựa vào màu (có biểu tượng ✓ ✗ hoặc chữ).

**Chữ:** phông hệ thống hỗ trợ tiếng Việt (`"Segoe UI Variable Text", "Segoe UI", system-ui, -apple-system, Roboto, "Noto Sans", sans-serif`). Từ tiếng Anh trên thẻ cỡ lớn (≥ 2rem ở điện thoại). Thân chữ ≥ 16px, giãn dòng ≥ 1,5.

**Bố cục:** một cột trên điện thoại (từ 320px), lưới chủ đề 2–3 cột trên máy tính. Màn học: thẻ ở giữa, đáp án bên dưới, nút lớn (≥ 44×44px) dễ bấm bằng ngón cái.

**Ảnh:** `assets/favicon.svg` và biểu tượng SVG cho 15 chủ đề, tên `assets/topic-<id>.svg` (`viewBox="0 0 64 64"`, dưới 4 KB, không script, không tài nguyên ngoài). CSS hiển thị chúng qua `[data-field="link"]` hoặc thẻ `img` trong template; `app.js` không cần biết tên file biểu tượng ngoài quy tắc trên — template `tpl-topic-card` chứa `img[data-field="icon"]` và `app.js` đặt `src = 'assets/topic-' + id + '.svg'`.

**Chuyển động:** chỉ khi người dùng thao tác (lật thẻ, chọn đáp án, chuyển câu). Tôn trọng `prefers-reduced-motion`.

**Bắt buộc về CSS:** `[hidden] { display: none !important; }`; focus bàn phím nhìn thấy được; không tràn ngang ở 320px; ít nhất 2 mốc `@media` theo chiều rộng; `[data-state="correct"]`, `[data-state="wrong"]`, `[data-state="done"]`, `[data-state="selected"]`, `[data-side="back"]` có kiểu riêng.

**Tránh:** nền kem kèm màu đất nung; nền đen kèm xanh neon; chữ nhãn viết hoa toàn bộ; mọi khối bo tròn và đổ bóng giống hệt nhau; emoji thay biểu tượng.

## 9. Ràng buộc chung

- Không tài nguyên ngoài: không có `http://` hay `https://` trong HTML, CSS, JS (SVG chỉ có `xmlns`).
- Không `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`.
- Không `fetch`, không gửi dữ liệu đi đâu. Chỉ lưu tiến độ học trong `localStorage`.
- Toàn bộ chữ giao diện bằng tiếng Việt; nội dung học giữ tiếng Anh.

## 10. Tiêu chí nghiệm thu

1. `node --test tests/ai-coordination/VSTEP/tests/*.test.js` xanh toàn bộ.
2. Mở `tests/ai-coordination/VSTEP/web/index.html` bằng `file://`: Console không lỗi; đủ 15 chủ đề.
3. Làm được trọn: học từ mới bằng 5 chế độ, ôn tập, luyện nói (hẹn giờ, ghi âm nếu có micro), xem tiến độ, xuất và nhập tiến độ.
4. Tải lại trang giữ tiến độ; dữ liệu lưu hỏng không làm vỡ trang.
5. 320px và 375px không tràn ngang; dùng được hoàn toàn bằng bàn phím; chế độ tối đọc rõ.
6. Video quá trình làm việc của văn phòng ảo nằm trong `tests/ai-coordination/VSTEP/video/`.
