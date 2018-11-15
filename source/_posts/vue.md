---
title: 记录vue开发遇到的问题
date: 2018-10-23 15:44:54
tags:
	- 导航
categories: vue
---

### 记录vue开发遇到的问题

- 计算屏幕的高度


		<script>
		 data(){
			return {
		      culWidth:0
			}
		}	
		 beforeMount() {
		        var h = document.documentElement.clientHeight || document.body.clientHeight;
		        this.curHeight =h - 60 +'px'; //减去页面上固定高度height
		        console.log(this.curHeight)
		  }
		</script>


- 轮番发请求

平时需要每经过多少秒就向后台请求数据

1. 解决方式: 尝试递归, 成功回调设置间隔时间再次发请求

		getData(){
		 let self = this
		 let axiosURL= '请求地址'
		 self.axios(axiosURL, params).then(res => {
		 if (res.data.status) {
			console.log("请求成功")
			setTimeout(()=>{
				self.getData()
			},5000)
			} else {
				console.log("请求失败")
				return
			}	
		})	 
		}

- 并发请求

有时候我们需要在一个方法里面进行多个请求
		
		created(){
		    
		      this.$axios.all([this.getBanner(), this.getDesign()])
		        .then(this.$axios.spread(function (a, b) {
		          // 两个请求现在都执行完成
		          console.log(b);
		          console.log(a);
		        }));	
		    },
		    methods: {
		      getBanner() {
		        return this.$axios.get('Api/getBanner');
		      },
		      getDesign() {
		        return this.$axios.get('Index/design');
		      }
		    }

axios.all([]) 返回的结果是一个数组，使用 axios.spread 可将数组 [res1,res2] 展开为 res1, res2

