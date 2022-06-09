import { Button, Cascader, Form, Input, InputNumber, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  type: number;
  author: string;
  seller: string;
  state:string;
  
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {axios.post("http://localhost:7000/have_not_borrow_book").then((res)=>{
    setData(res.data);});
  },[])


  const columns = [
    {
        title: 'ISBN',
        dataIndex: 'id',
        width: '10%',
        editable: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        editable: true,
      },
      {
        title: 'Author',
        dataIndex: 'author',
        editable: true,
    },
      {
        title: 'Seller',
        dataIndex: 'seller',
        editable: true,
    },
    {
        title:'State',
        dataIndex:'state',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_:any, record: Item) =>
        data.length >=1 ?(
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="ml-4" 
            onClick={()=>{
                axios.post("http://localhost:7000/upDateState", {
                id: record.id,
                state:'借出',
              })
              .then((res) => { 
                });
                window.location.reload();
              }}
            >Borrow</a>
            
        ):null,
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex == '',
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  function onChange(value: any) {
    axios.post("http://localhost:7000/borrow_search", {
      select:value,
      }) 
    .then((res) => { 
      setData(res.data);
    });
    console.log(value);
  }



  const { Search } = Input;
  const onSearch = (value: any) => {
    axios.post("http://localhost:7000/borrow_search", {
      select:value,
      }) 
    .then((res) => { 
      setData(res.data);
    });
  }

  return (
    <div>
      <div className="h-[80px] w-full flex items-center px-10 bg-[#f4f4f4]">
        <div className="w-1/12">
            <Button type="primary" size='large'>新增</Button>
        </div>
        <div className="w-1/12 ml-3">
            查詢條件：
        </div>
        <div className="w-1/4 mx-2">
            <Cascader options={options} onChange={onChange
              } placeholder="Please select" />
        </div>

        <div className="w-1/4">
            <Search size="large" placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
      </Form>
    </div>
  );
};

export default App;

const options = [
  {
    value: 'CS',
    label: 'CS',
  },
  {
    value: 'Eng',
    label: 'Eng',
  },
  {
    value: 'Chinese',
    label: 'Chinese',
  },
  {
    value: 'History',
    label: 'History',
  },
  {
    value: 'IOS',
    label: 'IOS',  
  }
];