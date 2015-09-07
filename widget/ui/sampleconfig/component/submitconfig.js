/** @jsx React.DOM */
var Button = ReactBootstrap.Button;

var SubmitConfig = React.createClass({
	render: function(){
		return (
			this.props.status < 3?
			<Button bsStyle='success' onClick={this.props.handleSample}>提交抽样配置</Button>
			: <h3>抽样配置已提交！</h3>
		)
	}
});

module.exports = SubmitConfig;


