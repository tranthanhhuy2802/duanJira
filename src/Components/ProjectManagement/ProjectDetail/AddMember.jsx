import { CloseSquareFilled, SearchOutlined } from "@ant-design/icons";
import { Input, Avatar, Divider, List, Skeleton, Button } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { userService } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, setlistMembers } from "../../../redux/slice/userSlice";

const AddMember = ({ projectName }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { listMembers } = useSelector((state) => {
    return state.user;
  });
  //   console.log(listMembers);
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
  //   console.log(projectName);
  //   console.log(data);
  return (
    <div>
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
          <div className="table__user">
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
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
                            <Button className="bg-blue-500 text-white hover:bg-blue-600">
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
        </div>
      </div>
    </div>
  );
};

export default AddMember;
