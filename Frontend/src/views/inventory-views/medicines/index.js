import React from 'react'
import { Table, Divider, Tag, Spin } from 'antd';
import { useState, useEffect } from 'react';
import inventoryService from 'services/inventoryService';

const Home = () => {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Item Name',
			dataIndex: 'itemName',
			key: 'itemName',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Manufacturer',
			dataIndex: 'manufacturer',
			key: 'manufacturer',
		},
		{
			title: 'Unit Price',
			dataIndex: 'unitPrice',
			key: 'unitPrice',
		},
		{
			title: 'Total Quantity',
			dataIndex: 'totalQuantity',
			key: 'totalQuantity',
		}
	];

	useEffect(() => {
		inventoryService.getItems("medicines").then((resp) => {
			setData(resp.payload);
			setLoading(false);

		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

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

		const dataList = data.map( (item)=> {

			return {
				id : item.id,
				itemName : item.item_name,
				description: item.description,
				manufacturer : item.manufacturer,
				unitPrice : item.unit_price,
				totalQuantity: item.total_quantity
			}
		});

		return (
			<>
            <h1 className='text-left' >View Medicines</h1>
            <Table columns={columns} dataSource={dataList} />
            </>
		)
	}


}

export default Home
