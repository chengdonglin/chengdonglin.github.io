---
title: c+++l类型转换
date: 2019-04-04 16:41:01
tags:
	- 导航
    - c++
categories: c++
---



## c++string相关操作

### c++中string与char*/char[]之间的转换问题?

场景:结构体char*类型重新输出的时候乱码的解决措施.

方法:把char*类型转换为string


#### 一、string转char*

主要有三种方法可以将str转换为char*类型，分别是：data(); c_str(); copy();

1. data()方法

		string str = "hello";
		const char* p = str.data();//加const  或者用char * p=(char*)str.data();的形式

2. c_str()方法

		 string str=“world”;
		 const char *p = str.c_str();//同上，要加const或者等号右边用char*

3. copy()方法

		 string str="hmmm";
		 char p[50];
		 str.copy(p, 5, 0);//这里5代表复制几个字符，0代表复制的位置，
		 *(p+5)=‘\0’;//注意手动加结束符！！！

#### 二、char * 转string。

1. 直接赋值

		string s;
		char *p = "hello";//直接赋值
		s = p;


#### 三、string转char[]

这个由于我们知道string的长度，可以根据length()函数得到，又可以根据下标直接访问，所以用一个循环就可以赋值了

	string pp = "dagah";
	    char p[8];
	    int i;
	    for( i=0;i<pp.length();i++)
	        p[i] = pp[i];
	    p[i] = '\0';
	    printf("%s\n",p);
	    cout<<p;

#### 四. char[]转string

可以直接赋值

#### 五. unsinged char*转char*

	unsinged char* uStr="xxxxx";
	char* cStr = (char*)uStr;


### 字符串查找与分割

	//查找一个字符在一个字符串中第n次出现的位置
	int findNstPositon(char *str,char c,int n)
	{
		char *p = str;
		int index = 0;
		int count = 0;
	 
		while(*p != '\0')
		{
			if(*p == c)
			{
				count ++;
			}
			if(count < n)
			{
				p++;
				index++;
			}else {
				break;
			}
	 
		}
		return index;
	 
	}
	 
	//以指定的字符分割字符串，并将分割后的字符串组放入vector<string> 中
	void split(const string& src, const string& separator, vector<string>& dest)
	{
		string str = src;
		string substring;
		string::size_type start = 0, index;
		do
		{
			index = str.find_first_of(separator,start);
			if (index != string::npos)
			{    
				substring = str.substr(start,index-start);
				dest.push_back(substring);
				start = str.find_first_not_of(separator,index);
				if (start == string::npos) return;
			}
		}while(index != string::npos);
	 
		//the last token
		substring = str.substr(start);
		dest.push_back(substring);
	}

