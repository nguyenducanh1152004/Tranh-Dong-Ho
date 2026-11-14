# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Khách hàng tìm người làm web theo hình thức freelance: chủ doanh nghiệp nhỏ, cửa hàng, startup ở giai đoạn MVP. Họ thường mở link từ tin nhắn hoặc hồ sơ, xem trên điện thoại hay laptop. Việc họ cần làm: quyết định xem có đủ tin để liên hệ thuê Đức Anh hay không.

## Product Purpose

Portfolio cá nhân của Đức Anh, Full Stack Developer ở Hà Nội, nhận việc từ xa. Trang thành công khi người xem rời đi mà nhớ rằng người này có **tay nghề giao diện và chuyển động** đáng thuê, rồi gửi lời nhắn hoặc email.

## Positioning

Bản thân trang là bằng chứng: một trải nghiệm cuộn có chuyển động được làm kỹ cho thấy năng lực "làm những trang khiến người xem dừng lại" (nằm trong danh sách dịch vụ), thay vì chỉ kể ra bằng chữ.

## Operating Context

- Mở từ link chia sẻ (Messenger, Zalo, LinkedIn); có ảnh xem trước `og-image.jpg`.
- Đọc theo cuộn dọc, một lượt từ trên xuống; thường xem trên điện thoại.
- Liên hệ qua email hoặc form (form đang ở chế độ thử nghiệm `demo: true`).

## Capabilities and Constraints

- Site tĩnh: HTML/CSS/JS thuần, không có bước build, deploy thư mục `dist/` (Vercel).
- Mọi nội dung nằm trong `dist/config.js`, viết bằng tiếng Việt; trang dựng nội dung từ file đó.
- Cấu trúc 5 mục là bắt buộc giữ: Giới thiệu → Kỹ năng → Dự án → Kinh nghiệm → Liên hệ.
- Người dùng yêu cầu nhiều chuyển động theo cuộn: cuộn tới đâu nội dung chuyển động và hoàn thành tới đó, cuộn ngược thì đảo ngược.

## Brand Commitments

- Tên hiển thị "Đức Anh", chữ viết tắt "ĐA".
- Giọng văn thân mật, xưng "mình", ngắn gọn.
- Chủ đề vũ trụ / hệ hành tinh của bản trước **đã bị người dùng loại bỏ**; không quay lại.

## Evidence on Hand

- Hồ sơ, kỹ năng (có mức độ 1–5 và số năm), quy trình, FAQ, giờ làm việc trong `dist/config.js`.
- **Dự án và kinh nghiệm hiện là nội dung minh họa** để thử giao diện; mọi số liệu trong đó (32%, 1,2M request…) chưa phải bằng chứng thật. Không được bịa thêm khách hàng, lời chứng thực hay số liệu mới.
- Ảnh bìa dự án được vẽ bằng code (SVG), không có ảnh chụp sản phẩm thật.
- Không có ảnh chân dung.

## Product Principles

1. Trang tự chứng minh tay nghề: chuyển động phải có chủ đích và mượt, không phô trương vô nghĩa.
2. Người xem luôn biết mình đang ở đâu và còn bao xa tới phần liên hệ.
3. Nội dung đọc được trước tiên; chuyển động không bao giờ giấu chữ khi đã cuộn tới.
4. Liên hệ phải luôn trong tầm tay.

## Accessibility & Inclusion

Tôn trọng `prefers-reduced-motion` (nội dung hiện sẵn, không có chuyển động lớn). Dùng được bằng bàn phím; chữ đạt độ tương phản WCAG AA.
