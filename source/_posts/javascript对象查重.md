---
title: javascript对象查重
date: 2018-12-20 15:47:12
tags:
---

### javascript对象查重封装
	
	export const checkDup=(array,obj)=>{
	            var value= obj.value;
	            for (var i=0;i<array.length;i++){
	                if(obj ){
	                    if(array[i]){
	                        var value1 = array[i].value;
	                        if(value === value1){
	                            return true;
	                        }
	                    }
	                }
	            }
	        return false;
	}
