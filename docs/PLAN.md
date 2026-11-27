# Ôn Luyện VSTEP cho BéIu (đợt `vsep`) — kế hoạch

**Mục tiêu:** web học và ôn từ vựng, luyện nói theo tài liệu "Từ vựng theo chủ đề", đạt mục 10 của SPEC. **Spec:** [SPEC.md](SPEC.md). **Cỡ:** M lớn. **Quy trình:** `tests/ai-coordination/quy-trinh/QUY-TRINH.md`, điều phối bằng `doi-ai.ps1`.

Mọi kết quả (web, tài liệu, test, video) nằm trong `tests/ai-coordination/VSTEP/`.

## Phân công

| Việc (`ten`) | Agent, mô hình | File | Test của việc | Phụ thuộc |
|---|---|---|---|---|
| `nd` — nội dung | DeepSeek `opencode/deepseek-v4.1-flash-free` (miễn phí) | `tests/ai-coordination/VSTEP/web/js/data.js` | `tests/ai-coordination/VSTEP/tests/data.test.js` | nguồn `tests/ai-coordination/VSTEP/nguon/tu-vung.txt` |
| `be` — logic và hành vi | Codex `gpt-6.2-sol` medium | `tests/ai-coordination/VSTEP/web/js/srs.js`, `quiz.js`, `store.js`, `app.js`, `tests/ai-coordination/VSTEP/tests/be.extra.test.js` | `tests/ai-coordination/VSTEP/tests/logic.test.js` | hợp đồng mục 6–7 |
| `fe` — giao diện | Antigravity `gemini-4-hydrogen-medium` | `tests/ai-coordination/VSTEP/web/index.html`, `style.css`, `assets/*` | `tests/ai-coordination/VSTEP/tests/ui.test.js` | hợp đồng mục 7–8 |
| QA | DeepSeek (phiên khác) | không sửa | toàn bộ `tests/ai-coordination/VSTEP/tests/` | sau khi gộp |
| Điều phối | Claude | spec, test, tích hợp, trình duyệt, video, báo cáo | `tests/ai-coordination/VSTEP/tests/integration.test.js` | — |

Ba việc chạy song song. Không việc nào cần chờ việc khác vì cả ba chỉ dựa vào hợp đồng trong SPEC.

## Điểm dễ hỏng cần soát (Review Focus)

1. **Câu hỏi trắc nghiệm có hai đáp án giống nhau** (hai từ cùng nghĩa, ví dụ `tasty` và `delicious` đều là "ngon") → người học chọn đúng mà bị chấm sai. Kiểm: `makeChoice` so sánh lựa chọn sau `stripAccents`; test tích hợp chạy `makeChoice` trên mọi từ thật.
2. **Gõ từ có dấu nháy hoặc nhiều dạng** (`greengrocer's`, `soccer`/`football`, `going to the cinema`) → gõ đúng mà bị chấm sai. Kiểm: `checkTyping` trên mọi từ thật (test tích hợp) và các ca trong `logic.test.js`.
3. **Máy không có giọng đọc tiếng Anh hoặc không có micro** → chế độ Nghe và Ghi âm không được làm kẹt phiên học. Kiểm trên trình duyệt: giả lập không có `speechSynthesis`, `MediaRecorder`.
4. **Dữ liệu tiến độ hỏng, hoặc file nhập không đúng** → trang vẫn chạy, báo `File không hợp lệ.`. Kiểm: `store` tests và trình duyệt.
5. **Điện thoại 320–375px, chỉ dùng bàn phím** → thẻ, đáp án, nút ghi âm vẫn tới được; không tràn ngang. Kiểm trên trình duyệt.

## Phê duyệt

- D1: Đức CEO duyệt spec, kế hoạch và **bảng hiệu đính nội dung** (SPEC mục 5).
- D2: Đức CEO duyệt (hoặc cho phép tự duyệt khi G0–G6 đạt).
- Không bao gồm: main, push, Internet, cài phần mềm, mô hình trả phí, quyền của agent.

## Video

`tests/ai-coordination/VSTEP/cong-cu/quay-van-phong.js` quay Văn phòng ảo 3D (http://localhost:7788, chế độ "Nhìn gần") từ lúc giao việc đến lúc gộp xong, lưu `tests/ai-coordination/VSTEP/video/van-phong-vsep.mp4`. Sau khi nghiệm thu, quay thêm `tests/ai-coordination/VSTEP/video/demo-web.mp4` dạo một vòng sản phẩm. File video không đưa vào git (dung lượng lớn), chỉ nằm trong thư mục `tests/ai-coordination/VSTEP/video/` của thư mục chính.

## Tiến độ

- [x] 0. `kiem-tra`: công cụ, mô hình, văn phòng ảo sẵn sàng (G0 còn vướng file `todo-app-v1` bị xóa ngoài git)
- [x] 1. Spec, kế hoạch, test nghiệm thu, lời giao việc, công cụ quay
- [x] 2. D1 (Đức CEO duyệt bảng hiệu đính, đổi tên VSTEP, chọn thư mục `tests/ai-coordination/VSTEP`)
- [x] 3–4. Bắt đầu quay; `giao` ba việc song song, đạt G1–G4
- [x] 5. `gop`, test tích hợp, `qa` (G5), kiểm trình duyệt (G6)
- [x] 6–7. Gom lỗi, một lượt sửa mỗi agent, kiểm lại
- [x] 8. D2 (Đức CEO duyệt), gộp vào `ai/todo-test`; ngừng quay theo yêu cầu, không quay demo
- [x] 9. Báo cáo

## Nhật ký

| Lượt | Agent | Thời gian | Token | Kết quả |
|---|---|---|---|---|
| nd | DeepSeek free | 18 phút | không ghi nhận | đạt G1–G4; 431 mục |
| be | Codex medium | 18,5 phút | không đọc được từ log | đạt G1–G4 |
| fe lần 1 | Antigravity medium | — | 0 | hỏng: hết phiên đăng nhập Google |
| fe lần 2 | Antigravity medium | 155 giây | 87.668 | đạt G1–G4, tự chạy test 9/9 |
| Claude sửa nhỏ | — | — | — | tên VSTEP trong `index.html` (lỗi commit của điều phối) |
| QA | DeepSeek free | 18 phút | không ghi nhận | FAIL: 4 lỗi chặn nội dung và trắc nghiệm hai đáp án |
| sửa nd | DeepSeek free | 81 giây | — | test đạt; hết hạn mức miễn phí trước khi báo cáo, điều phối đọc diff xác nhận |
| sửa be | Codex low | 66 giây | — | đạt |
| sửa fe | Antigravity low | 14 giây + 41 giây | 12.175 + ? | lần đầu bị chặn lệnh shell; lần hai đạt |
| soát lại | Codex low, chỉ đọc | 64 giây | 26.758 | PASS; G2 trượt do 2 file của điều phối chưa commit |

Kết quả cuối: 45/45 test. Trình duyệt (Chromium): đủ 5 chế độ học, ôn tập, luyện nói, tiến độ, xuất/nhập; không có giọng đọc hoặc micro vẫn dùng được; 320–375px không tràn ngang; Console sạch.
