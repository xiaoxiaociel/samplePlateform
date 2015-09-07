/** @jsx React.DOM */
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;

var DeleteSampleModal = React.createClass({
    handleSubmit: function(){
        this.props.handleDeleteSampleSubmit(this.props.tempsampleid);
        this.props.onRequestHide();
    },
	render: function(){
		return (
            <Modal title='确认删除该抽样节点？' onRequestHide={this.props.onRequestHide}>
                <div className='modal-footer'>
                    <Button onClick={this.handleSubmit}>确定</Button>
                    <Button onClick={this.props.onRequestHide}>取消</Button>
                </div>
            </Modal>		
		);
	}
});

module.exports = DeleteSampleModal;