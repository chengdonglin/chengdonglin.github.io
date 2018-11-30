---
title: electron实现下载进度条
date: 2018-11-30 14:07:54
tags:
	- 导航
    - electron
categories: electron
---


### electron下载进度条

	通过 Electron 中 will-download 事件
	
	mainWindow.webContents.session.on('will-download', (e, item) => {
		//获取文件的总大小
	   const totalBytes = item.getTotalBytes();
		
		//设置文件的保存路径，此时默认弹出的 save dialog 将被覆盖
	   const filePath = path.join(app.getPath('downloads'), item.getFilename());
	   item.setSavePath(filePath);
		
		//监听下载过程，计算并设置进度条进度
	   item.on('updated', () => {
	       mainWindow.setProgressBar(item.getReceivedBytes() / totalBytes);
	   });
		
		//监听下载结束事件
	   item.on('done', (e, state) => {
	   		//如果窗口还在的话，去掉进度条
	       if (!mainWindow.isDestroyed()) {
	           mainWindow.setProgressBar(-1);
	       }
			
			//下载被取消或中断了
	       if (state === 'interrupted') {
	           electron.dialog.showErrorBox('下载失败', `文件 ${item.getFilename()} 因为某些原因被中断下载`);
	       }
			
			//下载完成，让 dock 上的下载目录Q弹一下下
	       if (state === 'completed') {
	           app.dock.downloadFinished(filePath);
	       }
	   });
	});
