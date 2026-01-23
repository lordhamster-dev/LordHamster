---
title: 我的ArchLinux Hyprland配置指南
published: 2024-11-05
description: 从零开始配置现代化Arch Linux桌面环境：涵盖Hyprland安装、中文输入法设置、系统美化到代理配置的全流程指南。包含详细的软件包选择和实用工具推荐，助你打造高效美观的Wayland桌面体验。
category: 技术 
tags: [linux, hyprland]
draft: false
---

## Install

首先确保网络连接正常,

### wifi连接

#### 禁用reflector服务,避免时不时自动切换一些用不了的源

```bash
systemctl stop reflector.service
```

#### 使用 iwctl 连接 WiFi

```bash
iwctl # 进入交互式命令行
device list # 列出无线网卡设备名，比如无线网卡看到叫 wlan0
station wlan0 scan # 扫描网络
station wlan0 get-networks # 列出所有 wifi 网络
station wlan0 connect wifi-name # 进行连接，注意这里无法输入中文。回车后输入密码即可
exit # 连接成功后退出
```

#### 检查连接情况

```bash
ping www.baidu.com
```

如果能 ping 通，说明联网成功。

### archinstall

然后执行命令

```bash
archinstall
```

- 镜像搜索选择China
- 使用推荐的硬盘分区

> 系统装好后，重启

## Setup

### 系统时间和 NTP 服务器同步

```bash
sudo timedatectl set-ntp 1
sudo timedatectl status
```

### 配置 Pacman 密钥环

```bash
sudo pacman-key --init
sudo pacman-key --populate archlinux
sudo pacman -Syy archlinux-keyring
```

#### 1. **`sudo pacman-key --init`**

- 初始化 `pacman` 的密钥环。
- 此命令会创建 GPG 密钥环的基础结构，确保系统拥有正确的配置来验证软件包的签名。它会生成密钥环文件，并准备好用于后续的密钥操作。
- 你通常会在第一次安装 Arch Linux 或重新配置密钥时执行此命令。

#### 2. **`sudo pacman-key --populate archlinux`**

- 填充 `pacman` 密钥环，导入 Arch Linux 官方密钥。
- 该命令将 Arch Linux 官方的 GPG 密钥添加到密钥环中。这些密钥用于验证软件包是否来自于官方仓库并确保它们的完整性和真实性。执行此命令后，你的系统将会有一个完整的密钥列表，可以用来验证包的签名。
- 如果你遇到由于 GPG 密钥问题导致的包验证错误，执行这个命令是解决问题的常见方法。

#### 3. **`sudo pacman -Syy archlinux-keyring`**

- 这是一个包含 Arch Linux 签名密钥的包。系统使用这些密钥来验证软件包的真实性和完整性。如果密钥过期或损坏，可能导致包管理器无法验证软件包。
- **`-S`**: 这个选项表示安装软件包或同步软件包数据库。`pacman -S` 后面跟着的是你要安装的包名。
- **`-yy`**: 这是两个 `y`，表示强制更新本地包数据库并从镜像源重新获取所有软件包信息。通常，`pacman -Sy` 会更新包数据库，但使用 `-yy` 会忽略本地缓存，强制重新同步。
- 它会强制更新 Arch Linux 的密钥环，以确保你的系统拥有最新的密钥，这对包的签名验证是必须的。通常，如果你遇到密钥过期或者出现包验证错误的情况，执行这个命令会有所帮助。

#### 小提示：

- **初始化密钥环**：如果你遇到 "No valid OpenPGP data found" 或者类似的错误，系统可能缺少密钥环，或者密钥环未初始化。运行 `sudo pacman-key --init` 来初始化密钥环。
- **导入 Arch Linux 密钥**：如果密钥环已初始化，但仍然遇到签名问题（例如密钥过期或丢失），运行 `sudo pacman-key --populate archlinux` 将会导入官方的 GPG 密钥，解决签名错误。

### 安装一些常用的工具包

```bash
sudo pacman -S base-devel git vim inetutils iproute2 iputils procps-ng psmisc sysfsutils which wget unzip mtr traceroute dnsutils lsb-release ca-certificates bash-completion logrotate openssh less rsync
```

部分软件是需要自行开启并设置开机自启动的，比如 `OpenSSH`：

```bash
systemctl enable --now sshd
```

### 解决中文显示乱码

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji
```

**然后清理字体缓存**

```bash
fc-cache -fv
```

> `reboot` 重启

### 设置shell代理

```bash
export http_proxy=127.0.0.1:7890
export https_proxy=127.0.0.1:7890
export socks_proxy=127.0.0.1:7890
```

### 安装AUR包管理工具yay

```bash
cd ~
mkdir -p .local
mkdir -p .local/opt
cd .local/opt
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

也可以直接安装打包好的二进制包：

```bash
cd ~
mkdir -p .local
mkdir -p .local/opt
cd .local/opt
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
```

## 配置keyd

### Install

```bash
sudo pacman -S keyd
```

### Enable and Start

```bash
sudo systemctl enable keyd
sudo systemctl start keyd
```

### Config

Put the following in `/etc/keyd/default.conf`:

```txt
[ids]

*

[main]

# Maps capslock to escape when pressed and control when held.
capslock = overload(control, esc)
```

## 配置Syncthing

### 1. 安装 Syncthing

使用 Pacman 安装：

```bash
sudo pacman -S syncthing
```

### 2. 启用和启动服务

将 Syncthing 服务启用并立即启动：

```bash
sudo systemctl enable --now syncthing@lordhamster.service
```

## ArchLinux桌面环境配置

### 字体相关

```bash
sudo pacman -S ttf-cascadia-code-nerd
```

### Hyprland相关

```bash
sudo pacman -S kitty mako copyq hyprland hyprpaper hypridle hyprlock hyprshot satty hyprpicker hyprland-qtutils xorg-xwayland xdg-desktop-portal-hyprland xdg-desktop-portal-gtk polkit-kde-agent qt5-wayland qt6-wayland qt5ct qt6ct nwg-look udiskie pipewire-pulse
```

### waybar相关

```bash
sudo pacman -S waybar jq blueberry brightnessctl pavucontrol fuzzel
```

If have bluetooth enable it

```bash
 sudo systemctl enable --now bluetooth
```

### 输入法相关

```bash
sudo pacman -S fcitx5-im fcitx5-qt fcitx5-gtk fcitx5-chinese-addons fcitx5-rime
```

```bash
yay -S rime-ice
```

**Input Method Setup**

```bash
vim ~/.local/share/fcitx5/rime/default.custom.yaml
```

Add the following lines to the file:

```yaml
patch:
  # 仅使用「雾凇拼音」的默认配置，配置此行即可
  __include: rime_ice_suggestion:/
  # 以下根据自己所需自行定义
  __patch:
    menu/page_size: 5 #候选词个数
```

### shell相关

```bash
sudo pacman -S zsh zsh-autosuggestions zsh-syntax-highlighting zsh-completions fzf fd ripgrep zoxide exa imagemagick
```

```bash
yay -S zsh-theme-powerlevel10k
```

**Change Default Shell**

```bash
chsh -s $(which zsh)
```

### 开发相关

```bash
sudo pacman -S neovim tmux lazygit yazi uv nodejs npm nvm btop tk
```

### 常用软件

```bash
sudo pacman -S vivaldi mpv gimp gwenview gnome-calculator obs-studio obsidian
```

### 美化相关

```bash
yay -S catppuccin-cursors-mocha catppuccin-gtk-theme-mocha
```

### dotfiles

```bash
cd ~
git clone git@github.com:lordhamster-dev/dotfiles.git
cd dotfiles
./install.sh
```

## 游戏模式

```bash
sudo pacman -S gamemode
sudo gpasswd -a lordhamster gamemode
```

测试gamemode

```bash
gamemoded -t
```

查看gamemode状态

```bash
gamemoded -s
```

steam中启用gamemode,在steam的启动选项中加入

```bash
gamemoderun %command%
```
