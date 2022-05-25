import { Form, Input, InputNumber, Button, Cascader, DatePicker, Select, Modal, Spin, Typography } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import bloodBankService from 'services/BloodBankService';
const { Title } = Typography
const { Option } = Select;

const queryParams = new URLSearchParams(window.location.search);
const bagId = queryParams.get('bagId');

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


const UpdateBloodBag = () => {

	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		bloodBankService.bloodBagDetails(bagId).then((resp) => {
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
				window.location.href="../bloodbank/bags-informations";
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
			donorName: values.donorName,
			donorNIC: values.donorNIC,
			donationNumber: values.donationNumber,
			donateDate: moment(values.donateDate).valueOf(),
			place: values.place,
			bloodGroup: values.bloodGroup,
		}

		const payload = { bloodbag: bloodbag }

		bloodBankService.updateBloodDetails(payload).then((res) => {
			ShowModel("Successful!", 5, "Blood Bag details updated Sucessfully", true)
			form.resetFields();
		}).catch((error) => {
			ShowModel("Failed!", 5, "Blood Bag details update Failed", false)
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
			return current && current > moment().endOf('day');
		  }

		return (
			<Form {...layout} name="BloodBagUpdate" onFinish={onFinish} validateMessages={validateMessages}>
				<Title>Edit Blood Bag</Title><br></br>
				<Form.Item name="bagId" label="Bag Id" initialValue={bagId} placeholder="Bag Id" >
					<Input disabled />
				</Form.Item>
				<Form.Item name="donorName" initialValue={data.donorName} label="Donor's  Name" rules={[{ required: true }]} placeholder="Donor's  Name" >
					<Input />
				</Form.Item>
				<Form.Item name="donorNIC" initialValue={data.donorNIC} label=" Donor's NIC" rules={[{ required: true,pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' , message: 'Enter valid NIC' }]} placeholder="Donor's NIC">
					<Input />
				</Form.Item>
				<Form.Item name="donationNumber" initialValue={data.donationNumber} label=" Donation Number" rules={[{ required: true }]} placeholder="Donation Number">
					<Input />
				</Form.Item>
				<Form.Item name="donateDate" initialValue={moment(new Date(data.donateDate))} label="Donate Date" rules={[{ required: true }]} placeholder=" Donate Date">
					<DatePicker disabledDate={disabledDate2} />
				</Form.Item>
				<Form.Item name="place" initialValue={data.place} label="Place" rules={[{ required: true }]} placeholder="Place">
					<Input />
				</Form.Item>
				<Form.Item name="bloodGroup" initialValue={data.bloodGroup} label="bloodGroup" rules={[{ required: true }]}>
					<Select
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

				<Form.Item label="Volume" name="volume" initialValue={data.volume}>
					<Input disabled={true} id="Volume" value={1}/>
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
		);
	}
};

export default UpdateBloodBag;
