import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabUser from "../../Components/UserManagement/TabUser/TabUser";
import { getAllUser } from "../../redux/slice/userSlice";
import AddUser from "../../Components/UserManagement/AddUser/AddUser";
import { Drawer } from "antd";

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    // console.log(users);
    dispatch(getAllUser());
  }, []);

  // một hàm vừa gọi dữ liệu vừa truyền dữ liệu lên redux
  // redux không cho phép gọi bất đồng bộ trên reducer
  // redux-thunk là một middleware không phép xử lí trước khi dispatch tới store
  // redux-saga

  return (
    <div>
      <button
        onClick={showDrawer}
        className="bg-green-600 text-white py-2 px-5 my-5"
      >
        Thêm mới
      </button>
      <Drawer
        size="medium"
        title="Thêm Người Dùng"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <AddUser />
      </Drawer>

      <TabUser />
    </div>
  );
};

export default UserManagement;
