Cách làm: đọc và sửa file chỉ bằng công cụ xem file và sửa file. Không chạy lệnh shell nào (không cat, ls, dir, findstr, git) ngoài đúng một lệnh test được nêu ở trên.

Lượt sửa 1 cho việc giao diện (style.css). Giữ nguyên phong cách hiện tại, chỉ sửa các lỗi dưới đây (đo trên trình duyệt thật).

| # | Chỗ | Hiện tượng | Cần đúng là |
|---|---|---|---|
| 1 | nút đáp án sau khi trả lời | nút bị disabled nên mờ đi, đáp án đúng (✓) và sai (✗) khó đọc | nút có data-state correct, wrong, done giữ độ đậm đầy đủ dù disabled; các nút không chọn mới được mờ |
| 2 | header trên điện thoại (375px) | header dính cao khoảng 160px (tên, chuỗi ngày, menu xuống 3 dòng) che mất phần đầu nội dung khi cuộn | trên màn hẹp header gọn một hoặc hai dòng và không dính, hoặc dính nhưng không quá 64px |
| 3 | trang Tiến độ ở 320px | tràn ngang 26px (bảng hoặc form) | không tràn ngang ở 320px |
| 4 | dòng chú thích đầu style.css | ghi VSEP | Ôn Luyện VSTEP cho BéIu |
