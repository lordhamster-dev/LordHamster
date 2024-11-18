---
title: Docker
published: 2024-11-13
description: "Docker安装和使用"
tags: [Archlinux, Ubuntu]
category: Tool
draft: false
---

# Install

## Ubuntu

- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## Archlinux

```bash
sudo pacman -S docker
```

Enable and Start

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

# Useful command

## 进入容器

```shell
sudo docker exec -it 69d1 bash
```

# FAQ

## Archlinux第一次启动Docker报错

重启系统就好...
