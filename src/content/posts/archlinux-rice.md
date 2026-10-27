---
title: 我的ArchLinux配置指南
published: 2024-11-05
description: 从零开始配置现代化Arch Linux桌面环境：涵盖Hyprland安装、中文输入法设置、系统美化到代理配置的全流程指南。包含详细的软件包选择和实用工具推荐，助你打造高效美观的Wayland桌面体验。
category:
tags: [linux]
draft: false
---

基于 **Sway + Waybar + Kitty + Fuzzel + Mako** 的轻量 Wayland 桌面环境，统一使用 Catppuccin Mocha 配色。

## Stack

| 类别           | 组件                |     |
| -------------- | ------------------- | --- |
| Window Manager | Sway                |     |
| Status Bar     | Waybar              |     |
| Terminal       | Kitty               |     |
| Launcher       | Fuzzel              |     |
| Notifications  | Mako                |     |
| Lock / Idle    | swaylock / swayidle |     |
| Theme          | Catppuccin Mocha    |     |
| Input Method   | Fcitx5 + Rime Ice   |     |

## 常用快捷键

| 快捷键                  | 操作                        |
| ----------------------- | --------------------------- |
| `Super + T`             | 打开 Kitty                  |
| `Super + Space`         | 打开 Fuzzel（继承代理环境） |
| `Super + Shift + Space` | 打开 Fuzzel（不使用代理）   |
| `Super + E`             | 打开 Dolphin                |
| `Super + Shift + E`     | 打开 Yazi 浮动窗口          |
| `Super + A`             | 区域截图并使用 Satty 编辑   |
| `Super + V`             | 打开剪贴板历史              |
| `Super + Q`             | 开始或停止录屏              |
| `Super + N`             | 显示 ncmpcpp 浮动窗口       |

## Install

首先确保网络连接正常,

### wifi连接

#### 禁用 Reflector 定时更新，避免安装过程中镜像列表被自动改写

```bash
systemctl disable --now reflector.timer
systemctl stop reflector.service
```

> Arch ISO 默认使用 root 用户，因此这里不需要 `sudo`。停止 service 只会结束当前任务，禁用 timer 才能阻止它再次触发。

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

### 更新系统与 Pacman 密钥环

`archinstall` 完成的新系统通常已经初始化密钥环，常规维护只需执行完整系统升级：

```bash
sudo pacman -Syu
```

> [!warning] 避免部分升级
> 不要把 `pacman -Sy` 或 `pacman -Syy <package>` 作为常规更新方式。它们会刷新软件包数据库却不完整升级系统，可能造成 Arch Linux 不支持的部分升级状态。

如果系统长期未更新，并因签名密钥过期而无法升级，先更新密钥环，然后立即完成系统升级：

```bash
sudo pacman -Sy --needed archlinux-keyring && sudo pacman -Su
```

只有在密钥环尚未初始化或已经损坏时，才需要重新初始化：

```bash
sudo pacman-key --init
sudo pacman-key --populate archlinux
sudo pacman -Syu
```

参考：[ArchWiki：Pacman/Package signing](https://wiki.archlinux.org/title/Pacman/Package_signing)

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

### 设置 Shell 代理

以下配置假设 Clash 的 HTTP / SOCKS mixed port 为 `7890`：

```bash
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5h://127.0.0.1:7890"
export no_proxy="localhost,127.0.0.1,::1"
```

代理变量应使用完整 URI。`socks5h://` 会通过代理解析域名，避免本地 DNS 无法解析或发生 DNS 泄漏。

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

[alt]
h = left
j = down
k = up
l = right
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

### 通用工具

```bash
sudo pacman -S kitty mako satty fuzzel fzf fd ripgrep zoxide eza imagemagick
```

### Sway相关

```bash
sudo pacman -S sway swaybg swaylock swayidle sway-contrib mesa wl-clipboard cliphist wl-clip-persist polkit-kde-agent wayland-protocols xorg-xwayland xdg-desktop-portal-wlr xdg-desktop-portal-gtk qt5-wayland qt6-wayland qt5ct qt6ct nwg-look udiskie pipewire-pulse
```

### Display Manager

```bash
sudo pacman -S ly
sudo systemctl enable ly@tty1
```

#### Ly 黑客帝国背景

编辑 `/etc/ly/config.ini`：

```ini
animation = matrix
animation_frame_delay = 5
animation_timeout_sec = 0
cmatrix_fg = 0x0000FF00
cmatrix_head_col = 0x01FFFFFF
```

- `matrix`：启用内置 CMatrix 动画。
- `animation_timeout_sec = 0`：登录界面持续播放。
- 绿色字符配白色粗体头部，保留 `blank_box = true` 以保证登录框可读性。

### waybar相关

```bash
sudo pacman -S waybar jq pacman-contrib blueberry brightnessctl pavucontrol
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

#### 微信 AppImage 不显示候选框

微信原生 Wayland 窗口可能可以正常接收并上屏 Rime 中文，却不显示 Fcitx5 候选框。仅对微信强制使用 XWayland，避免影响其他原生 Wayland 应用：

```ini
Exec=/usr/bin/env QT_QPA_PLATFORM=xcb QT_IM_MODULE=fcitx GTK_IM_MODULE=fcitx XMODIFIERS=@im=fcitx /home/lordhamster/Applications/wechat/wechat.AppImage
```

将该行写入 `/home/lordhamster/Applications/wechat/wechat.desktop`。修改后完全退出并重新启动微信；可用下面的命令确认窗口后端：

```bash
swaymsg -t get_tree | jq '.. | objects | select(.name? == "微信") | {name, shell, app_id, window_properties}'
```

其中 `shell` 应为 `xwayland`。本机 A/B 测试确认 `fcitx5-rime` 5.1.15 与 5.1.16 表现相同，因此无需降级或锁定 Rime 软件包。

参考：[Fcitx 5：Using Fcitx 5 on Wayland](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland)

### shell相关

```bash
sudo pacman -S zsh starship zsh-autosuggestions zsh-syntax-highlighting zsh-completions
```

**Change Default Shell**

```bash
chsh -s $(which zsh)
```

### 开发相关

```bash
sudo pacman -S neovim tree-sitter-cli tmux lazygit yazi uv nodejs npm nvm btop htop tk
```

### 常用软件

```bash
sudo pacman -S vivaldi wf-recorder mpv gimp gwenview gnome-calculator obsidian mpd ncmpcpp dolphin
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

## 安装 Steam

Steam 位于官方 `multilib` 仓库，推荐安装仓库中的 `steam`，无需使用 AUR 版运行时。

### 1. 启用 multilib

编辑 `/etc/pacman.conf`，取消下面两行的注释：

```ini
[multilib]
Include = /etc/pacman.d/mirrorlist
```

然后完整更新系统：

```bash
sudo pacman -Syu
```

### 2. 安装 Steam 和显卡驱动

当前机器使用 AMD 显卡，安装 Steam 及对应的 32/64 位 Mesa、Vulkan 驱动：

```bash
sudo pacman -S steam mesa lib32-mesa vulkan-radeon lib32-vulkan-radeon
```

> [!info] 其他显卡
> 如果安装时要求选择 `vulkan-driver` 或 `lib32-vulkan-driver`，必须选择与显卡匹配的驱动：
>
> - Intel：`vulkan-intel`、`lib32-vulkan-intel`
> - NVIDIA：`nvidia-utils`、`lib32-nvidia-utils`
> - AMD：`vulkan-radeon`、`lib32-vulkan-radeon`

### 3. 启动并启用 Proton

```bash
steam
```

首次启动会下载 Steam Runtime。需要运行 Windows 游戏时，进入 **Steam → 设置 → 兼容性**，开启“为所有其他产品启用 Steam Play”，Proton 由 Steam 自动下载和管理。

> [!tip] 启动异常
> 确认 `/etc/locale.gen` 中已启用 `en_US.UTF-8 UTF-8`，然后执行 `sudo locale-gen`；同时检查是否安装了正确的 32 位显卡驱动。

参考：[ArchWiki：Steam](https://wiki.archlinux.org/title/Steam) · [Arch Linux steam 软件包](https://archlinux.org/packages/multilib/x86_64/steam/)

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
