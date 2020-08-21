$(function() {
	
	// 下拉列表
	function pullDown(){
		var str = "true"
		$('.BtnCss').click(function() {
			if ($(this).attr('data-blo') == "true") {
				console.log(1)
				for (var i = 0; i < $('.BtnCss p').length; i++) {
					$('.BtnCss p').eq(i).html('&#xe638;')
					$('.BtnCss').eq(i).attr('data-blo', "true")
				}
				$(this).children('p').html('&#xe62c;')
				$(this).attr('data-blo', "false")
				str = "false";
		
			} else {
				if (str == "true") {
					$(this).children('p').html('&#xe62c;')
					str = "false";
		
				} else {
					$(this).children('p').html('&#xe638;')
					str = "true";
					$(this).attr('data-blo', "true")
				}
			}
		
		
		
		})
	}
	
	//回到顶部按钮的滚动显示判断
	function opac(){
		$('.returnTop').click(function() {
			animated_scroll(window, 0)
		})
		var topY = $(document).scrollTop();
		var NavTopY = $('.figOneNav').offset().top;
		if(topY<NavTopY){
			$('.returnTop').css({
				'opacity':0,
				'transition': 'none',
			})
			
		}else{
			$('.returnTop').css({
				'opacity':1,
				'transition': 'none',
			})
		}
		$(window).scroll(function() { 
			topY = $(document).scrollTop();
			if(topY>=NavTopY){
				$('.returnTop').css({
					'opacity':1,
					'transition': 'all 1s',
				})
			}else{
				$('.returnTop').css({
					'opacity':0,
					'transition': 'all 1s',
				})
			}
		
		})
	}
	pullDown()
	opac()
	
	var headBlo = true;
	var sum = 0;
		$('.headBtn').click(function(){
			
			if(headBlo==true){
				sum = $(document).scrollTop();
				$(this).html('&#xe61a;')
				$('.menuList').css({
					'left':'0',
				})
				$('body').css({
					'backgroundColor':'#f8f8f8',
				})
				setTimeout(function(){
					$('.boxHome').css({
						'position': 'absolute',
						'left':'-100%',
					})
				},500)

				headBlo=false;
			}else{
				
				$(this).html('&#xe655;')
				headBlo=true;
				$('body').css({
					'backgroundColor':'#fff',
				})
				$('.boxHome').css({
					'position': 'relative',
					'left':'0',
				})
				$(document).scrollTop(sum)
				$('.menuList').css({
					'left':'100%',
				})
				
			}
		})
		

	
	
	
})
