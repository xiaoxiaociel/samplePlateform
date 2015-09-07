/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var PanelGroup = ReactBootstrap.PanelGroup;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Table = ReactBootstrap.Table;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var AddRuleModal = require('samplemis:widget/ui/sampleconfig/component/addrulemodal.js');
var AddRuleValueModal = require('samplemis:widget/ui/sampleconfig/component/addrulevaluemodal.js');
var EditRuleInfoModal = require('samplemis:widget/ui/sampleconfig/component/editruleinfomodal.js');
var EditValueModal = require('samplemis:widget/ui/sampleconfig/component/editvaluemodal.js');
var EditRuleValueModal = require('samplemis:widget/ui/sampleconfig/component/editrulevaluemodal.js');
var DeleteValueModal = require('samplemis:widget/ui/sampleconfig/component/deletevaluemodal.js');
var DeleteRuleValueModal = require('samplemis:widget/ui/sampleconfig/component/deleterulevaluemodal.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var RuleConfig = React.createClass({
	mixins: [BaseMixin],
	getInitialState: function(){
		return {
			strategylist: [],//规则列表
			cachelist: [],//cache列表
			ruledesc: '',
			tempvalueid: '',
			temprulevar: [],
			tempruleinfo: []
		}
	},
	componentWillMount: function(){
		var that = this;
		var cacheurl = that.host + '/querycache';
		this.doService(cacheurl,function(data){
			that.setState({
				cachelist: data
			});
		});		
	},
	handleAddRuleSubmit: function(inputdesc,inputcache){
		var that = this;
		var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		var addurl = that.host + '/addstrategy?task_id=' + that.props.taskid + '&desc=' + inputdesc + '&cache=' + inputcache;
		var result;
		var dtd = $.Deferred();
		$.ajax({
            url: addurl,
            type: 'GET',
            dataType: 'json'
        })
        .done(function(res) {
            if(res.status == 0){
                result = 0;
                that.props.doStategyListService(strategyurl);
                dtd.resolve(result);
            }else{
                result = res.err_msg;
                dtd.resolve(result);
            }    
        })
        .fail(function() {
            result = "添加失败！";
            dtd.reject(result);
        })
        .always(function() {

        }); 
        return dtd;
	},
	handleEditRuleSubmit: function(id,inputdesc,inputcache){
		var that = this;
		var editurl = that.host + '/modifystrategy?id=' + id + '&desc=' + inputdesc + '&cache=' + inputcache;
		var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		var dtd = $.Deferred();
		var result;
		$.ajax({
			url: editurl,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(res) {
			if(res.status == 0){
				result = 0;
				that.props.doStategyListService(strategyurl);
				dtd.resolve(result);
			}else{
				result = res.err_msg;
				dtd.resolve(result);
			}
		})
		.fail(function() {
			result = "添加失败！";
            dtd.reject(result);
		})
		.always(function() {
			
		});
		return dtd;
	},
	handleAddRuleValueSubmit: function(ruleId,inputName,inputValue,inputDesc){
		var that = this;
		var ruleUrl = that.host + '/Addrule?strategy_id='+ ruleId +'&variable_id='+ inputName + '&value='+ inputValue + '&desc=' + inputDesc;
		var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		var dtd = $.Deferred();
		var result;
		$.ajax({
			url: ruleUrl,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(res) {
			if(res.status == 0){
				result = 0;
				that.props.doStategyListService(strategyurl);
				dtd.resolve(result);
			}else{
				result = res.err_msg;
				dtd.resolve(result);
			}
		})
		.fail(function() {
			result = "添加失败！";
            dtd.reject(result);
		})
		.always(function() {
			
		});
		return dtd;
	},
	handleEdit: function(e){
		this.setState({
			tempruleinfo: {
				'id': $(e.target).attr('data-id'),
				'desc': $(e.target).attr('data-desc'),
				'cache': $(e.target).attr('data-cache')
			}
		});
	},
	handleEditRuleVar: function(e){
		this.setState({
			temprulevar: {
				'id': $(e.target).attr('data-id'),
				'name': $(e.target).attr('data-name'),
				'value': $(e.target).attr('data-value'),
				'type': $(e.target).attr('data-type'),
				'service': $(e.target).attr('data-service'),
				'desc': $(e.target).attr('data-desc')	 
			}
		});
	},
	handleEditRuleVarSubmit: function(ruleVarId,inputValue,inputDesc){
		var that = this;
		var editUrl = that.host + '/modifyrule?id='+ ruleVarId +'&value='+ inputValue +'&desc=' +inputDesc;
		var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		var dtd = $.Deferred();
		var result;
		$.ajax({
			url: editUrl,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(res) {
			if(res.status == 0){
				result = 0;
				that.props.doStategyListService(strategyurl);
				dtd.resolve(result);
			}else{
				result = res.err_msg;
				dtd.resolve(result);
			}
		})
		.fail(function() {
			result = "修改失败！";
            dtd.reject(result);
		})
		.always(function() {
			
		});
		return dtd;
	},
	handleDeleteRuleVarSubmit: function(ruleVarId){
		var that = this;
		var delUrl = that.host + '/deleterule?id=' + ruleVarId;
		var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		this.doService(delUrl,function(){
			that.props.doStategyListService(strategyurl);
		});
	},
	render: function(){
		var that = this;
		var taskStatus = this.props.status;
		var strategyNodes = this.props.strategylist.map(function(value,key){
			var ruleVar = value.rules;
			var cacheNode = value.cache.map(function(cacheValue,i){
				return <span>{cacheValue.name},</span>
			});
			return (				
			    <Panel key={key}>
			    <p className="info"><span>规则id：{value.id}</span><span>规则描述：{value.description}</span><span>影响cache：{cacheNode}</span><span>sid：{value.sid}</span>
			    {taskStatus<3?		    
				    <ModalTrigger modal={<EditRuleInfoModal tempruleinfo={that.state.tempruleinfo} cachelist={that.state.cachelist} handleEditRuleSubmit={that.handleEditRuleSubmit}/>} container={that}>                 
                        <a data-id={value.id} data-desc={value.description} data-cache={value.cache != ''? value.cache[0].id : ''} onClick={that.handleEdit}>修改规则信息</a>
                    </ModalTrigger>: <span></span>
                }
                {taskStatus<3?	
                    <ModalTrigger modal={<AddRuleValueModal tempruleinfo={that.state.tempruleinfo} cachelist={that.state.cachelist} handleAddRuleValueSubmit={that.handleAddRuleValueSubmit}/>} container={that}>                 
                        <a data-id={value.id} onClick={that.handleEdit}>新增规则变量</a>
                    </ModalTrigger>
                    : <span></span>
                }
				</p>
				    <Table striped bordered condensed hover>
		    			<thead>
			    			<tr>
	                            <th>编号</th>
	                            <th>变量名称</th>
	                            <th>变量值</th>
	                            <th>类别</th>
	                            <th>对应模块</th>
	                            <th>描述</th>
	                            <th>操作</th>
	                        </tr>
		    			</thead>
		    			<tbody>
					    {   ruleVar ? ruleVar.map(function(child,i){
					    		return (
		                          <tr key={i}>
			                          <td>{child.id}</td><td>{child.name}</td><td>{child.value}</td><td>{child.type}</td><td>{child.service}</td><td>{child.description}</td>
			                          { taskStatus<3?
			                          <td>
				                          <ModalTrigger modal={<EditRuleValueModal temprulevar={that.state.temprulevar} handleEditRuleVarSubmit={that.handleEditRuleVarSubmit}/>}>
											<Button onClick={that.handleEditRuleVar} data-id={child.id} data-name={child.name} data-value={child.value} data-type={child.type} data-service={child.service} data-desc={child.description}>编辑</Button>
				                          </ModalTrigger>
				                          <ModalTrigger modal={<DeleteRuleValueModal temprulevar={that.state.temprulevar} handleDeleteRuleVarSubmit={that.handleDeleteRuleVarSubmit}/>}>
					                        <Button onClick={that.handleEditRuleVar} data-id={child.id}>删除</Button>
				                          </ModalTrigger>		                         
				                      </td> : <td></td>}
		                          </tr>
					    		);
					    	}): "尚未配置任何变量"		 
					    }
		    			</tbody>
		    		</Table>
			    </Panel>		
			);	
		});
		return (
			<div id="ruleConfig">
                <div className="title-panel">
                    此处建立实验规则,每个sid对应一个版本，对照流量不配任何资源模板，点击查看<a target="_blank" href="">详细配置帮助</a>
                </div>
                {taskStatus<3?
                <div className="modal_btn">
                    <ModalTrigger modal={<AddRuleModal cachelist={this.state.cachelist} handleAddRuleSubmit={this.handleAddRuleSubmit}/>} container={this}>                 
                    <Button bsStyle='primary'><i className="icon-add"></i>添加规则</Button>
                    </ModalTrigger>
                 </div> : <span></span>}
                <div className="table-panel">
	                {strategyNodes}
                </div>
			</div>
		);
	}
});

module.exports = RuleConfig;