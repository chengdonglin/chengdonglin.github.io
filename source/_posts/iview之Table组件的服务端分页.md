---
title: iview之Table组件的服务端分页
date: 2018-11-20 17:02:16
tags:
	- 导航
    - iview
categories: vue
---


### iview之Table组件的服务端分页

Table组件常常用来展示信息,如果服务端的记录太多,一次性返回前端进行处理就不合适了,那么服务端分页就是比较合理

####  template

	<Table :columns="columns" :data="data" :loading="loading" border size="small"></Table>
    <div style="text-align: right;margin: 16px 0">
      <Page :total="pageConfig.total" size="small"  :page-size-opts= "pageConfig.pageOptions" show-elevator show-sizer 
        @on-change="getTableData"
        :current.sync="pageConfig.current"
        @on-page-size-change="handleChangeSize"
      />
    </div>

#### script
	
	//data
	pageConfig:{
	          total:100,//默认
	          size:10,
	          current:1,
	          pageOptions:[10,30,50,100],
	        },
	//methods
	handleChangeSize (val) {//切换页码的回调,得到每页要显示的值
	                this.pageConfig.size = val;
	                console.log(this.pageConfig.size)
	                 this.$nextTick(() => {
	                     this.getTableData();
	                 });
	            },
	//向后端发请求
	 getTableData(){
       // console.log(this.pageConfig.current)//点击页码切换
        // console.log(this.pageConfig.size)//显示的条数
        this.axios.get(this.$store.state.sysApi+`/custom/getTableData/${this.pageConfig.current}/${this.pageConfig.size}`).then(res => {
          console.log(res.data.aaData)
          this.pageConfig.total = res.data.aaData.length
          this.clientData = res.data.aaData
        })
      },

	//mounted
	this.getTableData()