Lượt sửa 1 cho việc logic và hành vi. Giữ nguyên mọi thứ khác, chỉ sửa các lỗi dưới đây (đã tái hiện).

| # | File | Hiện tượng | Cần đúng là |
|---|---|---|---|
| 1 | quiz.js makeChoice | ở hướng vi-en có hai đáp án cùng đúng khi hai từ cùng nghĩa (classic và classical music cùng là cổ điển) | theo dòng makeChoice mới trong SPEC mục 6: bỏ khỏi nhiễu mọi mục có vi trùng vi câu hỏi (so sau stripAccents) hoặc en/alt trùng; test mới cuối logic.test.js và integration.test.js |
| 2 | app.js đổi màn hình | trang mới bị cuộn lệch, phần đầu bị header che (do focus vào #view) | cuộn lên đầu trang, focus #view với preventScroll true |
| 3 | app.js giọng đọc | đang lọc thêm localService, máy chỉ có giọng mạng sẽ mất phát âm | chỉ lọc theo lang bắt đầu bằng en |
| 4 | app.js xuất tiến độ | thẻ a chưa gắn vào trang khi bấm (Firefox có thể không tải) và tên file on-luyen-vsep | gắn thẻ a vào body, bấm, rồi gỡ; tên file on-luyen-vstep-YYYY-MM-DD.json |

Đặt lại tiến độ vẫn giữ cài đặt như hiện tại (đúng ý, không sửa).
