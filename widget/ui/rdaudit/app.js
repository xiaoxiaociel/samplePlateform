/** @jsx React.DOM */
var AuditState = require('samplemis:widget/ui/rdaudit/component/auditstate.js');
var RdAudited = require('samplemis:widget/ui/rdaudit/component/rdaudited.js');
var RdAuditing = require('samplemis:widget/ui/rdaudit/component/rdauditing.js');
var Button = ReactBootstrap.Button;

var RdAuditApp = React.createClass({

	render: function() {
		if(this.props.sampleInfo.authority == "normal" && this.props.sampleInfo.status < 4){
			return (
				<RdAuditing sampleInfo={this.props.sampleInfo}/>
			);
		}else if(this.props.sampleInfo.authority == "nomal" && this.props.sampleInfo.status >= 4){
			return (
				<AuditStated sampleInfo={this.props.sampleInfo}/>
			)
		}
		else if(this.props.sampleInfo.authority == "rd" && this.props.sampleInfo.status < 4){
			return (
				<AuditState sampleInfo={this.props.sampleInfo}/>
			)
		}else if(this.props.sampleInfo.authority == "rd" && this.props.sampleInfo.status >= 4){
			return (
				<RdAudited sampleInfo={this.props.sampleInfo}/>
			)
		}
		else if(this.props.sampleInfo.authority == "manager"){
			return (
				<RdAuditing sampleInfo={this.props.sampleInfo}/>
			)
		}else{
			return (
				<RdAudited sampleInfo={this.props.sampleInfo}/>
			)
		}
	}

});

module.exports = RdAuditApp;