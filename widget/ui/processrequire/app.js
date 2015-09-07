/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var ProcessRequire = require('samplemis:widget/ui/processrequire/component/processrequire.js');
var Button = ReactBootstrap.Button;

var ProcessRequireApp = React.createClass({

	render: function() {
		return (
			<div><ProcessRequire /></div>
		);
	}

});

module.exports = ProcessRequireApp;