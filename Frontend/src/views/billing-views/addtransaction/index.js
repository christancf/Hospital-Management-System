import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  TreeSelect,
} from 'antd';
const AddBill = () => {
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
      
        <Form.Item label="Patient ID">
          <Input />
        </Form.Item>
		<Form.Item label="Patient Name">
          <Input />
        </Form.Item>
        <Form.Item label="Type">
          <TreeSelect
            treeData={[
              { title: 'Doctor Charges', value: 'Doctor Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },{ title: 'Room Charges', value: 'Room Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },{ title: 'Item Charges', value: 'Item Charges', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>

        <Form.Item label="Item Name">
          <Input />
        </Form.Item>

		<Form.Item label="QTY">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button>Clear</Button>
		  <Button className="mr-2" type="primary" htmlType="submit">
		  Add/Update
          </Button>
          <Button>Finish</Button>
        </Form.Item>

      </Form>
    </div>
  );
		};

export default AddBill
