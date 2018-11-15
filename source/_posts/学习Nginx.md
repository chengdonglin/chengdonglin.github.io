---
title: 学习Nginx
date: 2018-11-15 21:53:39
tags:
	- 导航
	- nginx
categories: nginx
---

### 学习Nginx

来源自技术胖,http://jspang.com/post/nginx.html

#### 安装环境搭建

- yum -y install gcc gcc-c++ autoconf pcre-devel make automake
- yum -y install wget httpd-tools vim

#### Nginx源配置安装

- 查看是否有Nginx源

		yum list | grep nginx

- 配置最新源

到官网找稳定版

第一步:到yum文件

	vim /etc/yum.repos.d/nginx.repo

第二步:

	[nginx]
	name=nginx repo
	baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
	gpgcheck=0
	enabled=1

第三步:
赋值完成后，你需要修改一下对应的操作系统和版本号，因为我的是centos和7的版本

	baseurl=http://nginx.org/packages/centos/7/$basearch/

第四步: 安装

	yum install nginx

第五步: 查看是否成功

	nginx -v

#### Nginx基本配置文件

-查看目录位置

	rpm -ql nginx

rpm 是linux的rpm包管理工具，-q 代表询问模式，-l 代表返回列表，这样我们就可以找到nginx的所有安装位置

##### nginx.conf文件解读

	cd /etc/nginx
	vim nginx.conf

文件注释

	#运行用户，默认即是nginx，可以不进行设置
	user  nginx;
	#Nginx进程，一般设置为和CPU核数一样
	worker_processes  1;   
	#错误日志存放目录
	error_log  /var/log/nginx/error.log warn;
	#进程pid存放位置
	pid        /var/run/nginx.pid;
	events {
	    worker_connections  1024; # 单个后台进程的最大并发数
	}
	http {
	    include       /etc/nginx/mime.types;   #文件扩展名与类型映射表
	    default_type  application/octet-stream;  #默认文件类型
	    #设置日志模式
	    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
	                      '$status $body_bytes_sent "$http_referer" '
	                      '"$http_user_agent" "$http_x_forwarded_for"';
	    access_log  /var/log/nginx/access.log  main;   #nginx访问日志存放位置
	    sendfile        on;   #开启高效传输模式
	    #tcp_nopush     on;    #减少网络报文段的数量
	    keepalive_timeout  65;  #保持连接的时间，也叫超时时间
	    #gzip  on;  #开启gzip压缩
	    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件


default.conf 配置项讲解 我们看到最后有一个子文件的配置项，那我们打开这个include子文件配置项看一下里边都有些什么内容。

进入conf.d目录，然后使用vim default.conf进行查看。

	
	server {
	    listen       80;   #配置监听端口
	    server_name  localhost;  //配置域名
	    #charset koi8-r;     
	    #access_log  /var/log/nginx/host.access.log  main;
	    location / {
	        root   /usr/share/nginx/html;     #服务默认启动目录
	        index  index.html index.htm;    #默认访问文件
	    }
	    #error_page  404              /404.html;   # 配置404页面
	    # redirect server error pages to the static page /50x.html
	    #
	    error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
	    location = /50x.html {
	        root   /usr/share/nginx/html;
	    }
	    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
	    #
	    #location ~ \.php$ {
	    #    proxy_pass   http://127.0.0.1;
	    #}
	    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
	    #
	    #location ~ \.php$ {
	    #    root           html;
	    #    fastcgi_pass   127.0.0.1:9000;
	    #    fastcgi_index  index.php;
	    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
	    #    include        fastcgi_params;
	    #}
	    # deny access to .htaccess files, if Apache's document root
	    # concurs with nginx's one
	    #
	    #location ~ /\.ht {
	    #    deny  all;
	    #}
	}

明白了这些配置项，我们知道我们的服务目录放在了/usr/share/nginx/html下，可以使用命令进入看一下目录下的文件。
	
	cd /usr/share/nginx/html
	ls 

- 启动  sudo nginx

- 访问 127.0.0.1:80 就可以看到index.html的内容了


#### Nginx常用的操作

