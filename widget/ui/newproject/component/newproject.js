/** @jsx React.DOM */
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');

var NewProject = React.createClass({
	mixins: [BaseMixin],
	handleSubmit: function(e){
		e.preventDefault();
		var that = this;
		if($("#newPoject .project_name").val() == ""){
			alert("请输入项目名！");
		}else{
			var url = that.host + '/addproject?'+ $("#newPoject .form").serialize();
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json'
			})
			.done(function(res) {
				if(res.status == 0){
					window.location.href = '/sample/projectlist';
				}else{
					alert(res.err_msg);
				}		
			})
			.fail(function() {
				alert("提交失败！");
			})
			.always(function() {

			});			
		}
	},
	render: function(){
		return (
			<div id="newPoject">
				<legend>填写项目信息</legend>
				  <form className="form" method="get" action="">
					<label className="label">项目名<span className="red">*</span>:</label>
				    <Input className="project_name" type='text' name="name" placeholder='请输入项目名' />
				    <label className="label">项目描述:</label>
				    <Input className="project_desc" type='text' name="desc" placeholder='请输入项目描述' />
				    <ButtonInput className="button" bsStyle='success' type='submit' onClick={this.handleSubmit} value='确认' />
				  </form>
			</div>
		);
	}
});

module.exports = NewProject;
