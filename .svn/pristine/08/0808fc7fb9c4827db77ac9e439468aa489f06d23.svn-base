/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;

var EditValueModal = React.createClass({
  getInitialState: function(){
      return {
          value: this.props.tempvalueinfo.name
      }
  },
  handleChange: function(e){
      this.setState({value: e.target.value});
  },
  handleSubmit: function(){
      var that = this;
      var inputName = $("#editValueModal .name");
      var inputService = $("#editValueModal .service");
      var inputDesc = $("#editValueModal .remark");
      var id = that.props.tempvalueinfo.id;
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
          var dtd = this.props.handleEditVarSubmit(id,inputName.val(),inputService.val(),inputDesc.val());
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
      <Modal title='修改变量' onRequestHide={this.props.onRequestHide} id="editValueModal" className="mymodal">
          <div className='modal-body'>
            <div>
              <label>对应模块：</label>
              <Input type="select" name="remark" className="service" defaultValue={this.props.tempvalueinfo.serviceid}><option>请选择</option>{optionsNode}</Input>
            </div>
            <div>
              <label>变量名称：</label>
              <Input type='text' name="cache" className="name" defaultValue={this.props.tempvalueinfo.name}/>
            </div>
            <div>
                <label>变量描述：</label>
                <Input type="textarea" className="remark" name="remark" defaultValue={this.props.tempvalueinfo.desc}/>
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

module.exports = EditValueModal;