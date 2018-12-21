---
title: img标签由字节buffer转base64显示图片
date: 2018-12-21 16:50:10
tags:
	- 导航
    - electron
categories: electron
---


###  img标签由字节buffer转base64显示图片

	/**
	 *  buffer类型转base64变成dataUrl显示在img标签
	 *
	 * @param {Buffer} buffer     图片buffer
	 * @return {Base64} base64   
	 */
	export const bufferTodataUrl=(buffer)=>{
	    const base64Str = buffer.toString('base64')
	    return 'data:image/jpeg;base64,' + base64Str;
	}


然后img标签的src绑定处理过得得到的base64

