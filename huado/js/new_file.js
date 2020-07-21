var shuLeft = 0;

// 封装图片块生成位置
function fn() {
	var slidingRandomX = Math.floor(Math.random() * 75 + 80)
	var slidingRandomY = Math.floor(Math.random() * 160 + 5)
	var sliding_imgX = Math.floor(Math.random() * 45 + 5)
	$('.white_sliding').css({
		'left': slidingRandomX + 'px',
		'top': slidingRandomY + 'px'
	})

	$('.sliding_img').css({
		"top": slidingRandomY + 'px',
		"left": sliding_imgX+'px',
		"backgroundPositionX": -slidingRandomX + 'px',
		"backgroundPositionY": -slidingRandomY + 'px',
		'display': 'block',
	})

	$('.sliding').css({
		"left": sliding_imgX+'px',
	})
	
	shuLeft = parseInt($('.sliding_img').css("left"))
}


// 鼠标按下时触发的事件
function move(){
	$('.sliding').mousedown(function(e) {
		var slidingPageX = e.pageX;
		var slidingOffLeft = $(this).offset().left;
		var slidingPractical = slidingPageX - slidingOffLeft;
		$('.slidingMask').css({
			'display': 'block',
		})
	// 鼠标移动时的事件
		$('.slidingMask').mousemove(function(e) {
			var slidingMaskPageX = e.pageX - 15;
			var slidingMaskPractical = slidingMaskPageX + shuLeft- slidingOffLeft;
			slidingMaskPractical = slidingMaskPractical <= 0 ? 0 : slidingMaskPractical;
			slidingMaskPractical = slidingMaskPractical >= 170 ? 170 : slidingMaskPractical;
			$('.sliding').css({
				"left": slidingMaskPractical  + "px"
			})
	
			$('.sliding_img').css({
				"left": slidingMaskPractical  + "px"
			})
		})
	})
}

function mouseUp(){
	// 鼠标松开时的事件
	$('.slidingMask').mouseup(function(e) {
		$('.slidingMask').css({
			'display': 'none',
		})
		var slidingImgLeft = $('.sliding_img').offset().left;
		var whiteSlidingLeft = $('.white_sliding').offset().left;
		// 判断验证是否通过
		if (whiteSlidingLeft - slidingImgLeft <= 5 &&whiteSlidingLeft - slidingImgLeft >=-5) {
			$('.pass').css({
				'display': 'block',
			})
		} else {
			$('.fail').css({
				'display': 'block',
			})
			setTimeout(function(){
				$('.fail').css({
					'display': 'none',
				})
			},500)
			setTimeout(function(){
				fn()
			},500)	
		}
	})	
}
fn();
move();
mouseUp();
