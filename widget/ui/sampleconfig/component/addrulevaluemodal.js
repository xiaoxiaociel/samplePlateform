/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');

var AddRuleValueModal = React.createClass({
	mixins: [BaseMixin],
	getInitialState: function(){
		return {
			serviceList: [],
			valueNameList:[]
		};
	},
	componentWillMount: function(){
		var that = this;
		var serviceurl = that.host + '/queryservice';
		this.doService(serviceurl,function(data){
			that.setState({
				serviceList: data
			});
		});
	},
	handleChange: function(){
		var that = this;
		var serviceId = $("#addRuleValueModal .module").val();
		var valueUrl = that.host + '/queryvariable?service_id=' + serviceId;
		this.doService(valueUrl,function(data){
			that.setState({
				valueNameList: data
			});
		});
	},
	handleSubmit: function(){
		var that = this;
		var ruleId = that.props.tempruleinfo.id;
		var inputName = $("#addRuleValueModal .name");
		var inputValue = $("#addRuleValueModal .value");
		var inputDesc = $("#addRuleValueModal .desc");
		if(inputName.val() == ""){
			inputName.css('border-color', 'red');
			return;
		}else{
			var dtd = this.props.handleAddRuleValueSubmit(ruleId,inputName.val(),inputValue.val(),inputDesc.val());
			dtd.done(function(result){
				if(result == 0){
					that.props.onRequestHide();
				}else{
					alert(result);
				}
			});
		}
	},
	render: function(){
		var optionNodes = this.state.serviceList.map(function(value, key) {
			return (
				<option key={key} value={value.id}>{value.name}</option>
			);
		});
		var nameNodes = this.state.valueNameList.map(function(value, key){
			return (
				<option key={key} value={value.id}>{value.name}</option>
			)
		});
		return (
		  <Modal title='添加规则变量' id="addRuleValueModal" className="mymodal" onRequestHide={this.props.onRequestHide}>
	        <div className='modal-body'>
	          <div>
		          <label>对应模块：</label>
		          <Input type="select" name="module" className="input module" onChange={this.handleChange}><option value="">请选择</option>{this.state.serviceList? optionNodes:'loading'}</Input>
	          </div>
	          <div>
		          <label>变量类型：</label>
		          <Input type='select' placeholder='select' name="type" className="input type"><option value="0">变量</option></Input>
	          </div>
	          <div>
		          <label>变量名称：</label>
		          <Input type='select' placeholder='select' name="name" className="input name"><option value="">请选择</option>{this.state.valueNameList? nameNodes: 'loading'}</Input>
	          </div>
	          <div>
		          <label>变量值：</label>
		          <Input type="textarea" className="value" name="value"></Input>
		      </div>
		      <div>
		          <label>变量描述：</label>
		          <Input type="textarea" className="desc" name="desc"></Input>
		      </div>  
	        </div>
	        <div className='modal-footer'>
	          <Button onClick={this.handleSubmit}>确认</Button>
	          <Button onClick={this.props.onRequestHide}>关闭</Button>
	        </div>
	      </Modal>			
		);
	}
});

module.exports = AddRuleValueModal;