var txts = ['政府及公共事业', '智慧城市', '金融', 
'交通物流', '制造及工业互联网', '汽车', '能源', 
'农业及环保', '教育', '医疗健康', '媒体文娱', '游戏', 
'零售电商','公益及非盈利机构', 'HMS应用伙伴', '初创企业'
]
for (var i = 0; i < txts.length; i++) {
	
	$('.business-Text').eq(i).text(txts[i]);
	$('.businessImg').eq(i).css({
		'backgroundImage': 'url(./images/business' + (i + 1) + '.png)'
	})
}

for(let i = 0 ; i < 8;i++){
	$('.caseImg a').eq(i).css({
		'backgroundImage': 'url(./images/case'+(i+1)+'.png)'
	})
}
