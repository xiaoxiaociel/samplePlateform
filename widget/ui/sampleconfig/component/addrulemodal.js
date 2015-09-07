/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var DropdownButton = ReactBootstrap.DropdownButton;

var AddRuleModal = React.createClass({
	getInitialState: function(){
		return{
			selectCache: '请选择'
		}
	},
	handleSubmit: function(){
		var that = this;
		var inputdesc = $("#addRuleModal .desc");
		// var inputcache = $("#addRuleModal .cache");
		var selectArray = new Array();
		$("input[name='multiple-cache']:checked").each(function(){
			selectArray.push($(this).val());
		});
		var inputcache = selectArray.join(',');
		if(inputdesc.val() == ""){
			inputdesc.css('border-color', 'red');
			return;
		}else{
			var dtd = this.props.handleAddRuleSubmit(inputdesc.val(),inputcache);
			dtd.done(function(result){
				if(result == 0){
					that.props.onRequestHide();
				}else{
					alert(result);
				}
			});
		}		 
	},
	selectCache: function(){
		var selectArray = new Array();
		$("input[name='multiple-cache']:checked").each(function(){
			selectArray.push($(this).attr('label'));
		});
		var select = selectArray.join(',');
		this.setState({
			selectCache: select
		});
	},
	render: function(){
		var that = this;
		var cacheNodes = this.props.cachelist.map(function(value, key) {
		    return (
		    	<Input key={key} type='checkbox' name='multiple-cache' label={value.name} value={value.id} onChange={that.selectCache}/>
		    )
		});
		return (
		  <Modal title='添加规则版本' id="addRuleModal" className="mymodal" onRequestHide={this.props.onRequestHide}>
	        <div className='modal-body'>
	          <div>
		          <label>版本描述：</label>
		          <Input type="text" name="remark" className="input desc"/>
	          </div>
	          <div className="cache-panel">
		          <label>cache影响：</label>
		          <DropdownButton title={this.state.selectCache}>
			          {cacheNodes}
		          </DropdownButton>
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

module.exports = AddRuleModal;

		          // <Input type='select' placeholder='select' name="cache" className="input cache" multiple>
			         //  <option value='0'>不设置</option>
		          // {serviceNodes}
		          // </Input>