import React, { useState, useEffect } from 'react';
import inventoryService from '../../../services/inventoryService'
import { Form, Input, Button, Select, DatePicker, Modal } from 'antd';


const { Option } = Select;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function ShowModel(title, delay, innercontent, isSuccess) {

	if (isSuccess) {
		const modal = Modal.success({
			title: title,
			content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
			onOk: () => { window.location = '.../inventory' }
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
			window.location = '.../inventory'
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

const addInvenotryItem = () => {
	const [form] = Form.useForm();



	const onFinish = values => {
		const batch_id= values.batch_id;
		const item_id = values.item_id;
		const item_name = values.item_name;
		const quantity = values.quantity;
		const manufacture_date = values.manufacture_date;
		const expire_date = values.expire_date;
		const status = values.status;

		inventoryService.addInvenotryItem(
			{
				batch_id:batch_id,
				item_id:item_id,
				item_name: item_name,
				quantity: quantity,
				manufacture_date: manufacture_date,
				expire_date: expire_date,
				unit_price: unit_price,
				status: status,
			}).then((value) => {


				if (value.success == true) {
					ShowModel(
						"Successful !",
						4,
						"A new batch was added",
						true
					);
				} else {
					ShowModel(
						"Unsuccessful !",
						4,
						"New batch was not added, please try again",
						false
					);
				}
			}).catch((error) => {

				ShowModel(
					"Unsccessfull !",
					4,
					"New batch was not added, please try again",
					false
				);

			})



	};

	const onReset = () => {
		form.resetFields();
	};



	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		inventoryService.getId().then((res) => {

			setData(res.payload);
			setLoading(false);

		}).catch((err) => {
			console.log(error)
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);
	if (loading) {
		return (
			<>
				<p>Form Loading</p>
			</>
		)
	}
	else if (error) {
		return (
			<>
				<p>Error</p>
			</>
		)
	}
	else {

		return (

			<Form {...layout} ref={form} name="control-ref" onFinish={onFinish}>
				<Form.Item

					//label="id"

					name="batch_id"

					initialValue={data}

				>

					{/* <Input placeholder={data} disabled /> */}

				</Form.Item>
				<Form.Item name="item_name" label="item_name" >
					<Input />
				</Form.Item>
				<Form.Item label="description" name="description" rules={[{ required: true, message: 'Please input Description' }]}>
					<Input />
				</Form.Item>
				<Form.Item label="manufacturer " name="manufacturer" rules={[{ required: true, message: 'Please input manufacturer' }]}>
					<Input />
				</Form.Item>
				<Form.Item name="category" label="category" rules={[{ required: true }]}>
					<Select
						placeholder="Select the category"
					
						allowClear
					>
						<Select.Option value="medicines">Medicine</Select.Option>
						<Select.Option value="surgicalitems">surgical items</Select.Option>
						<Select.Option value="tools">Tools</Select.Option>

					</Select>
				</Form.Item>
				<Form.Item label="Unit price" name="unit_price">
					<Input />
				</Form.Item>
				<Form.Item label="Total Quantity" name="total_quantity">
					<Input />
				</Form.Item>


				<Form.Item {...tailLayout}>
					<Button className="mr-2" type="primary" htmlType="submit">
						Submit
					</Button>
					<Button className="mr-2" htmlType="button" onClick={onReset}>
						Reset
					</Button>
				</Form.Item>
			</Form>
		);

	}

}

	export default Additem;

