import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, message } from "antd";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/userService";
import { getAllUser } from "../../../redux/slice/userSlice";

const EditUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { editUser } = useSelector((state) => {
    return state.user;
  });
  // console.log(editUser);

  const formik = useFormik({
    initialValues: {
      id: editUser[0]?.userId,
      email: editUser[0]?.email,
      passWord: null,
      name: editUser[0]?.name,
      phoneNumber: editUser[0]?.phoneNumber,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      // xử lí gửi dữ liệu lên sever
      userService
        .editUser(values)
        .then((res) => {
          console.log(res);
          messageApi.success("Thay Đổi Thành Công");
          dispatch(getAllUser());
        })
        .catch((error) => {
          console.log(error);
          messageApi.error(error.response.data.message);
        });
      formik.resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Vui Lòng Nhập Email")
        .required("Không được để trống email"),
      passWord: yup.string().required("Không được để trống password"),
      name: yup.string().required("Không được để trống name"),
      phoneNumber: yup
        .string()
        .required("Không được để trống phone number")
        .min(9, "ít nhất 9 số"),
    }),
  });
  const { handleChange, handleSubmit, errors, touched, values, setFieldValue } =
    formik;
  // console.log(formik.values);

  return (
    <div className="">
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="userId"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            User ID
          </label>
          <Input
            id="id"
            readOnly
            type="text"
            name="id"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            prefix={<LockOutlined />}
            onChange={handleChange}
            value={values.id}
          />
        </div>
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
            id="email"
            status={errors.email && touched.email ? "error" : ""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={handleChange}
            value={values.email}
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
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            prefix={<LockOutlined />}
            onChange={handleChange}
            value={values.passWord}
          />
          {errors.passWord && touched.passWord ? (
            <p className="text-red-500">{errors.passWord}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Name
          </label>
          <Input
            type="text"
            name="name"
            status={errors.name && touched.name ? "error" : ""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            prefix={<UserOutlined />}
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && touched.name ? (
            <p className="text-red-500">{errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Phone Number
          </label>
          <Input
            type="number"
            name="phoneNumber"
            status={errors.phoneNumber && touched.phoneNumber ? "error" : ""}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="phone number"
            prefix={<PhoneOutlined />}
            onChange={handleChange}
            value={values.phoneNumber}
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <p className="text-red-500">{errors.phoneNumber}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default EditUser;
