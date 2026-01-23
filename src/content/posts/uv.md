---
title: UV：Rust编写的Python神器安装配置与使用技巧
published: 2026-01-23
description: Rust编写的Python神器UV：安装配置与高效使用技巧
category: 技术
tags: [python, tool]
draft: false
---

> An extremely fast Python package and project manager, written in Rust.

## Resources

- [Docs](https://docs.astral.sh/uv/)
- [UV Github](https://github.com/astral-sh/uv)

## Install

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Update

```bash
uv self update
```

## 国内加速

```bash
export UV_DEFAULT_INDEX=https://pypi.tuna.tsinghua.edu.cn/simple
```

## Install Python

```bash
uv python install 3.13
```

## Usage

```bash
# Create a new Python project in the current directory:
uv init

# Create a new Python project in a directory with the given name:
uv init project_name

# Create a environment
uv venv -p 3.13

# Add a new package to the project:
uv add package

# Remove a package from the project:
uv remove package

# Add a new dev package to the project:
uv add --dev package

# Run a script in the project's environment:
uv run path/to/script.py

# Run a command in the project's environment:
uv run command

# Update a project's environment from pyproject.toml:
uv sync

# Create a lock file for the project's dependencies:
uv lock

# Export the project's dependencies to a requirements.txt file:
uv pip freeze > requirements.txt
```
