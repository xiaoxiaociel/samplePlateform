/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Pager = ReactBootstrap.Pager;
var PageItem = ReactBootstrap.PageItem;
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var activePage = 0;
var flag = false;
var ProjectList = React.createClass({
    mixins: [BaseMixin],

    getInitialState: function(){
        return {
            list: [],
            isModalOpen: false
        };
    },
    componentWillMount: function(){
        var that = this;
        var Request = that.getRequest();
        var username = Request['owner'];
        if(username!='' && username!=undefined){
            var url = that.host + '/queryproject?owner=' + username;
        }else{
            var url = that.host + '/queryproject?pn=0&rn=10';
        }
        this.doProjectListService(url);
    },
    doProjectListService: function(url){
        var that = this;
        this.doService(url, function(data){
            that.setState({
                list: data
            });
        }); 
    },
    handleNext: function(){
        var that = this;
        activePage = activePage + 1;
        var searchurl;
        if(flag){
            var value = $("#projectlist .input-search").val();
            var inputContent = $('.input-content').val();
            if(value == 0){
                searchurl = that.host + '/queryproject?name=' + inputContent + '&pn=' + activePage*10 + '&rn=10';
            }else{
                searchurl = that.host + '/queryproject?owner=' + inputContent + '&pn=' + activePage*10 + '&rn=10';
            }
        }else{
            searchurl = that.host + '/queryproject?pn=' + activePage*10 + '&rn=10';
        }
        this.doService(searchurl,function(data){
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
                var value = $("#projectlist .input-search").val();
                var inputContent = $('.input-content').val();
                if(value == 0){
                    searchurl = that.host + '/queryproject?name=' + inputContent + '&pn=' + activePage*10 + '&rn=10';
                }else{
                    searchurl = that.host + '/queryproject?owner=' + inputContent + '&pn=' + activePage*10 + '&rn=10';
                }                
            }else{
                searchurl = that.host + '/queryproject?pn=' + activePage*10 + '&rn=10';
            }
            this.doProjectListService(searchurl);
        }
    },
    handleSetProcess: function(e){
        var projectid = $(e.target).attr('data-id');
        window.location.href = '/sample/newprocess?project_id=' + projectid;
    },
    handleProject: function(){
        window.location.href = '/sample/newproject';
    },
    handleDeleteProject: function(e){
        var that = this;
        var url = that.host + '/deleteproject?id=' + $(e.target).attr('data-id');
        if(window.location.search == "?mine"){
            var projectListUrl = that.host + '/queryproject?mine';
        }else{
            var projectListUrl = that.host + '/queryproject';
        }        
        this.doService(url,function(){
            that.doProjectListService(projectListUrl);
        });
    },
    handleSearch: function(){
        var that = this;
        flag = true;
        var searchurl;
        var value = $("#projectlist .input-search").val();
        var inputContent = $('.input-content').val();
        if(value == 0){
            searchurl = that.host + '/queryproject?name=' + inputContent;
        }else{
            searchurl = that.host + '/queryproject?owner=' + inputContent;
        }
        that.doProjectListService(searchurl);
    },
    render: function(){
        var that = this;
        var Request = that.getRequest();
        var username = Request['owner'];
        var trNodes = that.state.list.map(function(value,key){
            var viewDetail = "/sample/processlist?projectid=" + value.id;
            return (
                <tr>
                    <td><a href={viewDetail} className="view">{value.name}</a></td>
                    <td>{value.description}</td>
                    <td>{value.username}</td>
                    <td>{value.create_time}</td>
                    <td>
                        <Button className="btn" onClick={that.handleSetProcess} bsStyle='primary' data-id={value.id}>发起抽样</Button>
                        {value.is_owner == 1 ? <Button className="btn" onClick={that.handleDeleteProject} bsStyle='danger' data-id={value.id}>删除项目</Button> : <span></span>}
                    </td>
                </tr>
            );
        }); 
        return (
            <div id="projectlist">
            <Button bsStyle='primary' onClick={this.handleProject} className="create-project">创建项目</Button>
            {
                window.location.search == "?mine"? <span></span> :
                <div className="search">
                    <Input type="select" name="search" className="input-search">
                        <option value="0">项目名称</option>
                        <option value="1">创建者</option>
                    </Input>
                    <Input type="text" name="content" placeholder="请输入搜索内容" className="input-content"/>
                    <Button className="project_label" onClick={this.handleSearch}>查询</Button>
                </div>
            }            
                <Table striped bordered condensed hover className="projectlist_table">
                    <thead>
                        <tr>
                            <th>项目名</th>
                            <th>描述</th>
                            <th>创建者</th>
                            <th>创建时间</th>
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
        ) 
    }
});

module.exports = ProjectList;
