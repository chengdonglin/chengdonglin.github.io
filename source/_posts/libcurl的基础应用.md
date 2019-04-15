---
title: libcurl的基础应用
date: 2019-04-04 16:54:51
tags:
	- 导航
	- c++
categories: c++
---


### libcurl应用笔记

#### 常规字段post


特别注意:

    libcurl发送的url类型必须是const char* 类型,否则会出错.如果是string的类型,会出现无法解析host name.



##### 封装案例的方法:
	
		bool clientPostNormal(const char* url, add_slice &s) {
			CURL *curl;
			CURLcode res;
			/* In windows, this will init the winsock stuff */
			curl_global_init(CURL_GLOBAL_ALL);
			/*get a curl handle*/
			curl = curl_easy_init();
			if (curl) {
				/* First set the URL that is about to receive our POST. This URL can
				just as well be a https:// URL if that is what should receive the
				data. */
				curl_easy_setopt(curl, CURLOPT_URL, url);
				string postData = "bussinessId=" + s.bussinessId + "&"+"localSlideId="+s.localSlideId+"&"+"localSlideName="+s.localSlideName+"&"\
					"localSlideCode="+s.localSlideCode+"&"+"width="+std::to_string(s.width)+"&" + "height="+std::to_string(s.height)+"&"+"scale="+std::to_string(s.scale)+"&"\
					"slideType="+s.slideType+"&"+"ihcItem="+s.ihcItem;
				/* Perform the request, res will get the return code */
				//cout << url << endl;
				//cout << postData << endl;
				curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData);
				res = curl_easy_perform(curl);
				/*Check for errors*/
				if (res != CURLE_OK) {
					fprintf(stderr, "curl_easy_perform() failed: %s\n",
						curl_easy_strerror(res));
					/* always cleanup */
					curl_easy_cleanup(curl);
					return false;
				}
				curl_global_cleanup();
				return true;
			}
		}

	方法的使用:
		addSlice as;
		as.bussinessId = "we34";
		as.height = 40000;
		as.ihcItem = "ryt4";
		as.localSlideCode = "ighirbn";
		as.localSlideId = "ebgjkbgj";
		as.scale = 40;
		as.slideType = "hpc";
		as.width = 44444444;
		const char* url = "http://111.200.54.118:8080/slide/addSlide";
		bool res = clientPostNormal(url, as);
		cout << 1 << endl;
		cout << res << endl;



#### form-data上传



> 特别要注意,在使用curl_formadd的时候,字段的值必须为char*类型.


##### 代码

	
	int clientPostTile3(tile_form t,const char* pc, long length) {
		CURL* easy_handle;
		CURLcode res;
		curl_slist* http_headers = NULL;
		CURLcode code;
		code = curl_global_init(CURL_GLOBAL_ALL);
		if (CURLE_OK != code)
		{
			std::cerr << "init libcurl failed: " << code << std::endl;
			return -1;
		}
		/*http_headers = curl_slist_append(http_headers, "Content-Type:multipart/form-data");
		http_headers = curl_slist_append(http_headers, "Connection:keep-alive");
		http_headers = curl_slist_append(http_headers, "Charset:UTF-8");*/
		curl_httppost *formpost = NULL;
		curl_httppost *lastptr = NULL;
		curl_formadd(&formpost, &lastptr, 
			CURLFORM_COPYNAME, "localSliceId", 
			CURLFORM_COPYCONTENTS,t.localSliceId.c_str() , CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "x",
			CURLFORM_COPYCONTENTS, std::to_string(t.x).c_str(), CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "y",
			CURLFORM_COPYCONTENTS, std::to_string(t.y).c_str(), CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "xPos",
			CURLFORM_COPYCONTENTS, std::to_string(t.xPos).c_str(), CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "yPos",
			CURLFORM_COPYCONTENTS, std::to_string(t.yPos).c_str(), CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "width",
			CURLFORM_COPYCONTENTS, "0", CURLFORM_END);
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "height",
			CURLFORM_COPYCONTENTS, "0", CURLFORM_END);
		//上传buffer数据
		curl_formadd(&formpost, &lastptr,
			CURLFORM_COPYNAME, "tileData",//上传的字段
			CURLFORM_BUFFER, "tileData",//服务端字段
			CURLFORM_BUFFERPTR, pc,//内存中binary数据
			CURLFORM_BUFFERLENGTH, length,//pc数据长度
			CURLFORM_END);
		easy_handle = curl_easy_init();
		curl_easy_setopt(easy_handle, CURLOPT_URL, t.url.c_str());
		curl_easy_setopt(easy_handle, CURLOPT_POST, 1);
		curl_easy_setopt(easy_handle, CURLOPT_VERBOSE, 0);          //是否输出通信数据，如果是http，请求头/响应头信息也会输出
		curl_easy_setopt(easy_handle, CURLOPT_HEADER, 0);
		curl_easy_setopt(easy_handle, CURLOPT_HTTPHEADER, http_headers);
		curl_easy_setopt(easy_handle, CURLOPT_HTTPPOST, formpost);
		res = curl_easy_perform(easy_handle);
		curl_slist_free_all(http_headers);
		curl_formfree(formpost);
		curl_easy_cleanup(easy_handle);
		curl_global_cleanup();
		if (res != CURLE_OK)
		{
			std::cerr << "curl_easy_perform failed:" << res << std::endl;
			return -1;
		}
		else {
			return 0;
		}
	}


#### 多线程问题

> `CURLcode code = curl_global_init(CURL_GLOBAL_ALL);`
> `curl_global_cleanup();`

这两两个函数的初始化工作提升至主线程操作
