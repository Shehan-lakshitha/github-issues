import React, { useState } from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  UngroupOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [search, setSearch] = useState(false);

  const handleSubmit = () => {
    setOwner(document.getElementById("ownerInput").value);
    setRepo(document.getElementById("repoInput").value);
    dataFetch();
  };

  const dataFetch = async () => {
    try {
      const reponse = await fetch(
        `http://localhost:9090/issues?owner=${owner}&repo=${repo}`
      );

      if (!reponse.ok) {
        throw new Error("HTTP error, status = " + reponse.status);
      }

      setSearch(true);

      const data = await reponse.json();
      setIssues(data);
    } catch (error) {
      console.log(error);
    }
  };
  const editText = (text) => {
    var bold = /\*\*(.*?)\*\*/gm;
    var italic = /\*(.*?)\*/gm;
    var code = /`([^`]*)`/gm;
    var link = /\[(.*?)\]\((.*?)\)/gm;
    var result = text.replace(bold, "<br><b>$1</b><br>");
    result = result.replace(italic, "<i>$1</i>");
    result = result.replace(code, "<code><br>$1</code><br>");
    result = result.replace(link, '<a href="$2">$1</a>');
    return result;
  };

  return (
    <>
      <div className="flex items-center">
        <Input
          className="w-[200px] h-[30px] mr-3 text-sm"
          id="ownerInput"
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
          id="repoInput"
          size="small"
          placeholder="Repo"
          prefix={
            <UngroupOutlined
              style={{
                fontSize: "24px",
              }}
            />
          }
        />
        <Button className="h-[30px]" type="primary" onClick={handleSubmit}>
          Track issues
        </Button>
      </div>
      {search ? (
        <div>
          <div className="flex items-center border-b-[1px]">
            <h1 className="text-lg text-gray-400 ">Issues - </h1>
            <p className="text-sm ">
              @{owner}/{repo}
            </p>
          </div>

          {issues.map((issue, index) => (
            <div key={index} className="mt-2 rounded-md border-[1px] shadow-md">
              <div className="flex justify-between">
                <p className="text-md text-gray-400">
                  #{issue.number} - {issue.title}
                </p>
                {issue.state == "closed" ? (
                  <span className="text-sm text-[#ef2494] bg-red-300 rounded-md w-13 h-6 flex items-center text-center">
                    Closed
                  </span>
                ) : (
                  <span className="text-sm text-[#52c41a] bg-green-300 rounded-md w-13 h-6 flex items-center text-center">
                    Open
                  </span>
                )}
              </div>
              <div className="flex justify-between items-end">
                <p
                  className="text-sm flex-1 overflow-hidden -mt-6 text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: editText(issue.body) }}
                />
                <a
                  className="text-sm flex-shrink-0 flex items-center text-center rounded-md border-[1px] h-8 px-2"
                  href={issue.url}
                  target="_blank"
                >
                  <GithubOutlined className="text-2xl" />
                  <span className="ml-1">View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          <h1 className="text-sm text-gray-400">
            Enter the owner and the repo name to track the issues
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
