import React from 'react'
import { Row, Spin, Form, Button } from 'antd';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from 'redux/constants/Auth'
import doctorChannellingService from 'services/DoctorChannellingService';
import { DatePicker } from 'antd';
import Chart from "react-apexcharts";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6 } from 'constants/ChartConstant';
import { DOCTOR_CHANNELLING_PREFIX_PATH, APP_PREFIX_PATH, DOCTOR_CHANNELLING_ROLE, ValidateUser } from 'configs/AppConfig'



ValidateUser(DOCTOR_CHANNELLING_ROLE);

const { RangePicker } = DatePicker;

const GetUserName = () => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);

	if (mytoken) {
		var decoded = jwt_decode(mytoken)

		return (
			<>
				{decoded.name}
			</>
		);

	}
	else {
		return (
			<h1>
			</h1>
		);
	}

}

function toTimestamp(strDate) {
	var datum = Date.parse(strDate);
	return datum / 1000;
}

function calculate_age(dob) {
	dob = new Date(dob);
	var diff_ms = Date.now() - dob.getTime();
	var age_dt = new Date(diff_ms);

	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const fetUserEmail = () => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);

	if (mytoken) {
		var decoded = jwt_decode(mytoken)

		return decoded.email;

	}

}

const App = () => {

	const printDocument = () => {
		const input = document.getElementsByClassName("printing-wrapper")[0];
		const pdf = new jsPDF();
		if (pdf) {
			domtoimage.toPng(input).then((imgData) => {
				pdf.addImage(imgData, "PNG", 15, 15, 180, 160);
				pdf.save("download.pdf");
			});
		}
	};

	return (
		<div>
			<div style={{ textAlign: "right", margin: 20 }}>
				<Button type="primary" onClick={printDocument}>
					Download As PDF
				</Button>
			</div>
			<div className="printing-wrapper">
				<Home />
			</div>
			
		</div>

	)
}

const Home = () => {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();
	const [dateRange, setDateRange] = useState();
	//setDateRange([undefined,undefined])


	useEffect(() => {
		doctorChannellingService.getAppointmentsByDateRange(fetUserEmail(),
			dateRange == undefined ? undefined : dateRange[0],
			dateRange == undefined ? undefined : dateRange[1]).then((resp) => {

				if (resp.succuss == true) {

					setData(resp.payload);
					setLoading(false);
				}
				else {
					setData();
					setLoading(false);
				}


			}).catch((err) => {
				setLoading(false);
				setError(true);
				setData();
			});


	}, [dateRange]);

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

		const mapped = data.map((item) => {
			console.log(item.date)
			item.date = new Date(parseInt(item.date) * 1000).toDateString();
			item.age = calculate_age(parseInt(item.birthday) * 1000);
			return item
		})
		console.log(mapped)

		const groupedData1 = mapped.reduce((acc, value) => {
			if (!acc[value.date]) {
				acc[value.date] = 0;
			}
			acc[value.date]++;
			return acc;
		}, {});

		const groupedData2 = mapped.reduce((acc, value) => {
			if (!acc[value.age]) {
				acc[value.age] = 0;
			}
			acc[value.age]++;
			return acc;
		}, {});

		const chart1Config = {
			series: [{
				name: "Patient Count",
				data: Object.values(groupedData1)
			}],
			options: {
				chart: {
					zoom: {
						enabled: false
					}
				},
				colors: [COLOR_1],
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
					enabled: true
				},
				stroke: {
					curve: 'smooth',
					width: 3,
				},
				labels: Object.keys(groupedData1),
				yaxis: {
					opposite: true
				},
				legend: {
					horizontalAlign: 'left'
				}
			}
		}

		const chart2Config = {
			series: [{
				name: "Patient Count",
				data: Object.values(groupedData2)
			}],
			options: {
				chart: {
					zoom: {
						enabled: false
					}
				},
				colors: [COLOR_4],
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
					enabled: true
				},
				stroke: {
					curve: 'smooth',
					width: 3,
				},
				labels: Object.keys(groupedData2),
				yaxis: {
					opposite: true
				},
				legend: {
					horizontalAlign: 'left'
				}
			}
		}

		return (
			<div>
				<Row>
					<h2 className='text-left' >Reports & Statistics  - Dr.<GetUserName />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<Form>
							<Form.Item label=" Date range :" style={{ margin: 20 }}>
								<RangePicker onChange={(val) => {
									if (val == null) {
										setDateRange([undefined, undefined]);
									}
									else {
										setDateRange([toTimestamp(val[0]), toTimestamp(val[1])]);
									}


								}} />
							</Form.Item>
						</Form>

					</h2>


				</Row>

				<div style={{ width: '100%', margin: 'auto', paddingLeft: 80, paddingRight: 80, paddingTop: 20 }}>
					<h2 style={{ textAlign: 'center' }}> Patients Count By Date</h2>
					<Chart
						options={chart1Config.options}
						series={chart1Config.series}
						type="area"
						height={300}
					/>
				</div>

				<div style={{ width: '100%', margin: 'auto', paddingLeft: 80, paddingRight: 80, paddingTop: 20 }}>
					<h2 style={{ textAlign: 'center' }}> Patients Density By Age</h2>
					<Chart
						options={chart2Config.options}
						series={chart2Config.series}
						type="area"
						height={300}
					/>
				</div>

			</div>
		)

	}
}

export default App
