/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;

var DeleteRuleValueModal = React.createClass({
    handleSubmit: function(){
        this.props.handleDeleteRuleVarSubmit(this.props.temprulevar.id);
        this.props.onRequestHide();
    },
	render: function(){
		return (
            <Modal title='确认删除规则变量？' onRequestHide={this.props.onRequestHide}>
                <div className='modal-footer'>
                    <Button onClick={this.handleSubmit}>确定</Button>
                    <Button onClick={this.props.onRequestHide}>取消</Button>
                </div>
            </Modal>		
		);
	}
});

module.exports = DeleteRuleValueModal;