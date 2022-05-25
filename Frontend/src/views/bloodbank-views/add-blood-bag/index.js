import { Form, Input, Card, Button, Cascader, DatePicker, Select, Modal, Spin, Typography } from 'antd';
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

  function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }



  const onFinish = values => {

    const payload = {
      bagId: values.bagId,
      donorName: values.donorName,
      donorNIC: values.donorNIC,
      donationNumber: values.donationNumber,
      donateDate: moment(values.donateDate).valueOf(),
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

    function disabledDate2(current) {
			// Can not select days before today and today
			return current && current > moment().endOf('day');
		  }
    return (
<Card style={{backgroundColor: '#efefef'}}>
      <Form {...layout} name="addBloodBag" onFinish={onFinish} form={form} style={{ marginLeft: 200, marginBottom: 20 }}>
        <Title style={{ marginLeft: 270, marginBottom: 20 }}>Add Blood Bag</Title><br></br>
        <Form.Item name="bagId" label="Bag Id" initialValue={data} placeholder="Bag Id" >
          <Input disabled />
        </Form.Item>
        <Form.Item name="donorName" label="Donor's Name" placeholder="Donor's Name" >
          <Input />
        </Form.Item>
        <Form.Item name="donorNIC" label=" Donor's NIC" rules={[{ required: true,pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' , message: 'Enter valid NIC' }]} placeholder="Donor's NIC">
          <Input />
        </Form.Item>
        <Form.Item label="Donation Number " name="donationNumber" rules={[{ required: true,pattern:'^[A-Z]{2}-[0-9]{4}$',message:'Enter the valid donation number' }]} placeholder="Please input Donation Number!">
          <Input />
        </Form.Item>
        <Form.Item label="Donated Date & Time" name="donateDate">
          <DatePicker disabledDate={disabledDate2}/>
        </Form.Item>
        <Form.Item name="place" label="Place" placeholder="Place" >
          <Input />
        </Form.Item>

        <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
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

        <Form.Item label="Volume" name="volume" >
					<Input disabled={true} id="Volume" placeholder='1 pint(450ml)'/>
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
      </Card>
    );
  }
};

export default AddBloodBag;
