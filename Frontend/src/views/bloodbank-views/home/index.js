import React, { useState, useEffect, Component } from "react";
import { Typography, Button, Card, Col, Row } from 'antd';
import Chart from "react-apexcharts";
import bloodBankService from "services/BloodBankService";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const { Title } = Typography

const App = () => {
	const printDocument = () => {
	  const input = document.getElementsByClassName("printing-wrapper")[0];
	  const pdf = new jsPDF();
	  if (pdf) {
		domtoimage.toPng(input).then((imgData) => {
		  pdf.addImage(imgData, "PNG", 10, 10, 0, 210);
		  pdf.save("download.pdf");
		});
	  }
	};
  
	return (
	  <div>
		<div className="printing-wrapper">
		  <Home />
		</div>
  
		<div style={{ textAlign: "right", margin: 20 }}>
		  <Button type="primary" onClick={printDocument}>
			Download PDF
		  </Button>
		</div>
	  </div>
	);
  };

  function expireNotification(){

  }
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

	const [bagMonth_loading, bagMonth_setLoading] = useState(true);
	const [bagMonth_error, bagMonth_setError] = useState(false);
	const [bagMonth_key, bagMonth_setKey] = useState(null);
	const [bagMonth_value, bagMonth_setValue] = useState(null);

	const [notification_loading, notification_setLoading] = useState(true);
	const [notification_error, notification_setError] = useState(false);
	const [notification_value, notification_setValue] = useState();


	useEffect(() => {
		bloodBankService.bloodBagsCount().then((res) => {
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

		bloodBankService.bagCountAsMonth().then((res) => {
			const bagCountMonth = res.payload;
			var bagMonthKey = [];
			var bagMonthValue = [0,0,0,0,0];

			var month = [1,2,3,4,5,6,7,8,9,10,11,12]
			console.log(bagCountMonth)
			for (let i = 0; i < bagCountMonth.length; i++) {
				bagMonthValue[month.indexOf(bagCountMonth[i]._id.month)] = bagCountMonth[i].count;
			}

			bagMonth_setKey(bagMonthKey);
			bagMonth_setValue(bagMonthValue);
			bagMonth_setLoading(false);
			console.log(bagMonth_key)
			console.log(bagMonth_value)
		})
			.catch((err) => {
				bagMonth_setLoading(false);
				bagMonth_setLoading(true);
				bagMonth_setError(true);
				bagMonth_setValue();
			});

	}, []);

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
	} else if (bagMonth_loading) {
		return (
			<>
				<p>Data Loading</p>
			</>
		);
	} else if (bagMonth_error) {
		return (
			<>
				<p>Error:{error}</p>
			</>
		);
	}
	// else if (notification_loading) {
	// 	return (
	// 		<>
	// 			<p>Data Loading</p>
	// 		</>
	// 	);
	// } else if (notification_error) {
	// 	return (
	// 		<>
	// 			<p>Error:{error}</p>
	// 		</>
	// 	);
	// }
	else {
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
				colors: ['#9D174D']
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

		//series2
		const series2 = [
			{
				name: "Number of Bags",
				data: bagMonth_value,
			},
		];

		const options2 = {
			chart: {
				zoom: {
					enabled: false
				}
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 80, 100]
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'smooth',
				width: 3,
			},
			
			labels: bagMonth_key,

			colors: ["#7D02EB"],
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
			},
			legend: {
				horizontalAlign: 'left'
			},
			// yaxis: {
			// 	title: {
			// 		text: "Number of Blood Bags",
			// 		style: {
			// 			color: undefined,
			// 			fontSize: "14px",
			// 			fontFamily: "Helvetica, Arial, sans-serif",
			// 			fontWeight: 300,
			// 			cssClass: "apexcharts-yaxis-title",
			// 		},
			// 	},
			// },
			// xaxis: {
			// 	type: 'datetime',
			// },
			yaxis: {
				opposite: false
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + " Bags";
					},
				},
			},
		};


		return (
			<div>
				<div >
					<Row gutter={16}>
						<Col span={130} display="block">
							<Card style={{ backgroundColor: '#efefef', width: "700px",marginLeft:"30px" }}>
								<Chart options={options} series={series} height={300} width={600} type="donut" />
							</Card>
						</Col>

						<Col span={100}  >
							<Card style={{ backgroundColor: '#efefef', width: "400px", marginLeft: "30px", title: "Card title" }}>
								<Row>
									<Col span={20} marginRight='100px'>
										<h3 style={{ color: 'blue' }} >Available blood count:{Aailable_value[0].count}</h3>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button type="primary" href='/bloodbank/add-details' padding='36px 0px 16px'>Add Blood Bag</Button>
									</Col>
									<Col >
										<Button type="primary" href='/bloodbank/bags-informations' style={{padding:'36px 10px 16px' ,marginLeft:'10px'}}>Available Blood Bags</Button>
									</Col>

								</Row>

							</Card>
						</Col>
					</Row>

				</div>
				<Title style={{ padding: '36px 0px 16px' }}>Analysis Of Blood bag </Title>

				<Card style={{ backgroundColor: '#efefef' }}>
					<Chart options={options2} series={series2} type="area" height={300} />
				</Card>

				<Title style={{ padding: '36px 0px 16px' }}>Analysis Of Blood Transfusion</Title>

				<Card style={{ backgroundColor: '#efefef' }}>
					<Chart options={transfusion_options} series={transfusion_series} type="bar" height={300} />
				</Card>


			</div>
		)
	}

}

export default App
