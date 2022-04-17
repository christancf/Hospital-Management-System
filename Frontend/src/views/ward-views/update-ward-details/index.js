import React from 'react'
import { Form, Input, Button, Checkbox, Card, Cascader} from 'antd';
import wardService from 'services/WardService';
const { Search } = Input
const UpdateDetails = () => {
	return (
		<div>
			<Demo/>
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

/*const setEventListeners = () => {
  document.getElementById("capacity").addEventListener("focusout", console.log("focus out"))
  document.getElementById("capacity").addEventListener("focus", console.log("focus"))
}*/

const Demo = () => {
  let wardDetails;

  const onFinish = values => {
    if(values.capacity === undefined) values.capacity = wardDetails.capacity
    if(values.status === undefined) values.status = wardDetails.status

    wardService.updateWardDetails(values)
      .then((result)=>{
        console.log(`Successfully Updated! ${result}`)
      }).catch((e)=>{
        console.log(`Error @ update-ward-details updateWardDetails: ${e}`)
    })
  }


  const searchById = (id) => {
    wardService.readWardDetails(id)
    .then((details) => {
      wardDetails = details[0]
      console.log(wardDetails) 
      document.getElementById("category").value = wardDetails.category[0].toUpperCase() + wardDetails.category.substring(1)
      document.getElementById("capacity").value = wardDetails.capacity
      wardDetails.status? document.getElementById("status").value = "Available" : document.getElementById("status").value = "Unavailable"         
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })    
  }  
  
  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: 'Please input ward ID!' }]}
      >
        <Search placeholder="Ward ID" id="id" onSearch={id => searchById(id)} enterButton />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        >
        <Input disabled={true} id="category" />
      </Form.Item>
      <Form.Item
        label="Ward Capacity"
        name="capacity"        
      >
        <Input placeholder='Capacity' id="capacity" onFocus={console.log("Focus")} onFocusOut={console.log("Focus out")}/>
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
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
