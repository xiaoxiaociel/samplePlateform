/** @jsx React.DOM */
var ViewProcessApp = require('samplemis:widget/ui/viewprocess/app.js');
var App = {
	init: function(){
		var that = this;
		this.lazyload();		
	},
	lazyload: function(){
		React.render(
			<ViewProcessApp/>,
			document.getElementById('main')
		);
	}
}

module.exports = App;