import { Button, Cascader, Input } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "./components/SideNav";



interface Props{
  name:string;
  placeholder?:string;
}



export default function Index(){
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value: any) => console.log(value);
    return (
      <>
        <div style={{height:'100vh',width:'100%',display:"flex",flexDirection:'column',background:'#F4F4F4'}}>
            <div style={{top:'0%', width: '100%',height:'7%',background:'#3f9bd590',padding:10,display:"flex"}}>
                <p style={{height:'100%',display:'flex',alignItems:"center",fontWeight:1000,fontSize:'15px',cursor:"pointer"}} onClick={()=>navigate('../')}>首頁</p>
                <p style={{height:'100%',display:'flex',alignItems:"center",marginLeft:"15px",color:"white",fontSize:'25px'}}>浙江大學圖書館管理系統</p>
            </div>
            <div style={{display:"flex",width:'100%',height:'88%'}}>
                <div style={{height:'100%',width:80,marginTop:'5px'}}>
                    <SideNav/>
                </div>
                <div style={{marginTop:'20px',padding:40, display:'flex',width:'100%',flexDirection:'column',marginLeft:'240px',marginRight:'240px',background:'white'}}>
                  <div className="h-full w-full flex flex-col">
                      <div className="h-[80px] w-full flex items-center px-10 bg-[#f4f4f4]">
                          <div className="w-1/12">
                              <Button type="primary" size='large'>新增</Button>
                          </div>
                          <div className="w-1/12 ml-3">
                              查詢條件：
                          </div>
                          <div className="w-1/4 mx-2">
                              <Cascader options={options} onChange={onChange} placeholder="Please select" />
                          </div>

                          <div className="w-1/4">
                              <Search size="large" placeholder="input search text" onSearch={onSearch} enterButton />
                          </div>
                      </div>
                    <div className="my-5 h-40">
                      <Outlet/>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </>
    );
}
const options = [
  {
    value: '計算機',
    label: '計算機',
  },
  {
    value: '英文',
    label: '英文',
  },
];

function onChange(value: any) {
  console.log(value);
}