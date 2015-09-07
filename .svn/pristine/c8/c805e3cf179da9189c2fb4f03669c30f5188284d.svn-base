/** @jsx React.DOM */
var Table = ReactBootstrap.Table;

var ManagerAuditing = React.createClass({
	render: function(){
		var managerStatus;
		if(this.props.sampleInfo.manager.approval == 0){
			managerStatus = '审核不通过';
		}else if(this.props.sampleInfo.manager.approval == 1){
			managerStatus = '审核通过';
		}else if(this.props.sampleInfo.manager.approval == 2){
			managerStatus = '审核中';
		}else{
			managerStatus = '';
		}		
		return (
			<Table id="managerAuditing">
				<thead>
                    <tr>
                        <th>当前执行人</th>
                        <th>状态</th>
                    </tr>				
				</thead>
				<tbody>
					<tr>
						<td>{this.props.sampleInfo.manager.name}</td>
						<td>{managerStatus}</td>
					</tr>
				</tbody>
			</Table>
		);
	}
});

module.exports = ManagerAuditing;