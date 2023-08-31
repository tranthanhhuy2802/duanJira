import React, { useState } from "react";
import { Avatar, Modal, Tag } from "antd";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getTaskDetail, updateStatus } from "../../../redux/slice/taskSlice";
import { getProjectDetail } from "../../../redux/slice/projectSlice";
import { useEffect } from "react";
import axios from "axios";
import TaskDetail from "../TaskDetail.jsx/TaskDetail";
const Board = ({ projectId }) => {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => {
    return state.project;
  });
  const [textColor, setTextColor] = useState("textColor:'black'");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const doEverything = () => {
  //   return (dispatch) =>
  //     Promise.all([
  //       dispatch(
  //         updateStatus({
  //           taskId: taskId,
  //           statusId: destination.droppableId,
  //         })
  //       ),
  //       dispatch(getProjectDetail({ projectId: projectId })),
  //     ]);
  // };
  // Drag N Drop
  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, []);
  const handleDragEnd = (res) => {
    // console.log(res);
    let { projectId, taskId } = JSON.parse(res.draggableId);
    // console.log(projectId, taskId);
    let { source, destination } = res;
    if (!res.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    Promise.all([
      dispatch(
        updateStatus({
          taskId: taskId,
          statusId: destination.droppableId,
        })
      ),
      dispatch(getProjectDetail(projectId)),
    ]);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="dragDrop grid grid-cols-4 h-24 gap-4 mt-10">
        {projectDetail.lstTask?.map((item, index) => {
          return (
            <Droppable key={index} droppableId={item.statusId}>
              {(provided) => {
                return (
                  <div className="card bg-gray-100 h-auto rounded-md">
                    <Tag
                      color={
                        item.statusName === "BACKLOG"
                          ? ""
                          : item.statusName === "SELECTED FOR DEVELOPMENT"
                          ? "magenta"
                          : item.statusName === "DONE"
                          ? "green"
                          : "orange"
                      }
                      className="header ml-5 mt-3"
                    >
                      {item.statusName}
                    </Tag>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="listTask list-none"
                      style={{ height: "100%" }}
                    >
                      {item.lstTaskDeTail?.map((item, index) => {
                        return (
                          <Draggable
                            key={item.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: item.projectId,
                              taskId: item.taskId,
                            })}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="task hover:bg-gray-100 m-2 transition-all bg-white rounded-md p-5 h-30 shadow-md list-none"
                                  onClick={() => {
                                    showModal();
                                    dispatch(getTaskDetail(item.taskId));
                                  }}
                                >
                                  <p>{item.taskName}</p>
                                  <div className="flex justify-between items-center">
                                    <div className="left">
                                      <span
                                        className=""
                                        style={{ marginRight: "-20px" }}
                                      >
                                        <i
                                          className={
                                            item.taskTypeDetail?.taskType ===
                                            "bug"
                                              ? "fa-solid fa-bug mr-2 text-red-600"
                                              : "fa-solid fa-bookmark mr-2 text-green-500"
                                          }
                                        />
                                      </span>
                                      <span>
                                        <Tag
                                          color={
                                            item.priorityTask?.priority ===
                                            "High"
                                              ? "red"
                                              : item.priorityTask?.priority ===
                                                "Medium"
                                              ? "gold"
                                              : item.priorityTask?.priority ===
                                                "Low"
                                              ? "green"
                                              : "green"
                                          }
                                          className="card__header ml-5 mt-3"
                                        >
                                          {item.priorityTask?.priority}
                                        </Tag>
                                      </span>
                                    </div>

                                    <div className="right">
                                      <Avatar.Group
                                        key={index}
                                        className="text-center"
                                        maxCount={2}
                                        maxStyle={{
                                          color: "#f56a00",
                                          backgroundColor: "#fde3cf",
                                        }}
                                      >
                                        {item.assigness.map((item, index) => {
                                          return (
                                            <Avatar
                                              key={index}
                                              type="primary"
                                              src={item.avatar}
                                            />
                                          );
                                        })}
                                      </Avatar.Group>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </div>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={1000}
      >
        <TaskDetail projectId={projectId} />
      </Modal>
    </DragDropContext>
  );
};

export default Board;
