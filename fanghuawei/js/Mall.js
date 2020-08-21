$.ajax({
	url:'http://127.0.0.1:8848/fanghuawei/data/HuaweiMall.txt',
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	success:function(data){
		console.log(data)
	},
	
});


