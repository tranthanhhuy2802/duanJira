import { CloseSquareFilled, SearchOutlined } from "@ant-design/icons";
import { Input, Avatar, Divider, List, Skeleton, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { userService } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, setlistMembers } from "../../../redux/slice/userSlice";
import {
  getAllProject,
  getAssignUserProject,
  getProjectDetail,
} from "../../../redux/slice/projectSlice";
import { useParams } from "react-router-dom";
import { projectService } from "../../../services/projectservice";

const AddMember = ({ projectName, projectId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { listMembers } = useSelector((state) => {
    return state.user;
  }); //   console.log(listMembers);
  const { projectMembers } = useSelector((state) => {
    return state.project;
  });
  // console.log(projectMembers);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    userService
      .getAllUser()
      .then((res) => {
        // console.log(res.data.content);
        dispatch(setlistMembers([res.data.content]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div>
      {contextHolder}
      <div className="text-2xl font-semibold border-b-2 text-center pb-5">
        Add members to project
        <span className="text-blue-500"> {projectName}</span>
      </div>

      <div className="flex items-center gap-14 mt-8 ">
        <span className="text-lg"> Search Users</span>
        <Input
          onChange={(event) => {
            // console.log(event.target.value);
            dispatch(getAllUser(event.target.value));
          }}
          className="w-1/3"
          prefix={<SearchOutlined />}
        ></Input>
      </div>
      <div className="flex mt-5">
        <div className="add__member w-1/2">
          <div>
            <span className="text-lg font-semibold ml-1">Not Yet Added</span>
          </div>
          <div className="table__user__add">
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 30px",
              }}
            >
              <InfiniteScroll
                dataLength={listMembers.length}
                next={loadMoreData}
                hasMore={listMembers.length < 20}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={listMembers}
                  renderItem={(item) => {
                    // console.log(item);
                    return item?.map((item, index) => {
                      return (
                        <List.Item key={index}>
                          <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} />}
                            title={<a href="">{item.name}</a>}
                            description={"UserId: " + item.userId}
                          />
                          <div>
                            <Button
                              onClick={() => {
                                projectService
                                  .postAssignUserProject({
                                    projectId: projectId,
                                    userId: item.userId,
                                  })
                                  .then((res) => {
                                    // console.log(res);
                                    messageApi.success("Thêm Thành Công");
                                    dispatch(getProjectDetail(projectId));
                                    dispatch(getAllUser());
                                    dispatch(getAllProject());
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                    messageApi.error(
                                      error.response.data.message
                                    );
                                  });
                              }}
                              className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                              Add
                            </Button>
                          </div>
                        </List.Item>
                      );
                    });
                  }}
                />
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className="remove__member w-1/2">
          <div>
            <span className="text-lg font-semibold ml-2">
              Already in Project
            </span>
          </div>
          <div className="table__members">
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 30px",
              }}
            >
              <InfiniteScroll
                dataLength={projectMembers.length}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={projectMembers}
                  renderItem={(item) => {
                    // console.log(item);
                    return item?.map((item, index) => {
                      return (
                        <List.Item key={index}>
                          <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} />}
                            title={<a href="">{item.name}</a>}
                            description={"UserId: " + item.userId}
                          />
                          <div>
                            <Button
                              onClick={() => {
                                projectService
                                  .deteleAssignUserProject({
                                    projectId: projectId,
                                    userId: item.userId,
                                  })
                                  .then((res) => {
                                    // console.log(res);
                                    messageApi.success("Xóa Thành Công");
                                    dispatch(getProjectDetail(projectId));
                                    dispatch(getAllUser());
                                    dispatch(getAllProject());
                                  })
                                  .catch((error) => {
                                    // console.log(error);
                                    messageApi.error(
                                      error.response.data.message
                                    );
                                  });
                              }}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Remove
                            </Button>
                          </div>
                        </List.Item>
                      );
                    });
                  }}
                />
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
