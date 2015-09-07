/** @jsx React.DOM */
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var CollapsibleNav = ReactBootstrap.CollapsibleNav;

var Mynav = React.createClass({
	render: function(){
		var that = this;
    var processUrl = '/sample/processlist?owner=' + this.props.username;
    var projectUrl = '/sample/projectlist?owner=' + this.props.username;
		return (
          <Navbar id="brand" brand='抽样平台' inverse toggleNavKey={0}>
            <CollapsibleNav eventKey={0}>
              <Nav navbar>
                <DropdownButton eventKey={2} title='抽样管理'>
                  <MenuItem eventKey='1' href={processUrl}>我的抽样</MenuItem>
                  <MenuItem eventKey='2' href="/sample/processlist">所有抽样</MenuItem>
                </DropdownButton>
                <DropdownButton eventKey={3} title='项目管理'>
                  <MenuItem eventKey='1' href={projectUrl}>我的项目</MenuItem>
                  <MenuItem eventKey='2' href="/sample/projectlist">所有项目</MenuItem>
                  <MenuItem eventKey='3' href="/sample/newproject">创建项目</MenuItem>
                </DropdownButton>          
              </Nav>
              <Nav navbar right>
                <DropdownButton eventKey={7} className="userinfo" title={this.props.username || ''}>
                  <MenuItem eventKey='1' href="/sample/logout">退出</MenuItem>
                </DropdownButton> 
              </Nav>
            </CollapsibleNav>
          </Navbar>
		);
	}
});

module.exports = Mynav;