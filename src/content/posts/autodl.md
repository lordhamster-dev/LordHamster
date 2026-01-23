---
title: AutoDL高效使用手册：GPU租用+Ollama模型部署技巧
published: 2026-01-23
description: AutoDL为您提供专业的GPU租用服务，秒级计费、稳定好用，高规格机房，7x24小时服务。更有算法复现社区，一键复现算法。
category: AI
tags: [tool]
draft: false
---

> [AutoDL](https://www.autodl.com)为您提供专业的GPU租用服务，秒级计费、稳定好用，高规格机房，7x24小时服务。更有算法复现社区，一键复现算法。

## 💡 实用小技巧

### 无卡模式开机

想省GPU资源装环境？试试无卡模式开机！超适合环境配置阶段使用哦～✨

## 📂 路径说明

```bash
/root/autodl-tmp    # AutoDL数据盘 💾
/root/autodl-fs     # 免费20G文件存储
```

## ⚡ 学术资源加速

一键加速，科研必备！👇

```bash
source /etc/network_turbo
```

## 🦙 Ollama 使用教程

### 安装 & 更新

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 模型存储

建议把模型都放在数据盘，避免空间不足：

```bash
export OLLAMA_MODELS=/root/autodl-tmp/ollama
ollama serve
```

### 常用命令

```bash
ollama list
ollama pull qwen2.5
ollama pull qwen2.5:14b
ollama pull llama3.2
ollama pull llama3.2-vision
ollama pull gemma2
```

## 🌐 端口映射

想把远程端口映射到本地？试试这个命令：

```bash
ssh -CNg -L 11434:127.0.0.1:11434 root@connect.cqa1.seetacloud.com -p 11868
```
