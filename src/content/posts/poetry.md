---
title: Poetry
published: 2024-12-04
description: "一个Python包管理工具"
tags: [Python, Tool]
draft: false
---

# Reference

- [poetry docs](https://python-poetry.org/docs/)

# Install

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

# Config

## Config file location

- macOS: `~/Library/Application Support/pypoetry`
- Windows: `%APPDATA%\pypoetry`
- Unix: `~/.config/pypoetry`

## project env

```bash
poetry config virtualenvs.in-project true
```

这样`poetry`就会在项目目录下建立虚拟环境文件夹`.venv`

# Common commands

```bash
poetry init  # 初始化
poetry env use python3.11  # 指定虚拟环境python版本
poetry source add --priority=primary mirrors https://pypi.tuna.tsinghua.edu.cn/simple/  # 配置镜像源
poetry install --no-root  # 安装所有依赖,--no-root不会安装项目本身
poetry add xxxx   # 添加python包
poetry add xxxx -G dev  # 添加开发环境的python包
```
