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
  

  const onFinish = values => {
    let staffID = values.staffID
    let name = values.name
    let nic = values.nic
    let email = values.email
    let designation = values.designation
    let qualification = values.qualification
    let dateOfBirth = values.dateOfBirth
    let gender = values.gender
    let address = values.address
    let basicSalary = values.basicSalary
    let mobile = values.mobile 
    let home = values.home

    staffService.addStaffMember(staffID, name, nic, email, designation, qualification, dateOfBirth, gender, address, basicSalary, mobile, home);
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  const searchById = (id) => {
    staffService.readStaffDetails(id)
    .then((details) => {
      document.getElementById('designation').value = details[0].designation
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
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>

	  <Form.Item
        label="NIC"
        name="NIC"
        rules={[{ required: true, message: 'Please input the NIC!' }]}
      >
        <Input />
      </Form.Item>

	  <Form.Item
        label="E-mail"
        name="email"
        rules={[{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message: 'Please enter a valid email!' }]}
      >
        <Input/>
      </Form.Item>

	  <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: 'Please select the designation!' }]}
      >
		  <Cascader options={designationOptions} />
      </Form.Item>

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: 'Please input the qualification!' }]}
      >
		  <Input />
      </Form.Item>

      <Form.Item 
        label="Date Of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please input the date of birth!'}]}
      >
          <DatePicker />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select the gender!' }]}
      >
		  <Cascader options={genderOptions}/>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input the address!' }]}
      >
		  <Input/>
      </Form.Item>

      <Form.Item
        label="Basic Salary"
        name="basicSalary"
        rules={[{ required: true, message: 'Please input the basic salary!' }]}
      >
		  <Input  />
      </Form.Item>

      <Form.Item
        label="Mobile"
        name="mobile"
        rules={[{ required: true, message: 'Please input the mobile number!' }]}
      >
		  <Input  />
      </Form.Item>

      <Form.Item
        label="Home"
        name="home"
        rules={[{ required: true, message: 'Please input the home number!' }]}
      >
		  <Input />
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
