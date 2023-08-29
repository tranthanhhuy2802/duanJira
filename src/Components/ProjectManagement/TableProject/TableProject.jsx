import React, { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  getProjectByNameProject,
  getProjectDetail,
} from "../../../redux/slice/projectSlice";
import { projectService } from "../../../services/projectservice";
import { SearchOutlined } from "@ant-design/icons";
import EditProject from "../EditProject/EditProject";
import { NavLink } from "react-router-dom";

const TableProject = () => {
  const { projects } = useSelector((state) => {
    return state.project;
  });
  const [open, setOpen] = useState(false);
  // showDrawer
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // popcofirm
  const confirm = (projectId) => {
    projectService
      .deleteProject(projectId)
      .then((res) => {
        message.success("Xóa Thành Công");
        dispatch(getAllProject());
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (_, record) => (
        <NavLink
          onClick={() => {
            dispatch(getProjectDetail(record.id));
          }}
          className="text-blue-400"
          to={`/projectDetail/${record.id}`}
        >
          {record.projectName}
        </NavLink>
      ),
    },
    {
      title: "category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "creator",
      key: "creator",
      render: (_, record) => <span>{record.creator?.name}</span>,
    },
    {
      title: "member",
      key: "member",
      render: (_, record) => {
        return (
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {record.members?.map((item, index) => {
              return (
                <Tooltip placement="top" key={index} title={item.name}>
                  <Avatar
                    className="hover:-translate-y-1 overflow-hidden"
                    style={{ translate: "all 0.5s" }}
                    src={item.avatar}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn Có muốn xóa Project"
            description={record.id}
            onConfirm={() => {
              confirm(record.id);
            }}
            onCancel={cancel}
            cancelText="No"
            okText="Yes"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
          <button
            onClick={() => {
              showDrawer();
              console.log(record.projectName);
              dispatch(getProjectByNameProject(record.projectName));
            }}
            className="py-2 px-5 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 duration-500"
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  let newProjects = projects.map((item, index) => {
    return { ...item };
  });
  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        size="large"
        className="border-2 mb-5 w-full px-2 py-2"
        placeholder="tìm kiếm project name"
        onChange={(event) => {
          console.log(event.target.value);
          dispatch(getAllProject(event.target.value));
        }}
      />
      <Table columns={columns} dataSource={newProjects} />
      {/* edit user  */}
      <Drawer
        size="large"
        title="Edit Project"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <EditProject />
      </Drawer>
    </div>
  );
};

export default TableProject;
