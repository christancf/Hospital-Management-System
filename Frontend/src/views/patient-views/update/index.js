import { Form, Input, InputNumber, Button, Cascader, DatePicker } from 'antd';
import { values } from 'lodash';

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
		email: 'Not a valid email!',
	},
};

const options = [
	{
		label:"Male",
		value:"male"
	},
	{
		label:"Female",
		value:"Female"
	}
]
const bloodGroup =[
	{
		label:"A+",
		value:"A+"
	},
	{
		label:"A-",
		value:"A-"
	},
	{
		label:"B+",
		value:"B+",
	},
	{
		label:"B-",
		value:"B-",
	},
	{
		label:"AB+",
		value:"AB+",
	},
	{
		label:"AB-",
		value:"AB-",
	},
	{
		label:"O+",
		value:"O+",
	},
	{
		label:"O-",
		value:"O-",
	},
]



const PatientUpdate = () => {


	const onFinish = values => {

		const patient =  {
			patientId:values.id,
			fullName:values.fullName,
			nic:values.nic,
			dateOfBirth:values.dateOfBirth, 
			sex:values.sex,
			mobile:values.mobile,
			address:values.address,
			bloodGroup:values.bloodGroup,
		}
	
		console.log(patient)
		//const res = channellingService.addAppointment(payload)

		//console.log(res);
	};

	return (

		<Form {...layout} name="Update" onFinish={onFinish} validateMessages={validateMessages}>
			<label>Update Patient Details</label>
			<Form.Item name={['user', 'name']} label="Full  Name" rules={[{ required: true }]} placeholder="Full Name">
				<Input />
			</Form.Item>
			<Form.Item name={['user', 'NIC']} label=" NIC" rules={[{ required: true }]} placeholder="NIC">
				<Input />
			</Form.Item>

			<Form.Item name={['user', 'birthday']} label="Birthday" rules={[{ required: true }]} placeholder=" Birthday">
				<DatePicker />
			</Form.Item>
			<Form.Item name={['user','sex']} label="Sex" rules={[{required:true}]}>
				<Cascader options={options} placeholder="Sex"></Cascader>
			</Form.Item> 
			<Form.Item name={['user', 'contact_no']} label="Contact No" rules={[{ required: true }]} placeholder="Contact Number">
				<Input />
			</Form.Item>
			<Form.Item name={['user', 'Address']} label="Address" rules={[{ required: true }]} placeholder="Address">
				<Input />
			</Form.Item>
			<Form.Item name={['user','bloodGroup']} label="bloodGroup" rules={[{required:true}]}>
				<Cascader options={bloodGroup} placeholder="bloodGroup"></Cascader>
			</Form.Item>

			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit">
				Admit Button
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PatientUpdate;