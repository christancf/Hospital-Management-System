import React, { useState, useEffect } from 'react'
import { Table, Typography, Spin, Button, Divider, Tag } from 'antd';
import bloodBankService from 'services/BloodBankService'
import moment from 'moment';

const { Title } = Typography

const BloodBags = () => {

	function toTimestamp(strDate) {
		var datum = Date.parse(strDate);
		return datum / 1000;
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
			data[i].donateDate = new Date(data[i].donateDate * 1000).toLocaleDateString()

		}

		const bloodBags = data.map((response) => {

			console.log(response)
			return {
				bagId: response.bagId,
				donorName: response.donorName,
				donorNIC: response.donorNIC,
				donationNumber: response.donationNumber,
				donateDate: response.donateDate,
				place: response.place,
				tags: response.bloodGroup
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
				dataIndex: 'tags',
				key: 'tags',
				filters: [{ text: 'A positive(A+)', value: 'A+' },
				{ text: 'A negative(A-)', value: 'A-' },
				{ text: 'B positive(B+)', value: 'B+' },
				{ text: 'B negative(B-)', value: 'B-' },
				{ text: 'O positive(O+)', value: 'O+' },
				{ text: 'O negative(O-)', value: 'O-' },
				{ text: 'AB positive(AB+)', value: 'AB+' },
				{ text: 'AB-">AB negative(AB-)', value: 'AB-' },],
				onFilter: (value, record) => record.tags.includes(value),

				render: tags => (
					<span>
						{tags == "A+" &&
							<Tag color='volcano' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "O+" &&
							<Tag color='green' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{['A-', 'B+', 'B-', 'O-', 'AB+', 'AB-'].includes(tags) &&
							<Tag color='geekblue' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
					</span>
				),
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<span>
						<a>View More {record.name}</a>
						<a href={`../bloodbank/update-details?bagId=${record.bagId}`}>Edit</a>
						<Divider type="vertical" />
						
					</span>
				),

				// title: 'Action',
				// dataIndex: '',
				// render: (text, record) => (
				// 	<span>
				// 		<a>View More {record.name}</a>
				// 		<Divider type="vertical" />
				// 		<a href={`../frontchannelling/edit?appointmentId=${record._id}`}>Edit</a>
				// 	</span>
				// ),
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

