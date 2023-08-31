import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Input, Select, message, Slider, InputNumber } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import {
  getAllPriority,
  getAllProject,
  getAllStatus,
  getAllTypeTask,
  getAllUserByProjectId,
  getProjectCategory,
  getProjectDetail,
} from "../../../redux/slice/projectSlice";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { getAllUser } from "../../../redux/slice/userSlice";
import { taskService } from "../../../services/taskService";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const dispatch = useDispatch();
  const { projectCategory } = useSelector((state) => state.project);
  const { projects } = useSelector((state) => state.project);
  const { allTypeTask } = useSelector((state) => state.project);
  const { allPriority } = useSelector((state) => state.project);
  const { allStatus } = useSelector((state) => state.project);
  const { AllUserByProjectId } = useSelector((state) => state.project);
  // console.log(AllUserByProjectId);
  //   console.log(allTypeTask);
  // console.log(projectCategory);
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllTypeTask());
    dispatch(getProjectCategory());
    dispatch(getAllPriority());
    dispatch(getAllStatus());
  }, []);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  // option to select
  const userOptions = AllUserByProjectId.map((item, index) => {
    return { label: item.name, value: item.userId };
  });
  // console.log(userOptions);
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState();
  // console.log(projectId);
  //time tracking
  const [timeTracking, settimeTracking] = useState({
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      typeId: 0,
      description: 0,
      priorityId: 0,
      listUserAsign: [],
      projectId: "",
    },
    onSubmit: (values) => {
      // console.log(values);

      taskService
        .createTask(values)
        .then((res) => {
          // console.log(res);
          dispatch(getAllProject());
          alert("tạo Thành Công");
          formik.resetForm();
          navigate("/projectmanager");
        })
        .catch((error) => {
          // console.log(error);
          alert("lỗi");
        });
    },
  });
  const editorRef = useRef(null);

  const { handleSubmit, handleChange, setFieldValue } = formik;
  return (
    <form onSubmit={handleSubmit}>
      {/* Tài khoảng */}
      <div className="mb-3">
        <div className="project__name">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Project Name
          </label>
          <Select
            id="projectId"
            name="projectId"
            defaultValue="Chọn Project"
            style={{
              width: "100%",
            }}
            onChange={(value) => {
              setFieldValue("projectId", value);
              dispatch(getAllUserByProjectId(value));
            }}
          >
            {projects.map((item, index) => {
              // console.log(item.id);
              return (
                <option key={index} value={item.id}>
                  {item.projectName}
                </option>
              );
            })}
          </Select>
          <p className="font-semibold">
            * You can only create tasks of your own projects!
          </p>
        </div>
        <div className="task__name mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Task name
          </label>
          <Input
            id="taskName"
            name="taskName"
            onChange={handleChange}
            placeholder="Task name"
          />
        </div>

        <div className="status mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Status
          </label>
          <select
            style={{ width: "100%" }}
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            name="statusId"
            id="statusId"
            onChange={handleChange}
          >
            <option value="0">Select Status</option>
            {allStatus.map((item, index) => {
              return (
                <option key={index} value={item.statusId}>
                  {item.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-60 mt-2">
          <div className="Priority">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Priority
            </label>
            <select
              style={{ width: "150%" }}
              className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              name="priorityId"
              id="priorityId"
              onChange={handleChange}
            >
              <option value="0">Select Status</option>
              {allPriority.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="Task_Type">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Task Type
            </label>
            <select
              style={{ width: "150%" }}
              className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              name="typeId"
              id="typeId"
              onChange={handleChange}
            >
              <option value="0">Select Task Type</option>
              {allTypeTask?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="Assigners mt-2">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Assigners
          </label>
          <Select
            mode="multiple"
            options={userOptions}
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            optionFilterProp="label"
            onChange={(values) => {
              setFieldValue("listUserAsign", values);
            }}
            onSearch={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="Time__Tracking mt-2">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Time Tracking
          </label>
          <div className="flex justify-between">
            <div className="w-5/12">
              <p>Total Estimated Hours</p>
              <InputNumber
                name="originalEstimate"
                type="number"
                min="0"
                onChange={(event) => {
                  settimeTracking({
                    ...timeTracking,
                    originalEstimate: event.target.value,
                  });
                  setFieldValue("originalEstimate", event.target.value);
                }}
                defaultValue="0"
              />
            </div>
            <div className="w-5/12">
              <p>Hours spent</p>
              <InputNumber
                name="timeTrackingSpent"
                type="number"
                min="0"
                onChange={(event) => {
                  settimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: event.target.value,
                  });
                  setFieldValue("timeTrackingSpent", event.target.value);
                }}
              />
            </div>
            <div className="w-5/12">
              <p>Hours reming</p>
              <InputNumber
                id="timeTrackingRemaining"
                name="timeTrackingRemaining"
                type="number"
                onChange={(event) => {
                  setFieldValue("timeTrackingRemaining", event.target.value);
                }}
              />
            </div>
          </div>
          <div className="slider">
            <Slider
              defaultValue={30}
              value={timeTracking.originalEstimate}
              max={
                Number(timeTracking.originalEstimate) +
                Number(timeTracking.timeTrackingSpent)
              }
            />
          </div>
          <div className="flex justify-between">
            <div className="text_left">
              {timeTracking.timeTrackingSpent} <span>hour(s) spent</span>
            </div>
            <div className="text_right">
              {Number(timeTracking.originalEstimate) -
                Number(timeTracking.timeTrackingSpent)}
              <span> hour(s) remining</span>
            </div>
          </div>
        </div>
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

export default CreateTask;
