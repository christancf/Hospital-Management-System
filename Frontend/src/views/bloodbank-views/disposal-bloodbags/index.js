import React, { useState, useEffect} from 'react';
import { Table, Typography, Spin, Button, Divider, Tag,Modal,notification } from 'antd';
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
			onCancel() {},
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
				// render: text => <a>{text}</a>,
			},
			// {
			// 	title: 'Donation Number',
			// 	dataIndex: 'donationNumber',
			// },
			{
				title: 'Donate Date',
				dataIndex: 'donateDate'
			},
			{
				title: 'Expire Date',
				dataIndex: 'expireDate',
				// render: text => <a>{text}</a>,
				color: 'red'
			},
			// {
			// 	title: 'Place',
			// 	dataIndex: 'place'
			// },
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
				title: 'Action',
				key: 'action',
				render: (text, record) => (

					// <div class="ant-dropdown-trigger ellipsis-dropdown ant-dropdown-open">
					// 	<span role="img" aria-label="ellipsis" class="anticon anticon-ellipsis">
					// 		<svg viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true">
					// 			<path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
					// 		</svg>
					// 	</span>
					// </div>
					<span>
						<a onClick={()=> { deleteExpireBag(record.bagId)}}>Delete </a>
						{/* <a href={`../bloodbank/update-details?bagId=${record.bagId}`}>Edit</a> */}
						{/* <a onClick={() => { showModal(record.bagId) }}>View More</a> */}
						{/* <a onClick={showModal}>View More</a> */}
						<Divider type="vertical" />

					</span>
				),
			},
		];


		return (
			<div>
				<Title>Details Of Disposal Blood Bags</Title>
				<br></br>
				<Table columns={columns} dataSource={bloodBags} />
			</div>
		)
	}




}

export default DisposaBloodBag
