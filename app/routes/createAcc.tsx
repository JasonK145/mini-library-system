import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function index(){
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
                  prefix={<UserOutlined />}/>
                <Input
                  type="password"
                  className="w-4/5 my-4 "
                  size="large"
                  placeholder="Password"
                  prefix={<KeyOutlined />}/>
                <Button onClick={()=>{}} className="mt-10">登入</Button>
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
