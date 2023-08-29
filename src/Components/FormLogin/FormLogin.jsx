import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Space, Button, message, Form, Checkbox } from "antd";
import {
  LockOutlined,
  UserOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
// import { loginService } from "../../services/loginService";
import { luuXuongLocal } from "../../utils/localStore";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userService } from "../../services/userService";
import { setDuLieuHoTen } from "../../redux/slice/userSlice";
const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },

    onSubmit: (values) => {
      // console.log(values);
      // xử lí gửi dữ liệu lên sever
      userService
        .loginUser(values)
        .then((res) => {
          // console.log(res);
          messageApi.success("Đăng Nhập Thành Công");
          // nếu như login thành công, sẽ lưu data xuống local và chuyển người dùng tới trang chủ

          // khi gọi dữ liệu thành công, sẽ lấy dữ liệu đó truyền lên redux
          dispatch(setDuLieuHoTen(res.data.content));
          luuXuongLocal("user", res.data.content);
          setTimeout(() => {
            navigate("/projectmanager");
          }, [2000]);
        })
        .catch((error) => {
          console.log(error);
          messageApi.error(error.response.data.message);
        });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Vui Lòng Nhập Email")
        .required("Không được để trống email"),
      passWord: yup.string().required("Không được để trống mật khẩu"),
      // .min(6, "Ít Nhất 6 Kí Tự")
      // .max(15, "Nhiều Nhất 15 Kí Tự"),
    }),
  });
  const { handleChange, handleSubmit, errors, touched } = formik;

  return (
    <div className="">
      {contextHolder}
      <h3 className="text-4xl mb-5 font-medium">Login Jira </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            status={errors.email && touched.email ? "error" : ""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            prefix={<UserOutlined />}
            //   required
            // onChange={formik.handleChange}
            // muốn onChange nhiều phương thức:
            // onChange={()=>{
            // phương thưc 1;
            // phương thức 2;
            // }}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="text-red-500">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <Input.Password
            type="password"
            name="passWord"
            status={errors.passWord && touched.passWord ? "error" : ""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/2 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            prefix={<LockOutlined />}
            onChange={handleChange}
          />
          {errors.passWord && touched.passWord ? (
            <p className="text-red-500">{errors.passWord}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <Button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  text-sm w-full sm:w-auto ml-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          icon={<FacebookOutlined style={{ display: "inline-flex" }} />}
        >
          Facebook
        </Button>
        <br />
        <span className="mt-3 block">
          Not a member ?
          <NavLink className="text-blue-400 ml-1" to="/signup">
            Sign up now
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
