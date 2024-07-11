# 命令备忘录

::: info
对于`brew`安装的插件等需要特定的命令启动该服务，针对于`mac`而记录;
:::

## 🪫 mongodb

[安装地址: https://www.mongodb.com/zh-cn/docs/v6.0/tutorial/install-mongodb-on-os-x/](https://www.mongodb.com/zh-cn/docs/v6.0/tutorial/install-mongodb-on-os-x/)

1. 启动服务
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```
2. 停止服务
   ```bash
   brew services stop mongodb/brew/mongodb-community
   ```

## 🪫 nginx

1. 安装
   ```bash
   brew install nginx
   ```
2. 启动

   ```bash
   brew services start nginx
   ```

3. 停止

   ```bash
   brew services stop nginx
   ```

4. 重启

   ```bash
   brew services restart nginx
   ```

5. 重新加载配置文件

   ```bash
   nginx -s reload
   ```

6. 验证 nginx 配置文件是否正确

   ```bash
   nginx -t
   ```
