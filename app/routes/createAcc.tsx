import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index(){
  const navigate = useNavigate();
  const [id, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (e:any) => {
    if (id !== "" && password !== "") {
      axios
        .post("http://localhost:7000/createAcc", {
          id: id,
          password: password,
        })
        .then((res) => {
          if(res.data == 1){
            alert('注冊成功！');
            navigate('../');
          }
          else
            alert('注冊失敗！');
          
        });
    } else if (id === "") {
      alert("請輸入帳號!");
    } else {
      alert("請輸入密碼!");
    }
  };
  return (
    <div className="h-screen w-full flex px-24 py-28 bg-[#f4f4f4] justify-center items-center">
      <div className="w-1/2 py-10 px-20">
        <div className="border-2 p-5 bg-white">
          <p className="text-xl text-center font-semibold">注冊帳號</p>
          <div className="flex flex-col items-center mt-12">
            <div className="w-4/5 text-center">
                <Input
                  className="w-4/5 my-4 "
                  size="large"
                  placeholder="Account"
                  prefix={<UserOutlined />}
                  onChange={(e)=>{setUsername(e.target.value)}}/>
                <Input
                  type="password"
                  className="w-4/5 my-4 "
                  size="large"
                  placeholder="Password"
                  prefix={<KeyOutlined />}
                  onChange={(e)=>{setPassword(e.target.value)}}/>
                <Button onClick={(e)=>{login(e)}} className="mt-10">登入</Button>
            </div>
          </div>
        </div>
        <div className="my-5 border-2 p-5 bg-white">
          <div className="flex justify-center">
            <a href="../" className="text-blue-400 underline">回到上一頁</a>
          </div>
        </div>
      </div>
    </div>
  );
}
