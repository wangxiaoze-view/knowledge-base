# 背景

::: info
最近在`mac`上重置了一下开发环境，像一些`数据库，nginx`之前是通过`brew install`下载安装的，如果你使用命令`brew services start nginx`启动它会一直在后台运行，如果用`docker`的话就可以不用`brew services`了，而且`docker`的`nginx`配置文件比`brew`的`nginx`配置文件要简单很多，而且`docker`的`nginx`配置文件可以很方便的映射到`host`的某个端口，这样`host`就可以直接访问`nginx`了。

总之，也算是另外的一种尝试了吧，就是吧所有的服务分小容器运行起来，然后通过`docker-compose`来管理这些容器。这样后期管理卸载安装更加方便。
:::

安装`docker`的话就很简单了，可以直接安装桌面端版本，或者通过命令行安装。[点击下载](https://www.docker.com/)

安装成功之后，可以通过

```bash
docker -v // 查看是否安装成功
```

## 拉取镜像

镜像的拉取比较简单，只需要通过命令`docker pull`即可拉取镜像，比如拉取`nginx`镜像，命令如下：

```bash
docker pull nginx
docker pull nginx:1.21.6
```

## 查看镜像

拉取镜像之后，就可以通过命令`docker images`来查看已经拉取的镜像了，比如

```bash
docker images


REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
mongo        latest    4b372541400c   13 days ago   761MB
nginx        latest    443d199e8bfc   3 weeks ago   193MB
redis        latest    db35fcf47f4b   7 weeks ago   139MB
```

## 运行容器

镜像拉取之后，就可以通过命令`docker run`来运行容器了，比如运行`nginx`容器，命令如下：

```bash
docker run -d -p 80:80 nginx
```

`-d`表示后台运行，`-p`表示映射端口，`80:80`表示将`host`的`80`端口映射到`nginx`的`80`端口，这样`host`就可以直接访问`nginx`了。

## 查看容器

运行容器之后，就可以通过命令`docker ps`来查看已经运行的容器了，比如

```bash
docker ps # 或者 docker container ls -a

CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS                   PORTS                    NAMES
71428fe3e26b   redis     "docker-entrypoint.s…"   50 minutes ago   Up 50 minutes            0.0.0.0:6379->6379/tcp   keen_williams
184730973f68   mongo     "docker-entrypoint.s…"   4 hours ago      Exited (0) 2 hours ago                            cool_shtern
8060b393b482   nginx     "/docker-entrypoint.…"   6 hours ago      Exited (0) 2 hours ago                            suspicious_ishizaka
```

## 停止容器

停止容器可以通过命令`docker stop`来停止容器，比如

```bash
# 8060b393b482 就是容器的id 输入前四位即可
docker stop 8060b393b482 # 或者 docker container stop 8060b393b482
```

停止容器之后，可以通过命令`docker ps`来查看已经停止的容器了；

## 删除容器

删除容器可以通过命令`docker rm`来删除容器，比如

```bash
docker rm 8060b393b482 # 或者 docker container rm 8060b393b482
```

## 启动容器

启动容器可以通过命令`docker start`来启动容器，比如

```bash
docker start 8060b393b482 # 或者 docker container start 8060b393b482
```

## 删除镜像

删除镜像可以通过命令`docker rmi`来删除镜像，比如

```bash
docker rmi nginx:latest # 或者 docker image rm nginx:latest
```

## 删除所有容器

删除所有容器可以通过命令`docker rm -f $(docker ps -aq)`来删除所有容器，比如

```bash
docker rm -f $(docker ps -aq) # 或者 docker container rm -f $(docker container ls -aq)
```

## 删除所有镜像

删除所有镜像可以通过命令`docker rmi -f $(docker images -q)`来删除所有镜像，比如

```bash
docker rmi -f $(docker images -q) # 或者 docker image rm -f $(docker image ls -q)
```

## 删除所有未使用的镜像

删除所有未使用的镜像可以通过命令`docker rmi -f $(docker images -f "dangling=true" -q)`来删除所有未使用的镜像，比如

```bash
docker rmi -f $(docker images -f "dangling=true" -q) # 或者 docker image rm -f $(docker image ls -f "dangling=true" -q)
```

上面就是对`docker`的一些常用命令，希望对大家有所帮助。
