import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Button, Select, Card, Spin, Modal, Col, Table, Descriptions } from 'antd';
import billingService from 'services/BillingService';
const { Option } = Select;


const Home = () => {

	
	const [patientLoading, setPatientLoading] = useState(true);
	const [patientname, setPatientname] = useState([]);
	const [patientError, setPatientError] = useState(false);
	const [patientData, setPatientData] = useState();
  
	const [transactionLoading, setTransactionLoading] = useState(true);
	const [transactionError, setTransactionError] = useState(false);
	const [transactionData, setTransactionData] = useState();
  
  
	const itemColumns = [
	  {
		title: 'Item ID',
		dataIndex: 'id',
		key: 'itemId',
	  },
	  {
		title: 'Quantity',
		dataIndex: 'count',
		key: 'qty',
	  },
	  {
		title: 'Item Charge',
		dataIndex: 'charge',
		key: 'charge',
	  },
	  {
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
	  }
	];
	const roomColumns = [
	  {
		title: 'Room ID',
		dataIndex: 'id',
		key: 'itemId',
	  },
	  {
		title: 'Hours',
		dataIndex: 'count',
		key: 'qty',
	  },
	  {
		title: 'Price per Hour',
		dataIndex: 'charge',
		key: 'charge',
	  },
	  {
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
	  }
	];
  
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
  
	useEffect(() => {
  
  
	  billingService.getAllPatients().then((resp) => {
		setPatientData(resp.payload);
		setPatientLoading(false);
  
	  }).catch((err) => {
		setPatientLoading(false);
		setPatientError(true);
		setPatientData();
	  });

	}, []);
  
	useEffect(() => {
	  let TransactionListItem = {}
	  let TransactionListRoom = {}
	  console.log(patientname)
	  billingService.getAllTransactionToPatient(patientname[0]).then((resp) => {
  
		TransactionListItem = resp.payload.filter((t) =>{return t.type==="item"}).map((transaction)=>{
		  return {
			id: transaction.id,
			count: transaction.count,
			charge: transaction.charge,
			total: transaction.total
		  }
		})
		TransactionListRoom = resp.payload.filter((t) =>{return t.type==="room"}).map((transaction)=>{
		  return {
			id: transaction.id,
			count: transaction.count,
			charge: transaction.charge,
			total: transaction.total
		  }
		})
		
		setTransactionData([TransactionListItem,TransactionListRoom]);
		setTransactionLoading(false);
  
	  }).catch((err) => {
		setTransactionLoading(false);
		setTransactionError(true);
		setTransactionData();
	  });
	},[patientname])	
  
	if (!patientLoading) {
  
	  const optionList = patientData.map((patient) => {
		return (
		  <Option value={[patient.patientId,patient.fullName ]}>{patient.patientId} - {patient.fullName}</Option>
		)
	  })
  
		  return (
			<>
			  
		
				  
				<Col span={12}> <Card style={{ width: 1225, height: 800,}}>
				<h2 className='text-center'>Patient Bill</h2>

				<Form>
					<Form.Item name="patientid" 
					  label="Patient ID" rules={[{ required: true }]}>
					  <Select style={{ width: 300}}
						showSearch
						placeholder="Select a Patient"
						optionFilterProp="children"
						onChange={c => {setPatientname(c)}}
					  >
						{optionList}
					  </Select>
					</Form.Item>
				  </Form>
	
				  {!transactionLoading ? <>
					<Table columns={itemColumns} dataSource={transactionData[0]} />
					<Table columns={roomColumns} dataSource={transactionData[1]} />	
					
					<Descriptions title="  ">
						<Descriptions.Item label="Total Before Tax">  </Descriptions.Item>
						<Descriptions.Item label="Tax">  </Descriptions.Item>
						<Descriptions.Item label="Total">  </Descriptions.Item>
					</Descriptions>
				  </> : <></>}

			

					<Form.Item>
				  <Button  shape="round" className="mr-2" type="primary" htmlType="submit" style={{ marginRight: 30 }}>
                      print
                    </Button>

					<Button shape="round" className="mr-2" type="primary" htmlType="submit">
                      Paid
                    </Button></Form.Item>
				</Card>
				</Col>	
			
			</>
		  )
	
		}
		else {
		  return (
			<>
			  <center>
				<Spin size="large" tip="Loading..." delay={500} spinning={patientLoading} />
			  </center>
	
			</>
		  )
		}
	  }
	
export default Home
