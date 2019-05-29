---
title: c++文件操作
date: 2019-05-29 08:44:00
tags:
	- 导航
    - c++
categories: c++
---

## c++ 文件操作

- 通常读取文件采用流的形式,但是有时候需要读取至内存,进行数据处理,记录一下采用c++的操作方法.

		filebuf *pbuf;
		ifstream filestr;
		long size;
		char * buffer;
		filestr.open("E:\\学习笔记\\计算机原理.pdf", ios::binary);
		pbuf = filestr.rdbuf();
		//读取文件大小
		size = pbuf->pubseekoff(0, ios::end, ios::in);
		//指针执行的位置, 0 就是文件从头开始
		pbuf->pubseekpos(0, ios::in);
		//创建存储的内存
		buffer = new char[size];
		//写入到buffer
		pbuf->sgetn(buffer, size);
		buffer[size - 1] = '\0';
		filestr.close();

- 详细的filebuf对象的可参考c++源码:

[http://www.cplusplus.com/reference/fstream/filebuf/](http://www.cplusplus.com/reference/fstream/filebuf/ "c++ filebuf对象")
