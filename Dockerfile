# Sử dụng Node.js 22 với Alpine (nhẹ, tối ưu)
FROM node:22-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies
COPY package*.json ./

# Cài đặt NestJS CLI (nếu chưa có)
RUN npm install && npm install -g @nestjs/cli

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# ----------------- #
# Tạo production image
# ----------------- #

FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies (chỉ phần production)
COPY package*.json ./
RUN npm install --only=prod

# Copy thư mục build từ builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy file môi trường
# COPY .env .env

# Chạy Prisma migrations (nếu có)
RUN npx prisma generate

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "dist/main.js"]








# # Base image cho NestJS
# FROM node:22-alpine AS production

# WORKDIR /usr/src/app

# # Copy package.json và cài đặt dependencies
# COPY package*.json ./
# RUN npm install --only=prod 
# # && npm rebuild bcrypt --build-from-source
# # Copy toàn bộ source code
# COPY . .

# # Build ứng dụng
# RUN npm run build

# EXPOSE 3000

# # Copy file môi trường
# # COPY .env .env

# # Chạy Prisma migrations (nếu sử dụng Prisma)
# RUN npx prisma generate

# CMD ["node", "dist/main"]





