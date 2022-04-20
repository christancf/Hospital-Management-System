import React, { useState, useEffect } from 'react'
import { Table, Typography, Spin, Button,Divider,Tag } from 'antd';
import bloodBankService from 'services/BloodBankService'
import moment from 'moment';

const { Title } = Typography

const BloodBags = () => {

	function toTimestamp(strDate){
		var datum = Date.parse(strDate);
		return datum/1000;
	 }

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		bloodBankService.readBloodDetails().then((resp) => {
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
console.log(data);
		for (var i = 0; i < data.length; i++) {
            data[i].donateDate = new Date(data[i].donateDate*1000).toLocaleDateString()

          }

		const bloodBags = data.map((response) => {
			return {
				bagId:response.bagId,
				donorName: response.donorName,
				donorNIC: response.donorNIC,
				donationNumber: response.donationNumber,
				donateDate: response.donateDate,
				place: response.place,
				bloodGroup: response.bloodGroup
			}
		})

		const columns = [
			{
				title: 'Bag ID',
				dataIndex: 'bagId',
			},
			{
				title: 'Donors Name',
				dataIndex: 'donorName',
				render: text => <a>{text}</a>,
			},
			// {
			// 	title: 'Donors NIC',
			// 	dataIndex: 'donorNIC',
			// },
			{
				title: 'Donation Number',
				dataIndex: 'donationNumber',
			},
			{
				title: 'Donate Date',
				dataIndex: 'donateDate'
			},
			{
				title: 'Place',
				dataIndex: 'place'
			},
			{
				title: 'Blood Group',
				dataIndex: 'bloodGroup',
				key:'bloodGroup',
				filters: [{ text: 'A positive(A+)', value: 'A+' },
				{ text: 'A negative(A-)', value: 'A-' },
				{ text: 'B positive(B+)', value: 'B+' },
				{ text: 'B negative(B-)', value: 'B-' },
				{ text: 'O positive(O+)', value: 'O+' },
				{ text: 'O negative(O-)', value: 'O-' },
				{ text: 'AB positive(AB+)', value: 'AB+' },
				{ text: 'AB-">AB negative(AB-)', value: 'AB-' },],
				onFilter: (value, record) => record.bloodGroup.includes(value),

				// render: bloodGroup => bloodGroup=()=>(
				// 	<span>
				// 	  {bloodGroup.map(tag => {
				// 		let color = tag.length > 5 ? 'geekblue' : 'green';
				// 		if (tag === 'A+') {
				// 		  color = 'volcano';
				// 		}
				// 		else if (tag === 'O+'){
				// 			color = 'green';
				// 		}
				// 		return (
				// 		  <Tag color={color} key={tag}>
				// 			{tag.toUpperCase()}
				// 		  </Tag>
				// 		);
				// 	  })}
				// 	</span>
				//   ),
			},
			{
				title: 'Action',
				dataIndex: '',
				render: (text, record) => (
					<span>
					  <a>View More {record.name}</a>
					  <Divider type="vertical" />
					  <a>Edit</a>
					</span>
				  ),
			},
		];

		return (
			<div>
				<Title>Blood Bags Details</Title>
				<Button type="primary" href='/bloodbank/add-details'>Add Blood Bag</Button>
				<br></br>
				<Table columns={columns} dataSource={bloodBags} />
				
			</div>
		)

	}


}

export default BloodBags

