import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddMember from "./AddMember";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProjectDetail } from "../../../redux/slice/projectSlice";
import Board from "./Board";

const ProjectDetail = () => {
  const param = useParams();
  const projectId = param.id;
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => {
    return state.project;
  });

  // console.log(projectId);
  //MODAL ANTD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // gọi lại api khi reload trang
  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, [projectId]);

  return (
    <div className="project__Detail">
      <div className="grid grid-cols-4 justify-center items-center ">
        <div className="project__Name">
          <span className="text-xl">Project: {projectDetail.projectName}</span>
        </div>
        <div className="List__Members flex justify-center items-center">
          <div>
            <span className="text-xl  mr-5">Members:</span>
          </div>
          <div>
            <Avatar.Group maxCount={4} size="medium">
              {projectDetail.members?.map((item, index) => {
                return (
                  <Tooltip placement="top" key={index} title={item.name}>
                    <Avatar
                      className="hover:-translate-y-1 overflow-hidden"
                      style={{ translate: "all 0.5s" }}
                      src={item.avatar}
                    />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </div>
          <div className="add__Member ml-2 ">
            <Button
              onClick={showModal}
              className="rounded-full"
              icon={<UserAddOutlined />}
            />
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={900}
            >
              <AddMember
                projectId={projectId}
                projectName={projectDetail.projectName}
              />
            </Modal>
          </div>
        </div>
      </div>
      <div>
        <Board projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectDetail;
