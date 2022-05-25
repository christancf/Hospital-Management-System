import { Table, Divider, Tag ,Modal,Spin,notification} from 'antd';
import patientManagementService from 'services/PatientManagement';
import { useState, useEffect } from 'react';
import { PATIENT_ROLE , ValidateUser} from 'configs/AppConfig';

ValidateUser(PATIENT_ROLE);
const { confirm } = Modal;

const PatientList = () =>{
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
	
	const openNotification = (title, content) => {
		notification.open({
		  message: title,
		  description: content,
		  onClick: () => {
			console.log('Notification Clicked!');
		  },
		});
	  };

	const patientDischarge = (id) => {

		confirm({
			title: 'Do you want to discharge this patient?',
			content: 'When clicked the OK button, patient will be discharged',
			async onOk() {
			  try {
					return await new Promise((resolve, reject) => {

						patientManagementService.delete(id).then((ress) => {
							openNotification("Successfull !", "Patient Discharged Sucessfully");
							setTimeout(function () {
								window.location.reload(false);
							}, 2000);


						}).catch((errors) => {
							openNotification("Unsuccessfull !", "Patient Discharge Process Failed");

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
			dataIndex: 'dateOfBirth',
			key: 'dateOfBirth',
		},
		{
			title: 'Sex',
			dataIndex: 'sex',
			key: 'sex',
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
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
		{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href={`../patient/update?patientId=${record.patientId}`}>Update</a>
                    <Divider type="vertical" />
                    <a onClick={()=> { patientDischarge(record.patientId)}}>Discharge</a>
                </span>
            ),
        },


	]

	

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

		console.log(data)
		
		for (var i = 0; i < data.length; i++) {
		
			data[i].dateOfBirth = new Date(data[i].dateOfBirth*1000).toLocaleDateString()
		
		  }
		
		  

		return(
			<>
        <h1 className='text-left' >View Patients</h1>
        <Table columns={columns} dataSource={data} />
        </>
		)

	}

}

export default PatientList;

