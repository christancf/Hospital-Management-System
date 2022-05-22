import React from 'react'
import { Form, Input, Button, DatePicker, message, Card, Select } from 'antd';
import moment from 'moment';
import {useLocation} from "react-router-dom";
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

//disable current date and dates before current date
function disabledDate(current) {
	return current && current > moment().endOf('day');
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
 
    values.dateOfBirth = moment(staffDetails.dateOfBirth).valueOf()
  
    staffService.updateStaffDetails(values)
    .then(() => message.success({content: 'Successfully Updated', update, duration: 2}))
    .catch((e) => message.error({content: 'Please try again!', update, duration: 2}))
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  if (id != null) {
  
    staffService.readStaffDetails(id)
    .then((details) => {
      staffDetails = details[0]
        
      form.setFieldsValue({ 
        staffID: id,
        staffName: staffDetails.staffName,
        NIC: staffDetails.NIC,
        email: staffDetails.email,
        designation: staffDetails.designation,
        qualification: staffDetails.qualification,
        dateOfBirth: moment(staffDetails.dateOfBirth),
        gender: staffDetails.gender,
        address: staffDetails.address,
        basicSalary: staffDetails.basicSalary,
        mobile: staffDetails.mobile,
        home: staffDetails.home})

      document.getElementById('staffID').setAttribute('disabled', 'true')
    })
    .catch((e) => console.log(`Error: ${ e }`))
  }

  const searchById = (id) => {

    staffService.readStaffDetails(id)
    .then((details) => {
      staffDetails = details[0]
        
      form.setFieldsValue({ 
        staffName: staffDetails.staffName,
        NIC: staffDetails.NIC,
        email: staffDetails.email,
        designation: staffDetails.designation,
        qualification: staffDetails.qualification,
        dateOfBirth: moment(staffDetails.dateOfBirth),
        gender: staffDetails.gender,
        address: staffDetails.address,
        basicSalary: staffDetails.basicSalary,
        mobile: staffDetails.mobile,
        home: staffDetails.home})

      document.getElementById('staffID').setAttribute('disabled', 'true')
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
          <Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton  id='staffID' />
        </Form.Item>

        <Form.Item
          label="Name"
          name="staffName" 
          rules={[{ required: true, message: 'Please input the name!' }]}       
        >
          <Input id="staffName" />
        </Form.Item>

      <Form.Item
          label="NIC"
          name="NIC" 
          rules={[{ required: true, pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', message: 'Please input a valid NIC!' }]}
        >
          <Input id="NIC" />
        </Form.Item>

      <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message: 'Please enter a valid email!' }]}
        >
          <Input id="email" />
        </Form.Item>

        <Form.Item name="designation" label="Designation" rules={[{ required: true, message: 'Please select the designation!'}]}>
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
          <Input id="qualification" />
        </Form.Item>

        <Form.Item 
          label="Date Of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please input the date of birth!'}]}
        >
          <DatePicker 
            id="dateOfBirth"  
            placeholder='Select Date'
            format="YYYY-MM-DD"
            disabledDate={disabledDate}/>
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select the gender' }]}>
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
          <Input id="address" />
        </Form.Item>

        <Form.Item
          label="Basic Salary"
          name="basicSalary"
          rules={[{ required: true, message: 'Please input the base salary!' }]}
        >
          <Input id="basicSalary" />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, pattern:'^([0-9]{10}|)$', message: 'Please input valid mobile number!' }]}
        >
          <Input id="mobile" />
        </Form.Item>

        <Form.Item
          label="Home"
          name="home"
          rules={[{ required: true, pattern:'^([0-9]{10}|)$', message: 'Please input valid home number!' }]}
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
