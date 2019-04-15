---
title: spdlog日志库
date: 2019-04-15 14:13:33
	- 导航
    - c++
categories: c++
---



### 轻量级spdlog日志库

#### 优点

1. 快速
2. 轻量
3. 无需编译

#### 使用

1. 从github上下载源码:

		https://github.com/gabime/spdlog

2. 在目标ｃ＋＋工程的工程属性包含目录配置

	在头文件include对应的类型即可

#### 案例:写入到文件

1. 全局头文件

		#include"spdlog/sinks/basic_file_sink.h"
		using namespace std;
		
		auto my_logger = spdlog::basic_logger_mt("file_logger", "logs/basic-log.txt");

2. 在需要用到的地方

		my_logger->info("message")

#### 参考官方提供的example

	https://github.com/gabime/spdlog/tree/v1.x/example