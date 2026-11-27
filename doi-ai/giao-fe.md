Việc: giao diện của web Ôn Luyện VSTEP cho BéIu, một web học từ vựng tiếng Anh cho người Việt.

Đọc bằng công cụ xem file (không liệt kê thư mục): tests/ai-coordination/VSTEP/docs/SPEC.md mục 7, 8, 9 và tests/ai-coordination/VSTEP/tests/ui.test.js. Đối chiếu từng khẳng định trong ui.test.js với file bạn viết.

Tạo trong tests/ai-coordination/VSTEP/web/:
1. index.html: khung trang và đủ 17 template ở mục 7, đúng móc id và data-*. Chữ tiếng Việt. Không viết sẵn nội dung học vào #view; JavaScript sẽ dựng. Các thẻ script đúng thứ tự, có defer (người khác viết, đừng tạo).
2. style.css theo mục 8: ý chính là bộ thẻ từ của BéIu, thẻ học to và lật được bằng data-side, màu đúng bảng, chế độ tối, kiểu riêng cho data-state đúng, sai, đã xong, đang chọn, một cột trên điện thoại từ 320px, nút lớn dễ bấm.
3. assets/favicon.svg và 15 biểu tượng assets/topic-<id>.svg (viewBox 0 0 64 64, mỗi file dưới 4 KB, khác nhau, gợi đúng chủ đề).

Thiết kế phải đẹp và có cá tính nhưng yên tĩnh để tập trung học. Tránh các kiểu mục 8 đã liệt kê.
