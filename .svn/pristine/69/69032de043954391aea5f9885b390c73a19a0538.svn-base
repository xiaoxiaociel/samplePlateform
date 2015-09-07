/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var DropdownButton = ReactBootstrap.DropdownButton;

var EditRuleInfoModal = React.createClass({
    getInitialState: function(){
        return{
            selectCache: '请选择'
        }
    },  
    handleSubmit: function(){
        var that = this;
        var id = that.props.tempruleinfo.id;
        var inputDesc = $("#editRuleInfoModal .desc");
        var selectArray = new Array();
        $("input[name='multiple-cache']:checked").each(function(){
            selectArray.push($(this).val());
        });
        var inputcache = selectArray.join(',');
        if(inputDesc.val() == ""){
            inputDesc.css('border-color', 'red');
        }else{
            var dtd = this.props.handleEditRuleSubmit(id,inputDesc.val(),inputcache);
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
            <Modal title='修改规则信息' id="editRuleInfoModal" onRequestHide={this.props.onRequestHide} className="mymodal">
                <div className='modal-body'>
                    <div>
                      <label>版本描述：</label>
                      <Input type="text" name="remark" className="input desc" defaultValue={this.props.tempruleinfo.desc}/>
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

module.exports = EditRuleInfoModal;