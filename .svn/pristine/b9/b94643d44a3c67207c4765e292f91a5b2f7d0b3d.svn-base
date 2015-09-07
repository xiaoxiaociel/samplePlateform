/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var RdState = React.createClass({
	mixins: [BaseMixin],
	handleSubmit: function(){
		var that = this;
		var rdId = $(".rd-id").attr('data-id');
		var approval = $("input[name='rd']:checked").val();
		var url = that.host + '/submitapprover?id=' + rdId + '&approval=' + approval + '&type=rd' + '&task_id=' + that.props.sampleInfo.taskid;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(res) {
			if(res.status == 0){
				location.reload();
			}else{
				alert(res.err_msg);
			}	
		})
		.fail(function() {

		})
		.always(function() {

		});
	},
	render: function(){
		return (
			<form action="" method="get">
				<Table striped bordered condensed hover id="auditState">		  
				    <tbody>
				      <tr>
				        <td width="24%">1. 抽样类型</td>
				        <td>{this.props.sampleInfo.type}</td>
				      </tr>
				      <tr>
				        <td width="24%">2. 抽样名称</td>
				        <td>{this.props.sampleInfo.name}</td>
				      </tr>
				      <tr>
				        <td width="24%">3. 抽样描述</td>
				        <td>{this.props.sampleInfo.desc}</td>
				      </tr>
				      <tr>
				        <td>4. 线上运行时间</td>
				        <td>{this.props.sampleInfo.duration}小时</td>
				      </tr>
				      <tr>
				        <td data-id={this.props.sampleInfo.rd.id} className="rd-id">5. 评估rd</td>
				        <td>{this.props.sampleInfo.rd.name}</td>
				      </tr>
				      <tr>
				        <td>5.1 评估rd意见</td>
				        <td>
					        <Input type='radio' label='同意' name='rd' value='1' defaultChecked/>
					        <Input type='radio' label='打回' name='rd' value='0'/>
				        </td>
				      </tr>		
				      <tr>
				        <td>6. 发起者上级</td>
				        <td>{this.props.sampleInfo.manager.name}</td>
				      </tr>	
				      <tr>
				        <td>6.1 发起者上级意见</td>
				        <td>
				        </td>
				      </tr>	   				     	           		      
				    </tbody>    
				  </Table>
				  <Button bsStyle='success' onClick={this.handleSubmit} className="btn">提交</Button>
			  </form>
		);
	}

});

module.exports = RdState;