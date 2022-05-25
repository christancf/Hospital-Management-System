import React, { useState, useEffect } from 'react';
import { Table, Typography, Spin, Button, Divider, Tag, Modal, notification, Row, Col, Tooltip  } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import bloodBankService from 'services/BloodBankService'

const { confirm } = Modal;
const { Title } = Typography

const DisposaBloodBag = () => {

	const state = { visible: false };

	function toTimestamp(strDate) {
		var datum = Date.parse(strDate);
		return datum / 1000;
	}

	const showModal = () => {
		this.setState({
			visible: true,
		});
	};

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		bloodBankService.expireBagDetails().then((resp) => {
			setData(resp.payload);
			setLoading(false);

		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

	const openNotification = (title, content) => {
		notification.open({
			message: title,
			description: content,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};

	const deleteExpireBag = (id) => {

		confirm({
			title: 'Do you want to remove this expired blood bag?',
			content: 'When clicked the OK button, bag will be removed',
			async onOk() {
				try {
					return await new Promise((resolve, reject) => {

						bloodBankService.deleteBagList(id).then((ress) => {
							openNotification("Successfull !", "Expire blood bag remove proccess successfull");
							setTimeout(function () {
								window.location.reload(false);
							}, 2000);


						}).catch((errors) => {
							openNotification("Unsuccessfull !", "Expire blood bag remove proccess Failed");

						});
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
					});
				} catch {
					return console.log('Oops errors!');
				}
			},
			onCancel() { },
		});


	}

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
			data[i].donateDate = new Date(data[i].donateDate).toLocaleDateString()
			data[i].expireDate = new Date(data[i].expireDate).toLocaleDateString()
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

		const columns = [
			{
				title: 'Bag ID',
				dataIndex: 'bagId',
			},
			{
				title: 'Donors Name',
				dataIndex: 'donorName',
			},
			{
				title: 'Donate Date',
				dataIndex: 'donateDate'
			},
			{
				title: 'Expire Date',
				dataIndex: 'expireDate',
				render: text => <a style={{ color: "red" }}>{text}</a>,
			},
			{
				title: 'Blood Group',
				dataIndex: 'tags',
				key: 'tags',

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
				title: '',
				key: 'action',
				render: (text, record) => (
					<span>
						<Row>
							<Tooltip title="Remove this bag">
								<Col span={6}>
								<a onClick={() => { deleteExpireBag(record.bagId) }}><DeleteOutlined style={{ fontSize: '1.15rem', color: '#262626' }} /></a>
								</Col>
							</Tooltip>
						</Row>

					</span>
				),
			},
		];


		return (
			<div>
				<Title>Details Of Disposal Blood Bags</Title>
				<br></br>
				<Table columns={columns} dataSource={bloodBags} style={{ padding: '26px 0px 16px' }} />
			</div>
		)
	}




}

export default DisposaBloodBag
