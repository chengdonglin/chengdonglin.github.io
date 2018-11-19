---
title: docker环境安装
date: 2018-11-19 20:30:26
tags:
	- 导航
    - docker
categories: docker
---



### centos7下docker安装


	sudo yum install yum-utils device-mapper-persistent-data lvm2
	
	 sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
	$sudo yum install docker-ce
	
	 sudo systemctl enable docker
	 sudo systemctl start docker

- 启动

		sudo systemctl start docker

- 开机自启动

		sudo systemctl enable docker

- 查看 Docker 版本的命令

		docker version

- 配置国内镜像源

通过修改 /etc/docker/daemon.json ( 如果文件不存在，你可以直接创建它 ) 这个 Docker 服务的配置文件达到效果。

	{
	    "registry-mirrors": [
	        "https://registry.docker-cn.com"
	    ]
	}

重新启动 docker daemon 来让配置生效

	sudo systemctl restart docker