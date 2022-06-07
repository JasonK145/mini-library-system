import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: string;
  name: string;
  type: string;
  author: string;
  seller: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: React.Key;
  name: string;
  type: string;
  author: string;
  seller: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  
  const [dataSource, setDataSource] = useState<DataType[]>([
  ]);

  useEffect(() => {axios.post("http://localhost:7000/book").then((res)=>{
    setDataSource(res.data);});
  },[])

  const [count, setCount] = useState(2);

  const handleDelete = (id: React.Key) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
  };

  const defaultColumns: any[] = [
    {
      title: 'ISBN',
      dataIndex: 'id',
      width: '10%',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
    },
    {
      title: 'delete',
      dataIndex: 'operation',
      render: (_:any, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => {
            handleDelete(record.id);  
            axios
              .post("http://localhost:7000/delBook", {
                id: record.id
              })
              .then((res) => {
                });
            }}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'correct',
      dataIndex:'correct',
      render: (_:any, record: { id:React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => {  
            axios
              .post("http://localhost:7000/CorBook", {
                id: record.id
              })
              .then((res) => {
                });
            }}>
            <a>Correct</a>
          </Popconfirm>
        ) : null,
      }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      id: count,
      name: `CS ${count}`,
      type: 'CS',
      author: `Nobody ${count}`,
      seller: '浙江大學'

    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={()=>{
        handleAdd();
          axios.post("http://localhost:7000/addBook", {
            id: count,
            name: `CS ${count}`,
            type: 'CS',
            author: `Nobody ${count}`,
            seller: '浙江大學'
          })
          .then((res) => {
              
            });
        }} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;



//void Interface::serialOutput
//(std::vector<Tuple> &tuples, std::vector<string> &attr_names/