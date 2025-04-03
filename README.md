# 📌 Capstone Airbnb Project

## 🏗 Task Assignment
Dưới đây là danh sách các module và người chịu trách nhiệm trong dự án:

### 👤 **Đỗ Huỳnh Thanh Huy**
- **Auth**: Xử lý xác thực người dùng (Đăng ký, Đăng nhập, JWT, Middleware...)
- **Bookings**: Quản lý đặt phòng (Tạo, cập nhật, hủy, danh sách đặt phòng...)
- **Comments**: Quản lý bình luận (CRUD bình luận, đánh giá phòng...)
- **Locations**: Quản lý địa điểm (CRUD địa điểm, tìm kiếm vị trí...)

### 👤 **Phan Sỹ**
- **Rooms**: Quản lý phòng (CRUD phòng, trạng thái phòng, tiện ích...)
- **Users**: Quản lý người dùng (CRUD user, phân quyền, hồ sơ cá nhân...)

## 🚀 Hướng Dẫn Cài Đặt
### 1️⃣ Cài đặt dependencies
```bash
npm install
```

### 2️⃣ Cấu hình môi trường
- Tạo file `.env` và cập nhật thông tin kết nối MySQL
```env
DATABASE_URL="mysql://root:1234@localhost:3307/airbnb"
```

### 3️⃣ Chạy migrations Prisma
```bash
npx prisma db pull
npx prisma generate
```

### 4️⃣ Khởi động server
```bash
npm run start
```

## 🛠 Công Nghệ Sử Dụng
- **Backend**: NestJS, Prisma, MySQL
- **Deployment**: Railway, Docker
- **Authentication**: JWT, Bcrypt

## 📌 Quy Tắc Commit
- `feat: <Mô tả>` - Tính năng mới
- `fix: <Mô tả>` - Sửa lỗi
- `chore: <Mô tả>` - Cấu hình hoặc chỉnh sửa nhỏ
- `docs: <Mô tả>` - Cập nhật tài liệu

---
📅 **Cập nhật lần cuối**: `$(date)`

