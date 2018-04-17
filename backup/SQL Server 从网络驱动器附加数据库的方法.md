1. 映射网络驱动器

    在资源管理器中添加网络驱动器，例如：`\\RemoteServerName\ShareName` 。

1. 在 SQL Server 中启用 `xp_cmdshell`

    ```SQL
    EXEC sp_configure 'show advanced options', 1;
    GO
    RECONFIGURE;
    GO

    EXEC sp_configure 'xp_cmdshell',1
    GO
    RECONFIGURE
    GO
    ```

1. 在 SQL Server 中添加网络驱动器

    ```SQL
    EXEC XP_CMDSHELL 'net use H: \\RemoteServerName\ShareName'
    ```

1. [可选]查看添加的网络驱动器

    ```SQL
    EXEC XP_CMDSHELL 'Dir H:'
    ````

1. [可选]附加完成后在SQL Server中删除网络驱动器

    ```SQL
    EXEC XP_CMDSHELL 'net use H: /delete' 
    ````

- 注：对于 SQL Server2008  及更低的版本，需要为SQL Server服务添加 `-T1807` 的启动参数，以允许从网络驱动器附加数据库。添加参数后需重启SQL Server服务。添加方法：

> 1. In SQL Server Configuration Manager, click SQL Server Services.
> 1. In the right pane, right-click SQL Server (<instance_name>), and then click Properties.
> 1. On the Advanced tab, in the Startup Parameters box, type the parameters separated by semicolons (;).

## 参考

- [Make Network Path Visible For SQL Server Backup and Restore in SSMS](https://www.mssqltips.com/sqlservertip/3499/make-network-path-visible-for-sql-server-backup-and-restore-in-ssms/)

- [Description of support for network database files in SQL Server](https://support.microsoft.com/en-us/help/304261/description-of-support-for-network-database-files-in-sql-server)

- [How to: Configure Server Startup Options (SQL Server Configuration Manager)](https://technet.microsoft.com/en-us/library/ms345416(v=sql.100).aspx)

