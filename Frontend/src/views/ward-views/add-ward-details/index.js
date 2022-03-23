import React, {useState} from 'react'
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
  /*const [details, setDetails] = useState({
    id: String,
    category: String,
    capacity: Number,
    status: Boolean
  })
  let id, category, capacity, status*/
  const onFinish = values => {
    console.log('Successfully read the values');
    /*id = values.id
    category = values.category
    capacity = values.capacity
    status = values.status*/

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const url = 'localhost:3000/ward/add-details'

  /*const handleSubmit = e => {

    console.log("Handle submit")
    /*fetch('/ward/add', {
      method: 'POST',
      body : JSON.stringify({
        id: id,
        category: category,
        capacity: capacity,
        status: status
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log(res))
    .then()
    .catch(function(error) {
      console.log("error---", error)
    });
  }*/
  
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      method="post"
      action="/add"
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

const wardStatus = [{
	value: 'true',
	label: 'Available'
},
{
	value: 'false',
	label: 'UnAvailable'
}]




export default Home
