/** @jsx React.DOM */
var Online = require('samplemis:widget/ui/online/component/online.js');
var Offline = require('samplemis:widget/ui/online/component/offline.js');
var Offlined = require('samplemis:widget/ui/online/component/offlined.js');
var Button = ReactBootstrap.Button;

var OnlineApp = React.createClass({

	render: function() {
		if(this.props.sampleInfo.status == 5){
			return (
				<Online sampleInfo={this.props.sampleInfo}/>
			);
		}else if(this.props.sampleInfo.status == 6){
			return (
				<Offline sampleInfo={this.props.sampleInfo}/>
			);
		}else if(this.props.sampleInfo.status == 7){
			return (
				<Offlined/>
			);
		}
	}

});

module.exports = OnlineApp;