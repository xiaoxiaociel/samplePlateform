/** @jsx React.DOM */
var Button = ReactBootstrap.Button;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var Offline = React.createClass({
	mixins: [BaseMixin],
	handleOffline: function(){
		var that = this;
		var url = that.host + '/offline?task_id=' + that.props.sampleInfo.taskid;
		this.doService(url,function(){
			location.reload();
		});	
	},
	render: function(){
		return (
			<div>
				<Button bsStyle='info' onClick={this.handleOffline}>下线实验</Button>
			</div>
		)
	}
});

module.exports = Offline;