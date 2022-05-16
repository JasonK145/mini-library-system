import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function index(){
  return (
    <div className="h-screen w-full flex px-24 py-28 bg-[#f4f4f4] justify-center items-center">
      <div className="w-1/2 py-10 px-20">
        <div className="border-2 p-5 bg-white">
          <p className="text-xl text-center font-semibold">找回密碼</p>
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
            <Button className="my-4">找回</Button>
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
