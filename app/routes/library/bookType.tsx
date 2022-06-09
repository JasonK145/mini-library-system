import { Button, Cascader, Form, Input, InputNumber, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  type: number;
  author: string;
  seller: string;
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

  useEffect(() => {axios.post("http://localhost:7000/book").then((res)=>{
    setData(res.data);});
  },[])


  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => {
                save(record.id);
                }} style={{ marginRight: 8 }}>
              Confirm
            </Typography.Link>
           
          </span>
        ) : (
           <div style={{width:'100%' ,display:'flex'}}> 
            <Typography.Link disabled={editingKey !== ''} onClick={() => {
                edit(record)
                }}>
                Edit
            </Typography.Link>
            <div style={{marginLeft:'10px'}}  onClick={()=>{
                axios.post("http://localhost:7000/CorBook", {
                    id:record.id,
                    name:record.name,
                    type:record.type,
                    author:record.author,
                    seller:record.seller
                  })
                .then((res) => {
                  alert('updated');
                });
            }}>
              <a>Save</a>
            </div>
          </div>
        );
      },
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
        editing: isEditing(record),
      }),
    };
  });

  function onChange(value: any) {
    axios.post("http://localhost:7000/search", {
      select:value,
      }) 
    .then((res) => { 
      setData(res.data);
    });
    console.log(value);
  }


  const { Search } = Input;
  const onSearch = (value: any) => {
    axios.post("http://localhost:7000/search_booktype", {
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
          pagination={{
            onChange: cancel,
          }}
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
