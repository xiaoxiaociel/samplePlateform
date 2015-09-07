/** @jsx React.DOM */
var Table = ReactBootstrap.Table;

var RdAudited = React.createClass({
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
			        <td>{rdStatus}</td>
			      </tr>		
			      <tr>
			        <td>6. 发起者上级</td>
			        <td>{this.props.sampleInfo.manager.name}</td>
			      </tr>	
			      <tr>
			        <td>6.1 发起者上级意见</td>
			        <td></td>
			      </tr>				     	           		      
			    </tbody>
			  </Table>
		)
	}
});

module.exports = RdAudited;