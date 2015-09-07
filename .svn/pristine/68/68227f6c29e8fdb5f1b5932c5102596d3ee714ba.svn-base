/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;

var AddValueModal = React.createClass({
  handleSubmit: function(){
      var that = this;
      var inputName = $("#addValueModal .name");
      var inputService = $("#addValueModal .service");
      var inputDesc = $("#addValueModal .remark");
      if(inputName.val() == ""){
          inputName.css('border-color', 'red');
          return;
      }else if(inputService.val() == ""){
          inputService.css('border-color', 'red');
          return;
      }else if(inputDesc.val() == ""){
          inputDesc.css('border-color', 'red');
          return;
      }else{
          var dtd = this.props.handleAddvarSubmit(inputName.val(),inputService.val(),inputDesc.val());
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
		var optionsNode = this.props.servicelist.map(function(value,key){
            return <option value={value.id} key={key}>{value.name}</option>
        });
		return (
        <Modal title='添加变量' onRequestHide={this.props.onRequestHide} id="addValueModal" className="mymodal">
          <div className='modal-body'>
              <div><label>变量名称：</label><Input type="text" name="name" className="input name"/></div>
              <div><label>对应的模块：</label><Input type="select" className="input service" name="modal"><option value="">请选择</option>{optionsNode}</Input></div>
              <div><label>描述：</label><Input type="textarea" className="remark" name="remark"></Input></div>       
          </div>
          <div className='modal-footer'>
              <Button onClick={this.handleSubmit}>确定</Button>
              <Button onClick={this.props.onRequestHide}>关闭</Button>
          </div>           
        </Modal>		
		);
	}
});

module.exports = AddValueModal;