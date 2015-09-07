/** @jsx React.DOM */
var Input = ReactBootstrap.Input;
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Button = ReactBootstrap.Button;
var DeleteSampleModal = require('samplemis:widget/ui/sampleconfig/component/deletesamplemodal.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var AllocateNode = React.createClass({
	mixins: [BaseMixin],
	getInitialState: function(){
		return {
			show: false,
			btnShow: false,
			userTypeList: []
		};
	},
	componentWillMount: function(){
		var that = this;
		var dictUrl = that.host + '/querydict?type=2';
		var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskId + '&type=1';
		this.doService(dictUrl,function(data){
			that.setState({
				userTypeList: data
			});
		});
	},
	handleClick: function(e){
		this.setState({
			show: !this.state.show
		});
	},
	handleSelect: function(){
		if($('.allocate .select').val() == 0){
			this.setState({
				btnShow: false
			});
		}else if($('.allocate .select').val() == 1){
			this.setState({
				btnShow: true
			});			
		}
	},
	handleSubmit: function(e){
		var that = this;
		var sid = $(e.target).attr('data-id');
		var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskId + '&type=1';
		var dtd = this.props.ajaxFileUpload(sid);
		dtd.done(function(result){
			$(".allocate .input-title").html(result);
		});
	},
	handleAddDict: function(e){
		var sid = $(e.target).attr('data-sid');
		var dicId = $(".userType").val();
		this.props.handleAddDict(sid,dicId);
	},
	handleModifyDict: function(e){
		var that = this;
		var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskId + '&type=1';
		var sid = $(e.target).attr('data-sid');
		var dictId = $(e.target).parent().find('.select').val();
		this.props.handleModifyDict(sid,dictId);
	},
	render: function(){
		var that = this;
		var userTypeNode = this.state.userTypeList.map(function(value,i){
			return (
				<option key={i} value={value.id}>{value.name}</option>
			);
		});
		var queryDictNode = this.props.queryDictList.map(function(value,i){
			return (
				<option key={i} value={value.id}>{value.name}</option>
			)
		});
		var value = that.props.value;
		if(this.state.show){
			return (
			  <tr key={value.index} className="allocate">
			    <td>{value.id}</td>
			    <td className="size">{value.quota}%</td>
			    <td className="input-select">
			      <TabbedArea>
				      <TabPane eventKey={1} tab='query'>
				      {that.state.btnShow ? 
				      	<div className="item">
					        <Input type="select" className="allocate-size select item" name="query" onChange={that.handleSelect} defaultValue="1">
						        <option value="0">未配置</option>
						        {queryDictNode}
						        <option value="1">自定义字典</option>
					        </Input>
						    <Input type="file" id="uploadFile" name="upload"></Input>
						    <Button onClick={that.handleSubmit} data-id={value.id}>确认</Button>
						    <p className="input-title"></p>
						 </div> : 
						 <div className="item">
					        <Input type="select" className="allocate-size select item" onChange={that.handleSelect} defaultValue="0">
						        <option value="0">未配置</option>
						        {queryDictNode}
						        <option value="1">自定义字典</option>
					        </Input> 
						    <Button className="item" data-sid={value.id} onClick={that.handleModifyDict}>确认</Button>
						 </div>							
					   }
				      </TabPane>
				      <TabPane eventKey={2} tab='user_type'>
					      <Input type="select" name="userType" className="userType" defaultValue={that.props.userTypeDictId}>
						      <option value="0">不配置</option>
						      {userTypeNode}
					      </Input>
						      <Button className="item" onClick={that.handleAddDict} data-sid={value.id}>确认</Button>
				      </TabPane>
				  </TabbedArea>
			    </td>
			    <td>
				    <Button onClick={that.handleClick}>退出编辑模式</Button>
			    </td>
			  </tr>
			);
		}else{
			return (
			  <tr key={value.index} className="allocate">
			    <td>{value.id}</td>
			    <td>{value.quota}%</td>
			    <td>
			      <TabbedArea>
				    <TabPane eventKey={1} tab='query'>{value.query_dict == null? '未配置': value.query_dict.name}</TabPane>
				    <TabPane eventKey={2} tab='user_type'>{value.user_type_dict == null? '未配置': value.user_type_dict.name}</TabPane>
				  </TabbedArea>
			    </td>
			    {that.props.status < 3 ?
			    <td>
				    <Button onClick={that.handleClick} className="btn">编辑模式</Button>
				    <ModalTrigger modal={<DeleteSampleModal tempsampleid={that.props.tempsampleid} handleDeleteSampleSubmit={that.props.handleDeleteSampleSubmit}/>}>
					    <Button onClick={that.props.handleEdit} data-id={value.id}>删除</Button>
				    </ModalTrigger>
			    </td> : <td></td>
				}
			  </tr>
			);
		}
	}
});
module.exports = AllocateNode;