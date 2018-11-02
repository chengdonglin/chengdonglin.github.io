---
title: vuejs路由在菜单是否显示控制方法
date: 2018-11-02 15:09:45
tags:
	- 导航
    - ES6
    - vue路由
categories: vue
---

### 路由显示控制

#### 路由列表



`

	export const routerMap = [
	    {
	        path: '/',
	        name: 'Main',
	        component: ()=>import('@/view/main/main'),
	        meta: {
	          title: '客户管理系统',
	          icon:'md-apps'
	        },
	        children: [
	          {
	            path: '/sys/enum/list',
	            name: 'sysEnumList',
	            component: ()=>import('@/view/sys/enum/list'),
	            meta: {
	              title: '添加客户',
	              icon:'md-apps',
	              show:true
	            }
	          },
	          {
	            path: '/sys/enum/edit',
	            name: 'sysEnumEdit',
	            component: ()=>import('@/view/sys/enum/edit'),
	            meta: {
	              title: '枚举数据编辑',
	              icon:'md-apps',
	              show:true
	            }
	          },
	          {
	            path: '/sys/func/list',
	            name: 'sysFuncList',
	            component: ()=>import('@/view/sys/func/list'),
	            meta: {
	              title: '功能管理',
	              icon:'md-apps',
	              show:true
	            }
	          }
	        ]
	      },
	      {
	        path:'/menu',
	        name:'menu',
	        component:()=>import('@/view/main/main'),
	        meta:{
	          title:"菜单管理",
	          icon:"md-apps",
	        },
	        children:[
	           {
	              path: 'list',
	              name: 'list',
	              component: ()=>import('@/view/pages/list'),
	              meta: {
	                title: '列表管理',
	                icon:'md-apps',
	                show:true
	              }
	           },
	           {
	            path: 'add',
	            name: 'add',
	            component: ()=>import('@/view/pages/add'),
	            meta: {
	              title: '添加管理',
	              icon:'md-apps',
	              show:false
	            }
	         }
	        ]
	      },
	]
	`

#### 配置页面显示控制列表

	const rules = {  
	        Main:true,
	        sysEnumList:true,
	        sysEnumEdit:true,
	        sysFuncList:true,
	        menu:true,
	        list:true,
	        add:false,
	}



####  路由过滤方法

	export const getAccessRouterList = (route,rule) => {
	    return route.filter(item => {
	        if (rule[item.name]) {
	            if (item.children) item.children = getAccessRouterList(item.children, rule)
	            return true
	        } else return false
	    })
	}