import { Form, Input, InputNumber, Button, Cascader, DatePicker,Select,Modal,Spin } from 'antd';
import moment from 'moment';
import patientManagementService from 'services/PatientManagement';
import { useState, useEffect } from 'react';

const { Option } = Select;

const queryParams = new URLSearchParams(window.location.search);
const patientId = queryParams.get('patientId');

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
		value:"Male"
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



const PatientAdmittance = () => {
	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	

	useEffect(() => {
		patientManagementService.patientDetails(patientId).then((resp) => {
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

		const patient =  {
			id:patientId,
			fullName:values.fullName,
			nic:values.nic,
			dateOfBirth:moment(values.dateOfBirth).format("X"), 
			sex:values.sex,
			mobile:values.mobile,
			address:values.address,
			bloodGroup:values.bloodGroup,
		}

		const payload={patient:patient}

		patientManagementService.update(payload).then((res) => {
			ShowModel("Successful!",5,"Patient details updated Sucessfully",true)
			form.resetFields();
		}).catch((error) =>{
			ShowModel("Failed!",5,"Patient details update Failed",false)
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

	else{
		console.log(data);
		return (

			

			<Form {...layout} name="Admittance" onFinish={onFinish} form={form} validateMessages={validateMessages}>
				<label>Update Patient details</label>
				<Form.Item name="id" label="Patient ID" initialValue={patientId} rules={[{ required: true }]} placeholder="Patient ID">
				<Input disabled />
			</Form.Item>
				<Form.Item name="fullName" initialValue={data.fullName} label="Full  Name" rules={[{ required: true }]} placeholder="Full Name" >
					<Input />
				</Form.Item>
				<Form.Item name="nic" initialValue={data.nic} label=" NIC" rules={[{ required: true }]} placeholder="NIC">
					<Input />
				</Form.Item>

				<Form.Item name="dateOfBirth" initialValue={moment(new Date(data.dateOfBirth*1000))} label="Birthday"  rules={[{ required: true }]} placeholder=" Birthday">
					<DatePicker  />
				</Form.Item>
				<Form.Item name="sex" initialValue={data.bloodGroup} label="Sex" rules={[{required:true}]}>
				<Select
					
					placeholder="Select Sex"
					filterOption={false}
					showSearch={{ filter }}
					style={{ width: '100%' }}
					defaultValue={data.sex}					
				>
					
					{options.map(d => (
						<Option  value={d.value}>{d.label}</Option>
					))}
					
				</Select>
				
					
				</Form.Item> 
				<Form.Item name="mobile" initialValue={data.mobile} label="Contact No" rules={[{ required: true }]} placeholder="Contact Number">
					<Input />
				</Form.Item>
				<Form.Item name="address" initialValue={data.address} label="Address" rules={[{ required: true }]} placeholder="Address">
					<Input />
				</Form.Item>
				<Form.Item name="bloodGroup" initialValue={data.bloodGroup} label="bloodGroup" rules={[{required:true}]}>
				<Select
					
					placeholder="Select Blood Group"
					filterOption={false}
					showSearch={{ filter }}
					style={{ width: '100%' }}
					defaultValue={data.bloodGroup}
				>
					{bloodGroup.map(d => (
						<Option key={d.value}>{d.label}</Option>
					))}
				</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button type="primary" htmlType="submit">
					Admit Button
					</Button>
				</Form.Item>
			</Form>
		);
					}
};

export default PatientAdmittance;