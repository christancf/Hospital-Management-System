import React from 'react'
import { Form, Input, Button, Cascader, DatePicker } from 'antd';
import staffService from 'services/StaffService';

const { Search } = Input;
const UpdateStaffDetails = () => {
	return (
		<div>
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
  
  let staffDetails = '';

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
    staffDetails = staffService.readStaffDetails(id);
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
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input value = {staffDetails.name} />
      </Form.Item>

	  <Form.Item
        label="NIC"
        name="nic"
        rules={[{ required: true, message: 'Please input the NIC!' }]}
      >
        <Input value = {staffDetails.NIC} />
      </Form.Item>

	  <Form.Item
        label="E-mail"
        name="email"
        rules={[{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message: 'Please enter a valid email!' }]}
      >
        <Input value = {staffDetails.email} />
      </Form.Item>

	  <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: 'Please select the designation!' }]}
      >
		  <Cascader options={designation} value = {staffDetails.designation} />
      </Form.Item>

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: 'Please input the qualification!' }]}
      >
		  <Input value = {staffDetails.qualification} />
      </Form.Item>

      <Form.Item 
        label="Date Of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please input the date of birth!'}]}
      >
          <DatePicker value = {staffDetails.dateOfBirth} />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select the gender!' }]}
      >
		  <Cascader options={gender} value= {staffDetails.gender} />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input the address!' }]}
      >
		  <Input value = {staffDetails.address} />
      </Form.Item>

      <Form.Item
        label="Basic Salary"
        name="basicSalary"
        rules={[{ required: true, message: 'Please input the basic salary!' }]}
      >
		  <Input value = {staffDetails.basicSalary} />
      </Form.Item>

      <Form.Item
        label="Mobile"
        name="mobile"
        rules={[{ required: true, message: 'Please input the mobile number!' }]}
      >
		  <Input value = {staffDetails.mobile} />
      </Form.Item>

      <Form.Item
        label="Home"
        name="home"
        rules={[{ required: true, message: 'Please input the home number!' }]}
      >
		  <Input value = {staffDetails.home} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const designation = [{
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

const gender = [{
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
