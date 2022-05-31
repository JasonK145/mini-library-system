import { Button, Cascader, Input } from 'antd';

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
                    <div className="w-1/6 ml-3 ">
                        查詢條件：
                    </div>
                    <div>
                        <Cascader options={options} onChange={onChange} placeholder="Please select" />
                    </div>

                    <div className="w-1/4">
                        <Search size="large" placeholder="input search text" onSearch={onSearch} enterButton />
                    </div>
                </div>
                <div className="h-3/4">

                </div>
            </div>
        </>
    );
}



const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];

function onChange(value: any) {
  console.log(value);
}
