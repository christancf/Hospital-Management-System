import React from 'react'
import { Form, Input, Button, Card, Select, message} from 'antd';
import wardService from 'services/WardService';
const { Search } = Input
const { Option } = Select

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 15, span: 16 },
}

const key = 'update'

const UpdateWard = () => {
  return (
    <>
				<Card style={{ width: 800 }}>
					<h1 className='text-left' style={{ marginLeft: 20, marginBottom: 30 }}>Update Ward</h1>
          <UpdateWardForm />
        </Card>
    </>
  );
};

const UpdateWardForm = () => {
  const [form] = Form.useForm()
  let wardDetails;

  const onFinish = values => {
    message.loading({content:'Please Wait...', key})
    
    if(values.capacity === undefined) values.capacity = wardDetails.capacity
    if(values.status === undefined) values.status = wardDetails.status

    wardService.updateWardDetails(values)
      .then((result)=>{
        message.success({content:'Updated Successfully!', key, duration: 2})
      }).catch((e)=>{
        message.error({content: 'Please Try Again!', key, duration: 2})
    })
    form.resetFields()
  }


  const searchById = (id) => {
    wardService.readWardDetails(id)
    .then((details) => {
      wardDetails = details[0]
      console.log(wardDetails)      
      
      form.setFieldsValue({
        category: wardDetails.category,
        capacity: wardDetails.capacity,
        status: wardDetails.status
      })
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })    
  }

  const resetFields = () => {
    form.resetFields()
  }
  return (
    <Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
        <Search placeholder="Ward ID" id="id" onSearch={id => searchById(id)} enterButton />
      </Form.Item>
      <Form.Item name="category" label="Category" >
        <Select allowClear disabled>
          <Option value="accident">Accident</Option>
          <Option value="general">General</Option>
          <Option value="icu">ICU</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ward Capacity" name="capacity">
        <Input placeholder='Capacity' id="capacity" onFocus={console.log("Focus")} onFocusOut={console.log("Focus out")}/>
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select placeholder="Select the current status of the ward" allowClear>
          <Option value="available">Available</Option>
          <Option value="unavailable">Unavailable</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="button" onClick={resetFields} style={{backgroundColor: '#000', marginRight: 20}}>Discard</Button>
          <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}



export default UpdateWard
