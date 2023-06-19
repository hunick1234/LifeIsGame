# 基础镜像
FROM golang:1.20.1-alpine
# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY go.mod .
COPY go.sum ./app/backend

# 安装依赖
RUN go mod download

# 复制应用程序代码
COPY . .

# 构建应用程序
RUN go build -o main .

# 启动应用程序
CMD ["./main"]
