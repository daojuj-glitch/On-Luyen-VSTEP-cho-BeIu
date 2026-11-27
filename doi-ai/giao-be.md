Việc: logic học và toàn bộ hành vi của web Ôn Luyện VSTEP cho BéIu.

Đọc trước: tests/ai-coordination/VSTEP/docs/SPEC.md (mục 2, 6, 7, 9), tests/ai-coordination/VSTEP/tests/logic.test.js, tests/ai-coordination/VSTEP/tests/integration.test.js.

Tạo trong tests/ai-coordination/VSTEP/web/js/:
1. srs.js, quiz.js, store.js: đúng hợp đồng mục 6, hàm thuần, không sửa đầu vào.
2. app.js: định tuyến và mọi màn hình ở mục 7, chỉ dùng các móc trong bảng template. index.html và data.js do người khác viết song song: đừng tạo, đừng chờ. Clone template, ủy quyền sự kiện, quản lý focus khi đổi màn hình, phát âm bằng speechSynthesis, ghi âm bằng MediaRecorder, bọc localStorage trong try, xử lý khi thiếu giọng đọc hoặc micro.
3. Có thể thêm tests/ai-coordination/VSTEP/tests/be.extra.test.js cho phần app.js tách được thành hàm thuần.

Chạy node --check cho bốn file và test logic tới khi đạt. Phần integration.test.js chỉ chạy được sau khi gộp; hãy tự đối chiếu các điều kiện của nó với app.js (móc id, data-*, không innerHTML, không classList, không setItem trong app.js).
