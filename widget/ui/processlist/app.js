/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var ProcessList = require('samplemis:widget/ui/processlist/component/processlist.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var ProcessListApp = React.createClass({
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
	render: function() {
		return (
			<div>
				<Mynav username={this.state.username}/>
				<ProcessList username={this.state.username}/>
			</div>
		);
	}

});

module.exports = ProcessListApp;