import { Form, Input, InputNumber, Button, Select, DatePicker, Card, Spin, Modal } from 'antd';
import { useState, useEffect } from 'react';
import channellingService from 'services/FrontlineChannellingService';
import moment from 'moment';
import { FRONTLINE_CHANNELLING_ROLE , ValidateUser} from 'configs/AppConfig';
const { Option } = Select;

ValidateUser(FRONTLINE_CHANNELLING_ROLE);

function toTimestamp(strDate) {
	var datum = Date.parse(strDate);
	return datum / 1000;
}

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 15 },
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

	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		channellingService.getAllDoctors().then((resp) => {
			setData(resp.payload);
			setLoading(false);

		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

	function filter(inputValue, path) {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

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
				window.location = '../frontchannelling/list';
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





	const onFinish = values => {


		const payload = {
			NIC: values.NIC,
			name: values.name,
			birthday: toTimestamp(values.birthday),
			contact_no: values.contact_no,
			doctor_id: values.doctor_id.value,
			date: toTimestamp(values.date)
		}

		channellingService.addAppointment(payload).then((res) => {

			ShowModel(
				"Successfull !",
				4,
				"Your appointment successfully added",
				true
			);
			form.resetFields();
			

		}).catch((error)=> {

			ShowModel(
				"Unsccessfull !",
				4,
				"Your appointment placement faild",
				false
			);

		})


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

		const res_data = data;
		const options = res_data.map((item) => {

			return {
				text: item.staffName,
				value: item.staffID
			}
		});
		function disabledDate(current) {
			// Can not select days before today and today
			return current && current < moment().endOf('day');
		  }
		  function disabledDate2(current) {
			// Can not select days before today and today
			return current && current > moment().endOf('day');
		  }
		console.log(options)
		return (
			<>
				<Card style={{ width: 800 }}>
					<h1 className='text-left' style={{ marginLeft: 230 }}>Add Appointment</h1>


					<Form {...layout} name="Add Appointment" form={form} onFinish={onFinish} validateMessages={validateMessages}>

						<Form.Item name="NIC" label="Patient NIC" rules={[{ required: true, pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' , message: 'Enter valid NIC'}]} placeholder="Patient NIC">
							<Input />
						</Form.Item>
						<Form.Item name="name" label="Patient Name" rules={[{ required: true }]} placeholder="Patient Name">
							<Input />
						</Form.Item>
						<Form.Item name="birthday" label="Birthday" rules={[{ required: true }]} placeholder="Patient Birthday">
							<DatePicker  disabledDate={disabledDate2}/>
						</Form.Item>
						<Form.Item name="contact_no" label="Contact No" rules={[{ required: true }]} placeholder="Contact Number">
							<Input />
						</Form.Item>
						<Form.Item name="doctor_id" label="Doctor"  rules={[{ required: true }]} >
							{/* <Cascader options={options} placeholder="Please select Doctor" showSearch={{ filter }} />, */}

							<Select

								labelInValue
								placeholder="Select users"
								filterOption={false}
								showSearch={{ filter }}
								style={{ width: '100%' }}
							>
								{options.map(d => (
									<Option key={d.value}>{d.text}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="date" label="Appointment Date" rules={[{ required: true }]}>
							<DatePicker  disabledDate={disabledDate}  />
						</Form.Item>
						<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
							<Button type="primary" htmlType="submit">
								Add Appointment
							</Button>
						</Form.Item>
					</Form>
				</Card>

			</>


		);
	}

};

export default AddAppointment;