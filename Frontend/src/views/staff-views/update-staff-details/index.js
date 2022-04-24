import React from 'react'
import { Form, Input, Button, DatePicker, message, Card, Select } from 'antd';
import staffService from 'services/StaffService';

const { Search } = Input;
const update = 'update'
const { Option } = Select;

const UpdateStaffDetails = () => {
	return (
		<div>
			<Demo />
		</div>
	)
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const Demo = () => {

  const [form] = Form.useForm();
  let staffDetails

  const onFinish = values => {
    console.log(values)
    console.log(staffDetails)
    if(values.dateOfBirth === undefined) values.dateOfBirth = staffDetails.dateOfBirth
    

    console.log(values.dateOfBirth)
    staffService.updateStaffDetails(values)
    .then(() => message.success({content: 'Successfully Updated', update, duration: 2}))
    .catch((e) => message.error({content: 'Please try again!', update, duration: 2}))
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  const searchById = (id) => {

    staffService.readStaffDetails(id)
    .then((details) => {
      staffDetails = details[0]
        
      let d  = new Date(staffDetails.dateOfBirth)
      // let d = moment(staffDetails.dateOfBirth)
      // let s = d.format("YYYY-MM-DD")
      //console.log(d)
      document.getElementById('dateOfBirth').value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      form.setFieldsValue({
        staffName: staffDetails.staffName,
        NIC: staffDetails.NIC,
        email: staffDetails.email,
        designation: staffDetails.designation,
        qualification: staffDetails.qualification,
        //dateOfBirth: 
        gender: staffDetails.gender,
        address: staffDetails.address,
        basicSalary: staffDetails.basicSalary,
        mobile: staffDetails.mobile,
        home: staffDetails.home})
    })
    .catch((e) => console.log(`Error: ${ e }`))
  };

  return (
    <Card style={{backgroundColor: '#efefef'}}>
      <h1 className='text-left' style={{ marginLeft: 460, marginBottom: 20 }}>Edit Staff Details</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="Staff ID"
          name="staffID"  
          rules={[{ required: true, message: 'Please input the staff ID!' }]}      
        >
          <Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton />
        </Form.Item>

        <Form.Item
          label="Name"
          name="staffName"        
        >
          <Input id="staffName" />
        </Form.Item>

      <Form.Item
          label="NIC"
          name="NIC"        
        >
          <Input id="NIC" />
        </Form.Item>

      <Form.Item
          label="E-mail"
          name="email"
          rules={[{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message: 'Please enter a valid email!' }]}
        >
          <Input id="email" />
        </Form.Item>

        <Form.Item name="designation" label="Designation" >
          <Select allowClear>
            <Option value="doctor">Doctor</Option>
            <Option value="nurse">Nurse</Option>
            <Option value="allied health professionals">Allied Health Professionals</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Qualification"
          name="qualification"        
        >
          <Input id="qualification" />
        </Form.Item>

        <Form.Item 
          label="Date Of Birth"
          name="dateOfBirth"
        >
          <DatePicker id="dateOfBirth" format={"YYYY-MM-DD"} />
        </Form.Item>

        <Form.Item name="gender" label="Gender" >
          <Select allowClear>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input id="address" />
        </Form.Item>

        <Form.Item
          label="Basic Salary"
          name="basicSalary"
        >
          <Input id="basicSalary" />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
        >
          <Input id="mobile" />
        </Form.Item>

        <Form.Item
          label="Home"
          name="home"
        >
          <Input id="home" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="reset" style={{ marginRight: 30 }}>
            Discard
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
   
  );
};

export default UpdateStaffDetails
