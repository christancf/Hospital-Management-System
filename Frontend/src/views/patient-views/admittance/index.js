import { Form, Input, InputNumber, Button, Cascader, DatePicker,Select,Modal,Spin } from 'antd';
import moment from 'moment';
import patientManagementService from 'services/PatientManagement';
import { useState, useEffect } from 'react';

const { Option } = Select;

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
		number: 'This field can only have numbers',
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

const category =[
	{
		label:"General",
		value:"General"
	},
	{
		label:"Accident",
		value:"Accident"
	},
	{
		label:"ICU",
		value:"ICU"
	},
]




const PatientAdmittance = () => {
	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		patientManagementService.id().then((resp) => {
			setData(resp.payload);
			setLoading(false);
		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

	function handleModalOK(){
		window.location.reload(false);
	}
	function ShowModel(title, delay, innercontent, isSuccess) {

		if (isSuccess) {
			const modal = Modal.success({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				onOk:() =>{window.location.reload(false)}
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
				window.location.reload(false);
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

	const demo = () =>{
		form.setFieldsValue({
			fullName:"saman Perera",
			nic:"992281558V",
			dateOfBirth:moment("1981-05-29"), 
			sex:"Male",
			mobile:"0716688822",
			address:"12/42E,3rd Street,Nugegoda",
			bloodGroup:"A+",
			category:"General"
		})
	};
	const onFinish = (values) => {

		const patient =  {
			id:values.id,
			fullName:values.fullName,
			nic:values.nic,
			dateOfBirth:moment(values.dateOfBirth).format("X"), 
			sex:values.sex,
			mobile:values.mobile,
			address:values.address,
			bloodGroup:values.bloodGroup,
			category:values.category
		}

		const payload={patient:patient}

		patientManagementService.admittance(payload).then((res) => {
			ShowModel("Successful!",5,"Patient admiited Sucessfully",true);
			
		}).catch((error) =>{
			ShowModel("Failed!",5,"Patient Admiitance Failed",false)
		})
	
		console.log(payload)
		

		//console.log(res);
	};

	function disabledDate2(current) {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	  }

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
	return (

		<Form {...layout} name="Admittance" form={form} onFinish={onFinish} >
			<label>Admit New Patient</label>
			<Form.Item name="id" label="Patient ID" initialValue={data} rules={[{ required: true }]} placeholder="Patient ID">
				<Input disabled />
			</Form.Item>
			<Form.Item name="fullName" label="Full  Name" rules={[{ required: true }]} placeholder="Full Name">
				<Input />
			</Form.Item>
			<Form.Item name="nic" label=" NIC" rules={[{ required: true, pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' , message: 'Enter valid NIC' }]} placeholder="NIC">
				<Input />
			</Form.Item>

			<Form.Item name="dateOfBirth" label="Birthday" rules={[{ required: true }]} placeholder=" Birthday">
				<DatePicker disabledDate={disabledDate2} />
			</Form.Item>
			<Form.Item name="sex" label="Sex" rules={[{required:true}]}>
			<Select
				placeholder="Select users"
				filterOption={true}
				showSearch={{ filter }}
				style={{ width: '100%' }}
			>
				{options.map(d => (
					<Option key={d.value}>{d.label}</Option>
				))}
			</Select>
				   
			</Form.Item> 
			<Form.Item name="mobile" label="Contact No" rules={[{ required: true, pattern:'^([0-9]{10}|)$',message: 'Enter valid Number' }]} placeholder="Contact Number">
				<Input />
			</Form.Item>
			<Form.Item name="address" label="Address" rules={[{ required: true }]} placeholder="Address">
				<Input />
			</Form.Item>
			<Form.Item name="bloodGroup" label="bloodGroup" rules={[{required:true}]}>
			<Select
				placeholder="Select Blood Group"
				filterOption={true}
				showSearch={{ filter }}
				style={{ width: '100%' }}
			>
				{bloodGroup.map(d => (
					<Option key={d.value}>{d.label}</Option>
				))}
			</Select>
			</Form.Item>
			<Form.Item name="category" label="category" rules={[{required:true}]}>
			<Select
				placeholder="Select Category"
				filterOption={true}
				style={{ width: '100%' }}
			>
				{category.map(d => (
					<Option key={d.value}>{d.label}</Option>
				))}
			</Select>
			</Form.Item>

			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit">
				Admit 
				</Button>
				<Button type="primary" onClick={demo} style={{marginLeft:30}}>
					Demo
				</Button>
			</Form.Item>
		</Form>
	);
		}
};

export default PatientAdmittance;