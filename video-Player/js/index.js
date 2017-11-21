var video = document.querySelector('.video');
var play_btn = document.querySelector('.control_l');
var current_time = document.querySelector('.current_time');
var target_time = document.querySelector('.target_time');
var schedule = document.querySelector('.schedule');
var control_m = document.querySelector('.control_m');
var range = document.querySelector('#range');
video.addEventListener('canplay',function(){
	//判断浏览器是否可以播放  如果可以显示出视频
	this.style.display='block';
	//判断一下当前视频的状态
	play_btn.onclick = function(e){
		e.stopPropagation();
		var status = video.paused;  // ture为暂停模式 fasle为播放模式
		if(status){
			video.play();
		}else{
			video.pause();
		}
		play_btn.classList.toggle('fa-pause');
	}
	//获取视频总时间
	var allTime = video.duration;
	//获取到总时间  把它分为时分秒
	var h = parseInt(allTime/3600);
	var m = parseInt(allTime/60%60);
	var s = parseInt(allTime%60);
	//有时候时间不够10时，我们让它显示为两位数
	h = h>10 ? h : '0'+ h; 
	m = m>10 ? m : '0'+ m; 
	s = s>10 ? s : '0'+ s;
	target_time.innerHTML = h+':'+m+':'+s;

	video.addEventListener('timeupdate',function(){
		//获取当前时间
		var nowTime = video.currentTime;
	
		var h = parseInt(nowTime/3600);
		var m = parseInt(nowTime/60%60);
		var s = parseInt(nowTime%60);
		//有时候时间不够10时，我们让它显示为两位数
		h = h>10 ? h : '0'+ h; 
		m = m>10 ? m : '0'+ m; 
		s = s>10 ? s : '0'+ s;
		current_time.innerHTML = h+':'+m+':'+s;

		//由于我们需要总时间等于进度条的总宽度  当当前时间变化，进度条也随之变化
		//所以我们求出当前时间/总时间的百分比  把这个百分比设置给进度条的宽度
		var step = nowTime/allTime*100 +'%';
		schedule.style.width = step;
	})

	//当我们点击进度条时 获取当前的位置的宽度
	control_m.onclick = function(e){
		var e = e || window.event;
		e.stopPropagation();
		//当点击的时候让进度条到了点击的位置
		// schedule.style.width = e.offsetX + 'px';
		//设置当前播放时间 
		video.currentTime = e.offsetX/this.offsetWidth*allTime;
	}
})
range.addEventListener('change',function(){
	video.volume = this.value/100;
})
