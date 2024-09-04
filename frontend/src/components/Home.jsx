import React from "react";
import { Input, Button } from "antd";
import { UserOutlined, UngroupOutlined, GithubOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <>
      <div className="flex items-center">
        <Input
          className="w-[200px] h-[30px] mr-3 text-sm"
          size="small"
          placeholder="Owner"
          prefix={
            <UserOutlined
              style={{
                fontSize: "24px",
              }}
            />
          }
        />
        <Input
          className="w-[200px] h-[30px] mr-3"
          size="small"
          placeholder="Repo"
          prefix={
            <UngroupOutlined
              style={{
                fontSize: "24px",
                //color: "#eb2f96"
              }}
            />
          }
        />
        <Button className="h-[30px]" type="primary">
          Track issues
        </Button>
      </div>
      <div>
        <div className="flex items-center border-b-[1px]">
          <h1 className="text-lg text-gray-400 ">Issues - </h1>
          <p className="text-sm ">@Shehan-lakshitha/Track-My-Issue</p>
        </div>

        <div className="mt-2 rounded-md border-[1px]">
          <div className="flex justify-between">
            <p className="text-md text-gray-400">
              #152 - Enhance the user interface
            </p>
            {/* <span className="text-sm text-[#ef2494] bg-red-300 rounded-md w-13 h-6 flex items-center text-center">
              Closed
            </span> */}
            <span className="text-sm text-[#52c41a] bg-green-300 rounded-md w-13 h-6 flex items-center text-center">
              Open
            </span>
            
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">
              In the project enhancing the user interface would be a great
              advantage
            </p>
            <a className="text-sm flex items-center text-center rounded-md border-[1px] h-8" href=""><GithubOutlined className="text-2xl" />View on GitHub</a>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
