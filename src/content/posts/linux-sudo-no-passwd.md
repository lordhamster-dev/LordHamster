---
title: Linux sudo no passwd
published: 2024-11-08
description: "Linux sudo 免密码"
tags: [Linux]
draft: false
---

```bash
sudo visudo
```

- 在%sudo ALL=(ALL:ALL) ALL下添加一行

```bash
username ALL=(ALL:ALL) NOPASSWD:ALL
```

如果是 `nano` 编辑则按如下方式保存

- 之后 `ctrl` + `o` ,然后 `ctrl` + `x`
- 注销重新登录之后，不用再输入sudo密码了。

## Archlinux需要添加如下内容

```bash
Defaults:username      !authenticate
```
