import React, { Component } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import ThemeConfigurator from './ThemeConfigurator';
import { connect } from "react-redux";
import { DIR_RTL } from 'constants/ThemeConstant';

export class NavPanel extends Component {
	state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	render() {
		return (
      <>
      
        <Menu mode="horizontal">
          <Menu.Item key="panel" onClick={this.showDrawer}>
            <a href><SettingOutlined className="nav-icon mr-0" /></a>
          </Menu.Item>
          
        </Menu>
       
      </>
    );
	}
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default connect(mapStateToProps)(NavPanel);