import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { projectService } from "../../../services/projectservice";
import {
  getAllProject,
  getProjectCategory,
} from "../../../redux/slice/projectSlice";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { projectByName } = useSelector((state) => state.project);
  console.log(projectByName);
  const { projectCategory } = useSelector((state) => state.project);
  console.log(projectCategory);
  //   gọi api category
  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectByName[0]?.id,
      projectName: projectByName[0]?.projectName,
      description: projectByName[0]?.description,
      categoryId: projectByName[0]?.categoryId,
    },
    onSubmit: (values) => {
      // console.log(values);
      const projectId = values.id;
      // console.log(projectId);
      projectService
        .updateProject(projectId, { ...values })
        .then((res) => {
          console.log(res);
          alert("Thay Đổi Thành Công");
          dispatch(getAllProject());
        })
        .catch((error) => {
          console.log(error);
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
          Project ID
        </label>
        <Input
          readOnly
          type="text"
          name="id"
          onChange={handleChange}
          className="py-2 mb-6"
          value={formik.values.id}
        />
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
          value={formik.values.projectName}
        />
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Project Category
        </label>
        <select
          value={formik.values.categoryId}
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
            value={formik.values.description}
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
          Update
        </button>
      </div>
    </form>
  );
};

export default CreateProject;
