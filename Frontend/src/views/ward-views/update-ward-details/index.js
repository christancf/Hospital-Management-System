import React from 'react'
import { Form, Input, Button, Card, Select, message} from 'antd';
import wardService from 'services/WardService'
import { ShowModal } from '../add-ward-details'
import { numberValidation } from '../add-ward-details'
import { capitalize } from '../assigned-nurse-details'
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
    values.category = values.category.key
    wardService.updateWardDetails(values)
    .then((result)=>{
      ShowModal(
        "Successful!",
        4,
        "Category added successfully",
        true
      )
    }).catch((e)=>{
      ShowModal(
        "Try again!",
        4,
        "There was an unexpected error. Try again later.",
        true
      )
    })
    form.resetFields()
  }


  const searchById = (id) => {
    wardService.readWardDetails(id)
    .then((details) => {
      wardDetails = details[0]
      console.log(wardDetails)      
      
      form.setFieldsValue({
        category: {key: wardDetails.category, label: capitalize(wardDetails.category)},
        capacity: wardDetails.capacity,
        roomCharge: wardDetails.roomCharge,
        status: wardDetails.status
      })
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })    
  }
  return (
    <Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
        <Search placeholder="Ward ID" id="id" onSearch={id => searchById(id)} enterButton />
      </Form.Item>
      <Form.Item name="category" label="Category" >
        <Select labelInValue allowClear style={{pointerEvents:"none"}}>
        </Select>
      </Form.Item>
      <Form.Item label="Ward Capacity" name="capacity">
        <Input placeholder='Capacity' id="capacity"  onInput={numberValidation}/>
      </Form.Item>
      <Form.Item label="Room Charge/day" name="roomCharge">
          <Input placeholder='Room Charge' onInput={numberValidation} />
        </Form.Item>
      <Form.Item name="status" label="Status">
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



export default UpdateWard
