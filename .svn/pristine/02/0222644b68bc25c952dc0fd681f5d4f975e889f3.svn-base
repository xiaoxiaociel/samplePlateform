/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var ManagerState = React.createClass({
	mixins: [BaseMixin],
	handleSubmit: function(){
		var that = this;
		var managerId = $(".manager-id").attr('data-id');
		var approval = $("input[name='manager']:checked").val();
		var url = that.host + '/submitapprover?id=' + managerId + '&approval=' + approval + '&type=manager' + '&task_id=' + that.props.sampleInfo.taskid;
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
		var rdStatus;
		if(this.props.sampleInfo.rd.approval == 0){
			rdStatus = '审核不通过';
		}else if(this.props.sampleInfo.rd.approval == 1){
			rdStatus = '审核通过';
		}else if(this.props.sampleInfo.rd.approval == 2){
			rdStatus = '审核中';
		}else{
			rdStatus = '';
		}	
		return (
			<form action="" method="get">
				<Table striped bordered condensed hover id="managerState">		  
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
				        <td>{rdStatus}</td>
				      </tr>		
				      <tr>
				        <td data-id={this.props.sampleInfo.manager.id} className="manager-id">6. 发起者上级</td>
				        <td>{this.props.sampleInfo.manager.name}</td>
				      </tr>	
				      <tr>
				        <td>6.1 发起者上级意见</td>
				        <td>
							<Input type='radio' label='同意' name='manager' value='1' defaultChecked/>
					        <Input type='radio' label='打回' name='manager' value='0'/>				        
				        </td>
				      </tr>	   				     	           		      
				    </tbody>    
				  </Table>
				  <Button bsStyle='success' onClick={this.handleSubmit} className="btn">提交</Button>
			  </form>
		);
	}

});

module.exports = ManagerState;