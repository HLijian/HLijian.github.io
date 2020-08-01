$('.box_topFold img').eq(0).click(function() {
	$('.box_topLeNav').css({
		'left': 0
	})
	
	$('.sp_hidd').css({
		'display': 'none'
	})
	$('.None').css({
		'display': 'none'
	})
		
	setTimeout(function() {
		$('.box_topHidd').css({
			'position': 'fixed',
			'backgroundColor':'#fff'
		})
		$('.box_hiddConBon').css({
			'position': 'fixed',
			'backgroundColor':'#fff'
		})
		// $('.box_topLeNav ').css({
		// 	'position': 'fixed',
		// 	'backgroundColor':'#fff'
		// })
	}, 100)

})

$('.box_topClose').click(function() {
	$('.box_topHidd').css({
		'position': 'absolute',
		'backgroundColor':'#fff'
	})
	$('.box_topLeNav').css({
		'left': '-100%'
	})
	$('.box_hiddConBon').css({
		'position': 'absolute',
		
	})
	$('.sp_hidd').css({'display': 'block'
	})
	$('.None').css({
		'display': 'block'
	})
})

$('.TabUl li').click(function(){
	let spans = document.querySelector(".rm")
		spans.classList.remove("rm")
	$($(this).children('span')).attr('class','rm')
	let liIndex = $('.TabUl li').index(this)
	let introduceUl = document.querySelectorAll('.introduce_tabSpZ ul')
	for(let i = 0 ; i < introduceUl.length ; i++){
		introduceUl[i].style.display="none"
	}
	introduceUl[liIndex].style.display="block"
	
})

$('.end_topNav .clic').click(function(){
	if($(window).width()<=767){
		let pLength = document.querySelectorAll('.end_topNav a p')
		let imgLength = document.querySelectorAll('.end_topNav a h5 .imgDeg')
		if($(this).attr('data')=="0"){
			for(let i = 0 ; i < pLength.length; i++){
				pLength[i].style.display = 'none'
			}
			for(let i = 0 ; i < imgLength.length; i++){
				$('.imgDeg').eq(i).css({
					"transform":" rotate(180deg)"
				})
			}
			$(this).siblings().children('p').css({
				'display':'block',
				
			})
			$(this).children('h5').children('span').css({
				"transform":"rotate(0deg)"
				
			})
			$(this).attr("data","1")
		}else{
			$(this).siblings().children('p').css({
				'display':'none',
			})
			$(this).children('h5').children('span').css({
				"transform":"rotate(180deg)"
			})
			$(this).attr("data","0")
		}
		
	}
})

$('.fh').click(function() {
	animated_scroll(window, 0)
})