import React from 'react'
import { Form, Input, Button, DatePicker, Card, Select, Row, Col, Modal } from 'antd';
import moment from 'moment';
import {useLocation} from "react-router-dom";
import staffService from 'services/StaffService';
import TextArea from 'antd/lib/input/TextArea';

const { Search } = Input;
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
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 16 },
};

const Demo = () => {

  const [form] = Form.useForm();

  function ShowModel(title, delay, innercontent, isSuccess) {

		if (isSuccess) {
			const modal = Modal.success({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
				window.location.href="../staff/display-staff-details";
			}, delay * 1000);
		}

		else {
			const modal = Modal.error({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}
	}

  let staffDetails

  const onFinish = values => {
 
    values.dateOfBirth = moment(staffDetails.dateOfBirth).valueOf()
  
    staffService.updateStaffDetails(values)
    .then(() => ShowModel("Successful!", 2, "Staff Member Details updated Sucessfully", true))
    .catch((e) => ShowModel("Failed!", 2, "Failed to update Staff Member details", false))
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
    <Card>
      <h1 className='text-left' style={{ marginLeft: 460, marginBottom: 20 }}>Edit Staff Details</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Row>

          <Col span={12}>

            <Form.Item
              label="Staff ID"
              name="staffID"
              
              rules={[{ required: true, message: 'Please input the staff ID!' }, {pattern: "[0-9]+", message: 'Please input a valid staff ID'}]} 
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
              rules={[{ required: true, message: 'Please input the NIC!'}, {pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', message: 'Please input a valid NIC!' }]}
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

          </Col>

          <Col span={12}>

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
              <TextArea style={{height: 15}} />
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

          </Col>

        </Row>
       
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
