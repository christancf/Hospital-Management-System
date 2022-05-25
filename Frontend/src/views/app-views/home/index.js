import React from 'react'
import { Card , Button, Row, Col} from 'antd'
import { AUTH_PREFIX_PATH, BILLING_PREFIX_PATH, BLOODBANK_PREFIX_PATH, CHANNELLING_PREFIX_PATH, DOCTOR_CHANNELLING_PREFIX_PATH, FRONTLINE_CHANNELLING_PREFIX_PATH, INVENTORY_PREFIX_PATH, MORTUARY_PREFIX_PATH, PATIENT_PREFIX_PATH, STAFF_PREFIX_PATH, WARD_PREFIX_PATH,} from 'configs/AppConfig'
const Home = () => {
	return (
		<div>
			<Row style={{paddingLeft:50, marginTop:50}}>
				<Col span={6}><Ward /></Col>
				<Col span={6}><Mortuary /></Col>
				<Col span={6}><Staff /></Col>
				<Col span={6}><Patient /></Col>	
			</Row>
			<Row style={{paddingLeft:50}}>
				<Col span={6}><Inventory /></Col>
				<Col span={6}><Channeling /></Col>
				<Col span={6}><BloodBank /></Col>
				<Col span={6}><Billing /></Col>	
			</Row>
		</div>
	)
}

const Ward = () => {
	return(
		<div>
			<Card title="Ward Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${WARD_PREFIX_PATH}`} style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>

	)
}

const Mortuary = () => {
	return(
		<div>
			<Card title="Mortuary Management" style={{ width: 300, height: 200, textAlign:'center'}}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${MORTUARY_PREFIX_PATH}`} style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}

const Patient = () => {
	return(
		<div>
			<Card title="Patient Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${PATIENT_PREFIX_PATH}`} style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}
const Staff = () => {
	return(
		<div>
			<Card title="Staff Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${STAFF_PREFIX_PATH}`} style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}
const Inventory = () => {
	return(
		<div>
			<Card title="Inventory Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${INVENTORY_PREFIX_PATH}`} style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}
const Channeling = () => {
	return(
		<div>
			<Card title="Channeling Management" style={{ width: 300, height: 200, textAlign:'center' }}>

				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${FRONTLINE_CHANNELLING_PREFIX_PATH}`} style={{borderRadius:30}}>
					Front Line Channelling -Login
				</Button>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${DOCTOR_CHANNELLING_PREFIX_PATH}`}style={{marginTop:20, borderRadius:30}}>
					Doctor Channelling -Login
				</Button>
			</Card>
		</div>
	)
}
const BloodBank = () => {
	return(
		<div>
			<Card title="Blood Bank Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${BLOODBANK_PREFIX_PATH}`}style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}
const Billing = () => {
	return(
		<div>
			<Card title="Billing Management" style={{ width: 300, height: 200, textAlign:'center' }}>
				<Button type="primary" htmlType="button" href={`${AUTH_PREFIX_PATH}${BILLING_PREFIX_PATH}`}style={{borderRadius:30}}>
					Login
				</Button>
			</Card>
		</div>
	)
}
export default Home
