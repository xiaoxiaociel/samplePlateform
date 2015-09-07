/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var SchemeConfig = React.createClass({
	mixins: [BaseMixin],
	getInitialState: function(){
		return {
			schemelist: [],
			strategylist: []
		}
	},
	componentWillMount: function(){
		var that = this;
		// var sampleurl = that.host + '/querysample?task_id=' + that.props.taskid; 
		// this.doService(sampleurl,function(data){
		// 	that.setState({
		// 		schemelist: data
		// 	});
		// });
		// var strategyurl = that.host + '/querystrategy?task_id=' + that.props.taskid;
		// this.doService(strategyurl,function(data){
		// 	that.setState({
		// 		strategylist: data
		// 	});
		// });
	},
	bindSampleSubmit: function(){
		var that = this;
		var bindUrl = that.host + '/bindsample';
		var strategy = $(".strategyId");
		var sample = $(".sampleId");
		var strategyList = "";
		var sampleList = "";
		for(var i=0; i < strategy.length; i++){
			strategyList += strategy.eq(i).val() + ',';
		}
		for(var j=0; j< sample.length; j++){
			sampleList += sample[j].innerHTML + ',';
		}
		$.ajax({
			url: bindUrl,
			type: 'POST',
			dataType: 'json',
			data: {
				sample_id: sampleList,
				strategy_id: strategyList,
		    }
		})
		.done(function(res) {
			if(res.status == 0){
				location.reload();
			}else{
				alert(res.err_msg);
			}
		})
		.fail(function() {
		})
		.always(function() {
		});
		
	},
	render: function(){
		var that = this;
		// var strategyNodes = that.props.strategylist.map(function(value,j){
		// 	return (
  //   			<option key={j} value={value.id}>{value.description}{key.strategy_id}</option>
  //   		);
		// });
		var schemeNodes = that.props.allocatedlist.map(function(key,i){
			return (
                <tr key={i}>
                    <td className="sampleId">{key.id}</td>
                    <td>{key.quota}%</td>
                    <td>
	                    <Input type="select" name="strategyId" className="strategyId">
		                    <option key={0} value="0" selected>对照流量</option>
		                    {
			                    that.props.strategylist.map(function(value,j){
			                    	if(key.strategy_id == value.id){
			                    		return (
										<option key={j+1} value={value.id} selected>{value.description}</option>						    			
						    		    )
			                    	}else{
							    		return (
							    			<option key={j+1} value={value.id}>{value.description}</option>
							    		)			                    		
			                    	}				
								})
		                    }
	                    </Input>
                    </td>
                </tr>				
			);
		});
		return(
			<div>
		        <div className="title-panel">
		            此处分配您的实验流量,点击查看<a target="_blank" href="">详细帮助</a>
		        </div>
		        <div className="table-panel">
					<Table striped bordered condensed hover>
						<thead>
							<tr>
	                            <th width="80px">sid</th>
	                            <th width="80px">流量</th> 
	                            <th width="80px">抽样规则配置</th>                                                               
	                        </tr>							
						</thead>
						<tbody>
							{that.props.allocatedlist? schemeNodes: 'loading'}
						</tbody>						
					</Table>
					{this.props.status < 3 ?
						<Button bsStyle='primary' onClick={that.bindSampleSubmit}>提交方案配置</Button>: <span></span>	        
					}
		        </div>	
			</div>
		);
	}
});

module.exports = SchemeConfig;