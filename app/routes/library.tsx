import { Input } from "antd";
import { Outlet, useNavigate } from "remix";
import SideNav from "./components/SideNav";



interface Props{
  name:string;
  placeholder?:string;
}



export default function Index(){
  const navigate = useNavigate();

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
                    <Outlet/>
                    
                </div>
            </div>
        </div>
      </>
    );
}

export function Card(props:Props){
  return (
    <div style={{display:"flex",flexDirection:'column'}}>
      <div style={{display:"flex",height:50,margin:10}}>
        <p style={{height:'100%',width:120,textAlign:"center",display:"flex",alignItems:"center"}}>
          {props.name}</p>
        <Input size="large" placeholder={props.placeholder} />
      </div>
    </div>
  );
}
