FROM golang:1.23.6-alpine3.21 AS backend-builder

WORKDIR /app

COPY ./backend/ .

RUN GOPROXY=https://goproxy.cn,direct go mod download&& \
    go build -o memo main.go

FROM node:hydrogen-alpine3.21 AS frontend-builder

WORKDIR /app

COPY ./frontend/package.json .

RUN npm config set registry http://mirrors.tencent.com/npm/ && npm install

COPY ./frontend/ .

RUN npm run build

FROM alpine:3.21.3

WORKDIR /app

COPY --from=backend-builder /app/memo .

COPY --from=frontend-builder /app/dist ./pb_public

EXPOSE 8080

CMD ["./memo"]

