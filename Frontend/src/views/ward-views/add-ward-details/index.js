import React, {useState, useEffect} from 'react'
import { Form, Input, Button, Card, Select, Spin, Modal} from 'antd'
import wardService from 'services/WardService'
import { capitalize } from '../assigned-nurse-details'

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


export const ShowModal = (title, delay, innercontent, isSuccess) => {

  if (isSuccess) {
    const modal = Modal.success({
      title: title,
      content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      closable: true,
      maskClosable: true,
      okText: 'Go to Wards page',
      onOk: () => {window.location ='../home'}
    });
    const timer = setInterval(() => {
      delay -= 1;
      modal.update({
        content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy()
    }, delay * 1000)
  }
  else {
    const modal = Modal.error({
      title: title,
      content: `${innercontent}.This popup will close in ${delay} seconds.`,
    });
    const timer = setInterval(() => {
      delay -= 1;
      
      modal.update({
        content: `${innercontent}.This popup will close in ${delay} seconds.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, delay * 1000);
  }
}

export const numberValidation = v => {
  const ID = v.target.id
  const FIELDNAME = ID.split('_')[1]
  
  v.target.value=v.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
}

const AddWardForm = () => {
  const [form] = Form.useForm()
  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    wardService.readAllWardCategory()
    .then(res => {
      setCategory(res)
      setLoading(false)
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setCategory()
      console.log(`Error: ${e}`)
    })
  }, [])

  const getAbbr = cat => {
    let abbr = null
    category.forEach(c => {
      if(c.category == cat) {
        abbr = c.abbreviation
        return
      }
    })
    return abbr
  }

  const onFinish = values => {
    //Number validation, 
    values.abbreviation = getAbbr(values.category)
    console.log(values)
    wardService.addWardDetails(values)
    .then(() => {
      ShowModal(
        "Successful!",
        4,
        "Ward added successfully",
        true
      )
      form.resetFields()
    })
    .catch(() => {
      ShowModal(
        "Try again!",
        4,
        "There was an unexpected error. Try again later.",
        true
      )  
      form.resetFields()
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  

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
    return(
      <Form {...layout} name="Add Ward" form={form} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {/* <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
          <Input placeholder='Ward ID' />
        </Form.Item> */}
        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select ward category' }]}>
          <Select showSearch allowClear placeholder='Select a category'>
            { category.map(d => (
              <Option value={d.category}>{capitalize(d.category)}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ward Capacity" name="capacity" rules={[{ required: true, message: 'Please input the ward capacity'}]}>
          <Input placeholder='Capacity' onInput={numberValidation} />
        </Form.Item>
        <Form.Item label="Room Charge/day" name="roomCharge" rules={[{ required: true, message: 'Please input room charge per day'}, {pattern: "[0-9]+", message: 'input number'}]}>
          <Input placeholder='Room Charge' onInput={numberValidation} />
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
}





export default AddWard
