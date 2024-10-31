// Importing required components and icons
import React from 'react';
import { Layout, Menu, Popconfirm } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './index.scss';
import { Outlet } from 'react-router-dom';

const { Header, Sider } = Layout;

const items = [
  {
    label: '首页',
    key: '1',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '2',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '3',
    icon: <EditOutlined />,
  },
];

const GeekLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header className="header" style={{ background: '#001529', padding: '0 20px' }}>
          <div className="user-info">
            <span className="user-name">Xu Peiran</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
