---
title: Archlinux install Keyd
published: 2024-11-20
description: "Keyd: A key remapping daemon for linux."
tags: [Archlinux, Tool]
draft: false
---

# Install

```bash
sudo pacman -S keyd
```

# Enable and Start

```bash
sudo systemctl enable keyd
sudo systemctl start keyd
```

# Config

Put the following in `/etc/keyd/default.conf`:

```txt
[ids]

*

[main]

# Maps capslock to escape when pressed and control when held.
capslock = overload(control, esc)

# Remaps the escape key to capslock
esc = capslock
```
