import React, { useState, useEffect,Modal,Component } from 'react';
import { Table, Typography, Spin, Button, Divider, Tag } from 'antd';
import Chart from "react-apexcharts";
import { COLORS} from 'constants/ChartConstant';

import bloodBankService from 'services/BloodBankService'

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
	else{



		
		return (
		<div>
			<Title>Details Of Disposal Blood Bags</Title>
		</div>
	)
	}



	
}

export default DisposaBloodBag
