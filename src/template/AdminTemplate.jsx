import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useSelector } from "react-redux";
// import { getDuLieuLocal } from "../util/localStore";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  //   const { hoTen } = useSelector((state) => {
  //     return state.nguoiDung;
  //   });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // khi người dùng kp quản trị vào sẽ đá về trang chủ hoặc bất trì trang nào

  //   useEffect(() => {
  //     const user = getDuLieuLocal("user");
  //     if (user) {
  //       console.log(user);
  //       if (user.maLoaiNguoiDung !== "QuanTri") {
  //         window.location.href = "https:www.google.com";
  //       }
  //     } else {
  //       window.location.href = "https:www.google.com";
  //     }
  //   }, []);

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
              label: <NavLink to="/admin/usermanager">User Manager</NavLink>,
            },
            {
              key: "2",
              icon: <ProjectOutlined />,
              label: <NavLink to="/admin/movie">Project Manager</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
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
    </Layout>
  );
};

export default AdminTemplate;
