/** @jsx React.DOM */
var Mynav = require('samplemis:widget/ui/commonComponent/nav/nav.js');
var NewProcess = require('samplemis:widget/ui/newprocess/component/newprocess.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;

var NewProcessApp = React.createClass({
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
				<NewProcess/>
			</div>
		);
	}

});

module.exports = NewProcessApp;