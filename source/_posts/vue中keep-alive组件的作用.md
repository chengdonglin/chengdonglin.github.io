---
title: vue中keep-alive组件的作用
date: 2018-12-05 15:12:34
tags:
	- 导航
    - vue
categories: vue
---

### vue中keep-alive组件的作用

内容来源: https://www.kancloud.cn/hanxuming/vue-iq/

keep-alive:主要用于保存组件状态或避免重新渲染
比如: 有一个列表页面和一个 详情页面，那么用户就会经常执行打开详情=>返回列表=>打开详情这样的话 列表 和 详情 都是一个频率很高的页面，那么就可以对列表组件使用<keep-alive></keep-alive>进行缓存，这样用户每次返回列表的时候，都能从缓存中快速渲染，而不是重新渲染。

#### 属性

	include:字符串或正则表达式。只有匹配的组件会被缓存。
	
	exclude：字符串或正则表达式。任何匹配的组件都不会被缓存。

#### 使用方法

	<!-- 基本 -->
	<keep-alive>
	  <component :is="view"></component>
	</keep-alive>
	
	<!-- 多个条件判断的子组件 -->
	<keep-alive>
	  <comp-a v-if="a > 1"></comp-a>
	  <comp-b v-else></comp-b>
	</keep-alive>
	
	<!-- 和 `<transition>` 一起使用 -->
	<transition>
	  <keep-alive>
	    <component :is="view"></component>
	  </keep-alive>
	</transition>


#### include和exclude属性的使用

include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

	<!-- 逗号分隔字符串 -->
	<keep-alive include="a,b">
	  <component :is="view"></component>
	</keep-alive>
	
	<!-- 正则表达式 (使用 `v-bind`) -->
	<keep-alive :include="/a|b/">
	  <component :is="view"></component>
	</keep-alive>
	
	<!-- 数组 (使用 `v-bind`) -->
	<keep-alive :include="['a', 'b']">
	  <component :is="view"></component>
	</keep-alive>