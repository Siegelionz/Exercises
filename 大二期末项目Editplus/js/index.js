var aList=document.getElementsByClassName("list");
var aUl=document.getElementsByClassName("ul");
		for(var i=0;i<aList.length;i++){
			aList[i].index=i
			aList[i].onmouseover=function(){
				aUl[this.index].style.display="block";
				aUl[this.index].style.backgroundColor="#f1f1f1"
			}
			aList[i].onmouseout=function(){
				aUl[this.index].style.display="none";
			}
		}
var oCarousel=document.getElementById("carousel");
var aImg=oCarousel.getElementsByTagName("img");
var aLi=oCarousel.getElementsByTagName("li");
	var curIndex = 0;
	var timer=null;
	var arr = new Array();
    arr[0] = "img/KX49-1920-800.jpg"; 
    arr[1] = "img/创维官网-1920X800.jpg"; 
    arr[2] = "img/官网电商1920X800.jpg"; 
    arr[3] = "img/彩电官网1920X800.jpg"; 
    arr[4] = "img/金币活动20170421.jpg"; 
	timer=setInterval(function(){
		if (curIndex == arr.length-1) { 
			curIndex = 0; 
		} else { 
			curIndex += 1; 
		} 
		aImg[0].src = arr[curIndex]; 
		},3000);
for(var i=0;i<aLi.length;i++){
	aLi[i].index=i;
	aLi[i].onmouseover=function(){
		for(var j=0;j<aLi.length;j++){
			aImg[j].style.display="none";
		}
		aImg[this.index].style.display="inline-block";
		aLi[this.index].style.backgroundColor="#0168B7";
		aLi[this.index].style.cursor="pointer";
	}
	aLi[i].onmouseout=function(){
		aLi[this.index].style.backgroundColor="#cfcdd0";
		aImg[this.index].style.display="none";
		aImg[0].style.display="block";
		
	}
}
oCarousel.onmouseover=function(){
	clearInterval(timer);
	oCarousel.style.cursor="pointer";
}
oCarousel.onmouseout=function(){
	timer=setInterval(function(){
		if (curIndex == arr.length-1) { 
			curIndex = 0; 
		} else { 
			curIndex += 1; 
		} 
		aImg[0].src = arr[curIndex]; 
		},3000);
}
/*
for循环出现两个判断条件  3种写法(好像都不对)！！！
for(var i=0,j=1;i<aImg.length,j<aImg.length;i++,j++){
		fn1(i,j);
}
for(var i=0,j=1;(i<aImg.length)&&(j<aImg.length);i++,j++){
		fn1(i,j);
}
for(var i=0;i<aImg.length;i++){
	for(var j=1;j<aImg.length;j++){
		fn1(i,j);
	}
}
错误代码，如果想让图片定时滚动，不能使用下面的display来调，根本行不通，只能滚动一次，然后进入死窟窿里
只能用offsetleft来调，用图片left让其滚动。
setInterval(function(){
			aImg[0].style.display="none";
			aImg[1].style.display="block";
		setInterval(function(){
				aImg[1].style.display="none";
				aImg[2].style.display="block";
			setInterval(function(){
					aImg[2].style.display="none";
					aImg[3].style.display="block";
				setInterval(function(){
						aImg[3].style.display="none";
						aImg[4].style.display="block";
					},1000);
				},1000);
			},1000);
		},1000);

*/
var ocenter=document.getElementById("center");
var alistli=ocenter.getElementsByTagName("li");
var alistimg=ocenter.getElementsByTagName("img");
var ocontent=document.getElementById("content");
var alistcontent=ocontent.getElementsByClassName("list-1");
for(var i=0;i<alistimg.length;i++){
	alistli[i].index=i;
	alistli[i].onmouseover=function(){
		for(var j=0;j<alistimg.length;j++){
			<!-- alistimg[j].style.border="0"; -->
		alistimg[this.index].style.borderTop="10px solid transparent";
		alistimg[this.index].style.borderLeft="1px solid transparent";
		alistimg[this.index].style.borderRight="1px solid transparent";
		alistimg[this.index].style.borderBottom="3px solid transparent";
		alistcontent[j].style.display="none";
		}
		alistimg[this.index].style.borderTop="10px solid #3378ea";
		alistimg[this.index].style.borderLeft="1px solid #a29fa4";
		alistimg[this.index].style.borderRight="1px solid #a29fa4";
		alistimg[this.index].style.borderBottom="3px solid #a29fa4";
		alistcontent[this.index].style.display="block";
	}
	alistli[i].onmouseout=function(){
		<!-- alistimg[this.index].style.border="0"; -->
		alistimg[this.index].style.borderTop="10px solid transparent";
		alistimg[this.index].style.borderLeft="1px solid transparent";
		alistimg[this.index].style.borderRight="1px solid transparent";
		alistimg[this.index].style.borderBottom="3px solid transparent";
	};
};