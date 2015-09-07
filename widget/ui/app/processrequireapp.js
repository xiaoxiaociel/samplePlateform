/** @jsx React.DOM */
var ProcessRequire = require('samplemis:widget/ui/processrequire/app.js');
var App = {
	init: function(){
		var that = this;
		this.lazyload();		
	},
	lazyload: function(){
		React.render(
			<ProcessRequire/>,
			document.getElementById('main')
		);
	}
}

module.exports = App;