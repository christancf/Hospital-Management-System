import React, { useState } from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   TreeSelect,
// } from 'antd';
// const AddBill = () => {
//   const [componentSize, setComponentSize] = useState('small');
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };
//   return (
//     <div>
//       <Form
//         labelCol={{ span: 4 }}
//         wrapperCol={{ span: 14 }}
//         layout="horizontal"
//         initialValues={{ size: componentSize }}
//         onValuesChange={onFormLayoutChange}
//         size={componentSize}
//       >
      
//         <Form.Item label="Patient ID">
//           <Input />
//         </Form.Item>
// 		<Form.Item label="Patient Name">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Type">
//           <TreeSelect
//             treeData={[
//               { title: 'Doctor Charges', value: 'Doctor Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },{ title: 'Room Charges', value: 'Room Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },{ title: 'Item Charges', value: 'Item Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },
//             ]}
//           />
//         </Form.Item>

//         <Form.Item label="Item Name">
//           <Input />
//         </Form.Item>

// 		<Form.Item label="QTY">
//           <Input />
//         </Form.Item>

//         <Form.Item>
//           <Button>Clear</Button>
// 		  <Button className="mr-2" type="primary" htmlType="submit">
// 		  Add/Update
//           </Button>
//           <Button>Finish</Button>
//         </Form.Item>

//       </Form>
//     </div>
//   );
// 		};

import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Demo extends React.Component {
  formRef = React.createRef();

  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    const PatientId = values.PatientId; 
    const PatientName = values.PatientName;
    const types = values.types;
    const ItemName = values.ItemName;
    const QTY = values.QTY;
    
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item name="PatientId" label="Patient ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="PatientName" label="Patient Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="types" label="Types" rules={[{ required: true }]}>
          <Select
            placeholder="Select"
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="Item Charges">Item Charges</Option>
            <Option value="Doctor Charges">Doctor Charges</Option>
            <Option value="Room Charges">Room Charges</Option>
          </Select>
        </Form.Item>
        <Form.Item name="ItemName" label="Item Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="QTY" label="QTY" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) => {
            return getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className="mr-2" type="primary" htmlType="Add">
            Add
          </Button>
          <Button className="mr-2" htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          {/* <Button className="mr-2" type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button> */}
        </Form.Item>
      </Form>
    );
  }
}


export default Demo
