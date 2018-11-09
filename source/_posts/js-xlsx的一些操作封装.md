---
title: js-xlsx的一些操作封装
date: 2018-11-09 15:55:13
tags:
	- 导航
	- javascript
	- xlsx
categories: node.js
---

### js-xlsx的一些常用封装

- 从excel文件中获取头，返回数组
		
		// get head from excel file,return array
		// 从excel文件中获取头，返回数组
		function get_header_row(sheet) {
		    const headers = []
		        /*
		         sheet1['!ref']　获取工作薄的有效范围　'A1:C20'
		         XLSX.utils.decode_range 将有效范围转为　range对象
		         range: {s: {r:0, c:0}, e: {r:10, 3}}
		         */
		    const range = XLSX.utils.decode_range(sheet['!ref']) 
		    // worksheet['!ref'] 是工作表的有效范围
		    let C
		    /* 获取单元格值 start in the first row */
		    const R = range.s.r //行 //C 列
		    for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
		        //{c:C,r:R} 单元格地址
		        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* 根据地址得到单元格的值find the cell in the first row */
		        var hdr = 'UNKNOWN ' + C // <-- 替换为您想要的默认值replace with your desired default
				//XLSX.utils.format_cell 生成单元格文本值
		        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
		        headers.push(hdr)
		    }
		    return headers
		}

- 读取excel的表头和表数据

		/*
		* 读取excel的表头和表数据
		 */
		export const read = (data, type) => {
		    /* if type == 'base64' must fix data first */
		    // const fixedData = fixdata(data)
		    // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
		    const workbook = XLSX.read(data, { type: type });//解析数据
		    const firstSheetName = workbook.SheetNames[0];//获取Sheets中第一个Sheet的名字
		    const worksheet = workbook.Sheets[firstSheetName];//获取第一个Sheet的数据
		    const header = get_header_row(worksheet);//获取表的第一行为表头
		    const results = XLSX.utils.sheet_to_json(worksheet); //表格对象变为json数据
		    return {header, results};
		}

- 针对base64的数据提前处理

		// fix data,return string
		function fixdata(data) {
		    let o = ''
		    let l = 0
		    const w = 10240
		    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
		    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
		    return o
		}

- 表格转excle

	export const export_table_to_excel= (id, filename) => {
	    const table = document.getElementById(id);
	    const wb = XLSX.utils.table_to_book(table);
	    XLSX.writeFile(wb, filename);
	
	    /* the second way */
	    // const table = document.getElementById(id);
	    // const wb = XLSX.utils.book_new();
	    // const ws = XLSX.utils.table_to_sheet(table);
	    // XLSX.utils.book_append_sheet(wb, ws, filename);
	    // XLSX.writeFile(wb, filename);
	}
