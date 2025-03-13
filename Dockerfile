# 前端构建阶段
FROM node:hydrogen-alpine3.21 AS frontend-builder
WORKDIR /app
COPY ui/package.json ui/pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --frozen-lockfile
COPY ui/ .
RUN pnpm build

# Go编译阶段
FROM golang:1.23.6-alpine3.21 AS go-builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY backend/ ./backend
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /memo-backend ./backend/main.go

# 最终镜像
FROM alpine:3.21.3
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=go-builder /memo-backend /app/
COPY --from=frontend-builder /app/build /app/pb_public
EXPOSE 8080
CMD ["/app/memo-backend", "serve", "--http=0.0.0.0:8080"]
