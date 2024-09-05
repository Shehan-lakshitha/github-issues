import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar} from 'antd';

const NavBar = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(()=> {
    const dataFetch = async () => {
      try {
        const reponse = await fetch('http://localhost:9090/userInfo');
        if (!reponse.ok) {
          throw new Error("HTTP error, status = " + reponse.status);
        }
        const data = await reponse.json();
        setUserInfo(data);
        
      } catch (error) {
        throw new Error("HTTP error, status = " + error.status);
      }
    }
    dataFetch();
  },[]);

  console.log(userInfo);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">GitHub Issue Tracker 🗃️</h1>
        <div className="flex items-center">
            <h1 className=" text-md mr-2">{userInfo.username}</h1>
            <img className="w-[50px] rounded-full object-cover" src={userInfo.avatarUrl} alt="" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
