import React, { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Card, Select, Spin, Row, Col, Modal } from 'antd';
import moment from 'moment';
import staffService from 'services/StaffService';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select

const AddStaffMember = () => {
  return (
    <div>
			<AddMember />
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

const AddMember = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()

  useEffect( () => {
    staffService.id()
    .then((res) => {
      setData(res.payload)
      setLoading(false)
    })
    .catch((e) => {
      setLoading(false)
      setError(true)
      setData()
    })
  }, [])

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
        window.location.reload(false)
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

  const [form] = Form.useForm()

  const onFinish = values => {
    values.dateOfBirth = values.dateOfBirth['_d'].getTime()
    console.log(values.staffID)
    staffService.addStaffMember(values)
      .then(() => ShowModel("Successful!", 5, "Staff Member Added Successfully", true))
      .catch(() => ShowModel("Failed!", 5, "Failed to add Staff Member", false))

      form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if (loading) {
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)
	}
	else if (error) {

		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)

	}
  else {
    return (
      <Card >
        <h1 className='text-left' style={{ marginLeft: 420, marginBottom: 20 }}>Add New Staff Member</h1>
  
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
                initialValue={data}
                style={{cursor: 'not-allowed'}}
                rules={[{ required: true, message: 'Please input the staff ID!' }]}
              >
              <Input style={{pointerEvents: 'none'}} id="staffID" />
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
                rules={[{ required: true, message: 'Please input the NIC!'}, {pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', message: 'Please input a valid NIC!' }]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Please input the email!'}, {pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message: 'Please enter a valid email!' }]}
              >
                <Input />
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
                <Input />
              </Form.Item>

            </Col>

            <Col span={12}>

              <Form.Item 
                  label="Date Of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please input the date of birth!'}]}
                >
                  <DatePicker
                    placeholder='Select Date'
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate} />
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
                label="Base Salary"
                name="basicSalary"
                rules={[{ required: true, message: 'Please input the base salary!' }, {pattern: "[0-9]+", message: 'Please input a numerical value!'}]}
              >
                <Input />
              </Form.Item>
      
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[{ required: true, message: 'Please input a mobile number!'},  {pattern:'^([0-9]{10}|)$', message: 'Please input valid mobile number!' }]}
              >
                <Input />
              </Form.Item>
      
              <Form.Item
                label="Home"
                name="home"
                rules={[{ required: true, message: 'Please input a home numer!'}, {pattern:'^([0-9]{10}|)$', message: 'Please input valid home number!' }]}
              >
                <Input />
              </Form.Item>
              
            </Col>
          </Row>

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
  }
};

export default AddStaffMember
