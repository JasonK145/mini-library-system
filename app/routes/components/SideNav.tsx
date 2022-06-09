import { ContainerOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('圖書信息管理','',<ContainerOutlined/>),
  getItem('修改圖書', 'bookType', <PieChartOutlined />),
  getItem('還書管理', 'manager', <ContainerOutlined />),
  getItem('借閱管理', 'borrower', <ContainerOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 250,height:'100%' }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5,height:'5%',width:80 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu style={{height:'90%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={(i)=>{
          console.log(i)
          navigate(i.key)}}
      />
    </div>
  );
};

export default App;
