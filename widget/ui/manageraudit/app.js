/** @jsx React.DOM */
var ManagerState = require('samplemis:widget/ui/manageraudit/component/managerState.js');
var ManagerAudited = require('samplemis:widget/ui/manageraudit/component/managerAudited.js');
var ManagerAuditing = require('samplemis:widget/ui/manageraudit/component/managerAuditing.js');
var Button = ReactBootstrap.Button;

var ManagerAuditApp = React.createClass({

	render: function() {
		if(this.props.sampleInfo.authority == "normal" && this.props.sampleInfo.status < 5){
			return (
				<ManagerAuditing sampleInfo={this.props.sampleInfo}/>
			);
		}else if(this.props.sampleInfo.authority == "nomal" && this.props.sampleInfo.status >= 5){
			return (
				<ManagerAudited sampleInfo={this.props.sampleInfo}/>
			)
		}
		else if(this.props.sampleInfo.authority == "rd" && this.props.sampleInfo.status < 5){
			return (
				<ManagerAuditing sampleInfo={this.props.sampleInfo}/>
			)
		}else if(this.props.sampleInfo.authority == "rd" && this.props.sampleInfo.status >= 5){
			return (
				<ManagerAudited sampleInfo={this.props.sampleInfo}/>
			)
		}
		else if(this.props.sampleInfo.authority == "manager" && this.props.sampleInfo.status < 5){
			return (
				<ManagerState sampleInfo={this.props.sampleInfo}/>
			)
		}else if(this.props.sampleInfo.authority == "manager" && this.props.sampleInfo.status >= 5){
			return (
				<ManagerAudited sampleInfo={this.props.sampleInfo}/>
			)
		}else{
			return (
				<ManagerAudited sampleInfo={this.props.sampleInfo}/>
			)
		}
	}

});

module.exports = ManagerAuditApp;