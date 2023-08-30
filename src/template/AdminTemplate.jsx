import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocal, getDuLieuLocal } from "../utils/localStore";
import { getUserById, logOut } from "../redux/slice/userSlice";
import CreateTask from "../Components/ProjectManagement/CreateTask/CreateTask";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const { hoTen } = useSelector((state) => {
    return state.user;
  });
  // console.log(hoTen);
  const dispatch = useDispatch();
  //Drawer create task
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // menu item
  const onClick = ({ key }) => {
    if (key == 2) {
      dispatch(logOut());
    } else if (key == 1) {
      dispatch(getUserById(hoTen.id));
    }
  };
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <NavLink to="/information">Thông Tin Cá Nhân</NavLink>,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: <NavLink to="/">Đăng Xuất</NavLink>,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <NavLink to="/usermanager">User Manager</NavLink>,
            },
            {
              key: "2",
              icon: <ProjectOutlined />,
              label: <NavLink to="/projectmanager">Project Manager</NavLink>,
            },
            {
              key: "3",
              icon: <ProjectOutlined />,
              label: (
                <Button
                  className="border-0 text-white hover:text-Blue-500"
                  onClick={showDrawer}
                >
                  Create Task
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="relative"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            className="absolute right-12"
            placement="bottomRight"
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <span>
                <img
                  src={hoTen.avatar}
                  alt=""
                  className="mt-3 rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </span>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        size="large"
        title="Create Task"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <CreateTask />
      </Drawer>
    </Layout>
  );
};

export default AdminTemplate;
