import React, { useEffect } from 'react';
import { Layout, Menu, Popconfirm } from 'antd';
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo, fetchUserInfo, setToken } from '@/store/modules/user';
import { getToken } from '@/utils';

const { Header, Sider } = Layout;

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
];

const GeekLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedKey = [location.pathname]; // 菜单高亮项

    // 恢复 token 并获取用户信息
    useEffect(() => {
        const token = getToken();
        if (!token) {
            // 如果没有 token，跳转到登录页面
            navigate('/login');
        } else {
            // 将 token 设置到 Redux 中
            dispatch(setToken(token));
            // 获取用户信息
            dispatch(fetchUserInfo());
        }
    }, [dispatch, navigate]);

    // 获取用户姓名
    const name = useSelector(state => state.user.userInfo?.name || '用户');

    // 处理菜单点击事件
    const onMenuClick = (route) => {
        const path = route.key;
        navigate(path);
    };

    // 处理登出逻辑
    const onConfirm = () => {
        console.log('确认退出');
        dispatch(clearUserInfo()); // 清空 Redux 和 localStorage 中的用户信息
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={selectedKey}
                    onClick={onMenuClick}
                    items={items}
                    style={{ height: '100%', borderRight: 0 }}
                />
            </Sider>
            <Layout>
                <Header className="header" style={{ background: '#001529', padding: '0 20px' }}>
                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <span className="user-logout">
                            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                                <LogoutOutlined /> 退出
                            </Popconfirm>
                        </span>
                    </div>
                </Header>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default GeekLayout;
