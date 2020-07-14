$(function() {

	//使用js创建歌曲样式，减少代码量
	var song = Song;
	var ullist = document.querySelector('#list')

	function fun() {
		for (var i = 0; i < song.length; i++) {
			var songSum = '<li data-index="' + i + '"data-sum="0">' +
				'<span class="box-listMz">' + song[i].Name + '</span>' +
				'<a href="" class="box-listLog1"></a>' +
				'<a href="" class="box-listLog2"></a>' +
				'<a href="" class="box-listLog3"></a>' +
				'<a href="" class="box-listLog4"></a>' +
				'<span class="box-listT"></span>' +
				'<audio class="audio" src="' + song[i].Src + '" preload></audio>' +
				'</li>'
			ullist.innerHTML += songSum
		}
	}
	fun()
	var Audioes = document.querySelectorAll('audio');
	var box_listMz = document.querySelectorAll('.box-listMz');
	var lis = document.querySelectorAll('#list li')
	// 设置歌曲数量显示
	$('.box-listshu').text('[' + Audioes.length + ']')
	// 获取设置歌曲时间
	var minute = []
	var second = []
	var time = []
	var sum = 0;
	var shu = 0;
	var AudioLength = Audioes.length - 1;
	var times = 0;
	var shu1 = 0
	var offL = 0;
	var offX2 = 0;
	var offX = 0;
	var offX3 = 0;
	var tim = 0;
	var minutes = 0;
	var seconds = 0;
	var currentTimes = 0;
	var sum2 = 0;
	var box_listT = document.querySelectorAll('.box-listT')

	// 防止全局污染进行封装
	function fz() {
		for (var i = 0; i < Audioes.length; i++) {
			time.push(parseInt(Audioes[i].duration));
			if (parseInt((Audioes[i].duration) / 60) > 10) {
				minute.push(parseInt((Audioes[i].duration) / 60));
			} else {
				minute.push('0' + parseInt((Audioes[i].duration) / 60));
			}
			if (parseInt((Audioes[i].duration) % 60) > 10) {
				second.push(parseInt((Audioes[i].duration) % 60));
			} else {
				second.push('0' + parseInt((Audioes[i].duration) % 60));
			}
			box_listT[i].innerHTML = minute[i] + ':' + second[i];
		}
	}


	// 播放时触发的事件
	Audioes[0].oncanplay = function() {
		fz();
		Audioes[sum].ontimeupdate = function() {
			currentTimes = this.currentTime;
			times = parseInt((300 / time[sum]) * currentTimes);
			if (tim === 0) {
				$('.box-scheduleDot').css('left', times + 'px');
				$('.box-scheduleW').css('width', times + 'px');
				// 播放时歌曲时间
				minutes = parseInt(currentTimes / 60);
				seconds = parseInt(currentTimes % 60);
				seconds = seconds < 10 ? '0' + seconds : seconds;
				if (minutes < 1) {
					minutes = '00';
				} else if (minutes >= 1 && minutes < 10) {
					minutes = '0' + minutes;
				} else {
					minutes;
				};
				$('.box-time').text(minutes + ':' + seconds + '/' + minute[sum] + ':' + second[sum]);
				// 顺序播放
				if (parseInt($('.box-scheduleW').css("width")) === 300) {
					for (var j = 0; j < $('#list li').length; j++) {
						Audioes[j].pause();
						Audioes[j].currentTime = 0;
					}

					//获取到的sum是字符串类型，要强制转换为数字类型
					var finish = parseInt(sum) + 1;
					finish = finish > Audioes.length - 1 ? 0 : finish;
					Audioes[finish].play();
					var finishText = lis[finish].children[0].innerHTML;
					$('.box-songName').text(finishText);
					sum = finish;
					for (var i = 0; i < lis.length; i++) {
						lis[i].style.backgroundColor = '#FFFFFF';
					}
					lis[sum].style.backgroundColor = '#f2f2f2';
				}
			}
		}
	}

	//点击后切换相应的歌曲
	$('#list li').on('click', function() {
		sum2 = 1;
		var texts = $($(this).children("span").get(0));
		var index = $(this).attr('data-index');
		sum = index;
		$('.box-songName').text(texts.text());
		//点击后先暂停所有的歌曲
		for (var i = 0; i < Audioes.length; i++) {
			Audioes[i].pause();
		}

		$('.box-play').css("display", "none");
		$('.box-stop').css("display", "block");
		Audioes[index].play();
		// 解决点击更换歌曲时间和进度不归零的问题
		if (shu != index) {
			for (var j = 0; j < Audioes.length; j++) {
				Audioes[j].currentTime = 0;
				lis[j].style.backgroundColor = '#FFFFFF';
			}
		}
		$(this).css("backgroundColor", "#f2f2f2");
		shu = index;
	})

	//点击播放按钮播放歌曲
	$('.box-play').on('click', function() {
		if (sum2 === 1) {
			var index = $(this).attr('data-index');
			$(this).css("display", "none");
			$('.box-stop').css("display", "block");
			Audioes[sum].play();
		}
	})

	// 点击按钮停止所有歌曲
	$('.box-stop').on('click', function() {
		if (sum2 === 1) {
			shu = sum;
			for (var j = 0; j < $('#list li').length; j++) {
				Audioes[j].pause();
			}
			$(this).css("display", "none");
			$('.box-play').css("display", "block");
		}
	})

	// 封装歌曲时间跟随进度条移动变化
	function fn(x) {
		currentTimes = (time[sum] / 300) * x
		minutes = Math.floor(currentTimes / 60)
		seconds = Math.floor(currentTimes % 60)
		seconds = seconds < 10 ? '0' + seconds : seconds;
		if (minutes < 1) {
			minutes = '00';
		} else if (minutes >= 1 && minutes < 10) {
			minutes = '0' + minutes;
		} else {
			minutes;
		};
		$('.box-time').text(minutes + ':' + seconds + '/' + minute[sum] + ':' + second[sum]);
	}

	//鼠标按下
	$('.box-schedule').on('mousedown', function(e) {
		if (sum2 === 1) {
			tim = 1;
			shu1 = 1;
			var textge = $($('.box-listMz')[sum]);
			$('.box-songName').text(textge.text());
			var offLeft = e.pageX - 5;
			offL = $(this).offset().left;
			offX = offLeft - offL;
			if (offX < 0) {
				offX = 0;
			} else if (offX >= 300) {
				offX = 298;
			} else {
				offX = offX;
			}
			$('.box-scheduleDot').css('left', offX + 'px');
			$('.box-scheduleW').css('width', offX + 'px');
			$(".box-scheduleMove").css('display', 'block');
			fn(offX);

			// 移动时
			$('.box-scheduleMove').on('mousemove', function(e) {
				offX3 = 1;
				var offLeft2 = e.pageX - 5;
				var offT2 = $('.box-scheduleMove').offset().left;
				offX2 = offLeft2 - offL;
				if (offX2 < 0) {
					offX2 = 0;
				} else if (offX2 >= 300) {
					offX2 = 298;
				} else {
					offX2 = offX2;
				}
				$('.box-scheduleDot').css('left', offX2 + 'px');
				$('.box-scheduleW').css('width', offX2 + 'px');
				fn(offX2);
			})
		}
	})

	$('.box-scheduleMove').on('mouseup', function() {
		if (sum2 === 1) {
			$(".box-scheduleMove").css('display', 'none');
			scheduleTime = time[sum] / 300;
			if (offX3 == 0) {
				Audioes[sum].currentTime = offX * scheduleTime;
				$('.box-scheduleDot').css('left', offX + 'px');
				$('.box-scheduleW').css('width', offX + 'px');
				fn(offX);

			} else {
				Audioes[sum].currentTime = offX2 * scheduleTime;
				$('.box-scheduleDot').css('left', offX2 + 'px');
				$('.box-scheduleW').css('width', offX2 + 'px');
				fn(offX2);
				offX3 = 0;
			}
			shu1 = 0;
			tim = 0;
		}
	})

	// 倍数显示隐藏点击事件
	$('.box-timer').on('click', function() {
		$(this).css("display", "none");
		$('.box-times').css("display", "block");
	})
	$('.box-times').on('click', function() {
		$(this).css("display", "none");
		$('.box-timer').css("display", "block");
	})

	// 点击显示隐藏歌曲列表
	$('.box-list1').on('click', function() {
		if ($(this).attr('id') == 1) {
			$('.box-listLogo').css('display', 'none');
			$('.box-listLogo1').css('display', 'block');
			$('#list').css('display', 'block');
			$(this).attr('id', 0);
		} else {
			$('.box-listLogo').css('display', 'block');
			$('.box-listLogo1').css('display', 'none');
			$('#list').css('display', 'none');
			$(this).attr('id', 1);
		}
	})

	// 点击播放上一首
	$('.box-back').on('click', function() {
		if (sum2 === 1) {
			for (var j = 0; j < $('#list li').length; j++) {
				if (sum !== 0) {
					Audioes[j].currentTime = 0;
				}
				Audioes[j].pause();
			}
			var last = sum - 1
			last = last < 0 ? Audioes.length - 1 : last;
			Audioes[last].play();
			$('.box-play').css("display", "none");
			$('.box-stop').css("display", "block");
			var lastText = lis[last].children[0].innerHTML;
			$('.box-songName').text(lastText);
			sum = last;
		}
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.backgroundColor = '#FFFFFF';
		}
		lis[sum].style.backgroundColor = '#f2f2f2';
	})

	// 点击播放下一首
	$('.box-speed').on('click', function() {
		if (sum2 === 1) {
			for (var j = 0; j < $('#list li').length; j++) {
				if (sum !== Audioes.length - 1) {
					Audioes[j].currentTime = 0;
				}
				Audioes[j].pause();
			}
			var shu = parseInt(sum)
			var next = shu + 1;
			next = next > Audioes.length - 1 ? 0 : next;
			Audioes[next].play();
			$('.box-play').css("display", "none");
			$('.box-stop').css("display", "block");
			var nextText = lis[next].children[0].innerHTML;
			$('.box-songName').text(nextText);
			sum = next
		}
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.backgroundColor = '#FFFFFF';
		}
		lis[sum].style.backgroundColor = '#f2f2f2';
	})


})
