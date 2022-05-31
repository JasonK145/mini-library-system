import { Button, Cascader, Input, Table } from 'antd';
import React from 'react';

const { Search } = Input;
const onSearch = (value: any) => console.log(value);
export default function Index(){
    return (
        <>
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
                    <Table columns = {columns} dataSource={data} bordered />;
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



// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_: any, index: number) => {
  return {};
};

const columns = [
  {
    title: '圖書編號',
    dataIndex: 'id',
    render: (text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => <a>{text}</a>,
    onCell: (_: any, index: number) => ({
      colSpan: 1,
    }),
  },
  {
    title: '圖書名稱',
    dataIndex: 'name',
    onCell: sharedOnCell,
  },
  {
    title: '出版社',
    dataIndex: 'sell',
    onCell: sharedOnCell,
  },
  {
    title: '在庫數量',
    dataIndex: 'number',
    onCell: sharedOnCell,
  },
  {
    title: '圖書價格',
    dataIndex: 'price',
    onCell: sharedOnCell,
  },
  {
    title: '所屬類型',
    dataIndex: 'type',
    onCell: sharedOnCell,
  },
  {
    title: '操作',
    dataIndex: 'action',
    onCell: sharedOnCell,
  },
];
const data = [
  {
    key: '1',
    id: '00001',
    name: "數據庫系統",
    sell: '浙江大學',
    number: 20,
    price: 100,
    type:'計算機',
    action:<div className="text-center">
        <Button className="mx-2">修改</Button>
        <Button className="mx-2">刪除</Button>
        </div>,
  },
  {
    key: '2',
    id: '00002',
    name: '操作系統',
    sell: '浙江大學',
    number: 11,
    price: 80,
    type:'計算機',
    action:<div className="text-center">
        <Button className="mx-2">修改</Button>
        <Button className="mx-2">刪除</Button>
        </div>,
  },
];


