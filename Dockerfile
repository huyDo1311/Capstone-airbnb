# Sử dụng node 22 với Alpine để tối ưu kích thước image
FROM node:22-alpine AS builder

# Đặt thư mục làm việc
WORKDIR /usr/src/app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng NestJS
RUN npm run build

# Stage chạy ứng dụng
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy dependencies từ stage builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Expose port 3000 (hoặc port của bạn)
EXPOSE 3000

# Chạy Prisma Migrate để đảm bảo DB schema đúng
RUN npx prisma generate

# Chạy ứng dụng
CMD ["node", "dist/main"]









# # Sử dụng Node.js 22 với Alpine (nhẹ, tối ưu)
# FROM node:22-alpine AS builder

# # Thiết lập thư mục làm việc
# WORKDIR /usr/src/app

# # Copy package.json và cài đặt dependencies
# COPY package*.json ./

# # Cài đặt NestJS CLI (nếu chưa có)
# RUN npm install && npm install -g @nestjs/cli

# # Copy toàn bộ mã nguồn
# COPY . .

# # Build ứng dụng
# RUN npm run build

# # ----------------- #
# # Tạo production image
# # ----------------- #

# FROM node:22-alpine AS production

# WORKDIR /usr/src/app

# # Copy package.json và cài đặt dependencies (chỉ phần production)
# COPY package*.json ./
# RUN npm install --only=prod

# # Copy thư mục build từ builder stage
# COPY --from=builder /usr/src/app/dist ./dist

# # Copy file môi trường
# # COPY .env .env

# # 🛠 Copy thư mục prisma vào container
# COPY --from=builder /usr/src/app/prisma ./prisma

# # Kiểm tra file schema.prisma có tồn tại không
# RUN ls -l ./prisma

# # Chạy Prisma migrations (nếu có)
# RUN npx prisma generate


# # Chạy ứng dụng
# CMD ["node", "dist/main.js"]








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





