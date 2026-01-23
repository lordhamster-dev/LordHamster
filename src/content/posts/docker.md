---
title: Docker实用指南：从安装到高效使用
published: 2024-11-13
description: 从安装配置到高效使用，全面掌握Docker容器技术的最佳实践
category: 技术 
tags: [tool]
draft: false
---

## Install

### Ubuntu

- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

### Archlinux

#### Archlinux install docker

```bash
sudo pacman -S docker docker-compose docker-buildx
```

#### Enable and Start

```bash
sudo systemctl enable --now docker.service
```

#### Archlinux第一次启动Docker报错

重启系统就好...

## Docker compose

```bash
docker compose up  # 启动
docker compose up -d  # 后台启动
```

### 更新

```bash
docker compose pull  # 拉取镜像
docker compose up -d  # 会自动处理容器的停止、删除和重新创建
docker compose ps  # 验证更新
docker image prune -f  # 清理旧镜像（可选）
```

## Tips

### 进入容器

```bash
sudo docker exec -it container_name bash
```

### 查看容器状态

```bash
sudo docker stats container_name
```

## 国内镜像加速

- https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://dockerpull.org",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 使用代理

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo vim /etc/systemd/system/docker.service.d/proxy.conf
```

内容如下

```bash
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890/"
Environment="HTTPS_PROXY=http://127.0.0.1:7890/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

修改好之后执行如下命令

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```
