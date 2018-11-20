---
title: Table自定义序号
date: 2018-11-20 17:12:15
tags:
	- 导航
    - iview
categories: vue
---


### Table自定义序号


	columns: [
	         {
	         type: 'index',
	         width: 60,
	         align: 'center',
	         indexMethod: (row) => {
	         return (row._index + 1) + (this.size * this.current) - this.size;
			//this.size是当前table显示的页数, current是当前处在的页数
	         }
	         },
	         {
	         title: '姓名',
	         key: 'name'
	         }
	         ],
