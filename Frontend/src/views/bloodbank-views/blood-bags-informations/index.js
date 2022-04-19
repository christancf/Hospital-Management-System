import React, { useState, useEffect } from 'react'
import { Table, Typography, Spin, Tag,Divider } from 'antd';
import bloodBankService from 'services/BloodBankService'

const { Title } = Typography

const BloodBags = () => {

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
		const bloodBags = data.map((response) => {
			return {
				donorName: response.donorName,
				// donorNIC: response.donorNIC,
				donationNumber: response.donationNumber,
				donateDate: response.donateDate,
				place: response.place,
				bloodGroup: response.bloodGroup
			}
		})

		const columns = [
			{
				title: 'Bag ID',
				dataIndex: 'bagID',
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
				<Table columns={columns} dataSource={bloodBags} />
			</div>
		)

	}


}

export default BloodBags


/*this.state={
	bags:[]
};

export default function BloodBags(){

	const[bloodbags,setBloodBags] = useState([]);

	useEffect(()=>{
		function getBloodBags(){
			bloodBankService.readBloodDetails().then(function (res){
				console.log(res)
				bloodbags = setBloodBags(res.details);


					<div>
						<p>p</p>
					</div>

			}).catch(function (error){
				console.log(error)
			});


		}
		getBloodBags();
	},[])

	return(
		<div>

				<div>
					<p>{}</p>
				</div>

		</div>
	)
}
*/

// axios.get

