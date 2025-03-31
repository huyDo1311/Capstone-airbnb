# Sử dụng Node.js 18
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng (nếu cần)
RUN npm run build

# Expose cổng NestJS
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start"]








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

# # Copy file môi trường
# COPY .env .env

# # Chạy Prisma migrations (nếu sử dụng Prisma)
# RUN npx prisma generate

# CMD ["node", "dist/main"]







# FROM node:22-alpine AS development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . . 

# RUN npm run build

# FROM node:22-alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=prod

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# COPY .env .env

# RUN npx prisma generate

# RUN npx prisma migrate deploy



# CMD ["node", "dist/main"]