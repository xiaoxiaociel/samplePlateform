/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var rdjson = [
	{'name': 'liuguangmin01'},
	{'name': 'liulihong'},
	{'name': 'liuguangmin01'},
	{'name': 'liuguangmin01'},
	{'name': 'liuguangmin01'}
];

var superiorjson = [
	{'name': 'zhaohui03'},
	{'name': 'liulihong'},
	{'name': 'caoshengmin'},
	{'name': 'liuguangmin01'},
	{'name': 'liuguangmin01'}
];

var Participant = React.createClass({
	getInitialState: function(){
		return{
			rdsdata: [],
			superiorsdata: []
		};
	},
	componentWillMount: function(){
		var that = this;
		that.setState({
			rdsdata: rdjson,
			superiorsdata: superiorjson
		});
	},

	render: function() {
		var rdNodes = this.state.rdsdata.map(function(value, key){
			return(
				<Input type='checkbox' label={value.name} className="checkbox-partici"/>
			);
		});
		var superiorNodes = this.state.superiorsdata.map(function(value, key){
			return(
				<Input type='checkbox' label={value.name} className="checkbox-partici"/>
			);
		});		
		return (
			<form action="" method="post">	
				<Table striped bordered condensed hover>
					<thead>
					  <tr>
					    <th>参与人名称</th>
					    <th>对应人员</th>
					    <th>添加人员</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
					    <td>流程发起者</td>
					    <td></td>
					    <td></td>
					  </tr>
					  <tr>
						<td>评估RD<span>(必选，单选)</span></td>
					    <td>{this.state.rdsdata? rdNodes : 'loading'}</td>
					    <td><input type='text' placeholder='输入百度账号'/><Button bsStyle='success'>添加</Button></td>
					  </tr>
					  <tr>
					    <td>发起者上级<span>(必选，单选)</span></td>
					    <td>{this.state.superiorsdata? superiorNodes : 'loading'}</td>
					    <td><input type='text' placeholder='输入百度账号'/><Button bsStyle='success'>添加</Button></td>
					  </tr>
					</tbody>
				</Table>
				<Button>上一步</Button>
				<Button bsStyle='primary'>提交</Button>
			</form>
		);
	}

});

module.exports = Participant;