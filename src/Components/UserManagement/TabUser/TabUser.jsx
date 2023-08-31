import React, { useState } from "react";
import { Button, Drawer, Input, Popconfirm, Space, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/userService";
import { getAllUser, getUserById } from "../../../redux/slice/userSlice";
import EditUser from "../EditUser/EditUser";
import { SearchOutlined } from "@ant-design/icons";

const TabUser = () => {
  const [open, setOpen] = useState(false);
  // showDrawer
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // popcofirm
  const confirm = (userId) => {
    // console.log(maPhim);
    userService
      .deleteUser(userId)
      .then((res) => {
        message.success("Xóa Thành Công");
        dispatch(getAllUser());
      })
      .catch((err) => {
        // console.log(err);
        message.error(err.response.data.content);
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Xóa không thành công");
  };
  //
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return state.user;
  });
  //   console.log(users);
  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.userId - b.userId,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn Có muốn xóa user"
            description={record.userId}
            onConfirm={() => {
              confirm(record.userId);
            }}
            onCancel={cancel}
            cancelText="No"
            okText="Yes"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
          <button
            onClick={() => {
              return showDrawer(), dispatch(getUserById(record.userId));
            }}
            className="py-2 px-5 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 duration-500"
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  let newUsers = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        size="large"
        className="border-2 mb-5 w-full px-2 py-2"
        placeholder="tìm kiếm"
        onChange={(event) => {
          console.log(event.target.value);
          dispatch(getAllUser(event.target.value));
        }}
      />
      <Table columns={columns} dataSource={newUsers} />
      {/* edit user  */}
      <Drawer
        size="medium"
        title="Sửa Thông Tin"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <EditUser />
      </Drawer>
    </div>
  );
};

export default TabUser;
