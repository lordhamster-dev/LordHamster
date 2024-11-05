---
title: Archlinux with Hyprland
date: 2024-11-05 14:01:38
tags:
  - archlinux
banner: https://cdn.jsdelivr.net/gh/lordhamster-dev/imgs/img/2024/11/05/20241105140322.png
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

- 首先进入Hyprland系统，会自动初始化Hyprland配置,然后`Super + M`退出Hyprland
- `CTRL + ALT + F3`登录命令行系统,修改Hyprland的默认配置，消除警告

## 初始操作

```bash
sudo pacman-key --init
sudo pacman-key --populate archlinux
sudo pacman -Syy archlinux-keyring
```

## 系统时间和 NTP 服务器同步

```bash
sudo timedatectl set-ntp 1
sudo timedatectl status
```

## 安装一些常用的工具包

```bash
sudo pacman -S git vi vim inetutils iproute2 iputils procps-ng psmisc sysfsutils which wget unzip mtr traceroute dnsutils lsb-release ca-certificates bash-completion logrotate openssh less rsync sdl2_ttf sdl2_image
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

# 配置clash

## Install clash

```bash
sudo pacman -S clash
```

## Start clash

```bash
clash
```

会自动下载`Country.mmdb`，失败就多试几次

## 自动启动clash

创建 systemd 配置文件 /etc/systemd/system/clash.service

```bash
sudo vim /etc/systemd/system/clash.service
```

加入以下内容

```txt
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/bin/clash -d /home/lordhamster/.config/clash

[Install]
WantedBy=multi-user.target
```

添加 Clash 至守护进程

```bash
sudo systemctl enable clash
```

立即启动 Clash

```bash
sudo systemctl start clash
```

其他 systemd 命令：

- 重新启动 Clash

```bash
sudo systemctl restart clash
```

- 获取 Clash 日志

```bash
systemctl status clash
# 或者
journalctl -xe

```

> clash配置网页`https://clash.razord.top/`

## 设置shell代理

```bash
export http_proxy=127.0.0.1:7890
export https_proxy=127.0.0.1:7890
export socks_proxy=127.0.0.1:7890
```

> firefox可以通过settings设置代理

# 安装AUR包管理工具yay

```bash
sudo pacman -S base-devel git
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
sudo pacman -S git base-devel
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
yay -S xorg xorg-xwayland xdg-desktop-portal-hyprland xdg-desktop-portal-gtk polkit-kde-agent qt5-wayland qt6-wayland qt5ct qt6ct nwg-look udiskie fcitx5-im fcitx5-pinyin-zhwiki fcitx5-qt fcitx5-gtk fcitx5-chinese-addons
```

這些套件功能如下：

- fcitx5 中文輸入法
- xorg, xorg-xwayland X視窗系統，不是所有程式都支援Wayland。
- xdg-desktop-portal-hyprland, xdg-desktop-portal-gtk 負責檔案選擇器、螢幕共享等功能
- qt5-wayland ,qt6-wayland 讓QT程式支援Wayland
- qt5ct, qt6ct 設定QT程式主題
- nwg-look：設定GTK程式主題
- polkit-kde-agent 密碼驗證對話框
- udiskie 自動掛載隨身碟

## 编辑Hyprland配置

```bash
vim ~/.config/hypr/hyprland.conf
```

```txt
exec-once = fcitx5 -d  --replace
exec-once = /usr/lib/polkit-kde-authentication-agent-1
exec-once = udiskie &


env = GTK_IM_MODULE, fcitx
env = QT_IM_MODULE, fcitx
env = XMODIFIERS, @im=fcitx
```

## Install HyprPanel

- https://hyprpanel.com/getting_started/installation.html

# Backup

```bash
sudo pacman -S timeshift grub-btrfs
```

```bash
sudo -E timeshift-gtk
```
