import { Form, Input, InputNumber, Button, Cascader, DatePicker, Select, Modal, Spin, Typography } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import inventoryService from 'services/inventoryService';

const { Title } = Typography
const { Option } = Select;

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

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

const category = [
	{
		label: "medicines",
		value: "medicines"
	},
	{
		label: "surgicalitems",
		value: "surgicalitems"
	},
	{
		label: "tools",
		value: "tools",
	},
	
]


const UpdateItem = () => {
	// const onReset = () => {
	// 	form.resetFields();
	// };

	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		inventoryService.itemDetails(id).then((resp) => {
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

		const item = {
			id: id,
			item_name: values.item_name,
			description: values.description,
			manufacturer: values.manufacturer,
			category: values.category,			
			unit_price: values.unit_price,
			total_quantity: values.total_quantity,
		}

		const payload = { item: item }

		inventoryService.updateItemDetails(payload).then((res) => {
			ShowModel("Successful!", 5, "item details updated Sucessfully", true)
			form.resetFields();
		}).catch((error) => {
			ShowModel("Failed!", 5, "item details update Failed", false)
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

		// var myDate = new Date(data.dateOfBirth);
		// myDate.toLocaleString();

		return (



			<Form {...layout} name="ItemUpdate" onFinish={onFinish} validateMessages={validateMessages}>
				<Title>Edit item Details</Title><br></br>
				<Form.Item name="id" label="item Id" initialValue={id} placeholder="item Id" >
					<Input disabled />
				</Form.Item>
				<Form.Item name="item_name" initialValue={data.item_name} label="item's  Name" rules={[{ required: true }]} placeholder="item's  Name" >
					<Input />
				</Form.Item>
				<Form.Item name="description" initialValue={data.description} label=" Description" rules={[{ required: true }]} placeholder="Description">
					<Input />
				</Form.Item>
				<Form.Item name="manufacturer" initialValue={data.manufacturer} label=" manufacturer" rules={[{ required: true }]} placeholder="manufacturer">
					<Input />
				</Form.Item>
				<Form.Item name="total_quantity" initialValue={data.total_quantity} label=" total_quantity" rules={[{ required: true }]} placeholder="total_quantity">
					<Input />
				</Form.Item>
				<Form.Item name="unit_price" initialValue={data.unit_price} label="unit_price" rules={[{ required: true }]} placeholder="unit_price">
					<Input />
				</Form.Item>
				<Form.Item name="category" initialValue={data.category} label="category" rules={[{ required: true }]}>
					<Select
						placeholder="Select category"
						filterOption={false}
						showSearch={{ filter }}
						style={{ width: '100%' }}
					>
						{category.map(d => (
							<Option key={d.value}>{d.label}</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					{/* <Button className="mr-2" htmlType="button" onClick={onReset}>
						Reset
					</Button> */}

					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form.Item>
			</Form>
		);
	}
};

export default UpdateItem;
