---
title: Supervisor
published: 2024-11-07
description: ""
tags: [Tool]
draft: false
---

"Supervisor" 是一个进程管理工具，用于监控和管理 Unix 系统上的进程，它允许你启动、停止和重启程序，并在程序崩溃时自动重启，非常适合管理长期运行的进程，如 Web 服务、后台任务等。下面是如何使用 Supervisor 的基本教程：

# 1. 安装 Supervisor

在大多数 Linux 系统上，你可以通过包管理器安装 Supervisor：

```bash
sudo apt-get update
sudo apt-get install supervisor
```

你也可以通过 `pip` 安装 Supervisor：

```bash
pip install supervisor
```

# 2. 配置 Supervisor

安装完成后，Supervisor 的主配置文件通常位于 `/etc/supervisor/supervisord.conf`。你可以添加单独的程序配置文件来管理多个服务。默认的配置目录是 `/etc/supervisor/conf.d/`。

要为你的程序创建配置文件，例如 `my_program.conf`：

```bash
sudo vim /etc/supervisor/conf.d/my_program.conf
```

在配置文件中添加类似以下的内容：

```ini
[program:my_program]
command=/path/to/your_program      ; 程序启动的命令
autostart=true                     ; 系统启动时自动启动
autorestart=true                   ; 程序崩溃时自动重启
stderr_logfile=/var/log/my_program.err.log   ; 错误日志路径
stdout_logfile=/var/log/my_program.out.log   ; 输出日志路径
```

# 3. 管理程序

在你创建好配置文件后，你需要告诉 Supervisor 重新读取配置文件并启动程序：

```bash
sudo supervisorctl reread   # 重新读取配置文件
sudo supervisorctl update   # 更新配置
sudo supervisorctl start my_program   # 启动你的程序
```

其他常用命令：

```bash
sudo supervisorctl stop my_program      # 停止程序
sudo supervisorctl restart my_program   # 重启程序
sudo supervisorctl status               # 查看所有进程的状态
```

# 4. 配置 Supervisor Web 界面（可选）

Supervisor 提供了一个简单的 Web 界面来管理和监控进程。你可以在 `supervisord.conf` 中启用这个功能：

```ini
[inet_http_server]
port=*:9001         ; 绑定端口
username=user       ; 用户名
password=pass       ; 密码
```

启用后，你可以通过浏览器访问 `http://<你的服务器IP>:9001` 来管理进程。

# 5. 日常管理

你可以使用 `supervisorctl` 命令行工具来日常管理你的程序。常见操作包括启动、停止、重启进程，查看日志等。

- **查看日志**：你可以直接通过 Supervisor 的日志功能查看你的程序的运行日志。
  ```bash
  sudo supervisorctl tail my_program stdout  # 查看输出日志
  sudo supervisorctl tail my_program stderr  # 查看错误日志
  ```

Supervisor 非常适合用于在生产环境中管理长时间运行的服务，特别是在需要对程序的崩溃或异常自动重启时。

要使用 Supervisor 停止所有正在运行的进程，可以执行以下命令：

```bash
sudo supervisorctl stop all
```

这个命令会停止 Supervisor 管理的所有进程。

如果你希望停止整个 Supervisor 服务本身（包括停止它管理的所有进程），可以使用以下命令：

```bash
sudo service supervisor stop
```

或者在某些系统上，使用 `systemctl` 来管理 Supervisor 服务：

```bash
sudo systemctl stop supervisor
```

这将停止 Supervisor 及其管理的所有进程。
