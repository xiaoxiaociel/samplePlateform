/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var NewProject = require('samplemis:widget/ui/newproject/component/newproject.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var NewProjectApp = React.createClass({
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
			<NewProject />
		</div>
		);
	}

});

module.exports = NewProjectApp;