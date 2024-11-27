---
title: Archlinux with Hyprland
published: 2024-11-05
description: ""
tags: [Archlinux, Hyprland]
draft: false
---

# Install

首先确保网络连接正常

然后执行命令

```bash
archinstall
```

- 镜像搜索选择China
- 使用推荐的硬盘分区，/home目录是否单独分区可以按需选择
- bootloader选择grub,兼容性会好一些
- 内核可以选择linux-zen
- 桌面环境选择Hyprland

> 系统装好后，重启

# Setup

## First

- 首先进入Hyprland系统，会自动初始化Hyprland配置,然后 `Super` + `M` 退出Hyprland
- `CTRL` + `ALT` + `F3` 登录命令行系统,修改Hyprland的默认配置，消除警告

## 系统时间和 NTP 服务器同步

```bash
sudo timedatectl set-ntp 1
sudo timedatectl status
```

## 安装一些常用的工具包

```bash
sudo pacman -S git base-devel vi vim inetutils iproute2 iputils procps-ng psmisc sysfsutils which wget unzip mtr traceroute dnsutils lsb-release ca-certificates bash-completion logrotate openssh less rsync sdl2_ttf sdl2_image
```

部分软件是需要自行开启并设置开机自启动的，比如 `OpenSSH`：

```bash
systemctl enable --now sshd
```

## 安装浏览器

```bash
sudo pacman -S firefox
```

## 解决中文显示乱码

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji
```

创建字体配置文件

```bash
cd ~
mkdir -p .config/fontconfig
vim .config/fontconfig/fonts.conf
```

粘贴以下内容

```txt
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<!-- ${XDG_CONFIG_HOME}/fontconfig/fonts.conf
        - vim:ft=xml:fenc=utf-8:noet:ts=3:sw=3:
        -->
<fontconfig>
 <alias>
  <family>serif</family>
  <prefer>
   <family>Noto Serif</family>
   <family>Noto Color Emoji</family>
   <family>Noto Sans CJK SC</family>
   <family>Noto Sans CJK TC</family>
   <family>Noto Sans CJK JP</family>
  </prefer>
 </alias>
 <alias>
  <family>sans-serif</family>
  <prefer>
   <family>Noto Sans</family>
   <family>Noto Color Emoji</family>
   <family>Noto Sans CJK SC</family>
   <family>Noto Sans CJK TC</family>
   <family>Noto Sans CJK JP</family>
  </prefer>
 </alias>
 <alias>
  <family>monospace</family>
  <prefer>
   <family>Noto Sans Mono</family>
   <family>Noto Color Emoji</family>
   <family>Noto Sans Mono CJK SC</family>
   <family>Noto Sans Mono CJK TC</family>
   <family>Noto Sans Mono CJK JP</family>
  </prefer>
 </alias>
 <match target="font">
  <edit mode="assign" name="antialias">
   <bool>true</bool>
  </edit>
  <edit mode="assign" name="autohint">
   <bool>true</bool>
  </edit>
  <edit mode="assign" name="dpi">
   <double>96</double>
  </edit>
  <edit mode="assign" name="hinting">
   <bool>true</bool>
  </edit>
  <edit mode="assign" name="hintstyle">
   <const>hintslight</const>
  </edit>
  <edit mode="assign" name="lcdfilter">
   <const>lcdlight</const>
  </edit>
  <edit mode="assign" name="rgba">
   <const>rgb</const>
  </edit>
  <edit mode="assign" name="size">
   <int>15</int>
  </edit>
 </match>
 <dir>~/.fonts</dir>
</fontconfig>

```

然后清理字体缓存

```bash
fc-cache -fv
```

> `reboot` 重启

# Clash

## Install clash

```bash
sudo pacman -S clash
```

## Start clash

```bash
clash
```

会自动下载`Country.mmdb`，失败就多试几次

> clash配置网页`https://clash.razord.top/`

## 设置shell代理

```bash
export http_proxy=127.0.0.1:7890
export https_proxy=127.0.0.1:7890
export socks_proxy=127.0.0.1:7890
```

> firefox可以通过settings设置代理

# Supervisor

## 1. 安装 `supervisor`

使用 `pacman` 命令来安装：

```bash
sudo pacman -S supervisor
```

## 2. 启用 `supervisord` 服务

安装完成后，使用以下命令启动并启用 `supervisord` 服务：

```bash
sudo systemctl enable supervisord
sudo systemctl start supervisord
```

## 3. 创建进程配置文件

在 `/etc/supervisord.d/` 目录下，创建进程配置文件。例如，如果要管理一个叫 `clash` 的应用，创建文件 `/etc/supervisord.d/clash.ini`：

```ini
[program:clash]
command=/usr/bin/clash -d /home/lordhamster/.config/clash
autostart=true
autorestart=true
stderr_logfile=/var/log/clash.log
stdout_logfile=/var/log/clash.log
```

- `command`：指定要运行的命令或脚本的路径。
- `autostart`：设置 `true` 表示在 `supervisord` 启动时自动启动该进程。
- `autorestart`：设置 `true` 表示在进程意外退出时自动重启。
- `stderr_logfile` 和 `stdout_logfile`：指定标准错误和标准输出的日志文件路径。

## 4. 重启 `supervisor` 服务

添加或修改配置后，重启 `supervisord` 以应用更改：

```bash
sudo systemctl restart supervisord
```

## 5. 管理进程

可以使用 `supervisorctl` 命令来管理各个进程。例如：

```bash
sudo supervisorctl status
sudo supervisorctl start clash
sudo supervisorctl stop clash
sudo supervisorctl restart clash
```

# 安装AUR包管理工具yay

```bash
cd ~
mkdir -p .local
mkdir -p .local/opt
cd .local/opt
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
```

# 添加Archlinuxcn源

修改 /etc/pacman.conf 文件，加入：

```txt
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

然后更新系统并安装 archlinuxcn-keyring 包：

```bash
sudo pacman -Syu
sudo pacman -S archlinuxcn-keyring
```

# Hyprland配置

## Hyprland配套程式

```bash
yay -S fcitx5-im fcitx5-pinyin-zhwiki fcitx5-qt fcitx5-gtk fcitx5-chinese-addons xorg xorg-xwayland xdg-desktop-portal-hyprland xdg-desktop-portal-gtk qt5-wayland qt6-wayland qt5ct qt6ct nwg-look
```

這些套件功能如下：

- fcitx5 中文輸入法
- xorg, xorg-xwayland X視窗系統，不是所有程式都支援Wayland。
- xdg-desktop-portal-hyprland, xdg-desktop-portal-gtk 負責檔案選擇器、螢幕共享等功能
- qt5-wayland ,qt6-wayland 讓QT程式支援Wayland
- qt5ct, qt6ct 設定QT程式主題
- nwg-look：設定GTK程式主題

## 编辑Hyprland配置

```bash
vim ~/.config/hypr/hyprland.conf
```

```txt
exec-once = fcitx5 -d  --replace


env = GTK_IM_MODULE, fcitx
env = QT_IM_MODULE, fcitx
env = XMODIFIERS, @im=fcitx
```

## Install HyprPanel

- https://hyprpanel.com/getting_started/installation.html

### 安装aylurs-gtk-shell-git报错

可能是npm网络问题，设置下代理即可

```bash
npm config set proxy=http://127.0.0.1:7890
```

# Backup

```bash
sudo pacman -S timeshift grub-btrfs
```

```bash
sudo -E timeshift-gtk
```
