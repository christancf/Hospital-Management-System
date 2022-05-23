import React, { useState, useEffect, Component } from "react";
import { Typography, Button, Card, Col, Row } from 'antd';
import Chart from "react-apexcharts";
import { COLORS } from 'constants/ChartConstant';
import bloodBankService from "services/BloodBankService";
import { Doughnut } from 'react-chartjs-2';
import { COLOR_1, COLOR_2, COLOR_4, COLOR_1_LIGHT, COLOR_2_LIGHT, COLOR_3_LIGHT, COLOR_4_LIGHT, COLOR_3 } from 'constants/ChartConstant';

const { Title } = Typography

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [key, setKey] = useState();
	const [value, setValue] = useState();

	const [Aailable_loading, Aailable_setLoading] = useState(true);
	const [Aailable_error, Aailable_setError] = useState(false);
	const [Aailable_key, Aailable_setKey] = useState(null);
	const [Aailable_value, Aailable_setValue] = useState(null);

	const [transfusion_loading, transfusion_setLoading] = useState(true);
	const [transfusion_error, transfusion_setError] = useState(false);
	const [transfusion_key, transfusion_setKey] = useState(null);
	const [transfusion_value, transfusion_setValue] = useState(null);


	useEffect(() => {
		bloodBankService.bloodBagsCount().then((res) => {
			// const myData = res.payload;
			// var key = [];
			// var value = [];

			// console.log(myData);

			// for (let i = 0; i < myData.length; i++) {
			// 	key[i] = myData[i]._id;
			// 	value[i] = myData[i].count;
			// }
			setKey(res.payload);
			setValue(res.payload);
			setLoading(false);
		})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setError(true);
				setKey();
				setValue();
			});

		bloodBankService.availableBagCount().then((res) => {
			// const Available_myData = res.payload;
			// var Available_key = [];
			// var Available_value = [];

			// console.log(Available_myData);

			// for (let i = 0; i < Available_myData.length; i++) {
			// 	Available_key[i] = Available_myData[i]._id;
			// 	Available_value[i] = Available_myData[i].count;
			// }
			// Aailable_setKey(res.payload);
			Aailable_setValue(res.payload);
			Aailable_setLoading(false);
		})
			.catch((err) => {
				console.log(err);
				Aailable_setLoading(false);
				Aailable_setError(true);
				Aailable_setKey();
				Aailable_setValue();
			});

		bloodBankService.transfusionCount().then((res) => {
			const transfusion_myData = res.payload;
			var transfusion_key = [];
			var transfusion_value = [... new Set(transfusion_myData.map((item) => {
				return item._id.transfusion_value;
			}))];

			for (let i = 0; i < transfusion_myData.length; i++) {
				transfusion_key[i] = transfusion_myData[i]._id;
				transfusion_value[i] = transfusion_myData[i].count;
				// transfusion_value.indexOf(transfusion_myData[i]._id.transfusion_value) = transfusion_myData[i].count;
			}
			transfusion_setKey(transfusion_key);
			transfusion_setValue(transfusion_value);
			transfusion_setLoading(false);
		})
			.catch((err) => {
				console.log(err);
				transfusion_setLoading(false);
				transfusion_setError(true);

				transfusion_setValue();
			});
	}, []);



	// 	  const myData = {
	// 		labels: ['A+', 'A-', 'B+','B-','AB+','AB-','O+','O-'],
	//   datasets: [
	// 	{
	// 	  data:value,
	// 	  backgroundColor: [COLOR_1, COLOR_4, COLOR_2,COLOR_1_LIGHT,COLOR_2_LIGHT,COLOR_4_LIGHT,COLOR_3_LIGHT,COLOR_3],
	// 		pointBackgroundColor : [COLOR_1, COLOR_4, COLOR_2,COLOR_1_LIGHT,COLOR_2_LIGHT,COLOR_4_LIGHT,COLOR_3_LIGHT,COLOR_3]
	// 	}
	//   ]
	// 	}




	if (loading) {
		return (
			<>
				<p>Data Loading</p>
			</>
		);
	} else if (error) {
		return (
			<>
				<p>Error:{error}</p>
			</>
		);
	} else if (Aailable_loading) {
		return (
			<>
				<p>Data Loading</p>
			</>
		);
	} else if (Aailable_error) {
		return (
			<>
				<p>Error:{error}</p>
			</>
		);
	} else if (transfusion_loading) {
		return (
			<>
				<p>Data Loading</p>
			</>
		);
	} else if (transfusion_error) {
		return (
			<>
				<p>Error:{error}</p>
			</>
		);
	}
	else {

		// const myData = {
		// 	labels: [key[0]._id, key[1]._id, key[2]._id, key[3]._id, key[4]._id, key[5]._id, key[6]._id, key[7]._id],
		// 	datasets: [
		// 		{
		// 			data: [value[0].count,value[1].count,value[2].count,value[3].count,value[4].count,value[5].count,value[6].count,value[7].count,],
		// 			backgroundColor: ['#008FFB', COLOR_4, COLOR_2, COLOR_1_LIGHT, COLOR_2_LIGHT, COLOR_4_LIGHT, COLOR_3_LIGHT, COLOR_3],
		// 			pointBackgroundColor: [COLOR_1, COLOR_4, COLOR_2, COLOR_1_LIGHT, COLOR_2_LIGHT, COLOR_4_LIGHT, COLOR_3_LIGHT, COLOR_3]
		// 		}
		// 	]
		// }

		const transfusion_series = [
			{
				name: "Number of blood bags",
				data: transfusion_value,
			},
		];

		const transfusion_options = {
			chart: {
				type: 'bar',
				height: 350,
				fontSize: "140px"
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '40%',
					endingShape: 'rounded'
				},
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			xaxis: {
				categories: transfusion_key
			},
			yaxis: {
				title: {
					text: 'Number of blood bags',
					style: {
						color: undefined,
						fontSize: '14px',
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 300,
						cssClass: 'apexcharts-yaxis-title',
					}
				}
				,
			},
			fill: {
				opacity: 1,
				colors: ['#9D174D', '#EC4899', '#160C28']
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + " bags"
					}
				}
			}
		};

		const series = [value[0].count, value[1].count, value[2].count, value[3].count, value[4].count, value[5].count, value[6].count, value[7].count];

		const options = {

			colors: ['#9D174D', '#EC4899', '#160C28', '#5B5296', '#064E3B', '#34D399', '#F59E0B', '#FACC15'],
			labels: [key[0]._id, key[1]._id, key[2]._id, key[3]._id, key[4]._id, key[5]._id, key[6]._id, key[7]._id],
			responsive: [{
				type: "donut",
				breakpoint: 500,
				options: {
					chart: {
						width: 500
					},
					legend: {
						position: 'bottom'
					}

				}
			}],
			legend: { offsetX: 10 }

		};
		return (
			<div>
{/* 
				<div style={{ padding: '26px 800px 16px',color: 'blue' }}>
					<p >Available blood count:{Aailable_value[0].count}</p>
				</div>

				<div style={{ padding: '26px 1020px 16px' }}  >
					<Button type="primary" href='/bloodbank/add-details'>Add Blood Bag</Button>
				</div>

				<div style={{ padding: '26px 1020px 16px' }}>
					<Button type="primary" href='/bloodbank/bags-informations'>Available Blood Bags</Button>
				</div> */}

				<Title style={{ padding: '36px 0px 16px' }}>Available Blood Bags</Title>
				{/* <div >
					<Doughnut data={myData} width='300'legend={{position:"right"}}/>
				</div> */}
				<div >
					<Row  >
						<Col span={130} display="block">
							<Card style={{ backgroundColor: '#efefef', width: "700px" }}>
								<Chart options={options} series={series} height={300} width={600} type="donut" />
							</Card>
						</Col>

						<Col span={100}  >
							<Card style={{ backgroundColor: '#efefef', width: "500px", marginLeft: "10px" }}>
								<Row>
									<Row>		
									<h1 style={{ padding: '26px 800px 16px' ,color: 'blue'}} >Available blood count:{Aailable_value[0].count}</h1>
									
									</Row>
									
									<Col span={14}>
										<Button type="primary" href='/bloodbank/add-details' padding='36px 0px 16px'>Add Blood Bag</Button>
									</Col>
									<Col span={10}>
										<Button type="primary" href='/bloodbank/bags-informations' padding='36px 0px 16px'>Available Blood Bags</Button>
									</Col>

								</Row>

							</Card>
						</Col>
					</Row>

				</div>


				<Title style={{ padding: '36px 0px 16px' }}>Analysis Of Blood Transfusion</Title>

				<Card style={{ backgroundColor: '#efefef' }}>
					<Chart options={transfusion_options} series={transfusion_series} type="bar" height={300} />
				</Card>


			</div>
		)
	}

}

export default Home
