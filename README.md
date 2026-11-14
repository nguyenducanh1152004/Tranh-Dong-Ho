# Đức Anh — Portfolio cuộn dài (bản Tranh Đông Hồ)

Cả trang được in như một bức tranh khắc gỗ Đông Hồ. Cuộn chuột tới đâu, từng bản màu dập xuống tới đó: các bản màu lệch khuôn rồi khớp lại, bản nét đen ép xuống sau cùng. Cuộn ngược thì bản in tháo ngược lại.

| Đoạn cuộn | Giấy | Chuyển động |
|---|---|---|
| Mở đầu | Vàng hoè | Tranh cá chép được in khi mở trang; cuộn xuống thì cá nhảy lên, ba hàng sóng trôi ngược chiều nhau |
| Về mình | Hồng điều | Tiêu đề trong ô đề chữ đóng xuống như con dấu, đoạn giới thiệu thấm mực từng chữ, hoa sen in dần, đường thời gian tự vẽ |
| Kỹ năng | Xanh mạ | Ô triện mức độ đóng dấu từng ô một, quy trình vẽ gạch nối |
| Dự án | Tấm chàm | Mục được ghim; cuộn dọc làm dãy bản in chạy ngang, bản nào vào giữa thì khớp khuôn |
| Kinh nghiệm | Vàng hoè | Từng tranh treo được mở cuộn từ trên xuống |
| Liên hệ | Hồng điều | Dấu triện ĐA lớn ép xuống, form liên hệ mở cuộn |

Màu giấy chuyển dần giữa các mục; mây trôi theo nhiều tốc độ; menu đóng dấu đỏ những mục đã đi qua.

## Chạy trên máy

```powershell
npm start
```

Mở `http://127.0.0.1:4180`.

## Sửa nội dung

Toàn bộ chữ nằm trong `dist/config.js`.

## Cấu trúc

- `dist/index.html`: khung trang
- `dist/assets/art.js`: tranh khắc vẽ bằng code (cá chép, sóng, sen, mây, triện, ảnh bìa dự án); mỗi màu là một bản in riêng
- `dist/assets/app.js`: dựng nội dung, bộ máy cuộn (gán `--p`/`--e` cho phần tử `[data-r]`), đổi màu giấy, ghim mục dự án, form
- `dist/assets/style.css`: giao diện; các hiệu ứng theo cuộn đọc biến `--p`/`--e`
- `PRODUCT.md`, `.impeccable/`: hồ sơ sản phẩm và hợp đồng thiết kế (Impeccable)

Tôn trọng chế độ "giảm chuyển động" của hệ điều hành: mọi bản in hiện sẵn.

