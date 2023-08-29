import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddMember from "./AddMember";

const ProjectDetail = () => {
  const { projectDetail } = useSelector((state) => {
    return state.project;
  });

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

  return (
    <div className="grid grid-cols-4 justify-center items-center ">
      <div className="">
        <span className="text-2xl">Project: {projectDetail.projectName}</span>
      </div>
      <div className="flex justify-center items-center">
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
            width={1000}
          >
            <AddMember projectName={projectDetail.projectName} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
