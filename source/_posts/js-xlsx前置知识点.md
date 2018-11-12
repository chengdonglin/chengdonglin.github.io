---
title: js-xlsx前置知识点
date: 2018-11-12 10:12:35
tags:
	- 导航
	- javascript
	- xlsx
categories: node.js
---


### js-xlsx

- 安装

		npm install xlsx


#### 一些概念

- workbook
 
指的是整份Excel文档

- worksheet

指Excel文档的表,一份Excel文档包含多张表,每一章表对应的就是worksheet对象

- cell对象

指worksheet的单元格

- 具体如下

		// workbook
		{
		    SheetNames: ['sheet1', 'sheet2'],
		    Sheets: {
		        // worksheet
		        'sheet1': {
		            // cell
		            'A1': { ... },
		            // cell
		            'A2': { ... },
		            ...
		        },
		        // worksheet
		        'sheet2': {
		            // cell
		            'A1': { ... },
		            // cell
		            'A2': { ... },
		            ...
		        }
		    }
		}


#### 基本用法

1. 用 XLSX.read 读取获取到的 Excel 数据，返回 workbook
2. 用 XLSX.readFile 打开 Excel 文件，返回 workbook
3. 用 workbook.SheetNames 获取表名
4. 用 workbook.Sheets[xxx] 通过表名获取表格
5. 用 worksheet[address]操作单元格
6. 用XLSX.utils.sheet_to_json针对单个表获取表格数据转换为json格式
7. 用XLSX.writeFile(wb, 'output.xlsx')生成新的 Excel 文件


#### 具体用法

- 读取Excel文件

		workbook ＝ XLSX.read(excelData, {type: 'base64'});
		workbook ＝ XLSX.writeFile('someExcel.xlsx', opts);

- 获取Excel文件的表

		// 获取 Excel 中所有表名
		var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
		// 根据表名获取对应某张表
		var worksheet = workbook.Sheets[sheetNames[0]];

- worksheet[address]操作表格,以!开头的key是特殊的字段

		// 获取 A1 单元格对象
		let a1 = worksheet['A1']; // 返回 { v: 'hello', t: 's', ... }
		// 获取 A1 中的值
		a1.v // 返回 'hello'
		// 获取表的有效范围
		worksheet['!ref'] // 返回 'A1:B20'
		worksheet['!range'] // 返回 range 对象，{ s: { r: 0, c: 0}, e: { r: 100, c: 2 } }
		// 获取合并过的单元格
		worksheet['!merges'] // 返回一个包含 range 对象的列表，[ {s: { r: 0, c: 0 }, c: { r: 2, c: 1 } } ]

- 获取Excel 文件的表转换为json数据

	
		XLSX.utils.sheet_to_json(worksheet)  //针对单个表，返回序列化json数据

- 生成新的Excel文件

		//服务端通过XLSX.writeFile
		XLSX = require("xlsx");
		XLSX.writeFile(wb, 'output.xlsx')   
		//客服端，只能通过XLSX.write(wb, write_opts) 写入 表格数据，借助FileSaver生成，且只支持在高版本浏览器。
		var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
		var wbout = XLSX.write(wb,wopts);
		function s2ab(s) {
		  var buf = new ArrayBuffer(s.length);
		  var view = new Uint8Array(buf);
		  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		  return buf;
		}
		/* the saveAs call downloads a file on the local machine */
		saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")


#### js-xlsx实战

- 解析Excel生成JSON

		function to_json(workbook) {
			var result = {};
			// 获取 Excel 中所有表名
			var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
			workbook.SheetNames.forEach(function(sheetName) {
				var worksheet = workbook.Sheets[sheetName];
				result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
			});	
			console.log("打印表信息",JSON.stringify(result, 2, 2));  //显示格式{"表1":[],"表2":[]}
			return result;
		}

- 导出表格
- 

1. 构建特定的数据结构,通过new Blob

		// workbook
		{
		    SheetNames: ['mySheet'],
		    Sheets: {
		        'mySheet': {
		            '!ref': 'A1:E4', // 必须要有这个范围才能输出，否则导出的 excel 会是一个空表
		            A1: { v: 'id' },
		            ...
		        }
		    }
		}

2. 调用XLSX.write,借助FIleSaver中的new Blob生成

		var _headers = ['id', 'name', 'age', 'country', 'remark']
		var _data = [ { id: '1',
		                name: 'test1',
		                age: '30',
		                country: 'China',
		                remark: 'hello' },
		              { id: '2',
		                name: 'test2',
		                age: '20',
		                country: 'America',
		                remark: 'world' },
		              { id: '3',
		                name: 'test3',
		                age: '18',
		                country: 'Unkonw',
		                remark: '???' } ];
		var headers = _headers
		                // 为 _headers 添加对应的单元格位置
		                // [ { v: 'id', position: 'A1' },
		                //   { v: 'name', position: 'B1' },
		                //   { v: 'age', position: 'C1' },
		                //   { v: 'country', position: 'D1' },
		                //   { v: 'remark', position: 'E1' } ]
		                .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
		                // 转换成 worksheet 需要的结构
		                // { A1: { v: 'id' },
		                //   B1: { v: 'name' },
		                //   C1: { v: 'age' },
		                //   D1: { v: 'country' },
		                //   E1: { v: 'remark' } }
		                .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
		var data = _data
		              // 匹配 headers 的位置，生成对应的单元格数据
		              // [ [ { v: '1', position: 'A2' },
		              //     { v: 'test1', position: 'B2' },
		              //     { v: '30', position: 'C2' },
		              //     { v: 'China', position: 'D2' },
		              //     { v: 'hello', position: 'E2' } ],
		              //   [ { v: '2', position: 'A3' },
		              //     { v: 'test2', position: 'B3' },
		              //     { v: '20', position: 'C3' },
		              //     { v: 'America', position: 'D3' },
		              //     { v: 'world', position: 'E3' } ],
		              //   [ { v: '3', position: 'A4' },
		              //     { v: 'test3', position: 'B4' },
		              //     { v: '18', position: 'C4' },
		              //     { v: 'Unkonw', position: 'D4' },
		              //     { v: '???', position: 'E4' } ] ]
		              .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
		              // 对刚才的结果进行降维处理（二维数组变成一维数组）
		              // [ { v: '1', position: 'A2' },
		              //   { v: 'test1', position: 'B2' },
		              //   { v: '30', position: 'C2' },
		              //   { v: 'China', position: 'D2' },
		              //   { v: 'hello', position: 'E2' },
		              //   { v: '2', position: 'A3' },
		              //   { v: 'test2', position: 'B3' },
		              //   { v: '20', position: 'C3' },
		              //   { v: 'America', position: 'D3' },
		              //   { v: 'world', position: 'E3' },
		              //   { v: '3', position: 'A4' },
		              //   { v: 'test3', position: 'B4' },
		              //   { v: '18', position: 'C4' },
		              //   { v: 'Unkonw', position: 'D4' },
		              //   { v: '???', position: 'E4' } ]
		              .reduce((prev, next) => prev.concat(next))
		              // 转换成 worksheet 需要的结构
		              //   { A2: { v: '1' },
		              //     B2: { v: 'test1' },
		              //     C2: { v: '30' },
		              //     D2: { v: 'China' },
		              //     E2: { v: 'hello' },
		              //     A3: { v: '2' },
		              //     B3: { v: 'test2' },
		              //     C3: { v: '20' },
		              //     D3: { v: 'America' },
		              //     E3: { v: 'world' },
		              //     A4: { v: '3' },
		              //     B4: { v: 'test3' },
		              //     C4: { v: '18' },
		              //     D4: { v: 'Unkonw' },
		              //     E4: { v: '???' } }
		              .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
		// 合并 headers 和 data
		var output = Object.assign({}, headers, data);
		// 获取所有单元格的位置
		var outputPos = Object.keys(output);
		// 计算出范围
		var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
		// 构建 workbook 对象
		var wb = {
		    SheetNames: ['mySheet'],
		    Sheets: {
		        'mySheet': Object.assign({}, output, { '!ref': ref })
		    }
		};
		// 导出 Excel
		//XLSX.writeFile(wb, 'output.xlsx');
		var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
		var wbout = XLSX.write(wb,wopts);
		function s2ab(s) {
		  var buf = new ArrayBuffer(s.length);
		  var view = new Uint8Array(buf);
		  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		  return buf;
		}
		/* the saveAs call downloads a file on the local machine */
		saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")



- 利用Excel-export生成Excel文件
- 
		
		var express = require('express');
		var nodeExcel = require('excel-export');
		var app = express();
		app.get('/Excel', function(req, res){
		    var conf ={};
		    conf.stylesXmlFile = "styles.xml";
		    conf.name = "mysheet";
		    conf.cols = [{
		        caption:'string',
		        type:'string',
		        beforeCellWrite:function(row, cellData){
		             return cellData.toUpperCase();
		        },
		        width:28.7109375
		    },{
		        caption:'date',
		        type:'date',
		        beforeCellWrite:function(){
		            var originDate = new Date(Date.UTC(1899,11,30));
		            return function(row, cellData, eOpt){
		                if (eOpt.rowNum%2){
		                    eOpt.styleIndex = 1;
		                }  
		                else{
		                    eOpt.styleIndex = 2;
		                }
		                if (cellData === null){
		                  eOpt.cellType = 'string';
		                  return 'N/A';
		                } else
		                  return (cellData - originDate) / (24 * 60 * 60 * 1000);
		            } 
		        }()
		    },{
		        caption:'bool',
		        type:'bool'
		    },{
		        caption:'number',
		         type:'number'              
		    }];
		    conf.rows = [
		        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
		        ["e", new Date(2012, 4, 1), false, 2.7182],
		        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
		        ["null date", null, true, 1.414]  
		    ];
		    var result = nodeExcel.execute(conf);
		    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
		    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
		    res.end(result, 'binary');
		});
		app.listen(3000);
		console.log('Listening on port 3000');


分析生成excel流程：

1. 配置excel文件名conf.name
2. 设置表caption，每列单元格数据类型，宽度
3. 填充表中每行数据conf.rows，nodeExcel.execute生成数据结构，设置头部，拼接生成表


来源: 凹凸实验室（https://aotu.io/notes/2016/04/07/node-excel/）