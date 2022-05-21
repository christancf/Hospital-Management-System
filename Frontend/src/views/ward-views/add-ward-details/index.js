import React from 'react'
import { Form, Input, Button, Checkbox, Card, Select, message} from 'antd';
import wardService from 'services/WardService';

const { Option } = Select
const key = 'add'

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 15, span: 16 },
}


const AddWard = () => {
  return (
    <>
				<Card style={{ width: 800 }}>
					<h1 className='text-left' style={{ marginLeft: 20, marginBottom: 30 }}>Add Ward</h1>
          <AddWardForm />
        </Card>
    </>    
  );
};


const AddWardForm = () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    //Number validation, 
    message.loading({content: 'Please Wait...', key})
    wardService.addWardDetails(values)
    .then(() => {
      message.success({content: 'Ward Added Successfully!', key, duration: 2})
      form.resetFields()
    })
    .catch(() => {message.error({content:'Please Try Again!', key, duration: 2 })})
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return(
    <Form {...layout} name="Add Ward" form={form} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
        <Input placeholder='Ward ID' />
      </Form.Item>
	    <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select ward category' }]}>
        <Select allowClear placeholder='Select a category'>
          <Option value="accident">Accident</Option>
          <Option value="general">General</Option>
          <Option value="icu">ICU</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ward Capacity" name="capacity" rules={[{ required: true, message: 'Please input the ward capacity'}]}>
		    <Input placeholder='Capacity' />
      </Form.Item>
      <Form.Item label="Room Charge" name="room-charge" rules={[{ required: true, message: 'Please input the ward capacity'}]}>
		    <Input placeholder='Room Charge' />
      </Form.Item>
	    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
        <Select placeholder="Select the current status of the ward" allowClear>
          <Option value="available">Available</Option>
          <Option value="unavailable">Unavailable</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
						<Button htmlType="reset">Discard</Button>
						<Button type="primary" htmlType="submit" style={{marginLeft: 20}}>Save</Button>
				</Form.Item>
    </Form>
  )
}





export default AddWard
