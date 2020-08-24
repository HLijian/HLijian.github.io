/*
 * @Author: TAO
 * @Date:   2018-11-16 11:25:50
 * @Last Modified by:   TAO
 * @Last Modified time: 2018-11-16 11:33:34
 */




window.onresize = window.onload = function() {
	var w = $(window).width();
	if (w <= 640&&w>=320) {
		var size = 16 * (w / 640);
		$('html').css('fontSize', size + 'px');
	}else if(w>640){
		$('html').css('fontSize','16px');
	}
}
