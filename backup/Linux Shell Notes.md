## 关于 `kill` 命令与常用的信号列表

### `kill` 的用法

> kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]

### 常用信号

| 信号    | 信号数值 | 信号说明                                                     |
| ------- | -------- | ------------------------------------------------------------ |
| SIGHUP  | 1        | 终端断线                                                     |
| SIGINT  | 2        | 中断（同 Ctrl + C），与 SIGTERM 类似                         |
| SIGQUIT | 3        | 退出（同 Ctrl + \），进程退出时会产生 core 文件（dump core） |
| SIGKILL | 9        | 强制终止，本信号不能被阻塞、处理和忽略                       |
| SIGTERM | 15       | 终止，该信号可以被阻塞和处理                                 |
| SIGCONT | 18       | 继续（与 STOP 相反）                                         |
| SIGSTOP | 19       | 暂停（同 Ctrl + Z）                                          |

### Tips

- init进程是不可杀的。init进程是由内核启动的用户级进程，它始终是第一个进程（其进程编号始终为1）。 其它所有进程都是init进程的子孙。

- 使用 `kill 0` 来终止所有由当前shell启动的进程，包括后台进程。

- `kill -0 pid`  用于检测是否有权限给进程发送信号。例如：`$ if ! kill -0 $(pgrep sleep); then echo "You're weak!"; fi`
### 参考

- [linux kill命令详解 - 飘飘雪 - 博客园](https://www.cnblogs.com/wangcp-2014/p/5146343.html)

- [Linux信号列表详解_LINUX_操作系统_脚本之家](http://www.jb51.net/LINUXjishu/173601.html)

- [Linux Signals help](https://www.computerhope.com/unix/signals.htm)

- [process - What does kill 0 do actually? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/67532/what-does-kill-0-do-actually)

- [What does `kill -0` do? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/169898/what-does-kill-0-do)
