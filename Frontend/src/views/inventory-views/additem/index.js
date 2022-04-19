import React from 'react';
import inventoryService from '../../../services/inventoryService'
import { Form, Input, Button, Select,DatePicker , Modal} from 'antd';
import { TRUE } from 'node-sass';


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ShowModel extends React.Component {
  
}

class additem extends React.Component {
  formRef = React.createRef();
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  ShowModel = params => {

    if (params.SUCCESS == true){
      return(
        <>
        <Modal
            title="Information"
            visible={this.state.visible}
            onOk={this.handleOk}
          >
            <p>Insertion successful</p>
          </Modal>
        </>
      )
    }
    else{
      return(
        <>
        <Modal
            title="Information"
            visible={this.state.visible}
            onOk={this.handleOk}
          >
            <p>Insertion Unsuccessful</p>
          </Modal>
        </>
      )
    }

  }
  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    //const id= values.id;
    const item_name = values.item_name;
    const description = values.description;
    const manufacturer = values.manufacturer;
    const category = values.category;
    const unit_price = values.unit_price;
    const total_quantity = values.total_quantity;

    const results = inventoryService.additem(
      {
        id:3, 
        item_name:item_name,
        description:description,
        manufacturer:manufacturer,
        category:category,
        unit_price:unit_price,
        total_quantity:total_quantity
      }).then().catch();
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
        <Form.Item name="item_name" label="item_name" >
          <Input />
        </Form.Item>
        <Form.Item label="description" name="description" rules={[{ required: true, message: 'Please input Description' }]}>
        <Input />
        </Form.Item>
        <Form.Item label="manufacturer " name="manufacturer" rules={[{ required: true, message: 'Please input manufacturer' }]}>
        <Input />
        </Form.Item>
        <Form.Item name="category" label="category" rules={[{ required: true }]}>
          <Select
            placeholder="Select the category"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Select.Option value="medicines">Medicine</Select.Option>
            <Select.Option value="surgicalitems">surgical items</Select.Option>
            <Select.Option value="tools">Tools</Select.Option>
            
          </Select>
        </Form.Item>
        <Form.Item label="Unit price" name="unit_price">
        <Input />
        </Form.Item>
        <Form.Item label="Total Quantity" name="total_quantity">
        <Input />
        </Form.Item>

        <this.ShowModel SUCCESS={true}></this.ShowModel>
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

 export default additem;

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