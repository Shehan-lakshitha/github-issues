import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar} from 'antd';

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">GitHub Issue Tracker 🗃️</h1>
        <div className="flex">
            <h1 className=" text-md mr-2">Shehan Lakshitha</h1>
            <Avatar size="medium" icon={<UserOutlined />} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
