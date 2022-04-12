import React from 'react'
import { Form, Input, Button, Checkbox, Card, Cascader} from 'antd';
import wardService from 'services/WardService';
const { Search } = Input
const UpdateDetails = () => {
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
    let capacity = values.capacity
    let status = values.status
    let result = wardService.updateWardDetails(id, capacity, status)
    console.log('Successfully updated!', result)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const searchById = (id) => {
    wardService.readWardDetails(id)
    .then((details) => {
      let wardDetails = details[0]
      console.log(wardDetails)
      setValues(wardDetails)
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })
  }
  const setValues = (wardDetails) => {
    let mCategory = document.getElementById('category')
    let mCapacity = document.getElementById('capacity')
    let mStatus = document.getElementById('status')

    mCategory.value = wardDetails.category[0].toUpperCase() + wardDetails.category.substring(1)
    mCapacity.value = wardDetails.capacity
    wardDetails.status? mStatus.value = "Available" : mStatus.value = "Unavailable"
  }
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
        <Search placeholder="Ward ID" onSearch={id => searchById(id)} enterButton />
      </Form.Item>
	  <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select ward category' }]}
      >
			<Input disabled={true} id="category" />
      </Form.Item>
      <Form.Item
        label="Ward Capacity"
        name="capacity"
        rules={[{ required: true, message: 'Please input the ward capacity' }]}
      >
		  <Input placeholder='Capacity' id="capacity" />
      </Form.Item>
	  <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
		  <Cascader options={wardStatus} id="status" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};



//Ward Status Option
const wardStatus = [{
	value: 'true',
	label: 'Available'
},
{
	value: 'false',
	label: 'Unavailable'
}]




export default UpdateDetails
