/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var ProcessRequire = React.createClass({
	render: function(){
		var fontStyle = {
			color: "#FF0000",
			fontsize: "12px"
		};
		var rdState;
		if(this.props.sampleInfo.rd.approval == 0){
			rdState = (
				<span>审核不通过</span>
			);
		}else if(this.props.sampleInfo.rd.approval == 1){//审核通过
			rdState = (
				<span>审核通过</span>
			);
		}else if(this.props.sampleInfo.rd.approval == 2){//配置中
			rdState = (
				<span>未审核</span>
			);
		}
		var managerState;
		if(this.props.sampleInfo.manager.approval == 0){ //审核不通过
			managerState = (
				<span>审核不通过</span>
			);
		}else if(this.props.sampleInfo.manager.approval == 1){//审核通过
			managerState = (
				<span>审核通过</span>
			);
		}else if(this.props.sampleInfo.manager.approval == 2){//配置中
			managerState = (
				<span>未审核</span>
			);
		}
		return (
		  <Table striped bordered condensed hover>		  
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
		        <td>5. 评估rd</td>
		        <td>{this.props.sampleInfo.rd.name}</td>
		      </tr>
		      <tr>
		        <td>5.1 评估rd意见</td>
		        <td>{rdState}</td>
		      </tr>		
		      <tr>
		        <td>6. 发起者上级</td>
		        <td>{this.props.sampleInfo.manager.name}</td>
		      </tr>	
		      <tr>
		        <td>6.1 发起者上级意见</td>
		        <td>{managerState}</td>
		      </tr>			      		      
		    </tbody>
		  </Table>
		);	
	}
});

module.exports = ProcessRequire;