import React from 'react'
import { Form, Input, Button, Checkbox, Card, Cascader} from 'antd';

const Home = () => {
	return (
		<div>
			<Demo />
		</div>
	)
}

//<Card title="Add Ward Details" bordered={false} style={{width:300}}>				
//</Card>
//options

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="ID"
        name="wardID"
        rules={[{ required: true, message: 'Please input ward ID!' }]}
      >
        <Input />
      </Form.Item>
	  <Form.Item
        label="Category"
        name="ward-category"
        rules={[{ required: true, message: 'Please select ward category' }]}
      >
		  <Cascader options={wardCategory} />
      </Form.Item>
      <Form.Item
        label="Ward Capacity"
        name="capacity"
        rules={[{ required: true, message: 'Please input the ward capacity' }]}
      >
		  <Input />
      </Form.Item>
	  <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
		  <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};



const wardCategory = [{
	value: 'general',
	label: 'General'
},
{
	value: 'accident',
	label: 'Accident'
},
{
	value: 'icu',
	label: 'ICU'
}]

const status = [{
	value: 'true',
	label: 'Available'
},
{
	value: 'false',
	label: 'UnAvailable'
}]




export default Home
