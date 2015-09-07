/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var ViewProcess = require('samplemis:widget/ui/viewprocess/component/viewprocess.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var ViewProcessApp = React.createClass({
    mixins: [BaseMixin],
	getInitialState: function(){
	    return {
	        username: ''
	    }
	},
	componentWillMount: function(){
		var that = this;
		var url = that.host + '/username' + '?random=' + Math.random();
		this.doService(url, function(data){
			that.setState({
			    username: data
			});
		}); 
	},	
	render: function(){
		return (
			<div>
				<Mynav username={this.state.username}/>
				<ViewProcess />
			</div>
		)
	}
});

module.exports = ViewProcessApp;