/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var Participant = require('samplemis:widget/ui/selectparticipants/component/participant.js');
var ParticipantApp = React.createClass({

	render: function() {
		return (
			<div>
				<Mynav />
				<Participant />
			</div>
		);
	}

});

module.exports = ParticipantApp;