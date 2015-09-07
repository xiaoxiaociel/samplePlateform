/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var OverlayMixin = ReactBootstrap.OverlayMixin;
var Pager = ReactBootstrap.Pager;
var PageItem = ReactBootstrap.PageItem;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var activePage = 0;
var flag = false;
var ProcessList = React.createClass({
    // var activePage = 1,
    mixins: [OverlayMixin,BaseMixin],
    getInitialState: function(){
        return {
            list: [],
            isModalOpen: false,
            dataId: '',
            dataName: ''
        };
    },
    handleNext: function(){
        var that = this;
        activePage = activePage + 1;
        if(flag){
            var creater = $("input[name='creater']").val();
            var processName = $("input[name='process_name']").val();
            var flowType = $("select[name='flow_type']").val();
            $("input[name='status']:checked").length != 0? status = $("input[name='status']:checked").val() : status = "";
            var url = '/sample/querytask?owner='+ creater + '&type='+ flowType +'&name='+ processName + '&status=' + status + '&pn=' + activePage*10 + '&rn=10';
        }else{
            var url = '/sample/querytask?pn=' + activePage*10 + '&rn=10';           
        }
        this.doService(url,function(data){
            if(data.length == 0){
                alert("已经是最后一页啦！");
                activePage = activePage - 1;
                return;
            }else{
                that.setState({
                    list: data
                });
            }
        });
    },
    handlePrev: function(){
        var that = this;
        if(activePage <=0){
            alert("已经是第一页啦！");
            return;
        }else{
            activePage = activePage - 1;
            if(flag){
                var creater = $("input[name='creater']").val();
                var processName = $("input[name='process_name']").val();
                var flowType = $("select[name='flow_type']").val();
                $("input[name='status']:checked").length != 0? status = $("input[name='status']:checked").val() : status = "";
                var url = '/sample/querytask?owner='+ creater + '&type='+ flowType +'&name='+ processName + '&status=' + status + '&pn=' + activePage*10 + '&rn=10';
            }else{
                var url = '/sample/querytask?pn=' + activePage*10 + '&rn=10';
            }
            this.doService(url,function(data){
                that.setState({
                    list: data
                });
            });
        }
    },
    componentWillMount: function(){
        var that = this;
        var Request = that.getRequest();
        projectId = Request['projectid'];
        username = Request['owner'];
        if(username != '' && username != undefined){
            var url = that.host + '/querytask?owner=' + username;
        }else if(Math.round(projectId) == projectId){
            var url = that.host + '/querytask?project_id=' + projectId;
        }else{
            var url = that.host + '/querytask?pn=0&rn=10';
        }
        this.doService(url, function(data){
            that.setState({
                list: data
            });
        });    
    },
    handleToggle: function(e){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            dataId: e.target.getAttribute('data-id'),
            dataName: e.target.getAttribute('data-name')
        });
    },
    handleClose: function(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });        
    },
    handleDeleteSubmit: function(e){
        var that = this;
        var url = that.host + '/canceltask?id=';
        var myurl = that.host + '/querytask';
        var postData = {
            'id': that.state.dataId
        }
        this.doService(url, function(){
            that.handleClose();
            location.reload();    
        },postData);    
    },
    handleProcess: function(){
        window.location.href = '/sample/newprocess';
    },
    handleSearch: function(){
        flag = true;
        var that = this;
        var creater = $("input[name='creater']").val();
        var processName = $("input[name='process_name']").val();
        var flowType = $("select[name='flow_type']").val();
        $("input[name='status']:checked").length != 0? status = $("input[name='status']:checked").val() : status = "";
        var url = '/sample/querytask?owner='+ creater + '&type='+ flowType +'&name='+ processName + '&status=' + status + '&pn=0&rn=10';
        this.doService(url, function(data){
            that.setState({
                list: data
            });         
        });
    },
    render: function(){
        var that = this;
        var Request = that.getRequest();
        var username = Request['owner'];
        var trNodes = this.state.list.map(function(value,i){
            var viewDetail = "/sample/viewprocess?taskid=" + value.id;
            var status;
            if(value.status == 0){
                status = '已废弃';
            }else if(value.status == 1){
                status = '创建中';
            }else if(value.status == 2){
                status = '配置中';
            }else if(value.status == 3){
                status = 'rd审核中';
            }else if(value.status == 4){
                status = '经理审核中';
            }else if(value.status == 5){
                status = '待上线';
            }else if(value.status == 6){
                status = '在线上';
            }else if(value.status == 7){
                status = '已下线';
            }
            return (
                <tr key={i}>
                    <td>{value.id}</td>
                    <td><a href={viewDetail} className="view">{value.name}</a></td>
                    <td>{value.type}</td>
                    <td>{value.username}</td>
                    <td>{value.start_time}</td>
                    <td>{status}</td>
                    <td>
                        <Button onClick={that.handleToggle} bsStyle='primary' data-id={value.id} data-name={value.name}>终止</Button>
                    </td>
                </tr>
            );
        }); 
        return (
            <div id="processlist">
                <div className="search">
                    <label className="process_label">创建者：</label><input type="text" name="creater" placeholder="创建者"/>
                    <label className="process_label">抽样名：</label><input type="text" name="process_name" placeholder="流程名"/>
                    <label className="process_label">抽样类型：</label>
                        <select name="flow_type" >
                        <option value="">所有类型</option>
                        <option value="1">首页UI抽样</option>
                        <option value="2">结果页UI抽样</option>
                        <option value="3">详情页UI抽样</option>
                        <option value="4">结果页策略抽样</option>
                        <option value="5">详情页策略抽样</option>
                        </select>
                    <label className="process_label">状态：</label>
                        <input className="process_checkbox" type="radio" name="status" value=""/>所有
                        <input className="process_checkbox" type="radio" name="status" value="0"/>运行
                        <input className="process_checkbox" type="radio" name="status" value="1"/>完成
                    <Button className="process_label" onClick={this.handleSearch}>查询</Button>
                </div>  
                <Table striped bordered condensed hover className="processlist_table">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>流程名</th>
                            <th>类型</th>
                            <th>创建者</th>
                            <th>启动时间</th>
                            <th>运行状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list ? trNodes : 'loading'}
                    </tbody>
                </Table>
                {(username == '' || username == undefined)?
                <Pager>
                    <PageItem onClick={this.handlePrev}>前一页</PageItem>
                    <PageItem onClick={this.handleNext}>后一页</PageItem>
                </Pager> : <span></span>
                }
            </div>
        );     
    },
    renderOverlay: function(){
        if(!this.state.isModalOpen){
            return <span/>;
        }

        return(
            <Modal title='流程终止后将不能恢复，确认终止？' onRequestHide={this.handleToggle}>
                <div className='modal-body'>
                流量名称：{this.state.dataName}
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.handleDeleteSubmit}>确定</Button>
                    <Button onClick={this.handleToggle}>关闭</Button>
                </div>
            </Modal>
        )
    }
});

module.exports = ProcessList;
