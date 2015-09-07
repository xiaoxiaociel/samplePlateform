/** @jsx React.DOM */
var BaseMixin = {
	componentWillMount: function(){
		this.host = '/sample';
	},
	doLogin: function(){
        var i_url = location.href;
        // var login_str = 'https://itebeta.baidu.com/login?service=' + encodeURIComponent(i_url);
        var login_str = 'https://uuap.baidu.com/login?service=' + encodeURIComponent(i_url);
        window.location.href = login_str;
        window.event.returnValue = false;
	},
	doService: function(url, callback, postData){
		var that = this;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: postData || {}
		})
		.done(function(res) {
			if(res.status == 0){
				callback && callback(res.data);
			}else if(res.status == 1){
				if(res.err_msg == "login error."){
					that.doLogin();
				}else{
					alert(res.err_msg);
				}			
			}
		})
		.fail(function() {
			alert('获取数据失败，请刷新再试！');
		})
		.always(function() {

		});	
	},
	getRequest: function(){ //获取url传递的参数
		var url = location.search;//获取url中"?"符以及其后的字串 
		var theRequest = new Object();
		if(url.indexOf("?") != -1){ //url中存在问号，也就是说有参数
			var str = url.substr(1);  
			strs = str.split("&");  
			for(var i = 0; i < strs.length; i ++)  
			{   
				 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
			} 
		}
		return theRequest;
	},
}
module.exports = BaseMixin;