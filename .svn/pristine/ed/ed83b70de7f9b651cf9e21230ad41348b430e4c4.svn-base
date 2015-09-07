/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;

var EditRuleValueModal = React.createClass({
	handleSubmit: function(){
		var that = this;
		var ruleVarId = that.props.temprulevar.id;
		var inputValue = $("#EditRuleValueModal .value");
		var inputDesc = $("#EditRuleValueModal .desc");
		var dtd = that.props.handleEditRuleVarSubmit(ruleVarId,inputValue.val(),inputDesc.val());
		dtd.done(function(result){
			if(result == 0){
				that.props.onRequestHide();
			}else{
				alert(result);
			}
		});
	},
	render: function(){
		return (
		  <Modal title='修改规则变量' id="EditRuleValueModal" className="mymodal" onRequestHide={this.props.onRequestHide}>
	        <div className='modal-body'>
	          <div>
		          <label>对应模块：</label>
		          <Input type="select" name="module" className="input module" disabled="disabled"><option>{this.props.temprulevar.service}</option></Input>
	          </div>
	          <div>
		          <label>变量类型：</label>
		          <Input type='select' name="type" className="input type" disabled="disabled"><option value="0">变量</option></Input>
	          </div>
	          <div>
		          <label>变量名称：</label>
		          <Input type='select' name="name" className="input name" disabled="disabled"><option>{this.props.temprulevar.name}</option></Input>
	          </div>
	          <div>
		          <label>变量值：</label>
		          <Input type="textarea" className="value" name="value" defaultValue={this.props.temprulevar.value}></Input>
		      </div>
		      <div>
		          <label>变量描述：</label>
		          <Input type="textarea" className="desc" name="desc" defaultValue={this.props.temprulevar.desc}></Input>
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

module.exports = EditRuleValueModal;