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

	const [t_loading, t_setLoading] = useState(true);
	const [t_error, t_setError] = useState(false);
	const [t_data, t_setData] = useState();

	useEffect(() => {
		bloodBankService.readBloodDetails().then((resp) => {
			setData(resp.payload);
			setLoading(false);

		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});

			bloodBankService.readTransfusionDetails().then((resp) => {
			t_setData(resp.payload);
			t_setLoading(false);

		}).catch((err) => {
			t_setLoading(false);
			t_setError(true);
			t_setData();
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
	else if (t_loading) {
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)
	}
	else if (t_error) {

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

		for (var i = 0; i < t_data.length; i++) {
			t_data[i].issueDate = new Date(t_data[i].issueDate * 1000).toLocaleDateString()

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

		const bloodTransfusion = t_data.map((response) => {

			console.log('transfusion' + response)
			return {
				bagId: response.bagId,
				id: response.id,
				name: response.name,
				reason: response.reason,
				issueDate: response.issueDate,
				tags: response.bloodGroup,
				pbloodGroup: response.pbloodGroup
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
				{ text: 'AB negative(AB-)', value: 'AB-' },],
				onFilter: (value, record) => record.tags==value,

				render: tags => (
					<span>
						{tags == "A+" &&
							<Tag color='purple' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "A-" &&
							<Tag color='pink' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "B+" &&
							<Tag color='gold' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "B-" &&
							<Tag color='orange' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "O+" &&
							<Tag color='blue' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "O-" &&
							<Tag color='geekblue' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "AB+" &&
							<Tag color='green' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "AB-" &&
							<Tag color='lime' key={tags}>
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
						<a href={`../bloodbank/add-transfusion?bagId=${record.bagId}`}>Transfusion </a>
						<a href={`../bloodbank/update-details?bagId=${record.bagId}`}>Edit</a>
						<Divider type="vertical" />
						
					</span>
				),
			},
		];

		const column = [
			{
				title: 'Bag ID',
				dataIndex: 'bagId',
			},
			{
				title: 'Recepient Id',
				dataIndex: 'id',
			},
			{
				title: 'Recepient Name',
				dataIndex: 'name',
			},
			{
				title: 'Reason',
				dataIndex: 'reason',
			},
			// {
			// 	title: 'Donors NIC',
			// 	dataIndex: 'donorNIC',
			// },
			{
				title: 'Issue Date',
				dataIndex: 'issueDate'
			},
			{
				title: 'Blood Group Of Bag',
				dataIndex: 'tags',
				key: 'tags',
				filters: [{ text: 'A positive(A+)', value: 'A+' },
				{ text: 'A negative(A-)', value: 'A-' },
				{ text: 'B positive(B+)', value: 'B+' },
				{ text: 'B negative(B-)', value: 'B-' },
				{ text: 'O positive(O+)', value: 'O+' },
				{ text: 'O negative(O-)', value: 'O-' },
				{ text: 'AB positive(AB+)', value: 'AB+' },
				{ text: 'AB negative(AB-)', value: 'AB-' },],
				onFilter: (value, record) => record.tags==value,

				render: tags => (
					<span>
						{tags == "A+" &&
							<Tag color='purple' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "A-" &&
							<Tag color='pink' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "B+" &&
							<Tag color='gold' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "B-" &&
							<Tag color='orange' key={tags}>
								{tags.toUpperCase()}
							</Tag>
						}
						{tags == "O+" &&
							<Tag color='blue' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "O-" &&
							<Tag color='geekblue' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "AB+" &&
							<Tag color='green' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
						{tags == "AB-" &&
							<Tag color='lime' key={tags}>
								{tags.toUpperCase()}
							</Tag>

						}
					</span>
				),
			},
			{
				title: 'Blood Group Of Recepient',
				dataIndex: 'pbloodGroup',
				key: 'pbloodGroup',
				filters: [{ text: 'A positive(A+)', value: 'A+' },
				{ text: 'A negative(A-)', value: 'A-' },
				{ text: 'B positive(B+)', value: 'B+' },
				{ text: 'B negative(B-)', value: 'B-' },
				{ text: 'O positive(O+)', value: 'O+' },
				{ text: 'O negative(O-)', value: 'O-' },
				{ text: 'AB positive(AB+)', value: 'AB+' },
				{ text: 'AB negative(AB-)', value: 'AB-' },],
				onFilter: (value, record) => record.tags==value,

				render: pbloodGroup => (
					<span>
						{pbloodGroup == "A+" &&
							<Tag color='purple' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>
						}
						{pbloodGroup == "A-" &&
							<Tag color='pink' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>
						}
						{pbloodGroup == "B+" &&
							<Tag color='gold' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>
						}
						{pbloodGroup == "B-" &&
							<Tag color='orange' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>
						}
						{pbloodGroup == "O+" &&
							<Tag color='blue' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>

						}
						{pbloodGroup == "O-" &&
							<Tag color='geekblue' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>

						}
						{pbloodGroup == "AB+" &&
							<Tag color='green' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
							</Tag>

						}
						{pbloodGroup == "AB-" &&
							<Tag color='lime' key={pbloodGroup}>
								{pbloodGroup.toUpperCase()}
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
						<a >View More</a>
						<a >Edit</a>
						<Divider type="vertical" />
						
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

				<Title>Blood Transfusion Details</Title>
				<Table columns={column} dataSource={bloodTransfusion} />
			</div>
		)

	}


}

export default BloodBags

