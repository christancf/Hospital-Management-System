import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker, 
} from 'antd';

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddBloodBag = () => {

  return (
    <div>
        <Form.Item label="Donor's Name" >
          <Input />
        </Form.Item>
        <Form.Item label="Donor's NIC" name="DonorNIC" rules={[{ required: true, message: 'Please input Donor\'s NIC!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Donation Number " name="DonationNum" rules={[{ required: true, message: 'Please input Donation Number!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Donated Date & Time">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Place" >
          <Input />
        </Form.Item>
        <Form.Item label="Blood Group">
          <Select>
            <Select.Option value="A+">A positive(A+)</Select.Option>
            <Select.Option value="A-">A negative(A-)</Select.Option>
            <Select.Option value="B+">B positive(B+)</Select.Option>
            <Select.Option value="B-">B negative(B-)</Select.Option>
            <Select.Option value="O+">O positive(O+)</Select.Option>
            <Select.Option value="O-">O negative(O-)</Select.Option>
            <Select.Option value="AB+">AB positive(AB+)</Select.Option>
            <Select.Option value="AB-">AB negative(AB-)</Select.Option>
         </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button className="mr-2" htmlType="button" >
            Reset
          </Button>
          <Button className="mr-2" type="primary" htmlType="submit">
            Submit
          </Button>
      </Form.Item>
    </div>
  );
};

export default AddBloodBag
