import { Table, Divider, Tag ,Modal,Spin} from 'antd';
import patientManagementService from 'services/PatientManagement';
import { useState, useEffect } from 'react';

const PatientList = () =>{

	const columns = [
		{
			title:"Patient ID",
			dataIndex: "patientId",
			key:"patientId"
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'NIC',
			dataIndex: 'nic',
			key: 'nic',
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dateofBirth',
			key: 'dateofBirth',
		},
		{
			title: 'Sex',
			dataIndex: 'sex',
			key: 'sex',
		},
		{
			title: 'Contact Number',
			dataIndex: 'mobile',
			key: 'mobile',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Blood Group',
			dataIndex: 'bloodGroup',
			key: 'bloodGroup',
		},


	]

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		patientManagementService.patientlist().then((resp) => {
			setData(resp.payload);
			setLoading(false);
		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

	function ShowModel(title, delay, innercontent, isSuccess) {

		if (isSuccess) {
			const modal = Modal.success({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}

		else {
			const modal = Modal.error({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}
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

	else{
		return(
			<>
        <h1 className='text-left' >View Appointments</h1>
        <Table columns={columns} dataSource={data} />
        </>
		)

	}

}

export default PatientList;

