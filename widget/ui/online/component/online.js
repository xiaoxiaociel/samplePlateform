/** @jsx React.DOM */
var Button = ReactBootstrap.Button;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var CommonModal = require('samplemis:widget/ui/commonComponent/modal/modal.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');

var Online = React.createClass({
	mixins: [BaseMixin],
	// handleTipOnline: function(){
	// 	var that = this;
	// 	var url = that.host + '/tiponline?task_id=' + that.props.sampleInfo.taskid;
	// 	this.doService(url,function(){
	// 		location.reload();
	// 	});
	// },
	// handleTipOffline: function(){
	// 	var that = this;
	// 	var url = that.host + '/tipoffline?task_id=' + that.props.sampleInfo.taskid;
	// 	this.doService(url,function(){
	// 		location.reload();
	// 	});
	// },
	handleOnline: function(){
		var that = this;
		var url = that.host + '/online?task_id=' + that.props.sampleInfo.taskid;
		this.doService(url,function(){
			location.reload();
		});	
	},
	handleStop: function(){
		var that = this;
		var url = that.host + '/offline?task_id=' + that.props.sampleInfo.taskid;
		this.doService(url,function(){
			location.reload();
		});		
	},
	render: function(){
		return (
			<div id="online">
				<div>
					<ModalTrigger modal={<CommonModal title='确认上线到线上？' handleSubmit={this.handleOnline}/>}>
						<Button bsStyle='info'>线上上线</Button>
					</ModalTrigger>
					<ModalTrigger modal={<CommonModal title='确认终止？' handleSubmit={this.handleStop}/>}>
						<Button bsStyle='warning'>终止</Button>
					</ModalTrigger>
				</div>
			</div>
		)
	}
});
module.exports = Online;
