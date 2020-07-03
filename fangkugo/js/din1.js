var din_a = document.querySelectorAll(".din-1 ul li a");
var din_lis = document.querySelectorAll(".din-1 ul li")
for (i = 0; i < din_a.length; i++) {
	din_a[i].onmouseover = function() {
		for (j = 0; j < din_a.length; j++) {
			din_a[j].removeAttribute("class");
		}
		this.className = "din_wa_a";
	}
	din_a[i].onmouseout = function() {
		this.removeAttribute("class");
	}
	din_lis[i].onclick = function() {
		for (k = 0; k < din_lis.length; k++) {
			din_lis[k].removeAttribute("id")
		}
		this.id = "din_lis";
	}
}

din_a[3].onmouseover = function() {
	this.id = "din_lis2"
}
din_a[3].onmouseout = function() {
	this.removeAttribute("id")
}

var din_wz_2 = document.querySelector(".din-wz-2");
var din_wz_xl1 = document.querySelectorAll(".din_wz_xl1");
var din_wz_xl = document.querySelector(".din_wz_xl");
din_wz_2.onmouseover = function() {
	din_wz_xl.style.display = "block"
	for (i = 0; i < din_wz_xl1.length; i++) {
		din_wz_xl1[i].onmouseover = function() {
			for (j = 0; j < din_wz_xl1.length; j++) {
				din_wz_xl1[j].removeAttribute("id")
			}
			this.id = "din_wz_xl_js";
		}
		din_wz_xl1[i].onmouseout = function (){
			this.removeAttribute("id")
		}
	}
}
din_wz_2.onmouseout = function() {
	din_wz_xl.style.display = "none"
}
