/** @jsx React.DOM */
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Input = ReactBootstrap.Input;
var Pager = ReactBootstrap.Pager;
var PageItem = ReactBootstrap.PageItem;
var AddValueModal = require('samplemis:widget/ui/sampleconfig/component/addvaluemodal.js');
var EditValueModal = require('samplemis:widget/ui/sampleconfig/component/editvaluemodal.js');
var DeleteValueModal = require('samplemis:widget/ui/sampleconfig/component/deletevaluemodal.js');
var BaseMixin = require('samplemis:widget/ui/commonComponent/baseMixin/baseMixin.js');
var activePage = 0;
var flag = false;
var ValueRegist = React.createClass({
    mixins: [BaseMixin],
  	getInitialState: function(){
		return {
            valuelist: [],
            servicelist: [],
            tempvalueinfo: [],
            activePage: 1
		};
  	},
  	componentWillMount: function(){
        var that = this;
        var valueurl = that.host + '/queryvariable?pn=0&rn=10';
        that.doValueListService(valueurl);
        var serviceurl = that.host + '/queryservice';
        this.doService(serviceurl,function(data){
            that.setState({
                servicelist: data
            });
        });
  	},
    doValueListService: function(valueurl){
        var that = this;
        this.doService(valueurl,function(data){
            that.setState({
                valuelist: data
            });
        });
    },
    handleNext: function(){
        var that = this;
        activePage = activePage + 1;
        var searchurl = that.host + '/queryvariable?pn='+ activePage*10 +'&rn=10' + '&name=' + $("#varName").val();
        this.doService(searchurl,function(data){
            if(data.length == 0){
                alert("已经是最后一页啦！");
                activePage = activePage - 1;
                return;
            }else{
                that.setState({
                    valuelist: data
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
            var searchurl = that.host + '/queryvariable?pn='+ activePage*10 +'&rn=10' + '&name=' + $("#varName").val();
            that.doValueListService(searchurl);
        }
    },
    handleSelect: function(event,selectedEvent){
        this.setState({
            activePage: selectedEvent.eventKey
        });
    },
    handleSearchValue: function(){
        var that = this;
        var valueurl = this.host + '/queryvariable?name=' + $("#varName").val();
        that.doValueListService(valueurl);
    },
    handleAddvarSubmit: function(inputName,inputService,inputDesc){
        var that = this;
        var url = that.host + '/addvariable?name=' + inputName + '&service_id=' + inputService + '&desc=' + inputDesc;
        var result;
        var dtd = $.Deferred();
        var valueurl = that.host + '/queryvariable';

        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(res) {
            if(res.status == 0){
                result = 0;
                that.doValueListService(valueurl);
                dtd.resolve(result);
            }else{
                result = res.err_msg;
                dtd.resolve(result);
            }    
        })
        .fail(function() {
            result = "添加失败！";
            dtd.reject(result);
        })
        .always(function() {

        }); 
        return dtd;
    },
    handleEditVarSubmit: function(id,inputName,inputService,inputDesc){
        var that = this;
        var editurl = that.host + '/modifyvariable?id=' + id +'&name='+ inputName + '&service_id=' + inputService + '&desc=' + inputDesc;
        var dtd = $.Deferred();
        var result;
        var valueurl = that.host + '/queryvariable';
        $.ajax({
            url: editurl,
            type: 'GET',
            dataType: 'json'
        })
        .done(function(res) {
            if(res.status == 0){
                result = 0;
                that.doValueListService(valueurl);
                dtd.resolve(result);
            }else{
                result = res.err_msg;
                dtd.resolve(result);
            }    
        })
        .fail(function() {
            result = "添加失败！";
            dtd.reject(result);
        })
        .always(function() {
          
        });
        return dtd;
    },
    handleEdit: function(e){
        this.setState({
            tempvalueinfo: {
                'id': $(e.target).attr('data-id'),
                'name': $(e.target).attr('data-name'),
                'serviceid': $(e.target).attr('data-serviceid'),
                'desc': $(e.target).attr('data-desc')
            }
        });
    },
    handleDeleteVarSubmit: function(id){
        var that = this;
        var deUrl = that.host + '/deletevariable?id=' + id;
        var valueurl = that.host + '/queryvariable';
        this.doService(deUrl, function(){
            that.doValueListService(valueurl);
        });
    },
    handleDelete: function(){
        this.setState({
            tempvalueinfo: {
                'delid': $(e.target).attr('data-id')
            }
        });
    },
    checkValueState: function(status){
        if(status == 1){
            return (
              <td>新变量</td>
            )
        }else if(status == 2){
            return (
              <td>在线上</td>
            )
        }else{
            return (
              <td></td>
            )
        }
    },
    render: function(){
        var that = this;
        var taskStatus = this.props.status;
        var trNodes = this.state.valuelist.map(function(value,key){
            return (
                <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.service}</td>
                    <td>{value.description}</td>
                    {that.checkValueState(value.status)}
                    {(value.status==1 && taskStatus<3)? 
                      <td>
                          <ModalTrigger modal={<EditValueModal tempvalueinfo={that.state.tempvalueinfo} servicelist={that.state.servicelist} handleEditVarSubmit={that.handleEditVarSubmit}/>} container={that}>                 
                          <Button bsStyle='primary' onClick={that.handleEdit} data-id={value.id} data-name={value.name} data-serviceid={value.service_id} data-desc={value.description}>编辑</Button>
                          </ModalTrigger>
                          <ModalTrigger modal={<DeleteValueModal handleDeleteVarSubmit={that.handleDeleteVarSubmit} tempvalueinfo={that.state.tempvalueinfo}/>} container={that}>                   
                          <Button bsStyle='primary' className="btn" onClick={that.handleEdit} data-id={value.id}>删除</Button>
                          </ModalTrigger>
                        </td> : <td></td>
                    }
                </tr>
            );
        });
        return (
            <div id="valueRegist">
                <div className="title-panel">
                    请点击“注册新变量”注册变量，如果你想要查询某个变量是否存在，可以先进行变量查询。
                </div>
                <div className="search-panel">
                    <Input id="varName" type="text" placeholder="变量名称" className="search-query"/>
                    <Button id="search" className="btn" onClick={this.handleSearchValue}><i className="icon-search"></i>变量查询</Button>
                </div>
                <div className="modal_btn">
                    <ModalTrigger modal={<AddValueModal servicelist={this.state.servicelist} handleAddvarSubmit={this.handleAddvarSubmit}/>} container={this}>                 
                    <Button bsStyle='primary'><i className="icon-add"></i>注册新变量</Button>
                    </ModalTrigger>
                </div>
                <div className="table-panel">
                  <Table striped bordered condensed hover>
                      <thead>
                          <tr>
                              <th>变量名</th>
                              <th>变量模块</th>
                              <th>描述</th>
                              <th>状态</th>
                              <th>操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.valuelist ? trNodes : 'loading'}
                      </tbody>
                  </Table>
                </div>
                <Pager>
                    <PageItem onClick={this.handlePrev}>前一页</PageItem>
                    <PageItem onClick={this.handleNext}>后一页</PageItem>
                </Pager>
            </div>
        );
    }
});

module.exports = ValueRegist;
