var winWind = 0
var str = 1
$('.nav_leftAn').on('click', function() {
	str = 1
	winWind = $(window).width();
	var offLeftLA = $('.nav_sp').offset().left
	if (winWind > 992) {
		$('.nav_sp').css({
			'left': '300px'
		})
		$('.nav_RightAn').css({
			'display': 'block'
		})
		$('.nav_leftAn').css({
			'display': 'none'
		})
	} else if (winWind < 992 && winWind > 768) {
		$('.nav_sp').css({
			'left': '40px'
		})
		$('.nav_RightAn').css({
			'display': 'block'
		})
		$('.nav_leftAn').css({
			'display': 'none'
		})
	} else {
		$('.nav_sp').css({
			'left': '40px'
		})
		$('.nav_RightAn').css({
			'display': 'block'
		})
		$('.nav_leftAn').css({
			'display': 'none'
		})
	}

})

$('.nav_RightAn').click(function() {
	winWind = $(window).width()
	var offLeftRA = $('.nav_sp').offset().left - $('.box_a').width()
	var navSpW = $('.nav_sp').width() - $('.box_a').width
	if (winWind > 992) {
		if (winWind >= 1350) {
			$('.nav_sp').css({
				'left': '60px'
			})
			$('.nav_RightAn').css({
				'display': 'none'
			})
		} else {
			$('.nav_sp').css({
				'left': -offLeftRA + 'px'
			})
			$('.nav_RightAn').css({
				'display': 'none'
			})
		}

		$('.nav_leftAn').css({
			'display': 'block'
		})
	} else if (winWind < 992 && winWind > 768) {
		$('.nav_sp').css({
			'left': offLeftRA + 350 + 'px'
		})
		$('.nav_RightAn').css({
			'display': 'none'
		})
		$('.nav_leftAn').css({
			'display': 'block'
		})
	} else {

		if (winWind <= 501) {
			if (str == 2) {
				$('.nav_RightAn').css({
					'display': 'none'
				})
			}
			str++
			$('.nav_sp').css({
				'left': offLeftRA + (100 / str) + 'px'
			})

		} else {
			$('.nav_sp').css({
				'left': offLeftRA + 100 + 'px'
			})
			$('.nav_RightAn').css({
				'display': 'none'
			})
		}

		$('.nav_leftAn').css({
			'display': 'block'
		})
	}

})
