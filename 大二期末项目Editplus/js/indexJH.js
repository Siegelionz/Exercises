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
 