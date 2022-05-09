import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function index(){
  return (
    <div className="h-screen w-full flex px-24 py-28 bg-[#f4f4f4]">
      <div className="w-1/2">
        <p className="text-xl font-semibold">浙江大學圖書館管理系統</p>
      </div>
      <div className="w-1/2 py-10 px-20">
        <div className="border-2 p-5 bg-white">
          <p className="text-xl text-center font-semibold">登入</p>
          <div className="flex flex-col items-center mt-12">
            <Input
              className="w-4/5 my-4"
              size="large"
              placeholder="Account"
              prefix={<UserOutlined />}/>
            <Input
              type="password"
              className="w-4/5 my-4"
              size="large"
              placeholder="Password"
              prefix={<KeyOutlined />}/>
            <Button className="my-4">登入</Button>
          </div>
        </div>
        <div className="my-5 border-2 p-5 bg-white">
          <div className="flex justify-center">
            <p className="w-24">沒有帳號嗎？</p>
            <a href="" className="text-blue-400 underline">注冊</a>
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

