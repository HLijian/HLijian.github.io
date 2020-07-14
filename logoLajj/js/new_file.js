$('.box_checkOne').click(function(event) {
	console.log($('.box_checkOneNo').css('left'))
	if ($('.box_checkOneNo').css('left')=='-50px'){
	$('.box_checkOne').css({'backgroundColor':'#75b936'})
		$('.box_checkOne .box_checkDian').animate({
			'left': '53px'
		},140)
		$('.box_checkOneOff').animate({
			'left': '116px'
		},200)
		$('.box_checkOneNo').animate({
			'left': '22px'
		},200)
	
	$('.box_checkOne input').val('ON')
	} else {
		$('.box_checkOne').css({'backgroundColor':'#b2b2b2'})
		$('.box_checkOne .box_checkDian').animate({
			'left': '3px'
		},140)
		
		$('.box_checkOneNo').animate({
			'left': '-50px'
		},200)

		$('.box_checkOneOff').animate({
			'left': '36px'
		},200)
		$('.box_checkOne input').val('OFF')
	}

})

$('.box_checkSan').click(function(event) {
	if ($('.box_checkSanNo').css('left')=='-50px'){
	$('.box_checkSan').css({'backgroundColor':'#75b936'})
		$('.box_checkSan .box_checkSanDian').animate({
			'left': '53px'
		},140)
		$('.box_checkSanOff').animate({
			'left': '114px'
		},200)
		$('.box_checkSanNo').animate({
			'left': '22px'
		},200)
	
	$('.box_checkSan input').val('ON')
	} else {
		$('.box_checkSan').css({'backgroundColor':'#b2b2b2'})
		$('.box_checkSan .box_checkSanDian').animate({
			'left': '3px'
		},140)
		
		$('.box_checkSanNo').animate({
			'left': '-50px'
		},200)

		$('.box_checkSanOff').animate({
			'left': '36px'
		},200)
		$('.box_checkSan input').val('OFF')
	}
})

$('.box_right form label').click(function(){
	$('.box_right form label').each(function(index, element) {
		var isChecked = $(element).find('input').prop('checked')
		if (isChecked) {
			$(element).css({'backgroundColor':'#75b936'})
			$(element).children("span").animate({
				'left': '53px'
			},140)
			
			$(element).children("div.No").animate({
				'left': '22px',
			},200)
			
			$(element).children("div.Off").animate({
				'left': '114px'
			},200)
			$(element).children("input").val('ON')
		} else {
			$(element).css({'backgroundColor':'#b2b2b2'})
			$(element).children("span").animate({
				'left': '3px'
			},140)
			
			$(element).children("div.No").animate({
				'left': '-50px'
			},200)
			
			$(element).children("div.Off").animate({
				'left': '36px'
			},200)
			$(element).children("input").val('OFF')
		}
	})
	
})