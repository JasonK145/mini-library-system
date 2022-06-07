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
        .post("http://localhost:7000/signin", {
          id: id,
          password: password,
        })
        .then((res) => {
          if(res.data == 1){
            alert('登入成功！');
            navigate('./library');
          }
          else
            alert('登入失敗！');
          
        });
    } else if (id === "") {
      alert("請輸入帳號!");
    } else {
      alert("請輸入密碼!");
    }
  };
  return (
    <div className="h-screen w-full flex p-28 bg-[#f4f4f4]">
      <div className="w-1/2">
        <p className="text-xl font-semibold">浙江大學圖書館管理系統</p>
        <div className="h-[450px] w-[450] p-5">
          <img className="shadow-xl rounded-sm" src="/images/Zju.jpeg" alt=""/>
        </div>
      </div>
      <div className="w-1/2 py-10 px-20">
        <div className="border-2 p-5 bg-white">
          <p className="mt-5 text-xl text-center font-semibold">登入</p>
          <div className="flex flex-col items-center mt-10">
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
            <p className="w-24">沒有帳號嗎？</p>
            <a href="/createAcc" className="text-blue-400 underline">注冊</a>
          </div>
          <div className="flex justify-center mt-3">
            <p className="w-24">忘記密碼嗎？</p>
            <a href="/forget" className="text-blue-400 underline">找回</a>
          </div>
        </div>
      </div>
    </div>
  );
}

