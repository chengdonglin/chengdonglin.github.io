---
title: Table中render以及renderHeader的应用
date: 2018-11-19 14:13:59
tags:
	- 导航
categories: vue
---


### title: Table中render以及renderHeader的应用

通常在table中,我们要控制表格的显示,那么render函数将其非常重要


例子: 表格某一列的下拉控制

	{
	            title: "意向产品",
	            key: "fkaCrmProductClassName",
	            align: "center",
	            render:(h,params) =>{
	                var that = this
	                return h('div',[
	                    h('Select',{
	                        props:{
	                            value: that.ConnectTableData.datas[params.index].fkaCrmProductClassName,
	                            'label-in-value':true
	                        },
	                        on:{
	                            'on-change':(value)=>{
	                               params.row.fkaCrmProductClassName = value.label
	                               that.ConnectTableData.datas[params.index] = params.row 
	                            }
	                        }
	                    },[
	                        h('Option',{
	                            props:{
	                                value:"software"
	                            }
	                        },'软件'),
	                        h('Option',{
	                            props:{
	                                value:"hardware"
	                            }
	                        },'硬件'),
	                        h('Option',{
	                            props:{
	                                value:"service"
	                            }
	                        },'服务'),
	                    ])
	                ])
	            }
	          },


另外,在表头我们要进行一些控制,比如添加一行,并可编辑,要采用renderHeader

	 {
	            title: "添加",
	            key: "action",
	            align: "center",
	            renderHeader:(h,colObj) => {
	                var that = this
	                return h('div',[
	                    h('Button',{
	                        props:{
	                            icon:'md-add',
	                            size:'small'
	                        },
	                        on:{
	                            click:()=>{
	                                var obj = {
	                                    crmCustomName:"",
	                                    crmCustomCode:"",
	                                    cityName:"",
	                                    customType:"",
	                                    customOrigin:"",
	                                    customType:"",
	                                    fkaCrmProductClassName:"",
	                                    lastConnectTime:"",
	                                    fkaSysUserName:"",
	                                    timeCreate:"",
	                                }
	                                that.ConnectTableData.datas.push(obj) //表格行
	                            }
	                        }
	                    },"添加")
	                ])
	            },
	            render: (h, params) => {
	                var that = this
	              return h('div', [
	                h('Icon', {
	                  props: {
	                    type: "md-nutrition",
	                    size: "20",
	                    color: 'blue'
	                  },
	                  style: {
	                    marginRight: '5px'
	                  },
	                  on: {
	                    click: () => {
	                      that.handleEdit(params.row)
	                    }
	                  }
	                }),
	                h('Icon', {
	                  props: {
	                    type: "ios-trash",
	                    size: "20",
	                    color: 'red'
	                  },
	                  on: {
	                    click: () => {
	                      that.handleDelete(params.row)
	                    }
	                  }
	                })
	              ])
	            }
	          }



- 通常select的下拉框有很多项,所以需要采用更加简洁的方式

		{
		            title: "所在城市",
		            key: "cityName",
		            align: "center",
		            render: (h, params) => {
		              return h('div', [
		                h('Select', {
		                  props: {
		                    value: this.ConnectTableData.datas[params.index].cityName,
		                    'label-in-value': true
		                  },
		                  on: {
		                    'on-change': (value) => {
		                      params.row.cityName = value.label
		                      this.ConnectTableData.datas[params.index] = params.row
		                    }
		                  }
		                }, [
		                  this.cityNames.map((type)=>{
		                    return h('Option',{
		                      props:{value:type.value}
		                    },type.label)
		                  })
		                  // h('Option', {
		                  //   props: {
		                  //     value: "beijing"
		                  //   }
		                  // }, '北京'),
		                  // h('Option', {
		                  //   props: {
		                  //     value: "shanghai"
		                  //   }
		                  // }, '上海'),
		                  // h('Option', {
		                  //   props: {
		                  //     value: "shenzhen"
		                  //   }
		                  // }, '深圳'),
		                ])
		              ])
		            }
		          },


数据格式:

	cityNames:[{
	          value:'beijing',
	          label:'北京'
	        },{
	          value:'shanghai',
	          label:'上海'
	        },{
	          value:'shenzhen',
	          label:'深圳'
	        }],