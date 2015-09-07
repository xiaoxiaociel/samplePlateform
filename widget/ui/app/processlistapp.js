/** @jsx React.DOM */
var ProcessListApp = require('samplemis:widget/ui/processlist/app.js');
var App = {
	init: function(){
		var that = this;
		this.lazyload();		
	},
	lazyload: function(){
		React.render(
			<ProcessListApp/>,
			document.getElementById('main')
		);
	}
}

module.exports = App;