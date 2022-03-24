import { Form, Input, InputNumber, Button, Cascader, DatePicker } from 'antd';
import channellingService from 'services/FrontlineChannellingService';

function toTimestamp(strDate){
	var datum = Date.parse(strDate);
	return datum/1000;
 }

const layout = {
	labelCol: { span: 5 },
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

const options = [
	{
	  value: 100,
	  label: 'Dr. Wijitha Dahanayake'
	},
	{
	  value: 150,
	  label: 'Dr. Chirstoper Perera'
	},
  ];

const AddAppointment = () => {


	const onFinish = values => {

		const payload =  {
			NIC: values.NIC,
			name:values.name,
			birthday: toTimestamp(values.birthday),
			contact_no: values.contact_no,
			doctor_id: values.doctor,
			date: toTimestamp(values.date),
			queue_no: 20
		}
	
		console.log(payload)
		const res = channellingService.addAppointment(payload)

		console.log(res);
	};

	return (

		<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
			<label>Add Apppointment</label>
			<Form.Item name={['user', 'NIC']} label="Patient NIC" rules={[{ required: true }]} placeholder="Patient NIC">
				<Input />
			</Form.Item>
			<Form.Item name={['user', 'name']} label="Patient Name" rules={[{ required: true }]} placeholder="Patient Name">
				<Input />
			</Form.Item>
			<Form.Item name={['user', 'birthday']} label="Birthday" rules={[{ required: true }]} placeholder="Patient Birthday">
				<DatePicker />
			</Form.Item>
			<Form.Item name={['user', 'contact_no']} label="Contact No" rules={[{ required: true }]} placeholder="Contact Number">
				<Input />
			</Form.Item>
			<Form.Item name={['user', 'doctor']} label="Doctor"  >
			<Cascader options={options}  placeholder="Please select Doctor" />,
			</Form.Item>
			<Form.Item name={['user', 'date']} label="Appointment Date" rules={[{ required: true }]}>
			<DatePicker />
			</Form.Item>
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit">
				Add Appointment
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddAppointment;