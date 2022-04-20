import React from 'react'
import { Form, Input, Button, DatePicker, Cascader, Radio, Modal } from 'antd';
import moment from 'moment';
import mortuaryService from 'services/MortuaryService';

const queryParams = new URLSearchParams(window.location.search);
const cabinetNo = queryParams.get('cabinetNo');

const Home = () => {
	return (
		<div>
			<h1>Add Corpse Details</h1>
			<h2>Cabinet Number: {cabinetNo}</h2>
			<Demo />
		</div>
	)
}
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function disabledDate(current) {
	// Can not select days before today and today
	return current && current > moment().endOf('day');
}

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDateTime() {
	return {
		disabledHours: () => {
			const now = new Date()
			let hour = now.getHours()
			return range(hour, 24);
		}
	};
}

function ShowModel(title, delay, innercontent, isSuccess) {

	if (isSuccess) {
		const modal = Modal.success({
			title: title,
			content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
			onOk: () => {window.location = '.../home'}
		});
		const timer = setInterval(() => {
			delay -= 1;
			modal.update({
				content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
			});

		}, 1000);
		
		setTimeout(() => {
			clearInterval(timer);
			
			modal.destroy();
			window.location = '.../home'
		}, delay * 1000);
	}

	else {
		const modal = Modal.error({
			title: title,
			content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
		});
		const timer = setInterval(() => {
			delay -= 1;
			modal.update({
				content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
			});
		}, 1000);
		setTimeout(() => {
			clearInterval(timer);
			modal.destroy();
		}, delay * 1000);
	}
}
const Demo = () => {

	const onFinish = values => {
		console.log(values.cod);
		if (values.cod == undefined) {
			values.cod = null;
		}
		if (values.sod == undefined) {
			values.sod = null;
		}
		const corpseData = {
			cabinet_number: cabinetNo,
			NIC: values.nic,
			name: values.name,
			sex: values.sex,
			address: values.address,
			date_of_birth: moment(values.dob).valueOf(),
			date_time_of_death: moment(values.dod).valueOf(),
			cause_of_death: (values.cod == null) ?  values.cod : values.cod[0],
			specifics_of_death: values.sod
		}
		mortuaryService.addCorpse(corpseData).then((value) => {


			if (value.success == true) {
				ShowModel(
					"Successful !",
					4,
					"The new corpse was added",
					true
				);
			} else {
				ShowModel(
					"Unsuccessful !",
					4,
					"The new corpse was not added, please try again",
					false
				);
			}
		}).catch((error) => {

			ShowModel(
				"Unsccessfull !",
				4,
				"The new corpse was not added, please try again",
				false
			);

		})

	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			{...layout}
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="NIC"
				name="nic"
				rules={[{ required: true, message: 'Please input the NIC!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Please input the name!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Sex"
				name="sex"
				rules={[{ required: true, message: 'Please choose the Sex!' }]}
			>
				<Radio.Group>
					<Radio value="male">Male</Radio>
					<Radio value="female">Female</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				label="Address"
				name="address"
				rules={[{ required: true, message: 'Please input the Address!' }]}
			>
				<Input.TextArea />
			</Form.Item>

			<Form.Item
				label="Date of Birth"
				name="dob"
				rules={[{ required: true, message: 'Please input the Date of Birth!' }]}
			>
				<DatePicker
					placeholder='Select Date'
					format="YYYY-MM-DD"
					disabledDate={disabledDate}
				/>
			</Form.Item>

			<Form.Item
				label="Date & Time of Death"
				name="dod"
				rules={[{ required: true, message: 'Please input the Date & Time of Death!' }]}
			>
				<DatePicker
					placeholder='Select Date & Time'
					format="YYYY-MM-DD HH:mm:ss"
					disabledDate={disabledDate}
					disabledTime={disabledDateTime}
					showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
				/>
			</Form.Item>

			<Form.Item
				label="Cause of Death"
				name="cod"
				rules={[{ required: false }]}
			>
				<Cascader options={causeOfDeath} placeholder="Select Cause of Death" />
			</Form.Item>

			<Form.Item
				label="Specifics about Death"
				name="sod"
				rules={[{ required: false }]}
			>
				<Input.TextArea />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
const causeOfDeath = [{
	value: 'Natural',
	label: 'Natural'
},
{
	value: 'Accident',
	label: 'Accident'
},
{
	value: 'Homicide',
	label: 'Homicide'
},
{
	value: 'Suicide',
	label: 'Suicide'
}]
export default Home
