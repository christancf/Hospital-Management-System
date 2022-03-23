import React from 'react'
import { Form, Input, Button, Checkbox, Card, Cascader} from 'antd';
import wardService from 'services/WardService';

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
    let id = values.id
    let category = values.category
    let capacity = values.capacity
    let status = values.status
    wardService.addWardDetails(id, category, capacity, status)
    console.log('Successfully added!')
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
        name="id"
        rules={[{ required: true, message: 'Please input ward ID!' }]}
      >
        <Input placeholder='Ward ID' />
      </Form.Item>
	  <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select ward category' }]}
      >
		   <Cascader options={wardCategory} />
      </Form.Item>
      <Form.Item
        label="Ward Capacity"
        name="capacity"
        rules={[{ required: true, message: 'Please input the ward capacity' }]}
      >
		  <Input placeholder='Capacity' />
      </Form.Item>
	  <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
		  <Cascader options={wardStatus} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

//Ward Category Options
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

//Ward Status Option
const wardStatus = [{
	value: 'true',
	label: 'Available'
},
{
	value: 'false',
	label: 'UnAvailable'
}]




export default Home
