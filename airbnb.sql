-- Tạo database
CREATE DATABASE airbnb;
USE airbnb;

-- Tạo bảng NguoiDung
CREATE TABLE NguoiDung (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birth_day VARCHAR(50),
    gender VARCHAR(10),
    role VARCHAR(50)
);

-- Tạo bảng ViTri
CREATE TABLE ViTri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_vi_tri VARCHAR(255) NOT NULL,
    tinh_thanh VARCHAR(255),
    quoc_gia VARCHAR(255),
    hinh_anh VARCHAR(255)
);

-- Tạo bảng Phong
CREATE TABLE Phong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_phong VARCHAR(255) NOT NULL,
    khach INT NOT NULL,
    phong_ngu INT NOT NULL,
    giuong INT NOT NULL,
    phong_tam INT NOT NULL,
    mo_ta VARCHAR(500),
    gia_tien INT NOT NULL,
    may_giat BOOLEAN DEFAULT FALSE,
    ban_la BOOLEAN DEFAULT FALSE,
    tivi BOOLEAN DEFAULT FALSE,
    dieu_hoa BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    bep BOOLEAN DEFAULT FALSE,
    do_xe BOOLEAN DEFAULT FALSE,
    ho_boi BOOLEAN DEFAULT FALSE,
    ban_ui BOOLEAN DEFAULT FALSE,
    hinh_anh VARCHAR(255),
    ma_vi_tri INT,
    FOREIGN KEY (ma_vi_tri) REFERENCES ViTri(id)
);

-- Tạo bảng DatPhong
CREATE TABLE DatPhong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_phong INT,
    ngay_den DATETIME NOT NULL,
    ngay_di DATETIME NOT NULL,
    so_luong_khach INT NOT NULL,
    ma_nguoi_dat INT,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id),
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id)
);

-- Tạo bảng BinhLuan
CREATE TABLE BinhLuan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_phong INT,  -- Liên kết với bảng Phong
    ma_nguoi_binh_luan INT,
    ngay_binh_luan DATETIME NOT NULL,
    noi_dung VARCHAR(500),
    sao_binh_luan INT CHECK (sao_binh_luan BETWEEN 1 AND 5),
    FOREIGN KEY (ma_phong) REFERENCES Phong(id),  -- Thiết lập liên kết đúng
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id)
);


-- Chèn dữ liệu vào bảng NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role) VALUES
('Nguyen Van A', 'a@gmail.com', 'password123', '0987654321', '1990-01-01', 'Male', 'User'),
('Tran Thi B', 'b@gmail.com', 'password123', '0987654322', '1992-05-12', 'Female', 'User'),
('Le Van C', 'c@gmail.com', 'password123', '0987654323', '1988-07-20', 'Male', 'Admin'),
('Pham Hong D', 'd@gmail.com', 'password123', '0987654324', '1995-11-30', 'Female', 'User'),
('Vo Minh E', 'e@gmail.com', 'password123', '0987654325', '2000-03-15', 'Male', 'User'),
('Hoang Tuan F', 'f@gmail.com', 'password123', '0987654326', '1993-06-25', 'Male', 'User'),
('Dang Quang G', 'g@gmail.com', 'password123', '0987654327', '1998-09-10', 'Male', 'User'),
('Nguyen Ha H', 'h@gmail.com', 'password123', '0987654328', '1985-12-05', 'Female', 'User'),
('Trinh Xuan I', 'i@gmail.com', 'password123', '0987654329', '1997-02-28', 'Male', 'User'),
('Ly Thanh J', 'j@gmail.com', 'password123', '0987654330', '1991-04-18', 'Female', 'User');

-- Chèn dữ liệu vào bảng ViTri
INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh) VALUES
('Hà Nội', 'Hà Nội', 'Vietnam', 'hanoi.jpg'),
('Hồ Chí Minh', 'Hồ Chí Minh', 'Vietnam', 'hcm.jpg'),
('Đà Nẵng', 'Đà Nẵng', 'Vietnam', 'danang.jpg'),
('Nha Trang', 'Khánh Hòa', 'Vietnam', 'nhatrang.jpg'),
('Phú Quốc', 'Kiên Giang', 'Vietnam', 'phuquoc.jpg'),
('Huế', 'Thừa Thiên Huế', 'Vietnam', 'hue.jpg'),
('Sapa', 'Lào Cai', 'Vietnam', 'sapa.jpg'),
('Đà Lạt', 'Lâm Đồng', 'Vietnam', 'dalat.jpg'),
('Cần Thơ', 'Cần Thơ', 'Vietnam', 'cantho.jpg'),
('Vũng Tàu', 'Bà Rịa - Vũng Tàu', 'Vietnam', 'vungtau.jpg');

-- Chèn dữ liệu vào bảng Phong
INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, ma_vi_tri) VALUES
('Deluxe Room', 2, 1, 1, 1, 'Phòng sang trọng, đầy đủ tiện nghi', 1000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'deluxe.jpg', 1),
('Family Suite', 4, 2, 2, 2, 'Phòng rộng rãi, thích hợp cho gia đình', 2000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'family.jpg', 2),
('Standard Room', 2, 1, 1, 1, 'Phòng tiêu chuẩn với giá hợp lý', 800000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'standard.jpg', 3),
('Sea View Room', 2, 1, 1, 1, 'View biển tuyệt đẹp', 1500000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'seaview.jpg', 4),
('Luxury Villa', 6, 3, 3, 3, 'Biệt thự cao cấp với hồ bơi riêng', 5000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'villa.jpg', 5),
('Budget Room', 1, 1, 1, 1, 'Phòng giá rẻ, tiện nghi cơ bản', 500000, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, 'budget.jpg', 6),
('Mountain View Room', 2, 1, 1, 1, 'View núi, không gian yên tĩnh', 1200000, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, 'mountain.jpg', 7),
('Garden Room', 3, 2, 2, 2, 'Có sân vườn riêng', 1800000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'garden.jpg', 8),
('Penthouse Suite', 4, 2, 2, 2, 'Căn hộ cao cấp trên tầng cao nhất', 3000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'penthouse.jpg', 9),
('Resort Bungalow', 2, 1, 1, 1, 'Bungalow giữa thiên nhiên', 2000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'bungalow.jpg', 10);

-- Chèn dữ liệu vào bảng DatPhong
INSERT INTO DatPhong (ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat) VALUES
(1, '2025-04-01', '2025-04-05', 2, 1),
(2, '2025-04-10', '2025-04-15', 4, 2),
(3, '2025-05-01', '2025-05-03', 2, 3),
(4, '2025-05-10', '2025-05-12', 2, 4),
(5, '2025-06-01', '2025-06-07', 6, 5),
(6, '2025-06-15', '2025-06-20', 1, 6),
(7, '2025-07-01', '2025-07-04', 2, 7),
(8, '2025-07-10', '2025-07-12', 3, 8),
(9, '2025-08-01', '2025-08-05', 4, 9),
(10, '2025-08-15', '2025-08-18', 2, 10);

-- Chèn dữ liệu vào bảng BinhLuan
INSERT INTO BinhLuan (ma_phong, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan) VALUES
(1, 1, '2025-04-06', 'Phòng rất sạch sẽ và tiện nghi', 5),
(2, 2, '2025-04-16', 'Rất phù hợp cho gia đình', 4),
(3, 3, '2025-05-04', 'Giá cả hợp lý, sẽ quay lại', 4),
(4, 4, '2025-05-13', 'View đẹp, nhưng dịch vụ chưa tốt lắm', 3),
(5, 5, '2025-06-08', 'Biệt thự tuyệt vời, đáng giá', 5),
(6, 6, '2025-06-21', 'Phòng hơi nhỏ nhưng ổn', 3),
(7, 7, '2025-07-05', 'Không gian yên tĩnh, rất thư giãn', 5),
(8, 8, '2025-07-13', 'Vườn rất đẹp, đáng tiền', 4),
(9, 9, '2025-08-06', 'Căn hộ cao cấp, dịch vụ tốt', 5),
(10, 10, '2025-08-19', 'Bungalow rất chill, gần gũi thiên nhiên', 5);

