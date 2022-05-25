import React, {useState, useEffect} from 'react'
import { Form, Input, Button, Card, Select, Spin} from 'antd';
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
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    wardService.readAllWardDetails()
    .then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setData()
      console.log(`Error: ${e}`)
    })
  }, [update])

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
    setUpdate(true)
  }


  const setDetails = id => {
    data.map(d => {
      if(id === d.id){
        form.setFieldsValue({
          category: {key: d.category, label: capitalize(d.category)},
          capacity: d.capacity,
          roomCharge: d.roomCharge,
          status: d.status
        })
        return
      }
    })
    document.getElementById("wardId").setAttribute('disabled', 'true')
  }

  if(loading){
    return(
      <>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
    )
  }else if(error){
    return(
      <span>Error</span>
    )
  }else{
    return (
      <Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
          <Select showSearch allowClear id="wardId" placeholder='Select a category' onChange={setDetails}>
            { data.map(d => (
              <Option value={d.id}>{d.id}</Option>
            ))}
          </Select>
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
}



export default UpdateWard
