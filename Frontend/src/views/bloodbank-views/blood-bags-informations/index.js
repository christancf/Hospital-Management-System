import React, { useState, useEffect, Component } from 'react';
import { Table, Typography, Spin, Button, Divider, Tag, Modal, Row, Col, Form, DatePicker, Input, Select,Tooltip } from 'antd';
import bloodBankService from 'services/BloodBankService'
import { EyeOutlined, EditOutlined,SisternodeOutlined ,PlusSquareOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography
const { Option } = Select
const queryParams = new URLSearchParams(window.location.search);
const bagId = queryParams.get('bagId');

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
};

function disabledDate(current) {
	return current && current > moment().endOf('day');
}

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

	const [modalData, setModalData] = useState();

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
			data[i].donateDate = new Date(data[i].donateDate).toLocaleDateString()
			data[i].expireDate = new Date(data[i].expireDate).toLocaleDateString()
		}

		for (var i = 0; i < t_data.length; i++) {
			t_data[i].issueDate = new Date(t_data[i].issueDate).toLocaleDateString()

		}

		const bloodBags = data.map((response) => {

			console.log(response)
			return {
				bagId: response.bagId,
				donorName: response.donorName,
				donorNIC: response.donorNIC,
				donationNumber: response.donationNumber,
				expireDate: response.expireDate,
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



		return (
			<div>
				<div style={{ padding: '26px 1040px 16px' }}>
					<Button type="primary" href='/bloodbank/add-details'>Add Blood Bag</Button>
				</div>
				<Title>Blood Bags Details</Title>
				<br></br>
				<Table columns={columns} dataSource={bloodBags} onChange={onChange}/>

				<Title>Blood Transfusion Details</Title>
				<Table columns={column} dataSource={bloodTransfusion} style={{ padding: '26px 0px 16px' }} />

				

			</div>
		)

	}
}

const columns = [
	{
		title: 'Bag ID',
		dataIndex: 'bagId',
	},
	{
		title: "Donor's Name",
		dataIndex: 'donorName',
		render: text => <a style={{ color: "darkred" }}>{text}</a>,
	},
	{
		title: 'Donation Number',
		dataIndex: 'donationNumber',
	},
	{
		title: 'Donate Date',
		dataIndex: 'donateDate'
	},
	{
		title: 'Expire Date',
		dataIndex: 'expireDate'
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
		onFilter: (value, record) => record.tags == value,

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

				<Row>
					<Tooltip title="View More">
					<Col span={5}>
						<ViewMore moreDetails={record} />
					</Col>
					</Tooltip>

					<Col>
						<Divider type="vertical" />
					</Col>
					
					<Tooltip title="Edit Bag Details">
					<Col span={5}>
						<a href={`../bloodbank/update-details?bagId=${record.bagId}`}><EditOutlined style={{ fontSize: '1.15rem', color: '#262626' }} /></a>
					</Col>
					</Tooltip>
					<Col>
						<Divider type="vertical" />
					</Col>
					<Col span={5}>
					<Tooltip title="Transfusion Bag">
						<a href={`../bloodbank/add-transfusion?bagId=${record.bagId}`}><PlusSquareOutlined style={{ fontSize: '1.15rem', color: '#262626' }} /></a>
					</Tooltip>
						
					</Col>
				</Row>
				{/* <a href={`../bloodbank/add-transfusion?bagId=${record.bagId}`}>Transfusion </a> */}
				{/* <a href={`../bloodbank/update-details?bagId=${record.bagId}`}>Edit</a> */}
				{/* <a onClick={() => { showModal(record.bagId) }}>View More</a> */}
				{/* <a onClick={showModal}>View More</a> */}
				

			</span>
		),
	},
];

function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}

const ViewMore = ({ moreDetails }) => {
	const [viewDetails, setViewDetails] = useState(false)
	const [form] = Form.useForm();

	const showModal = () => {
		setViewDetails(true)
		form.setFieldsValue({
			bagId: moreDetails.bagId,
			donorName: moreDetails.donorName,
			donorNIC: moreDetails.donorNIC,
			donationNumber: moreDetails.donationNumber,
			expireDate: moment(moreDetails.expireDate),
			donateDate: moment(moreDetails.donateDate),
			place: moreDetails.place,
			bloodGroup: moreDetails.bloodGroup,
		})
	};

	const handleOk = e => {
		console.log(e)
		setViewDetails(false)
	};

	const handleCancel = e => {
		console.log(e)
		setViewDetails(false)
	};

	return (
		<div>
			<EyeOutlined onClick={showModal} style={{ fontSize: '1.15rem', color: '#262626' }} />
			<Modal
				title={`Bag ID  ${moreDetails['bagId']}`}
				visible={viewDetails}
				onOk={handleOk}
				onCancel={handleCancel}
				width='65%'
			>
				<Form {...layout} name="basic" initialValues={{ remember: true }} form={form} style={{ pointerEvents: 'none' }} >
					<Row>
						<Col span={11}>

							<Form.Item label="Dornor's Name" name="donorName" >
								<Input />
							</Form.Item>

							<Form.Item label="Donor's NIC" name="donorNIC">
								<Input />
							</Form.Item>

							<Form.Item label="Donation Number" name="donationNumber">
								<Input />
							</Form.Item>

						</Col>

						<Col span={13}>
							<Form.Item label="Donated Date" name="donateDate">
								<DatePicker
									placeholder='Select Date'
									format="YYYY-MM-DD"
									disabledDate={disabledDate} />
							</Form.Item>

							<Form.Item label="Expire Date" name="expireDate">
								<DatePicker
									placeholder='Select Date'
									format="YYYY-MM-DD"
									disabledDate={disabledDate} />
							</Form.Item>

							<Form.Item label="Place" name="place"
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>

				</Form>
			</Modal>
		</div>
	);

}

//Transfusion
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
		onFilter: (value, record) => record.tags == value,

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
		onFilter: (value, record) => record.tags == value,

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
				<Row>
				<Tooltip title="View More">
					<Col span={6}>
						<ViewMore moreDetails={record} />
					</Col>
					</Tooltip>

					<Col>
						<Divider type="vertical" />
					</Col>
					
					<Tooltip title="Edit Bag Details">
					<Col span={6}>
						<a href={`../bloodbank/update-transfusion?bagId=${record.bagId}`}><EditOutlined style={{ fontSize: '1.15rem', color: '#262626' }} /></a>
					</Col>
					</Tooltip>
				{/* <EyeOutlined onClick={bloodTransfusion} style={{ fontSize: '1.15rem', color: '#262626' }} /> */}
				{/* <a >View More</a>
				<a href={`../bloodbank/update-transfusion?bagId=${record.bagId}`}>Edit</a> */}
				{/* <Divider type="vertical" /> */}
				</Row>
			</span>
		),
	},
];


export default BloodBags

