import { Form, Input, InputNumber, Button, Cascader, DatePicker, Select, Modal, Spin, Typography } from 'antd';
import { json } from 'd3-fetch';
import moment from 'moment';
import bloodBankService from 'services/BloodBankService';
import { useState, useEffect } from 'react';
const { Title } = Typography
const { Option } = Select;



function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a valid email!',
  },
};

const bloodGroup = [
  {
    label: "A positive(A+)",
    value: "A+"
  },
  {
    label: "A negative(A-)",
    value: "A-"
  },
  {
    label: "B positive(B+)",
    value: "B+",
  },
  {
    label: "B negative(B-)",
    value: "B-",
  },
  {
    label: "AB positive(AB+)",
    value: "AB+",
  },
  {
    label: "AB negative(AB-)",
    value: "AB-",
  },
  {
    label: "O positive(O+)",
    value: "O+",
  },
  {
    label: "O negative(O-)",
    value: "O-",
  },
]

const AddBloodBag = () => {
  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    bloodBankService.bagId().then((resp) => {
      setData(resp.payload);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(true);
      setData();
    });
  }, []);

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

  function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }



  const onFinish = values => {

    const payload = {
      bagId: values.bagId,
      donorName: values.donorName,
      donorNIC: values.donorNIC,
      donationNumber: values.donationNumber,
      donateDate: moment(values.donateDate).format("X"),
      place: values.place,
      bloodGroup: values.bloodGroup,
    }
    console.log(payload)

    bloodBankService.addBloodBag(payload).then((res) => {
      ShowModel("Successful!", 5, "Blood Bag Added Sucessfully", true)
      form.resetFields();
    }).catch((error) => {
      ShowModel("Failed!", 5, "Blood Bag Added Failed", false)
    })

    console.log(payload)


    //console.log(res);
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

      <Form {...layout} name="addBloodBag" onFinish={onFinish} form={form} validateMessages={validateMessages}>
        <Title>Add Blood Bag</Title><br></br>
        <Form.Item name="bagId" label="Bag Id" initialValue={data} placeholder="Bag Id" >
          <Input disabled />
        </Form.Item>
        <Form.Item name="donorName" label="Donor's Name" placeholder="Donor's Name" >
          <Input />
        </Form.Item>
        <Form.Item name="donorNIC" label=" Donor's NIC" rules={[{ required: true }]} placeholder="Donor's NIC">
          <Input />
        </Form.Item>
        <Form.Item label="Donation Number " name="donationNumber" rules={[{ required: true }]} placeholder="Please input Donation Number!">
          <Input />
        </Form.Item>
        <Form.Item label="Donated Date & Time" name="donateDate">
          <DatePicker />
        </Form.Item>
        <Form.Item name="place" label="Place" placeholder="Place" >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Place" name="place" initialValue={json.place}>
        <Input />
      </Form.Item> */}
        <Form.Item name="bloodGroup" label="bloodGroup" rules={[{ required: true }]}>
          <Select
            labelInValue
            placeholder="Select Blood Group"
            filterOption={false}
            showSearch={{ filter }}
            style={{ width: '100%' }}
          >
            {bloodGroup.map(d => (
              <Option key={d.value}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button className="mr-2" htmlType="button" onClick={onReset}>
            Reset
          </Button>

          <Button type="primary" htmlType="submit">
            Add Blood Bag
          </Button>


        </Form.Item>
      </Form>
    );
  }
};

export default AddBloodBag;
















// import React from 'react';
// import bloodBankService from '../../../services/BloodBankService'
// import { Form, Input, Button, Select,DatePicker,Typography } from 'antd';

// const { Title } = Typography

// function toTimestamp(strDate){
// 	var datum = Date.parse(strDate);
// 	return datum/1000;
//  }

// const { Option } = Select;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// class AddBloodBag extends React.Component {
//   formRef = React.createRef();

//   onGenderChange = value => {
//     this.formRef.current.setFieldsValue({
//       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
//     });
//   };

//   onFinish = values => {
//     const bagId = values.bagIdp;
//     const donorName = values.donorsName;
//     const donorNIC = values.donorNIC;
//     const donationNum = values.donationNum;
//     const donateDate = toTimestamp(values.donateDate);
//     const place = values.place;
//     const bloodGroup = values.bloodGroup;

//     const results = bloodBankService.addBloodBag({donorName:donorName, donorNIC:donorNIC,donationNumber:donationNum,donateDate:donateDate,place:place,bloodGroup:bloodGroup});
//     console.log(results.succussfull);
//   };

//   onReset = () => {
//     this.formRef.current.resetFields();
//   };

//   // onFill = () => {
//   //   this.formRef.current.setFieldsValue({
//   //     note: 'Hello world!',
//   //     gender: 'male',
//   //   });
//   // };

//   render() {
//     return (
//       <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
//         <Title>Add Blood Bag</Title>
//         <Form.Item name="donorsName" label="Donor's Name" >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donor's NIC" name="donorNIC" rules={[{ required: true, message: 'Please input Donor\'s NIC!' }]}>
//         <Input />
//         </Form.Item>
//         <Form.Item label="Donation Number " name="donationNum" rules={[{ required: true, message: 'Please input Donation Number!' }]}>
//         <Input />
//         </Form.Item>
//         <Form.Item label="Donated Date & Time" name="donateDate">
//         <DatePicker />
//         </Form.Item>
//         <Form.Item label="Place" name="place">
//         <Input />
//         </Form.Item>

//         <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
//           <Select
//             placeholder="Select the blood group"
//             // onChange={this.onGenderChange}
//             allowClear
//           >
//             <Select.Option value="A+">A positive(A+)</Select.Option>
//             <Select.Option value="A-">A negative(A-)</Select.Option>
//             <Select.Option value="B+">B positive(B+)</Select.Option>
//             <Select.Option value="B-">B negative(B-)</Select.Option>
//             <Select.Option value="O+">O positive(O+)</Select.Option>
//             <Select.Option value="O-">O negative(O-)</Select.Option>
//             <Select.Option value="AB+">AB positive(AB+)</Select.Option>
//             <Select.Option value="AB-">AB negative(AB-)</Select.Option>
//           </Select>
//         </Form.Item>
//         {/* <Form.Item
//           noStyle
//           shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
//         >
//           {({ getFieldValue }) => {
//             return getFieldValue('gender') === 'other' ? (
//               <Form.Item
//                 name="customizeGender"
//                 label="Customize Gender"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//             ) : null;
//           }}
//         </Form.Item> */}
//         <Form.Item {...tailLayout}>
//           <Button className="mr-2" type="primary" htmlType="submit" >
//             Submit
//           </Button>
//           <Button className="mr-2" htmlType="button" onClick={this.onReset}>
//             Reset
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

//  export default AddBloodBag;
