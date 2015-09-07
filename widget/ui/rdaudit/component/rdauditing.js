/** @jsx React.DOM */
var Table = ReactBootstrap.Table;

var RdAuditing = React.createClass({
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
			<Table>
				<thead>
                    <tr>
                        <th>当前执行人</th>
                        <th>状态</th>
                    </tr>				
				</thead>
				<tbody>
					<tr>
						<td>{this.props.sampleInfo.rd.name}</td>
						<td>{rdStatus}</td>
					</tr>
				</tbody>
			</Table>
		);
	}
});

module.exports = RdAuditing;