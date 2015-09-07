/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var ProjectList = require('samplemis:widget/ui/projectlist/component/projectlist.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var ProjectListApp = React.createClass({
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
				<ProjectList username={this.state.username}/>
			</div>
		);
	}

});

module.exports = ProjectListApp;