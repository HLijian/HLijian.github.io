$(function() {
	var song = Song;
	var shu = 0;
	var minute = []
	var second = []
	var time = []
	var sum = 0;
	var shu2 = shu;
	var MathSji = 0;
	var sum2 = 0;
	// 存放歌曲播放记录的下标
	var songArry = []
	var songLeng = 0;
	var followingPiece = 0;
	//创建歌曲列表
	function fun() {
		for (var i = 0; i < song.length; i++) {
			var songSum = '<li data_index=' + i + ' class = "clearfix">' +
				'<div><i class="fa fa-volume-up" aria-hidden="true"></i></div>' +
				'<p class="box-listMz">' + song[i].Name + '</p>' +
				'<audio class="audio" src="' + song[i].Src + '" preload></audio>' +
				'</li>'
			$('.songlist').append(songSum)
		}
	}
	fun()

	//获取当前歌曲的时分秒
	function fz() {
		for (var i = 0; i < $('audio').length; i++) {
			time.push(parseInt($('audio')[i].duration));
			if (parseInt(($('audio')[i].duration) / 60) > 10) {
				minute.push(parseInt(($('audio')[i].duration) / 60));
			} else {
				minute.push('0' + parseInt(($('audio')[i].duration) / 60));
			}
			if (parseInt(($('audio')[i].duration) % 60) > 10) {
				second.push(parseInt(($('audio')[i].duration) % 60));
			} else {
				second.push('0' + parseInt(($('audio')[i].duration) % 60));
			}

		}
	}

	// 歌曲播放下一首选择播放方式的函数封装
	function songOrder() {
		if ($(".order").css("display") == "block") {
			shu++
			shu = shu >= song.length ? 0 : shu;
		} else if ($(".shufflePlay").css("display") == "block") {
			var arr = []
			var arr2 = []
			for (var i = 0; i < song.length; i++) {
				arr.push(i)
			}
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] !== MathSji) {
					arr2.push(arr[j])
				}
			}
			shu = arr2[Math.floor(Math.random() * (song.length - 1))]
		} else if ($(".oneOrder").css("display") == "block") {
			shu = shu;
		}
	}

	// 歌曲播放上一首选择播放方式的函数封装
	function songOrderS() {
		if ($(".order").css("display") == "block" || $(".oneOrder").css("display") == "block") {
			shu--
			shu = shu < 0 ? song.length - 1 : shu;
		} else if ($(".shufflePlay").css("display") == "block") {
			var arr = []
			var arr2 = []
			for (var i = 0; i < song.length; i++) {
				arr.push(i)
			}
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] !== MathSji) {
					arr2.push(arr[j])
				}
			}
			shu = arr2[Math.floor(Math.random() * (song.length - 1))]
		}
	}
	//顺序播放
	$(".order").click(function() {
		$(".order").css({
			"display": "none",
		})
		$(".shufflePlay").css({
			"display": "block",
		})
		$(".oneOrder").css({
			"display": "none",
		})
	})

	// 随机播放
	$(".shufflePlay").click(function() {
		$(".order").css({
			"display": "none",
		})
		$(".shufflePlay").css({
			"display": "none",
		})
		$(".oneOrder").css({
			"display": "block",
		})
	})

	//歌曲循环
	$(".oneOrder").click(function() {
		$(".order").css({
			"display": "block",
		})
		$(".shufflePlay").css({
			"display": "none",
		})
		$(".oneOrder").css({
			"display": "none",
		})
	})
	var timrs;

	// 在歌曲可以播放时间执行的函数
	$('audio')[0].oncanplay = function() {
		fz();
		var lengthTime = 0;
		var minutes = 0;
		var seconds = 0;
		var scheduleTime = 0;
		var offX = 0;
		var moveoffX = 0;
		var press = 0
		var move = 0;
		var volumesum = 0;
		var volumeOffX =0;
		var volumemoveoffX = 0;
		var volumeOffL = 0;
		// 设置开始时第一首歌的时间
		$('.timeRight').html(minute[shu] + ':' + second[shu])
		$('.box_volume').mousedown(function(e){
			$('.box_volumeMask').css({
				'display':'block',
			})
			var volumeOffLeft = e.pageX-3;
			volumeOffL = $(this).offset().left;
			volumeOffX = volumeOffLeft - volumeOffL-20;
			volumeOffX = volumeOffX < 0 ? 0 : volumeOffX;
			volumeOffX = volumeOffX >= 88 ? 88 : volumeOffX;
			if(volumesum == 0){
				$('.volumeJDTOne').css({
					'width':volumeOffX+'px'
				})
				$('.volumeDian').css({
					'left':volumeOffX-3+'px'
				})
			}
			
			$('.box_volumeMask').mousemove(function(e) {
					volumesum = 1;
					var volumemoveoffLeft = e.pageX-3 ;
					volumemoveoffX = volumemoveoffLeft - volumeOffL-20;
					volumemoveoffX = volumemoveoffX < 0 ? 0 : volumemoveoffX;
					volumemoveoffX = volumemoveoffX >= 88 ? 88 : volumemoveoffX;
					$('.volumeJDTOne').css({
						'width': volumemoveoffX + 'px'
					})
					$('.volumeDian').css({
						'left': volumemoveoffX-3+'px'
					})
			
			})
		})
		$('.box_volumeMask').mouseup(function() {
				$(".box_volumeMask").css('display', 'none');
				if (volumesum == 0) {
					$('.volumeJDTOne').css({
						'width': volumeOffX + 'px'
					})
					$('.volumeDian').css({
						'left': volumeOffX-3+ 'px'
					})
				} else {
					$('.volumeJDTOne').css({
						'width': volumemoveoffX + 'px'
					})
					$('.volumeDian').css({
						'left': volumemoveoffX-3+ 'px'
					})
					volumesum = 0;
				}
			
		})
		// 监听歌曲变化时执行的函数
		$('audio')[shu].ontimeupdate = function() {
			var volumeLength = parseInt($('.volumeJDT').css('width'));
			var volumeLengthOne = parseInt($('.volumeJDTOne').css('width'));
			$('audio')[shu].volume = volumeLengthOne/volumeLength
			// 获取当前歌曲播放的时间
			var currentTimes = this.currentTime;
			// 设置歌曲时间和进度条的比例
			lengthTime = parseInt((330 / time[shu]) * currentTimes);
			// 设置歌曲时间进度
			minutes = parseInt(currentTimes / 60);
			seconds = parseInt(currentTimes % 60);
			// 当歌曲分秒小于10的时候在前面添加一个0
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			// 设置进度条跟随歌曲播放时间的变化
			if (press == 0) {
				$('.timeLeft').html(minutes + ':' + seconds)
				$('.ArticleOnThe').css({
					'width': lengthTime + 'px'
				})

				$('.progressBarDing').css({
					'left': lengthTime - 3 + 'px'
				})
			}

			//当前歌曲播放完成后自动播放下一首
			if ($('.ArticleOnThe').css('width') == '330px') {

				// 调用歌曲顺序选择
				songOrder()

				//播放器自动切换相应的歌曲名字,歌手与歌曲时间
				$('.box_topHzRight h3').text(song[shu].Name)
				$('.box_topHzRight p').text(song[shu].singerName)
				$('.box_topHzbaLogo').css({
					'backgroundImage': 'url(' + song[shu].Imgsrc + ')',
				})
				$('.box_topHzLeft img').attr('src', song[shu].Imgsrc)
				$('.timeRight').html(minute[shu] + ':' + second[shu])

				//
				if (songArry[songArry.length - 1] != shu && $(".oneOrder").css("display") != "block") {
					shu2 = shu - 1;
					shu2 = shu2 < 0 ? song.length - 1 : shu2;
					shu2 = shu2 > song.length - 1 ? 0 : shu2;
					songArry.push(shu2)
					songLeng = songArry.length - 1
				}

				for (var i = 0; i < song.length; i++) {
					$('audio')[i].pause();
					$('audio')[i].currentTime = 0;
				}
				$('audio')[shu].play()
			}
			$('.songlist li div i').css({
				"display": "none",
			});
			var ListI = document.querySelectorAll(".songlist li div i");
			ListI[shu].style.display = "block";

		}

		// 歌曲列表点击事件
		$('.songlist li').click(function() {
			$(".box_topHzLeft").css({
				"animation-name": "mymove",
			})
			$(".box_topCenterimg img").css({
				"transform": "rotateZ(0deg)",
			})

			sum2 = 1;
			shu = parseInt($(this).attr('data_index'));
			if (songArry[songArry.length - 1] != shu && $(".oneOrder").css("display") != "block") {
				shu2 = shu;
				shu2 = shu2 < 0 ? song.length - 1 : shu2;
				shu2 = shu2 > song.length - 1 ? 0 : shu2;
				songArry.push(shu2)
				songLeng = songArry.length - 1
			}


			$('.box_topPlay').css({
				"display": "none"
			})
			$('.box_topPause').css({
				"display": "block"
			})

			for (var i = 0; i < song.length; i++) {
				if (i != shu) {
					$('audio')[i].pause();
				}
				$('.songlist li div i').css({
					"display": "none",
				});
			};
			$(this).children("div").children("i").css({
				"display": "block",
			});
			if (shu !== sum) {
				sum = shu;
				for (var i = 0; i < song.length; i++) {
					$('audio')[i].currentTime = 0;

				}

			}
			$('audio')[shu].play();
			$('.box_topHzRight h3').text(song[shu].Name);
			$('.box_topHzRight p').text(song[shu].singerName);
			$('.box_topHzbaLogo').css({
				'backgroundImage': 'url(' + song[shu].Imgsrc + ')',
			});
			$('.box_topHzLeft img').attr('src', song[shu].Imgsrc);
			$('.timeRight').html(minute[shu] + ':' + second[shu]);

		})

		function fn(x) {
			currentTimes = (time[shu] / 330) * x
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
			$('.timeLeft').text(minutes + ':' + seconds);
		}

		//鼠标按下时触发的函数
		$('.progressBarOne').mousedown(function(e) {
			if ($('.box_topPlay').css("display") == "none") {
				press = 1;
				move = 0;
				var offLeft = e.pageX - 3;
				var offL = $(this).offset().left;
				offX = offLeft - offL;
				offX = offX < 0 ? 0 : offX;
				offX = offX >= 328 ? 328 : offX;
				$('.ArticleOnThe').css({
					'width': offX + 'px'
				})
				$('.progressBarDing').css({
					'left': offX - 3 + 'px'
				})
				$(".mask").css('display', 'block');
				fn(offX)
			}
			// 鼠标移动时触发的事件
			$('.mask').mousemove(function(e) {
				if ($('.box_topPlay').css("display") == "none") {
					move = 1;
					var moveoffLeft = e.pageX - 3;
					moveoffX = moveoffLeft - offL;
					moveoffX = moveoffX < 0 ? 0 : moveoffX;
					moveoffX = moveoffX >= 328 ? 328 : moveoffX;
					$('.ArticleOnThe').css({
						'width': moveoffX + 'px'
					})
					$('.progressBarDing').css({
						'left': moveoffX - 3 + 'px'
					})
					fn(moveoffX)
				}

			})
		})
		//鼠标松开时触发的事件。
		$('.mask').mouseup(function() {
			if ($('.box_topPlay').css("display") == "none") {
				$(".mask").css('display', 'none');
				scheduleTime = time[shu] / 330;
				if (move == 0) {
					$('audio')[shu].currentTime = scheduleTime * offX;
					$('.ArticleOnThe').css({
						'width': offX + 'px'
					})
					$('.progressBarDing').css({
						'left': offX - 3 + 'px'
					})
					fn(offX)
				} else {
					$('audio')[shu].currentTime = scheduleTime * moveoffX;
					$('.ArticleOnThe').css({
						'width': moveoffX + 'px'
					})
					$('.progressBarDing').css({
						'left': moveoffX - 3 + 'px'
					})
					fn(moveoffX)
					move = 0;
				}
				press = 0;
			}
		})
	}
	// 上一首
	$(".box_topPrevious").click(function() {
		if (sum2 === 1) {
			$('.box_topPlay').css({
				"display": "none"
			})
			$('.box_topPause').css({
				"display": "block"
			})
			if (songArry.length != 0 && songLeng >= 1) {
				songLeng--;
				shu = songArry[songLeng];
			} else {
				songOrderS()
			}

			$('.box_topHzRight h3').text(song[shu].Name);
			$('.box_topHzRight p').text(song[shu].singerName);
			$('.box_topHzbaLogo').css({
				'backgroundImage': 'url(' + song[shu].Imgsrc + ')',
			})
			$('.box_topHzLeft img').attr('src', song[shu].Imgsrc);
			$('.timeRight').html(minute[shu] + ':' + second[shu]);
			$('.songlist li div i').css({
				"display": "none",
			});
			var ListI = document.querySelectorAll(".songlist li div i");
			ListI[shu].style.display = "block";

			for (var i = 0; i < song.length; i++) {
				$('audio')[i].pause();
				$('audio')[i].currentTime = 0;
			}
			$('audio')[shu].play();
		}
	})


	//播放按钮点击事件
	$('.box_topPlay').click(function() {
		sum2 = 1
		$('.box_topPlay').css({
			"display": "none"
		})
		$('.box_topPause').css({
			"display": "block"
		})
		if (songArry[songArry.length - 1] != shu && $(".oneOrder").css("display") != "block") {
			shu2 = shu;
			shu2 = shu2 < 0 ? song.length - 1 : shu2;
			shu2 = shu2 > song.length - 1 ? 0 : shu2;
			songArry.push(shu2)
			songLeng = songArry.length - 1
		}

		$('audio')[shu].play();
		$(".box_topCenterimg img").css({
			"transform": "rotateZ(0deg)",
		})
		$(".box_topHzLeft").css({
			"animation-name": "mymove",
		})

	})
	//暂停按钮点击事件
	$('.box_topPause').click(function() {
		$('.box_topPlay').css({
			"display": "block"
		})
		$('.box_topPause').css({
			"display": "none"
		})
		$(".box_topCenterimg img").css({
			"transform": "rotateZ(-15deg)",
		})
		$(".box_topHzLeft").css({
			"animation-name": "",
			"transform": " rotateZ(deg)",
		})
		$('audio')[shu].pause();

	})

	// 下一首
	$(".box_topNext").click(function() {
		if (songArry[songArry.length - 1] != shu && $(".oneOrder").css("display") != "block") {
			shu2 = shu;
			shu2 = shu2 < 0 ? song.length - 1 : shu2;
			shu2 = shu2 > song.length - 1 ? 0 : shu2;
			songArry.push(shu2)
			songLeng = songArry.length - 1
		}
		if ($('.box_topPlay').css("display") == "none") {
			$('.box_topPlay').css({
				"display": "none"
			})
			$('.box_topPause').css({
				"display": "block"
			})
			songOrder()
			if ($(".oneOrder").css("display") == "block") {
				shu++;
				shu = shu >= song.length ? 0 : shu
			}


			$('.box_topHzRight h3').text(song[shu].Name)
			$('.box_topHzRight p').text(song[shu].singerName)
			$('.box_topHzbaLogo').css({
				'backgroundImage': 'url(' + song[shu].Imgsrc + ')',
			})
			$('.box_topHzLeft img').attr('src', song[shu].Imgsrc)
			$('.timeRight').html(minute[shu] + ':' + second[shu])
			for (var i = 0; i < song.length; i++) {
				if (i != shu) {
					$('audio')[i].pause();
					$('audio')[i].currentTime = 0;
				}
			}
			$('.songlist li div i').css({
				"display": "none",
			});
			var ListI = document.querySelectorAll(".songlist li div i");
			ListI[shu].style.display = "block";

			$('audio')[shu].play();
			// 调用歌曲顺序选择
		}
	})


})
