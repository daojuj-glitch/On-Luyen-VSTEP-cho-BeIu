Việc: tạo dữ liệu học cho web Ôn Luyện VSTEP cho BéIu.

Đọc trước:
- tests/ai-coordination/VSTEP/docs/SPEC.md mục 5 (cấu trúc dữ liệu, 15 chủ đề, bảng hiệu đính).
- tests/ai-coordination/VSTEP/nguon/tu-vung.txt: nguồn duy nhất. Bảng bị vỡ dòng ở vài chỗ (một ô bị cắt sang dòng sau), hãy ghép lại cho đúng.
- tests/ai-coordination/VSTEP/tests/data.test.js: các điều kiện phải đạt.

Tạo tests/ai-coordination/VSTEP/web/js/data.js:
1. Chép từng từ và cụm từ của 6 chủ đề từ vựng, đúng nhóm, đúng nghĩa trong tài liệu. Không bỏ sót mục nào có nghĩa rõ ràng.
2. Với 9 chủ đề nói: câu hỏi điển hình, khung trả lời, các ý trả lời có sẵn vào speaking; các cụm từ hay trong phần Why/gợi ý thêm vào vocab của chủ đề nói đó.
3. Mẫu câu USEFUL STRUCTURES, Describing films, Talking about books, Describing places vào structures.
4. Bảng hiệu đính: dùng nghĩa trong cột Dùng, và chép cả bảng vào corrections.
5. Không thêm từ hay nghĩa ngoài tài liệu và bảng hiệu đính. Không tự sửa nghĩa khác.

File dạng script thường: cuối file gắn window.VSEP_DATA khi có window, và module.exports khi có module.

Chạy test tới khi đạt. Nếu một điều kiện của test không làm được vì tài liệu thiếu, dừng và nêu rõ (KETQUA: BLOCKED).
