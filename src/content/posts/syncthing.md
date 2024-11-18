---
title: Syncthing
published: 2024-11-18
description: "Syncthing 是一款开源、轻量级的文件同步工具，适合在多设备间无缝同步文件。"
tags: []
category: Tool
draft: false
---

Syncthing 是一款开源、轻量级的文件同步工具，适合在多设备间无缝同步文件。

# Install

## 在 Ubuntu 上安装 Syncthing

### 1. 添加 Syncthing 软件源

首先，添加 Syncthing 的 PGP 公钥和 `stable` 渠道到软件源列表：

```bash
sudo mkdir -p /etc/apt/keyrings
sudo curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg

echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
```

### 2. 安装 Syncthing

更新软件包索引并安装 Syncthing：

```bash
sudo apt-get update
sudo apt-get install syncthing
```

### 3. 创建运行用户并配置 Syncthing

#### 创建 Syncthing 用户

```bash
sudo adduser syncthing
```

#### 切换到 Syncthing 用户

```bash
su syncthing
```

#### 启动 Syncthing

```bash
syncthing
```

#### 配置为外网和局域网可访问

编辑配置文件：

```bash
vi /home/syncthing/.local/state/syncthing/config.xml
```

找到以下部分：

```xml
<gui enabled="true" tls="false" debugging="false" sendBasicAuthPrompt="false">
    <address>127.0.0.1:8384</address>
    <apikey>bwukMv54</apikey>
    <theme>default</theme>
</gui>
```

将 `127.0.0.1:8384` 改为 `0.0.0.0:8384`，使得外网或局域网设备可以访问 Syncthing 的 Web 界面。

#### 配置开机自启

```bash
sudo systemctl start syncthing@syncthing.service
sudo systemctl enable syncthing@syncthing.service
```

---

## 在 Archlinux 上安装 Syncthing

### 1. 安装 Syncthing

使用 Pacman 安装：

```bash
sudo pacman -S syncthing
```

### 2. 启用和启动服务

将 Syncthing 服务启用并立即启动：

```bash
sudo systemctl enable --now syncthing@<username>.service
```
