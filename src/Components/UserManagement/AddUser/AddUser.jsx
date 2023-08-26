import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { userService } from "../../../services/userService";
import { Input, message } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";

const AddUser = () => {
  const [messageApi] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      passWord: "",
      email: "",
      phoneNumber: "",
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   xử lí gửi dữ liệu lên sever
      userService
        .signUpUser(values)
        .then((res) => {
          console.log(res);
          alert("Đăng Kí Thành Công");
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
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

  //   const userNg = {
  //     taiKhoan: "",
  //     matKhau: "string",
  //     email: "string",
  //     soDt: "string",
  //     maNhom: "string",
  //     maLoaiNguoiDung: "string",
  //     hoTen: "string",
  //   };

  const { handleChange, handleSubmit, touched, errors, values } = formik;
  return (
    <div>
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
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            prefix={<UserOutlined />}
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
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddUser;
