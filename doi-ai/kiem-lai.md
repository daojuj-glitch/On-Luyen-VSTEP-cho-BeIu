Soát lại phạm vi hẹp sau lượt sửa 1 của web Ôn Luyện VSTEP cho BéIu, thư mục tests/ai-coordination/VSTEP/. Không đọc lại toàn bộ dự án.

Lần soát trước có 4 lỗi chặn: (1) boarding card có nghĩa là chính nó; (2) nhóm Hàng không thiếu 11 mục; (3) nhóm họ hàng thiếu 4 mục và nghĩa bị thu hẹp; (4) makeChoice có thể cho hai đáp án cùng đúng khi hai từ cùng nghĩa. Ngoài ra đã sửa: cuộn trang khi đổi màn hình, lọc giọng đọc, xuất file tiến độ, độ đậm nút đáp án, header trên điện thoại, tràn ngang trang Tiến độ ở 320px.

Xem bằng: git log --oneline -12 và git diff 1e6af12 HEAD -- tests/ai-coordination/VSTEP/web

Việc: xác nhận từng lỗi đã hết; tìm lỗi mới do bản sửa gây ra (nhất là makeChoice còn đủ 4 lựa chọn với dữ liệu thật). Chạy node --test tests/ai-coordination/VSTEP/tests/*.test.js nếu được.

Chỉ nêu lỗi chỉ ra được file, dòng và cách tái hiện. Phân loại: LỖI CHẶN hoặc GHI CHÚ. PASS nghĩa là không có lỗi chặn.
