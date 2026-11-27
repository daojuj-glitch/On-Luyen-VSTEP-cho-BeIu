# Ôn Luyện VSTEP cho BéIu

Web học thuộc từ vựng tiếng Anh theo chủ đề và luyện nói phần 1 bài thi VSTEP.

**Vào học:** https://daojuj-glitch.github.io/On-Luyen-VSTEP-cho-BeIu/

## Có gì

- 431 từ và cụm từ trong 15 chủ đề (6 chủ đề từ vựng, 9 chủ đề nói), 36 mẫu câu.
- 5 cách học, khó dần theo mức nhớ: thẻ lật, trắc nghiệm, nghe chọn từ, gõ chính tả, ghép cặp.
- Lặp lại ngắt quãng (5 hộp Leitner): từ nhớ tốt được hỏi lại thưa dần 1–2–4–8–16 ngày, từ sai được ôn lại sớm.
- Luyện nói: câu hỏi mẫu, khung trả lời, ý gợi ý, đồng hồ 45 giây, ghi âm để tự nghe lại.
- Tiến độ: chuỗi ngày học, từ hay sai, mục tiêu mỗi ngày, xuất và nhập file để chuyển sang máy khác.

Không cần tài khoản. Tiến độ học lưu ngay trong trình duyệt của từng người, không gửi đi đâu. Phát âm dùng giọng đọc có sẵn của máy; nếu máy không có giọng tiếng Anh thì chế độ Nghe tự đổi sang Trắc nghiệm.

## Nội dung

Lấy từ tài liệu "Từ vựng theo chủ đề" (`nguon/tu-vung.txt`). Một số nghĩa trong tài liệu gốc bị sai hoặc thiếu đã được hiệu đính; toàn bộ bảng hiệu đính (78 mục) nằm ở `docs/SPEC.md` mục 5 và trong trang Tiến độ của web.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `web/` | trang web (HTML, CSS, JavaScript thuần, không cần cài đặt) |
| `docs/` | spec và kế hoạch |
| `tests/` | 45 test (`node --test tests/*.test.js`) |
| `nguon/` | văn bản nguồn |
| `doi-ai/`, `cong-cu/` | cấu hình và lời giao việc cho đội AI đã xây dựng web |

Web được một đội AI xây dựng: Claude điều phối và viết spec, test; Codex viết logic; Antigravity làm giao diện; DeepSeek chép dữ liệu và kiểm tra.
