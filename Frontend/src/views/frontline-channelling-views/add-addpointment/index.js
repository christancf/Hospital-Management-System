import { Form, Input, InputNumber, Button } from 'antd';
import channellingService from 'services/FrontlineChannellingService';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
  number: {
    range: 'Must be between ${min} and ${max}',
  },
};

const AddAppointment = () => {
  const onFinish = values => {
    const res = channellingService.addAppointment(
		
			{
				"NIC": "200013400692",
				"name": "Susith Rupasinghhe",
				"birthday": 958222800000,
				"contact_no": "0768898679",
				"doctor_id": 25,
				"date": 1648022229,
				"queue_no": 20
			  }
		
	)
	
	console.log(res);
  };

  return (

    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
		<label>Add Apppointment</label>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAppointment;