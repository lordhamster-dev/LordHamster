---
title: zsh安装和配置
published: 2024-11-12
description: "zsh安装和配置"
tags: []
category: Linux
draft: false
---

# Install

## Mac

mac默认就是zsh

## Ubuntu

```shell
sudo apt install zsh
```

# Install Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

国内镜像

```shell
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
```

# Install ZSH Plugins

Install zsh-autosuggestions:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Install zsh-syntax-highlighting:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

# .zshrc

```bash
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="ys"
plugins=(
	git
	zsh-autosuggestions
	zsh-syntax-highlighting
	web-search
)
source $ZSH/oh-my-zsh.sh
source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```
