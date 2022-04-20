import React from 'react'
import { Form, Input, Button, DatePicker, message, Card, Select } from 'antd';
import staffService from 'services/StaffService';

const add = 'add'
const { Option } = Select

const AddStaffMember = () => {
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
  const onFinish = values => {
    values.dateOfBirth = values.dateOfBirth['_d'].getTime()

    staffService.addStaffMember(values)
      .then(() => message.success({content: 'Successfully added new staff member', add, duration: 2}))
      .catch(() => message.error({content: 'Please try again!', add, duration: 2}))

      form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{backgroundColor: '#efefef'}}>
      <h1 className='text-left' style={{ marginLeft: 420, marginBottom: 20 }}>Add New Staff Member</h1>

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
          <Input />
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
          <Input />
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
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Base Salary"
          name="basicSalary"
          rules={[{ required: true, message: 'Please input the base salary!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: 'Please input the mobile number!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Home"
          name="home"
          rules={[{ required: true, message: 'Please input the home number!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>

          <Button htmlType="reset" style={{marginRight: 30}}>
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

export default AddStaffMember
