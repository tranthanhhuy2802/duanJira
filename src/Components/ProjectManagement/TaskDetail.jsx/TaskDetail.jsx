import {
  Avatar,
  Button,
  Dropdown,
  Input,
  InputNumber,
  Popconfirm,
  Progress,
  Select,
  Slider,
  Tag,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { taskService } from "../../../services/taskService";
import {
  getAllPriority,
  getAllProject,
  getAllStatus,
  getAllTypeTask,
  getProjectDetail,
} from "../../../redux/slice/projectSlice";
import { useDispatch } from "react-redux";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  addComment,
  assignUserTask,
  getTaskDetail,
} from "../../../redux/slice/taskSlice";
import TextArea from "antd/es/input/TextArea";

const TaskDetail = ({ projectId }) => {
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => {
    return state.task;
  });
  // console.log(taskDetail);
  const { projectDetail } = useSelector((state) => {
    return state.project;
  });
  // console.log(projectDetail);
  const { allTypeTask } = useSelector((state) => {
    return state.project;
  });
  // console.log(allTypeTask);
  const { allStatus } = useSelector((state) => {
    return state.project;
  });
  // console.log(allStatus);
  const { allPriority } = useSelector((state) => {
    return state.project;
  });
  const [timeTracking, settimeTracking] = useState({
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  // PopConfirm
  const confirm = (taskId, projectId) => {
    taskService
      .deteleTask(taskId)
      .then((res) => {
        message.success("Xóa Thành Công");
        dispatch(getProjectDetail(projectId));
        dispatch(getTaskDetail(taskId));
      })
      .catch((err) => {
        // console.log(err);
        message.error("xóa thất bại");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  // Description
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  //Assigners
  const userOptions = projectDetail.members?.map((item, index) => {
    return { label: item.name, value: item.userId };
  });
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(
        addComment({
          taskId: taskDetail.taskId,
          contentComment: event.target.value,
        })
      );
    }
  };
  //Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskId: taskDetail.taskId,
      taskName: taskDetail.taskName,
      statusId: taskDetail.statusId,
      originalEstimate: taskDetail.originalEstimate,
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      typeId: taskDetail.typeId,
      description: taskDetail.description,
      priorityId: taskDetail.priorityId,
      listUserAsign: taskDetail?.assigness,
      projectId: taskDetail.projectId,
    },
    onSubmit: (values) => {
      console.log(values);
      taskService
        .updateTask(values)
        .then((res) => {
          console.log(res);
          dispatch(getProjectDetail(projectId));

          alert("tạo Thành Công");
        })
        .catch((error) => {
          console.log(error);
          alert("lỗi");
        });
    },
  });
  useEffect(() => {
    dispatch(getAllTypeTask());
    dispatch(getAllStatus());
    dispatch(getProjectDetail(projectId));
    dispatch(getAllPriority());
  }, []);
  const editorRef = useRef(null);
  const { handleSubmit, handleChange, setFieldValue, values } = formik;

  // console.log(taskDetail);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="flex justify-between">
          <div className="Task_Type">
            <select
              style={{ width: "100%" }}
              className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-1  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              name="typeId"
              id="typeId"
              onChange={handleChange}
              value={values.typeId}
            >
              {allTypeTask?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.taskType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex">
            <div className="mr-3" style={{ marginTop: "-5px" }}>
              <button type="submit" className="" style={{ marginTop: "-12px" }}>
                <i class="fa-solid fa-pen-to-square text-center" />
              </button>
            </div>
            <div className="delete_task mr-6  " style={{ marginTop: "-12px" }}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => {
                  confirm(taskDetail.taskId, taskDetail.projectId);
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="border-none shadow-none"
                  icon={<DeleteOutlined />}
                ></Button>
              </Popconfirm>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="content__left px-5 w-1/2  ">
            <div className="taskName">
              <Input
                style={{ width: "50%", border: "none", fontSize: "25px" }}
                id="taskName"
                name="taskName"
                onChange={handleChange}
                placeholder="Task name"
                value={values.taskName}
              />
            </div>
            <div className="description">
              <label className="font-semibold text-lg" htmlFor="text">
                Description
              </label>
              <TextArea
                style={{ width: "100%", height: "100px" }}
                name="description"
                id="description"
                onChange={handleChange}
                value={values.description}
              />
              {/* <Editor
                className="h-10"
                name="description"
                id="description"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={handleEditorChange}
                init={{
                  width: 430,
                  height: 200,
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
              /> */}
            </div>
            <div className="comment">
              <label className="font-semibold text-lg" htmlFor="text">
                Comment
              </label>
              <br />
              <TextArea
                onKeyDown={handleKeyDown}
                style={{ width: "100%" }}
                rows={1}
                placeholder="Add Comment"
                onChange={(event) => {
                  console.log(event.target.value);
                  handleKeyDown(event.target.value);
                  dispatch(getTaskDetail(taskDetail.taskId));
                }}
              />
              <div className="getComment ">
                {taskDetail.lstComment?.map((item, index) => {
                  return (
                    <ul className="my-5" key={index}>
                      <li>
                        <div className="flex gap-3  items-center">
                          <div className="avatar">
                            <Avatar
                              key={index}
                              type="primary"
                              src={item.avatar}
                            />
                          </div>
                          <div className="commentContent rounded-lg border-2 py-3 px-3 w-full">
                            <p>{item.commentContent}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="content__right px-5  w-1/2">
            <div className="status">
              <select
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
                value={values.statusId}
                onChange={(e) => {
                  {
                    setFieldValue("statusId", taskDetail.statusName);
                  }
                  taskService
                    .updateStatus({
                      taskId: taskDetail?.taskId,
                      statusId: e.target.value,
                    })
                    .then((res) => {
                      dispatch(getProjectDetail(taskDetail?.projectId));
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {allStatus.map((item, index) => {
                  return (
                    <option key={index} value={item?.statusId}>
                      {item?.statusName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="Assigners mt-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Assigners
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {taskDetail.assigness?.map((item, index) => {
                  return (
                    <div key={index} className=" shadow-md rounded-md">
                      <div key={index} className="flex item">
                        <div className="avatar">
                          <Avatar src={item.avatar} alt="" />
                        </div>
                        <p className="name mt-1 ml-1">
                          {item.name}
                          <i
                            className="fa fa-times"
                            style={{ marginLeft: "5px" }}
                          />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Select
                options={projectDetail.members
                  ?.filter((mem) => {
                    let index = taskDetail.assigness?.findIndex((us) => {
                      return us.id === mem.userId;
                    });
                    if (index !== -1) {
                      return false;
                    }
                    return true;
                  })
                  .map((mem, index) => {
                    return { value: mem.userId, label: mem.name };
                  })}
                optionFilterProp="label"
                className="form-control"
                placeholder="Please select"
                name="listUserAsign"
                value={"Add more"}
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                onSearch={(value) => {
                  console.log(value);
                }}
                onSelect={(value) => {
                  if (value == "0") {
                    return;
                  }
                  let userSelect = projectDetail.members.find(
                    (mem) => mem.userId == value
                  );
                  userSelect = { ...userSelect, userId: userSelect.userId };
                  Promise.all([
                    dispatch(
                      assignUserTask({
                        taskId: taskDetail.taskId,
                        userSelect,
                      })
                    ),
                    dispatch(getTaskDetail(taskDetail.taskId)),
                  ]);
                }}
              />
            </div>
            <div className="Prorioty mt-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Prorioty
              </label>
              <select
                name="priorityId"
                style={{ width: "35%" }}
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
                value={values.priorityId}
                onChange={(e) => {
                  {
                    setFieldValue("priorityId", taskDetail.priorityName);
                  }
                  taskService
                    .updatePriority({
                      taskId: taskDetail.taskId,
                      priorityId: e.target.value,
                    })
                    .then((res) => {
                      dispatch(getProjectDetail(taskDetail.projectId));
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {allPriority.map((item, index) => {
                  return (
                    <option key={index} value={item?.priorityId}>
                      {item?.priority}
                    </option>
                  );
                })}
              </select>
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
                    value={values.originalEstimate}
                  />
                </div>
                <div className="w-5/12">
                  <p>Hours spent</p>
                  <InputNumber
                    name="timeTrackingSpent"
                    type="number"
                    min="0"
                    value={values.timeTrackingSpent}
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
                    value={values.timeTrackingRemaining}
                    onChange={(event) => {
                      setFieldValue(
                        "timeTrackingRemaining",
                        event.target.value
                      );
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskDetail;
