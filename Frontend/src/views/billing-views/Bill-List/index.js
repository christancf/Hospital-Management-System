import React from 'react'
import { useState, useEffect } from 'react';
import billingService from 'services/BillingService';
import { Select, Spin, Result, Table, Divider  } from 'antd';

const { Option } = Select;



const Home = () => {

	const columns = [
		{
			title: 'Bill ID',
			dataIndex: 'billId',
			key: 'billId',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Patient Name',
			dataIndex: 'patientName',
			key: 'itemName',
		},
		{
			title: 'Room Charge',
			dataIndex: 'roomCharge',
			key: 'roomCharge',
		},
		{
			title: 'Item Charge',
			dataIndex: 'itemCharge',
			key: 'itemCharge',
		},
		{
			title: 'Doctor Charge',
			dataIndex: 'doctorCharge',
			key: 'doctorCharge',
		},
		{
			title: 'Tax',
			dataIndex: 'tax',
			key: 'tax',
		},
		{
			title: 'Total',
			dataIndex: 'total',
			key: 'total',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		}
	];


	const [billsLoading, setBillsLoading] = useState(true);
	const [billsError, setBillsError] = useState(false);
	const [billsData, setBillData] = useState();


	function onChange(value) {


		billingService.getBills(value).then((resp) => {
			setBillData(resp.payload);
			setBillsLoading(false);

		}).catch((err) => {
			setBillsLoading(false);
			setBillsError(true);
			setBillData();
		});

	}


	useEffect(() => {
		billingService.getAllBills().then((resp) => {
			setBillData(resp.payload);
			setBillsLoading(false);

		}).catch((err) => {
			setBillsLoading(false);
			setBillsError(true);
			setBillData();
		});
	}, []);


	if (!billsLoading) {

		const dataList = billsData.map( (item)=> {

			return {
				billId : item._id,
				patientName : item.patient_name,
				roomCharge: item.room_charges,
				itemCharge : item.item_charges,
				doctorCharge : item.doctor_charges,
				tax: item.tax,
				total: item.total,
				status: item.status
			}
		});

		return (

			<>
				<Divider />
				<Table columns={columns} dataSource={dataList} />
			</>
		)

	}
	else {
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={billsLoading} />
				</center>

			</>
		)
	}


}

export default Home
