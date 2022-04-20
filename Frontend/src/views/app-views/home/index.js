import React from 'react'
import { Card , Button} from 'antd'
import { MORTUARY_PREFIX_PATH, PATIENT_PREFIX_PATH, STAFF_PREFIX_PATH, WARD_PREFIX_PATH,} from 'configs/AppConfig'
const Home = () => {
	return (
		<div>
			<Ward />
			<Mortuary/>
			<Staff/>
			<Patient/>
		</div>
	)
}

const Ward = () => {
	return(
		<div>
			<Card title="Ward Management" style={{ width: 300, height: 300 }}>
				<Button type="link" htmlType="button" href={WARD_PREFIX_PATH + '/home'}>
					Login
				</Button>
			</Card>
		</div>

	)
}

const Mortuary = () => {
	return(
		<div>
			<Card title="Mortuary Management" style={{ width: 300, height: 300 }}>
				<Button type="link" htmlType="button" href={MORTUARY_PREFIX_PATH + '/home'}>
					Login
				</Button>
			</Card>
		</div>
	)
}

const Patient = () => {
	return(
		<div>
			<Card title="Patient Management" style={{ width: 300, height: 300 }}>
				<Button type="link" htmlType="button" href={PATIENT_PREFIX_PATH + '/home'}>
					Login
				</Button>
			</Card>
		</div>
	)
}
const Staff = () => {
	return(
		<div>
			<Card title="Staff Management" style={{ width: 300, height: 300 }}>
				<Button type="link" htmlType="button" href={STAFF_PREFIX_PATH + '/home'}>
					Login
				</Button>
			</Card>
		</div>
	)
}
export default Home
