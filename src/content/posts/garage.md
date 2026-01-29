---
title: Garage搭建教程
published: 2026-01-29
description: Garage是一款强大的本地文件管理和分享工具，本文将指导你如何使用docker compose部署Garage。
tags: [tool]
category: 技术
draft: false
---

## 编辑docker-compose.yml

创建一个名为`docker-compose.yml`的文件，并添加以下内容：

```yaml
services:
  garage:
    image: dxflrs/garage:v2.2.0
    container_name: garage
    restart: unless-stopped
    ports:
      - 3900:3900 ## s3 api
      - 3901:3901 ## rpc
      - 3902:3902 ## s3 web
      - 3903:3903 ## admin api and '/metrics' for prometheus
    volumes:
      - ./garage.toml:/etc/garage.toml
      - ./meta:/var/lib/garage/meta
      - ./data:/var/lib/garage/data
    environment:
      - TZ=Asia/Shanghai
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "10"

  webui:
    image: khairul169/garage-webui:latest
    container_name: garage-webui
    restart: unless-stopped
    ports:
      - 3909:3909
    volumes:
      - ./garage.toml:/etc/garage.toml:ro
    environment:
      API_BASE_URL: "http://garage:3903"
      S3_ENDPOINT_URL: "http://garage:3900"
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "10"
```

## 创建配置文件

在同一目录下创建一个名为`garage.toml`的配置文件，并根据你的需求进行配置。以下是一个示例配置：

```toml
metadata_dir = "/var/lib/garage/meta"
data_dir = "/var/lib/garage/data"
db_engine = "sqlite"

replication_factor = 1

rpc_bind_addr = "[::]:3901"
rpc_public_addr = "127.0.0.1:3901"
rpc_secret = "$(openssl rand -hex 32)"

[s3_api]
s3_region = "garage"
api_bind_addr = "[::]:3900"
root_domain = ".s3-garage.example.com"

[s3_web]
bind_addr = "[::]:3902"
root_domain = ".web-garage.example.com"
index = "index.html"

[k2v_api]
api_bind_addr = "[::]:3904"

[admin]
api_bind_addr = "[::]:3903"
admin_token = "$(openssl rand -hex 32)"
metrics_token = "$(openssl rand -hex 32)"
```

## 启动Garage

在终端中导航到包含`docker-compose.yml`文件的目录，然后运行以下命令启动Garage：

```bash
docker compose up -d
```

## 创建集群布局

### 查看Grage状态

```bash
docker compose exec -it garage /garage status
```

### 分配存储节点

```bash
docker compose exec -it garage /garage layout assign -z dc1 -c 600G <node_id>
```

### 应用布局

```bash
docker compose exec -it garage /garage layout apply --version 1
```

## 访问Garage Web UI

打开浏览器，访问`http://localhost:3909`，创建存储桶，配置密钥就可以开始使用Garage了。
