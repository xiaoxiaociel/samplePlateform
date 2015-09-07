/** @jsx React.DOM */
var ModalTrigger = ReactBootstrap.ModalTrigger;
var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var DeleteSampleModal = require('samplemis:widget/ui/sampleconfig/component/deletesamplemodal.js');
var AllocatedNode = require('samplemis:widget/ui/sampleconfig/component/allocatenode.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');

var TrafficManager = React.createClass({
	mixins: [BaseMixin],
	getInitialState: function(){
		return {
			layerlist: [],
			factlist: [],
			isAdvancedOpen: false,
			tempsampleid: "",
			compareList: [],
			queryDictList: []
		}
	},
	componentWillMount: function(){
		var that = this;
        var compareUrl = that.host + '/querygroup?task_id=' + that.props.taskid;
        that.doCompareListService(compareUrl);
        var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskid + '&type=1';
        this.doQueryDictService(queryDicUrl);
	},
	doQueryDictService: function(url){
		var that = this;
		this.doService(url,function(data){
			that.setState({
				queryDictList: data
			})
		});
	},	
	doCompareListService: function(compareUrl){
		var that = this;
		this.doService(compareUrl,function(data){
			that.setState({
				compareList: data
			});
		});
	},
	componentDidMount: function(){
		var that = this;
		var layerurl = that.host + '/querytask?samelayer&task_id=' + that.props.taskid + '&rand_seed=1';
		this.doService(layerurl,function(data){
			that.setState({
				layerlist: data
			});
		});	
	},
	handleClick: function(){
		this.setState({
			isAdvancedOpen: !this.state.isAdvancedOpen
		});
	},
	setTraffic: function(){
		var that = this;
		var number = $("#quota");
		var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid;
		if(number.val() == ""){
			alert("请输入流量份数！");
			return;
		}else{
			var url = that.host + '/Addsample?task_id='+ that.props.taskid +'&rand_seed=1&quota=' + number.val();
			this.doService(url,function(data){ 
				that.props.doAllocatedListService(sampleurl);
			});
		}
	},
	handleEdit: function(e){
		this.setState({
			tempsampleid: $(e.target).attr('data-id')
		});
	},
	handleDeleteSampleSubmit: function(id){
		var that = this;
		var delUrl = that.host + '/deletesample?id=' + id;
		var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid;
		var compareUrl = that.host + '/querygroup?task_id=' + that.props.taskid; 
		this.doService(delUrl,function(){
			that.props.doAllocatedListService(sampleurl);
	        that.doCompareListService(compareUrl);
		});
	},
	handleAddSample: function(){
		var that = this;
		var test = $("#sampleTest").val();
		var control = $("#sampleControl").val();
		var url = that.host + '/addgroup?task_id=' + that.props.taskid + '&control_sid=' + control + '&test_sid=' + test;
		this.doService(url,function(){
			var compareUrl = that.host + '/querygroup?task_id=' + that.props.taskid;
	        that.doCompareListService(compareUrl);
		});
	},
	handleDelete: function(e){
		var that = this;
		var id = $(e.target).attr('data-id');
		var url = that.host + '/deletegroup?id=' + id;
		var compareUrl = that.host + '/querygroup?task_id=' + that.props.taskid;
		this.doService(url,function(){
	        that.doCompareListService(compareUrl);
		});
	},
	ajaxFileUpload: function(esid){
		var that = this;
		var type = $('.allocate .select').val();
		var sid = esid;
		var url = that.host + '/adddict';
		var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid;
		var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskid + '&type=1';
		var dtd = $.Deferred();
		$.ajaxFileUpload({
			url: url,
			secureuri: false,
			data: {
				type: type,
				sid: sid,
				method: 'upload'
			},
			fileElementId: 'uploadFile',
			dataType: 'json',
			type: 'POST',
			success: function(res){
				if(res.status == 0){
					alert("上传成功！");
					that.props.doAllocatedListService(sampleurl);
					dtd.resolve(res.data.name);
					that.doQueryDictService(queryDicUrl);
				}else{
					alert("上传失败！");
				}
			}
		});
        return dtd;
	},
	handleAddDict: function(sid,dicId){
		var that = this;
		var url = that.host + '/adddict';
		var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid;
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: {
				type: '2',
				sid: sid,
				dict_id: dicId
		    }
		})
		.done(function(res) {
			if(res.status == 0){
				alert("修改成功！");
				that.props.doAllocatedListService(sampleurl);
			}else{
				alert(res.err_msg);
			}
		})
		.fail(function() {
			alert("修改失败！");
		})
		.always(function() {

		});
	},
	handleModifyDict: function(sid,dictId){
		var that = this;
		var dtd = $.Deferred();
		var url = that.host + '/modifydict?sid=' + sid + '&type=1&dict_id=' + dictId;
		var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid;
		var queryDicUrl = that.host + '/querydict?task_id=' + that.props.taskid + '&type=1';
		this.doService(url,function(){
			alert("设置成功！");
			that.props.doAllocatedListService(sampleurl);
			var result = 1;
			dtd.resolve(result);
		});
		dtd.done(function(result){
			if(result == 1){
				that.doQueryDictService(queryDicUrl);
			}
		});
	},
	render: function(){
		var that = this;
		var advancedPanel;
		var taskStatus = this.props.status;
		var tabStyle = {
			height: "100px"
		};
		var advanceStyle = {
			display: "none"
		};
		var taskNodes = this.state.layerlist.map(function(value,i){
			return (
			  <tr key={i}>
			    <td>{value.id}</td>
			    <td>{value.name}</td>
			    <td>{value.username}</td>
			    <td>{value.quota}%</td>			  
			  </tr>
			);
		});
        var allocatedNodes = this.props.allocatedlist.map(function(value,i){
        	return (
        		<AllocatedNode value={value} index={i} queryDictList={that.state.queryDictList} status={taskStatus} userTypeDictId={value.user_type_dict==null?'0':value.user_type_dict.id} taskId={that.props.taskid} handleModifyDict={that.handleModifyDict} handleAddDict={that.handleAddDict} ajaxFileUpload={that.ajaxFileUpload}  tempsampleid={that.state.tempsampleid} handleEdit={that.handleEdit} handleDeleteSampleSubmit={that.handleDeleteSampleSubmit}/>
        	)
        });
		var sampleNodes = this.props.allocatedlist.map(function(value,i){
			return (
				<option value={value.id}>{value.id}</option>
			)
		});
		var compareNodes = this.state.compareList.map(function(value,i){
			return (
				<tr key={i}>
					<td>{i}</td>
					<td>{value.control}</td>
					<td>{value.test}</td>
					<td>{taskStatus<3 ?
						<Button onClick={that.handleDelete} data-id={value.id}>删除</Button> : <span></span>}
					</td>
				</tr>
			)
		});
		return (
			<div id="trafficManager">
	            <div className="title-panel">
	                此处分配您的实验流量,点击查看<a target="_blank" href="">详细帮助</a>
	            </div>
	            {taskStatus<3 ?
	            <div className="modal_btn">
		          <Button onClick={this.handleClick}>高级设置</Button>
		          <div className="advanced">
		            {this.state.isAdvancedOpen?
		            <div id="advanced">
			            <TabbedArea defaultActiveKey={1} className="superior">
						    <TabPane eventKey={1} tab='流量层设置'>
							    <form>
								    <label>随机种子:</label>
								    <select name="rand_type" disabled="disabled" id="randSeed" defaultValue="1">
								     <option value="1">baiduid</option>
		                             <option value="2">rid</option>
		                             <option value="4">uid</option>
		                             <option value="8">query</option>
		                             <option value="16">baidupsid</option>
								    </select>
								    <label>终端类型:</label>
								    <select name="type" disabled="disabled" defaultValue="0">
								     <option value="0">all</option>
								     <option value="1">pc</option>
		                             <option value="2">pad</option>
								    </select>
								    <label>自动空转:</label>
								    <span><input type="checkbox" name="offline_compute" id="offline_compute" disabled="disabled"/></span>
								    <label>流量层分配:</label>
								    <select name="layer" disabled="disabled">
								     <option value="1">维持原层</option>
		                             <option value="2" defaultValue>系统分配</option>
		                             <option value="3">指定和某实验同层</option>
								    </select>
								    <button className="btn" type="button" id="change_layer_btn">设置</button>
							    </form>
						    </TabPane>
						    <TabPane eventKey={2} tab='同层实验查看'>
								<Table bordered>
								<thead>
								  <tr>
								    <th>实验id</th>
								    <th>实验名字</th>
								    <th>负责人</th>
								    <th>流量大小</th>
								  </tr>
								</thead>
								<tbody>
									{this.state.layerlist? taskNodes: 'loading'}
								</tbody>
								</Table>
						    </TabPane>
						</TabbedArea>
		            </div> :
		            <p id="advanced_p">如果需要调整流量层，或者设置sid实际影响流量，或者查看同层实验，请点击上面的高级设置展开设置</p> 
			        }
		          </div>
		        </div>: <span></span>
	            }
	            {taskStatus<3 ?
	            <div>
					<Panel header='添加流量'>
						<table>
							<thead>
								<tr>
	                                <th width="80px">流量份数</th>
	                                <th width="200px">每份流量大小</th>
	                                <th width="80px"></th>                                                             
	                            </tr>							
							</thead>
							<tbody>
								<tr>
									<td><input type="text" name="number" id="quota"/></td>    
									<td>1%</td>
									<td><Button onClick={this.setTraffic}>设置</Button></td>
								</tr>						
							</tbody>
						</table>
					</Panel>
				</div> : <span></span>
			    }
	            <div>
					<Panel header='已分配流量'>
					<form action="" method="post">
						<Table>
							<thead>
								<tr>
	                                <th width="5%">sid</th>
	                                <th width="14%">流量大小</th> 
	                                <th width="60%">流量筛选</th>    
	                                <th width="17%">操作</th>                                                              
	                            </tr>							
							</thead>
							<tbody>
								{this.props.allocatedlist? allocatedNodes: 'loading'}
							</tbody>						
						</Table>
					</form>
					</Panel>
	            </div>  
	            <div>
					<Panel header='SID实验组、对照组配对'>
						<Table>
							<thead>
								<tr>一般一个组只包含1个实验sid和一个对照sid, 并且流量大小和筛选条件是一致的; 对占用了有效流量的SID，必须完成配对</tr>
								<tr>
	                                <th width="80px">组号</th>
	                                <th width="80px">实验组</th> 
	                                <th width="80px">对照组</th>    
	                                <th width="80px">操作</th>                                                              
	                            </tr>							
							</thead>
							<tbody>
								{compareNodes}
								{taskStatus<3 ?
								<tr>
									<td>如果SID未配对成功，请选择并点击'添加'</td>
									<td>
										<Input type='select' name="sample" id="sampleTest">
									          {sampleNodes} 
									    </Input>
								    </td>
									<td>
										<Input type='select' name="compare" id="sampleControl">
									          {sampleNodes} 
									    </Input>
									</td>
									<td><Button onClick={this.handleAddSample}>添加</Button></td>
								</tr> : <tr></tr>
							    }
							</tbody>						
						</Table>
					</Panel>
	            </div>                       
			</div>
		);
	}
});

module.exports = TrafficManager;