import React from 'react'
import { Form, Input, Button, Cascader, DatePicker, Typography } from 'antd';
import staffService from 'services/StaffService';

const { Title } = Typography
const { Search } = Input;

const UpdateStaffDetails = () => {
	return (
		<div>
      <Title>Edit Staff Details</Title>
			<Demo />
		</div>
	)
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const Demo = () => {
  let staffDetails

  const onFinish = values => {
    if(values.staffName === undefined) values.staffName = staffDetails.staffName
    if(values.NIC === undefined) values.NIC = staffDetails.NIC
    if(values.email === undefined) values.email = staffDetails.email
    if(values.designation === undefined) values.designation = staffDetails.designation
    if(values.qualification === undefined) values.qualification = staffDetails.qualification
    if(values.dateOfBirth === undefined) values.dateOfBirth = staffDetails.dateOfBirth
    else values.dateOfBirth = values.dateOfBirth['_d'].getTime()
    if(values.gender === undefined) values.gender = staffDetails.gender
    if(values.address === undefined) values.address = staffDetails.address
    if(values.basicSalary === undefined) values.basicSalary = staffDetails.basicSalary
    if(values.mobile === undefined) values.mobile = staffDetails.mobile
    if(values.home === undefined) values.home = staffDetails.home

    staffService.updateStaffDetails(values)
    .then(() => console.log("Successfully Updated!"))
    .catch((e) => console.log(`Error: ${ e }`))
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  const searchById = (id) => {

    staffService.readStaffDetails(id)
    .then((details) => {
      staffDetails = details[0]
      document.getElementById('staffName').value = staffDetails.staffName
      document.getElementById('NIC').value = staffDetails.NIC
      document.getElementById('email').value = staffDetails.email
      document.getElementById('designation').value = staffDetails.designation[0].toUpperCase() + staffDetails.designation.substring(1)
      document.getElementById('qualification').value = staffDetails.qualification
      
      let d  = new Date(staffDetails.dateOfBirth)
      
      document.getElementById('dateOfBirth').value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()

      document.getElementById('gender').value = staffDetails.gender[0].toUpperCase() + staffDetails.gender.substring(1)
      document.getElementById('address').value = staffDetails.address
      document.getElementById('basicSalary').value = staffDetails.basicSalary
      document.getElementById('mobile').value = staffDetails.mobile
      document.getElementById('home').value = staffDetails.home
    })
    .catch((e) => console.log(`Error: ${ e }`))
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

	  <Form.Item
        label="Designation"
        name="designation"        
      >
		  <Cascader options={designationOptions} id="designation" />
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
          <DatePicker id="dateOfBirth" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
      >
		  <Cascader options={genderOptions} id="gender" />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const designationOptions = [{
	value: 'doctor',
	label: 'Doctor'
},
{
	value: 'nurse',
	label: 'Nurse'
},
{
	value: 'allied health professionals',
	label: 'Allied Health Professionals'
}]

const genderOptions = [{
	value: 'male',
	label: 'Male'
},
{
	value: 'female',
	label: 'Female'
},
{
	value: 'other',
	label: 'Other'
}]

export default UpdateStaffDetails
