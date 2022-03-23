import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from 'antd';
const { Option } = Select;


  
const AdmittanceForm = () => {
	const onFinish = values => {
		console.log('Success:', values);
	  };
	  const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	  };
  
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >

        <Form.Item label="Full Name"
		rules={[{ required: true, message: 'Name is required' }]}
		>
          <Input />
        </Form.Item>
		<Form.Item label="NIC"
		rules={[{ required: true, message: 'NIC is required' }]}
		>
          <Input />
        </Form.Item>
		<Form.Item label="Date Of Birth"
		rules={[{ required: true, message: 'Date Of Birth is required' }]}
		>
          <DatePicker />
        </Form.Item>
		<Form.Item label="Sex"
		rules={[{ required: true, message: 'SEX is required' }]}
		>
          <Select>
            <Select.Option value="male">Male</Select.Option>
			<Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
		<Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <Select placeholder="Select province">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder="Input street" />
          </Form.Item>
        </Input.Group>
      	</Form.Item>
		<Form.Item label="Mobile Number"
		rules={[{ required: true, message: 'Mobile Number is required' }]}>
          <Input />
        </Form.Item>
		<Form.Item label="Blood Group">
          <Select>
            <Select.Option value="">A+</Select.Option>
			<Select.Option value="">A-</Select.Option>
			<Select.Option value="">B+</Select.Option>
			<Select.Option value="">B-</Select.Option>
			<Select.Option value="">O+</Select.Option>
			<Select.Option value="">O-</Select.Option>
			<Select.Option value="">AB+</Select.Option>
			<Select.Option value="">AB_</Select.Option>
          </Select>
        </Form.Item>
		<Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
	  





      </Form>
    </div>
  );
};
export default AdmittanceForm
