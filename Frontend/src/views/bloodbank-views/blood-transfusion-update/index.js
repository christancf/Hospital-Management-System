import { Form, Input, InputNumber, Button, Cascader, DatePicker, Select, Modal, Spin, Typography } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import bloodBankService from 'services/BloodBankService';
const { Title } = Typography
const { Option } = Select;
const { TextArea } = Input

const queryParams = new URLSearchParams(window.location.search);
const bagId = queryParams.get('bagId');

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

const UpdateTransfusion = () => {

	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		bloodBankService.bloodTransfusionDetails(bagId).then((resp) => {
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
				window.location.href = "../bloodbank/bags-informations";
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

		const bloodbag = {
			bagId: bagId,
			id: values.id,
			name: values.name,
			reason: values.reason,
			issueDate: moment(values.issueDate).valueOf(),
			bloodGroup: values.bloodGroup,
			pbloodGroup: values.pbloodGroup,
		}

		const payload = { bloodbag: bloodbag }

		bloodBankService.updateBloodTransfusion(payload).then((res) => {
			ShowModel("Successful!", 5, "Blood Bag Transfusion details updated Sucessfully", true)
			form.resetFields();
		}).catch((error) => {
			ShowModel("Failed!", 5, "Blood Bag Transfusion details update Failed", false)
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

		function disabledDate2(current) {
			// Can not select days before today and today
			return current && current > moment().endOf('day');
		}

		return (
			<Form {...layout} name="BloodTransfusionUpdate" onFinish={onFinish} validateMessages={validateMessages}>
				<Title>Edit Blood Transfusion Details</Title><br></br>
				<Form.Item name="bagId" label="Bag Id" initialValue={bagId} placeholder="Bag Id" >
					<Input disabled />
				</Form.Item>
				<Form.Item name="id" initialValue={data.id} label="Recipient ID" placeholder="Recipient ID" >
					<Input disabled />
				</Form.Item>
				<Form.Item name="name" initialValue={data.name} label=" Recipient Name" placeholder="Recipient Name">
					<Input disabled />
				</Form.Item>
				<Form.Item label="Reason" name="reason" initialValue={data.reason} rules={[{ required: true }]} style={{ margin: '24px 0' }}>
					<TextArea
						placeholder="Reason of the blood transfusion"
						autoSize={{ minRows: 3, maxRows: 5 }}
					/>
				</Form.Item>
				<Form.Item name="issueDate" initialValue={moment(new Date(data.issueDate))} label="Issue Date" rules={[{ required: true }]} placeholder=" Issue Date">
					<DatePicker disabledDate={disabledDate2} />
				</Form.Item>
				<Form.Item name="bloodGroup" initialValue={data.bloodGroup} label="Blood Group of Bag" placeholder="Blood Group of Bag">
					<Input disabled />
				</Form.Item>
				<Form.Item name="pbloodGroup" initialValue={data.pbloodGroup} label="Blood Group of Recipient" placeholder="Blood Group of Recipient">
					<Input disabled />
				</Form.Item>

				<Form.Item label="Volume" name="volume" >
					<Input disabled={true} id="Volume" placeholder='1 pint(450ml)'/>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button className="mr-2" htmlType="button" href={`../bloodbank/bags-informations`}>
							Cancel
						</Button>

					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form.Item>
			</Form>
		)
	}


}

export default UpdateTransfusion
