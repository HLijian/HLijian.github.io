var lb_hz = document.querySelector(".lb-hz")
var lb_left = document.querySelector(".lb-left")
var lb_right = document.querySelector(".lb-right")

lb_hz.onmouseover = function() {
	lb_right.style.display = "block"
	lb_left.style.display = "block"
}

lb_hz.onmouseout = function() {
	lb_right.style.display = "none"
	lb_left.style.display = "none"
}

lb_left.onmouseover = function() {
	lb_left.id = "lb_left_gl"
}

lb_right.onmouseover = function() {
	lb_right.id = "lb_right_gl"
}

lb_left.onmouseout = function() {
	lb_left.removeAttribute("id")
}

lb_right.onmouseout = function() {
	lb_right.removeAttribute("id")
}

// var lb_din_lis = document.querySelectorAll(".lb ul li")
// for(i=0; i<lb_din_lis.length;i++){
// 	lb_din_lis[i].onmouseover = function(){
// 		for(j=0; j<lb_din_lis.length;j++){
// 			lb_din_lis[j].removeAttribute("id")
// 		}
// 		this.id= "a1"
// 	}
// }