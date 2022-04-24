import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Card, Select, DatePicker, message, Spin,Modal } from 'antd';
import { fromPairs } from 'lodash';
import bloodBankService from 'services/BloodBankService';
import moment from 'moment';

const { TextArea } = Input;
const { Search } = Input
const { Option } = Select
const queryParams = new URLSearchParams(window.location.search);
const bagId = queryParams.get('bagId');
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
	wrapperCol: { offset: 15, span: 16 },
}

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

const AddBloodTransfusion = () => {
	const onReset = () => {
		form.resetFields();
	  };

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();
	const [form] = Form.useForm();
	const [iloading, setIloading] = useState(true)
	const [ierror, setIerror] = useState(false)
	const [options, setOptions] = useState()



	useEffect(() => {
		bloodBankService.bloodBagDetails(bagId).then((resp) => {
			setData(resp.payload);
			setLoading(false);
		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, [])

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
			// window.location.reload(false)
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
		  bagId: values.bagId,
		  id: values.id,
		  name: values.name,
		  reason: values.reason,
		  issueDate: moment(values.issueDate).format("X"),
		  bloodGroup: values.bloodGroup,
		  pbloodGroup:values.pbloodGroup,
		}
		console.log(payload)
	
		bloodBankService.addTransfusion(payload).then((res) => {
		  ShowModel("Successful!", 5, "Blood Bag Added Sucessfully", true)
		  form.resetFields();
		}).catch((error) => {
		  ShowModel("Failed!", 5, "Blood Bag Added Failed", false)
		})
	
		console.log(payload)

	  };

	const searchById = (patientId) => {

		bloodBankService.getPatientDetails(patientId)
			.then((data) => {
				console.log(data)
				if (data.payload != null) {
					form.setFieldsValue({
						name: data.payload.fullName,
						pbloodGroup: data.payload.bloodGroup,
					})
				} else message.error('ID doesn\'t belong to patient')
			}).catch((e) => {
				console.log(`Error @ update-ward-details: ${e}`)
			})
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
	else {
		function disabledDate(current) {
			// Can not select days before today and today
			return current && current < moment().endOf('day');
		}
		function disabledDate2(current) {
			// Can not select days before today and today
			return current && current > moment().endOf('day');
		}


		const resData = data
		return (
			<Form {...layout} name="add blood transfusion" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
				<Form.Item name="bagId" label="Bag Id" initialValue={bagId} placeholder="Bag Id" >
					<Input disabled />
				</Form.Item>
				<Form.Item label="Recipient ID" name="id" rules={[{ required: true, message: 'Please input patient ID!', }]}>
					<Search placeholder="Recipient ID" id="id" onSearch={id => searchById(id)} enterButton />
				</Form.Item>
				<Form.Item label="Recipient Name" name="name" >
					<Input disabled={true} id="name" />
				</Form.Item>
				<Form.Item label="Reason" name="reason" style={{ margin: '24px 0' }}>
					<TextArea
						// value={value}
						// onChange={this.onChange}
						placeholder="Reason of the blood transfusion"
						autoSize={{ minRows: 3, maxRows: 5 }}
					/>
				</Form.Item>
				<Form.Item label="Issue Date & Time" name="issueDate">
					<DatePicker disabledDate={disabledDate2} />
				</Form.Item>
				<Form.Item name="bloodGroup" initialValue={data.bloodGroup} label="Blood Group of Bag" >
					<Input disabled={true} />
				</Form.Item>
				<Form.Item label="Blood Group of Recipient" name="pbloodGroup">
					<Input disabled={true} id="bloodGroup" />
				</Form.Item>
				{/* <Form.Item label="Volume" name="volume" initialValue={data.}>
					<Input disabled={true} id="Volume" value={1}/>
				</Form.Item> */}

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button className="mr-2" htmlType="button" onClick={onReset}>
						Discard
					</Button>

					<Button type="primary" htmlType="submit">
						Confirm
					</Button>
				</Form.Item>

			</Form>

		)
	}
}



export default AddBloodTransfusion
