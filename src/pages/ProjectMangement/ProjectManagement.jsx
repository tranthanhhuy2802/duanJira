import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import TableProject from "../../Components/ProjectManagement/TableProject/TableProject";
import { getAllProject } from "../../redux/slice/projectSlice";
import CreateProject from "../../Components/ProjectManagement/CreateProject/CreateProject";

const ProjectManagement = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  // một hàm vừa gọi dữ liệu vừa truyền dữ liệu lên redux
  // redux không cho phép gọi bất đồng bộ trên reducer
  // redux-thunk là một middleware không phép xử lí trước khi dispatch tới store
  // redux-saga

  return (
    <div>
      <button
        onClick={showDrawer}
        className="bg-blue-500 rounded-md hover:bg-blue-700 text-white py-2 px-5 my-5"
      >
        Create Project
      </button>
      <Drawer
        size="large"
        title="Create Project"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <CreateProject />
      </Drawer>

      <TableProject />
    </div>
  );
};

export default ProjectManagement;
