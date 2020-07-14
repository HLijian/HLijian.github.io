var boxSet = document.querySelector('.box_Set')
var boxSetNo = document.querySelector('.box_setNo')
var box = document.querySelector('.box')
var lis = document.querySelectorAll('.box_setNo ul li')
var boxContent = document.querySelector('.box_content')
var boxGo = document.querySelectorAll('.box_go')
var boxSetDa = false;
var sum = 0;
boxSet.onclick = function() {
	if (boxSetDa === false) {
		boxSetNo.style.display = 'block'
		boxSetDa = true
	} else {
		boxSetNo.style.display = 'none'
		boxSetDa = false
	}
}
//设置背景颜色
for (var i = 0; i < lis.length; i++) {
	// 鼠标点击事件
	lis[i].onclick = function() {
		sum = this.getAttribute('indexes')
		for (var j = 0; j < lis.length; j++) {
			lis[j].style.border = '#d8d8d8 solid 1px';
			lis[j].setAttribute('index', 1)
		}
		if (this.getAttribute('index') == 1&&this.getAttribute('indexes') <7) {
			this.style.border = '#e95252 solid 1px'
			this.setAttribute('index', 2)
			boxSetNo.style.background = '#fff'
			for(var k = 0 ; k <boxGo.length;k++){
				boxGo[k].style.color = '#000'
			}
			boxContent.style.color = '#000'
			boxSet.style.backgroundColor='rgba(255,255,255,.3)'
			boxSet.style.boxShadow = '0px 1px 10px 0.1px rgba(255, 255, 255, .2)'
			box.style.backgroundColor = this.getAttribute('backOne')
			boxContent.style.backgroundColor = this.getAttribute('backTwo')
			boxSet.setAttribute('index',1)
		}else if(this.getAttribute('index') == 1&&this.getAttribute('indexes') ==7){
			this.style.border = '#e95252 solid 1px'
			this.setAttribute('index', 2)
			box.style.backgroundColor = this.getAttribute('backOne')
			boxContent.style.backgroundColor = this.getAttribute('backTwo')
			boxContent.style.color = '#999999'
			for(var k = 0 ; k <boxGo.length;k++){
				boxGo[k].style.color = '#999999'
			}
			boxSetNo.style.background = '#222222'
			boxSet.style.background = '#222222'
			boxSet.style.boxShadow = '0px 1px 10px 0.1px rgba(0, 0, 0, 1)'
			boxSet.setAttribute('index',2)
		}
	}

	// 鼠标移上事件
	lis[i].onmouseover = function() {
		if (this.getAttribute('index') == 1) {
			for (var j = 0; j < lis.length; j++) {
				if(sum==j&&sum<8){
					j=j+1
					console.log(1)
				}
				lis[j].style.border = '#d8d8d8 solid 1px';
			}
			this.style.border = '#e95252 solid 1px'
		}
	}
	// 鼠标移出事件
	lis[i].onmouseout = function() {
		if (this.getAttribute('index') == 1) {
			this.style.border = '#d8d8d8 solid 1px'
		}
	}
}

boxSet.onmouseover =function(){
	if(boxSet.getAttribute('index')==1){
		boxSet.style.backgroundColor="rgba(255,255,255,.6)";

	}
}

boxSet.onmouseout =function(){
	if(boxSet.getAttribute('index')==1){
		boxSet.style.backgroundColor="rgba(255,255,255,.3)";
	}
}
