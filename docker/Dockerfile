FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/build/ /var/www
EXPOSE 80
