import React, { useState, useEffect } from 'react';
import inventoryService from '../../../services/inventoryService'
import { Form, Input, Button, Select, DatePicker, Modal,InputNumber } from 'antd';
import { INVENTORY_PREFIX_PATH, APP_PREFIX_PATH, INVENTORY_ROLE, ValidateUser } from 'configs/AppConfig';
import moment from 'moment';
import Search from 'antd/lib/transfer/search';

ValidateUser(INVENTORY_ROLE);


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
			onOk: () => { window.location = './inventory/inventorylist/all' }
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
			window.location = './inventory/inventorylist/all'
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

function disabledDate2(current) {
	return current && current > moment().endOf('day');
}


function disabledDate1(current) {
	return current && current < moment().endOf('day');
}

function filter(inputValue, path) {
	return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

//convert date string to timestamp
function toTimestamp(strDate) {

    var datum = Date.parse(strDate);

    return datum / 1000;

}


const AddInvenotryItem = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();
	const [fullData, setFullData] = useState()

	useEffect(() => {
		inventoryService.getAllItems().then((res) => {

			setData(res.payload);
			setFullData(res.payload)
			setLoading(false);

		}).catch((err) => {
			console.log(error)
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);




	const onFinish = values => {
		console.log(values);
		const item_id = values.item_id.key;
		const quantity = values.quantity;
		const manufacture_date = moment(values.manufacture_date).valueOf();
		const expire_date = moment(values.expire_date).valueOf();
		const item_name = data.filter( (item)=> { 
			
			if (item.id == item_id){
				return true;
			}
		else{
			return false
		}} )[0].item_name;

		inventoryService.addInventoryItem(
			{
				item_id:item_id,
				item_name:item_name,
				quantity: quantity,
				manufacture_date: manufacture_date ,
				expire_date: expire_date,
				status: "Available",
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

		const savedData = []
	const search = (str) => {
        if(str === '') return setData(fullData)
        str = str.toUpperCase()
        fullData.map(d => {
          let itemname = d.item_name.toUpperCase()
          if(itemname === str || itemname.includes(str)) {
            savedData.push(d)
          }
          return
        })
        setData(savedData)
      }
	
		return (

			<Form {...layout} ref={form} name="control-ref" onFinish={onFinish}>
				<Form.Item name="item_id" label="Item Name"  rules={[{ required: true }]} >
							
					<Select
						showSearch
						labelInValue
						placeholder="Select item"
						filterOption={false}
						id="searchTxt"
						//optionFilterProp="children"
						//showSearch={{ filter }}
						onInput={() => search(document.getElementById("searchTxt").value)}
						style={{ width: '100%' }}
					>
						{data.map(d => (
							<Option key={d.id}>{d.item_name} - {d.description}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="manufacture_date" label="Manufactured Date" rules={[{ required: true }]}>
					<DatePicker format="YYYY-MM-DD" disabledDate={disabledDate2}/>
				</Form.Item>

				<Form.Item name="expire_date" label="Expired Date" rules={[{ required: true }]}>
					<DatePicker format="YYYY-MM-DD" disabledDate={disabledDate1}/>
				</Form.Item>

				<Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please input quantity' }]}>
					<InputNumber min={1} />
				</Form.Item>
				


				<Form.Item {...tailLayout}>
					<Button className="mr-2" type="primary" htmlType="submit">
						ADD
					</Button>
					<Button className="mr-2" htmlType="button" onClick={onReset}>
						Reset
					</Button>
				</Form.Item>
			</Form>
		);

	}

}

	export default AddInvenotryItem;

