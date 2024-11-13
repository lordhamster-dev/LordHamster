---
title: archlinux-docker
published: 2024-11-13
description: "Archlinux安装Docker"
tags: [Archlinux]
category: Linux
draft: false
---

# Install

```bash
sudo pacman -S docker
```

# Enable and Start

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

# FAQ

## 第一次启动报错

重启系统就好...
