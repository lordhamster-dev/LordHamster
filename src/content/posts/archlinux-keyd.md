---
title: Linux键盘效率提升：keyd安装与配置详解
published: 2024-11-20
description: Linux下轻量级键位重映射工具keyd的安装与配置方法。
category: 技术 
tags: [linux, tool]
draft: false
---

> [keyd](https://github.com/rvaiya/keyd) is A key remapping daemon for linux.

## Install

```bash
sudo pacman -S keyd
```

## Enable and Start

```bash
sudo systemctl enable keyd
sudo systemctl start keyd
```

## Config

Put the following in `/etc/keyd/default.conf`:

```txt
[ids]

*

[main]

# Maps capslock to escape when pressed and control when held.
capslock = overload(control, esc)
```
