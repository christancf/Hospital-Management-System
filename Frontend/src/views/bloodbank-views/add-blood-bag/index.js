import React from 'react';
import bloodBankService from '../../../services/BloodBankService'
import { Form, Input, Button, Select,DatePicker } from 'antd';


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class AddBloodBag extends React.Component {
  formRef = React.createRef();

  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    const donorName = values.donorsName;
    const donorNIC = values.donor;
    const donationNum = values.donationNum;
    const donateDate = values.donateDate;
    const place = values.place;
    const bloodGroup = values.bloodGroup;

    const results = bloodBankService.addBloodBag({donorName:donorName, donorNIC:donorNIC,donationNum:donationNum,donateDate:donateDate,place:place,bloodGroup:bloodGroup});
    console.log(results.succussfull);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  // onFill = () => {
  //   this.formRef.current.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };

  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item name="donorsName" label="donor's Name" >
          <Input />
        </Form.Item>
        <Form.Item label="Donor's NIC" name="donorNIC" rules={[{ required: true, message: 'Please input Donor\'s NIC!' }]}>
        <Input />
        </Form.Item>
        <Form.Item label="Donation Number " name="donationNum" rules={[{ required: true, message: 'Please input Donation Number!' }]}>
        <Input />
        </Form.Item>
        <Form.Item label="Donated Date & Time" name="dateTime">
        <DatePicker />
        </Form.Item>
        <Form.Item label="Place" name="Place">
        <Input />
        </Form.Item>

        <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
          <Select
            placeholder="Select the blood group"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Select.Option value="A+">A positive(A+)</Select.Option>
            <Select.Option value="A-">A negative(A-)</Select.Option>
            <Select.Option value="B+">B positive(B+)</Select.Option>
            <Select.Option value="B-">B negative(B-)</Select.Option>
            <Select.Option value="O+">O positive(O+)</Select.Option>
            <Select.Option value="O+">O negative(O-)</Select.Option>
            <Select.Option value="AB+">AB positive(AB+)</Select.Option>
            <Select.Option value="AB-">AB negative(AB-)</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) => {
            return getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item> */}
        <Form.Item {...tailLayout}>
          <Button className="mr-2" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="mr-2" htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

 export default AddBloodBag;

// import React, { useState } from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   DatePicker, 
// } from 'antd';

// const { Option } = Select;

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// onFinish = values => {
//   console.log(values);
// };

// onReset = () => {
//   this.formRef.current.resetFields();
// };

// onFill = () => {
//   this.formRef.current.setFieldsValue({
//     note: 'Hello world!',
//     gender: 'male',
//   });
// };

// const AddBloodBag = () => {

//   return (
//     <div>
//         <Form.Item label="Donor's Name" >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donor's NIC" name="DonorNIC" rules={[{ required: true, message: 'Please input Donor\'s NIC!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donation Number " name="DonationNum" rules={[{ required: true, message: 'Please input Donation Number!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donated Date & Time">
//           <DatePicker />
//         </Form.Item>
//         <Form.Item label="Place" >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Blood Group">
//           <Select>
//             <Select.Option value="A+">A positive(A+)</Select.Option>
//             <Select.Option value="A-">A negative(A-)</Select.Option>
//             <Select.Option value="B+">B positive(B+)</Select.Option>
//             <Select.Option value="B-">B negative(B-)</Select.Option>
//             <Select.Option value="O+">O positive(O+)</Select.Option>
//             <Select.Option value="O-">O negative(O-)</Select.Option>
//             <Select.Option value="AB+">AB positive(AB+)</Select.Option>
//             <Select.Option value="AB-">AB negative(AB-)</Select.Option>
//          </Select>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Button className="mr-2" type="primary" htmlType="submit">
//             Submit
//           </Button>
//           <Button className="mr-2" htmlType="button" onClick={this.onReset}>
//             Reset
//           </Button>
//         </Form.Item>
//     </div>
//   );
// };

// export default AddBloodBag