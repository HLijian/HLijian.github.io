var idBox = document.querySelector('.box')
var boxStartBtn = idBox.querySelector('button')
var boxStart = idBox.querySelector('.box_start')
var boxGame = idBox.querySelector('.box_game')
var boxGameTable = idBox.querySelector('table')
var box_gameMoney = idBox.querySelector('.box_gameMoney')
var box_gameAnewMoney = idBox.querySelector('.box_gameAnewMoney')
var box_gameOurPlane = idBox.querySelector('.box_gameOurPlane')
var arr = []
var arr2 = []
var sliding = true;
var Stop = true;
// 用于保存飞机暂停后的时间
var times = 0;
// 点击开始游戏切换页面
boxStartBtn.onclick = function() {
	setInterval(function() {
		times = times > 10 ? 0 : times;
	}, 1000)

	boxStart.style.left = -360 + 'px';
	boxGame.style.left = 0 + 'px'
	var sum = 0;
	// 设置子弹生成速度
	var createBulletTime = setInterval(function() {
		createBullet()

	}, 500)

	var stopTimes = setInterval(function() {
		times += 1
	}, 1000)

	// 敌方飞机生成时间
	var createElementsDa = setInterval(function() {
		Element("./imges/enemy-plane-l.png")
	}, 14000)

	var createElementZho = setInterval(function() {
		Element("./imges/enemy-plane-m.png")
	}, 5000)

	var createElement = setInterval(function() {
		Element("./imges/enemy-plane-s.png")
	}, 2000)

	// 敌方飞机飞行速度
	var mlementMoves = setInterval(function() {
		mlementMove()
	}, 100)


	//子弹移动速度
	var createfilghtTime = setInterval(function() {
		filght()
	}, 40)
	setInterval(function() {
		funcs()
	}, 40)
	// 背景图移动速度
	var boxGameTime = setInterval(function() {
		sum += 1
		boxGame.style.backgroundPositionY = sum + 'px'
	}, 40)

	//点击重新开始触发
	box_gameMoney.onclick = function() {
		window.location.reload();
		box_gameAnewMoney.style.display = 'none'
	}
	var boxPlay = true;
	boxGame.onclick = function() {
		//暂停开始时
		if (!boxPlay) {
			stopTimes = setInterval(function() {
				times = times + 1
			}, 1000)

			// 重新生成定时器
			boxGameTime = setInterval(function() {
				sum += 1
				boxGame.style.backgroundPositionY = sum + 'px'
			}, 40)

			createBulletTime = setInterval(function() {
				createBullet()
			}, 500);

			createfilghtTime = setInterval(function() {
				filght()
			}, 40)

			createElementsDa = setInterval(function() {
				Element("./imges/enemy-plane-l.png")
			}, 14000)

			createElementZho = setInterval(function() {
				Element("./imges/enemy-plane-m.png")
			}, 5000)

			createElement = setInterval(function() {
				Element("./imges/enemy-plane-s.png")

			}, 2000)

			mlementMoves = setInterval(function() {
				mlementMove()
			}, 100)


			boxGameTable.style.top = -150 + 'px'
			box_gameAnewMoney.style.display = 'none'
			boxPlay = true;
		} else {
			// 暂停时
			clearInterval(stopTimes)
			boxGame.style.backgroundPositionY = sum - 20 + 'px'
			// 清除定时器
			clearInterval(boxGameTime)

			clearInterval(createBulletTime)
			clearInterval(createfilghtTime)
			clearInterval(createElement)
			clearInterval(mlementMoves)
			clearInterval(createElementsDa)
			clearInterval(createElementZho)
			boxGameTable.style.top = 50 + 'px'
			boxPlay = false;
			// 显示重新开始和花钱买命的按钮
			box_gameAnewMoney.style.display = 'block'
		}
	}
}
var x = 0
var y = 0
//飞机跟随鼠标移动
box_gameOurPlane.ontouchmove = function(e) {
	// 获取鼠标距离边界的坐标
	x = event.changedTouches[0].clientX - 33;
	y = event.changedTouches[0].clientY - 40;
	// 限制飞机X坐标位置
	if (x <= 0) {
		x = 0;
	} else if (x >= 360 - 66) {
		x = 360 - 66;
	} else {
		x = x
	}
	// 限制飞机Y坐标位置
	if (y <= 0) {
		y = 0;
	} else if (y >= 640 - 80) {
		y = 640 - 80;
	} else {
		y = y
	}
	// 飞机跟随鼠标移动
	box_gameOurPlane.style.left = x + 'px';
	box_gameOurPlane.style.top = y + 'px'
}
//封装子弹创建
function createBullet() {
	// 创建一个节点
	var offLeft = box_gameOurPlane.offsetLeft
	var offTop = box_gameOurPlane.offsetTop
	var node = document.createElement("img");
	//添加子弹路径
	node.classList.add('nodeImg')
	node.src = "./imges/our-bullet.png";
	boxGame.appendChild(node);
	// 设置子弹生成坐标
	node.style.left = offLeft + 30 + 'px'
	node.style.top = offTop - 14 + 'px'

}

// 子弹移动
function filght(e) {
	var bulletFil = document.querySelectorAll('.nodeImg')
	for (var i = 0; i < bulletFil.length; i++) {
		var bulletOffLeft = bulletFil[i].offsetTop;
		bulletOffLeft -= 10
		bulletFil[i].style.top = bulletOffLeft + 'px';
		var FilX = bulletFil[i].offsetLeft;
		var FilY = bulletFil[i].offsetTop;
		var FilW = bulletFil[i].offsetWidth;
		var FilH = bulletFil[i].offsetHeight;
		arr.push({
			X: FilX,
			Y: FilY,
			W: FilW,
			H: FilH
		})
	}
	// 删除超出范围的子弹
	for (var j = 0; j < bulletFil.length; j++) {
		if (bulletFil[j].offsetTop <= -14) {
			bulletFil[j].remove()
		}
	}

}

var num = 0
// 设置敌方小飞机生成位置
function Element(Imgsrc) {
	var nodeTwo = document.createElement('img')
	nodeTwo.src = Imgsrc;
	nodeTwo.classList.add('nodeTwoImg')
	nodeTwo.classList.add('false')

	boxGame.appendChild(nodeTwo);
	if (nodeTwo.offsetWidth == 34) {
		nodeTwo.style.top = -24 + 'px'
		var numOne = Math.floor(Math.random() * (324 - 0) + 0);
		nodeTwo.style.left = numOne + 'px'
	} else if (nodeTwo.offsetWidth == 46) {
		nodeTwo.style.top = -60 + 'px'
		var numTwo = Math.floor(Math.random() * (314 - 0) + 0);
		nodeTwo.style.left = numTwo + 'px'
	} else {
		nodeTwo.style.top = -160 + 'px'
		var numSan = Math.floor(Math.random() * (250 - 0) + 0);
		nodeTwo.style.left = numSan + 'px'

	}
}

// 设置敌方飞机飞行速度

function mlementMove() {
	var nodeTwoImg = document.querySelectorAll('.nodeTwoImg');
	for (var i = 0; i < nodeTwoImg.length; i++) {
		var nodeTwoImges = nodeTwoImg[i].offsetTop
		if (nodeTwoImg[i].offsetWidth == 34) {
			nodeTwoImges = nodeTwoImges + 12;
			nodeTwoImg[i].style.top = nodeTwoImges + 'px';
		} else if (nodeTwoImg[i].offsetWidth == 46) {
			nodeTwoImges = nodeTwoImges + 8;
			nodeTwoImg[i].style.top = nodeTwoImges + 'px';
		} else {
			nodeTwoImges = nodeTwoImges + 3;
			nodeTwoImg[i].style.top = nodeTwoImges + 'px';
		}
		var TwoImgX = nodeTwoImg[i].offsetLeft
		var TwoImgY = nodeTwoImg[i].offsetTop
		var TwoImgW = nodeTwoImg[i].offsetWidth
		var TwoImgH = nodeTwoImg[i].offsetHeight
		arr2.push({
			X: TwoImgX,
			Y: TwoImgY,
			W: TwoImgW,
			H: TwoImgH,
		})
	}
	//将超出的飞机删除
	for (var j = 0; j < nodeTwoImg.length; j++) {
		if (nodeTwoImg[j].offsetTop >= 676) {
			nodeTwoImg[j].remove()
		}
	}

}
var sum = 0
function funcs() {
	arr.forEach(function(enemy, indexE, arr) {
		arr2.forEach(function(bullet, indexB, arr2) {
			if (checkCollision(enemy, bullet)) {
				arr.splice(indexE, 1);
				arr2.splice(indexB, 1);
				sum++
				
			}
		})
	})
}


function checkCollision(obj1, obj2) {
	var h = Math.abs(obj1.X - obj2.X) <= (obj1.W + obj2.W) / 2
	var v = Math.abs(obj1.Y - obj2.Y) <= (obj1.H + obj2.H) / 2
	return h && v
}
