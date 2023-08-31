import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { getProjectCategory } from "../../../redux/slice/projectSlice";
import { current } from "@reduxjs/toolkit";
import { projectService } from "../../../services/projectservice";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { projectCategory } = useSelector((state) => state.project);
  // console.log(projectCategory);
  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      projectService
        .createProject({
          ...values,
          alias: values.projectName,
        })
        .then((res) => {
          // console.log(res);
          alert("tạo Thành Công");
        })
        .catch((error) => {
          // console.log(error);
          alert("lỗi");
        });
    },
  });
  const editorRef = useRef(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,

    setFieldValue,
  } = formik;
  return (
    <form onSubmit={handleSubmit}>
      {/* Tài khoảng */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Project Name
        </label>
        <Input
          type="text"
          name="projectName"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Project Name"
          className="py-2 mb-6"
        />
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Project Category
        </label>
        <select
          style={{ width: "100%" }}
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
          name="categoryId"
          id="selectCategory"
          onChange={handleChange}
        >
          <option value="0">Select project category</option>
          {projectCategory.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectCategoryName}
              </option>
            );
          })}
        </select>
        <div className="my-3 mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Desription
          </label>
          <Editor
            className="h-10"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
        >
          Create project
        </button>
      </div>
    </form>
  );
};

export default CreateProject;
