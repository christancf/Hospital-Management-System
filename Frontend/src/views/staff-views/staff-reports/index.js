import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { COLORS} from 'constants/ChartConstant';
import { COLOR_2 } from 'constants/ChartConstant';
import staffService from 'services/StaffService';
import { STAFF_ROLE, ValidateUser } from 'configs/AppConfig';
import { Button, Divider, Result, Spin } from 'antd';
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import moment from 'moment';

ValidateUser(STAFF_ROLE)

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
		<div className="printing-wrapper">
		  <StaffReports />
		</div>
  
		<div style={{ textAlign: "right", margin: 20 }}>
		  <Button type="primary" onClick={printDocument}>
			Download PDF
		  </Button>
		</div>
	  </div>
	);
  };

const StaffReports = () => {

	const [staffCountLoading, setStaffCountLoading] = useState(true)
	const [staffCountError, setStaffCountError] = useState(false)
	const [staffCountData, setStaffCountData] = useState()

	const [staffAttendanceLoading, setStaffAttendanceLoading] = useState(true)
	const [staffAttendanceError, setStaffAttendanceError] = useState(false)
	const [staffAttendanceData, setStaffAttendanceData] = useState()


	useEffect(() => {
		
		staffService.getStaffCountByDesignation()
		.then((res) => {
			setStaffCountData(res)
			setStaffCountLoading(false)
		})
		.catch((e) => {
			setStaffCountLoading(false)
			setStaffCountError(true)
			setStaffCountData()
		})
		console.log(new Date().getMonth())
		staffService.getAttendanceByDay({month: new Date().getMonth()})
		.then((res) => {
			console.log('res', res)
			setStaffAttendanceData(res)
			setStaffAttendanceLoading(false)
		})
		.catch((e) => {
			setStaffAttendanceLoading(false)
			setStaffAttendanceError(true)
			setStaffAttendanceData()
		})
	}, [])

	if(staffCountLoading || staffAttendanceLoading){
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={staffCountLoading} />
				</center>

			</>
		)
	}else if(staffCountError || staffAttendanceError){
		return(
			<Result status="warning" title="We ran into a problem :(" extra={<Button type="primary" onClick={() => {window.location.reload()}} key="refresh">Refresh</Button>}/>
		)
	}
	else if(!staffAttendanceLoading && !staffCountLoading){

		const staffCount = {
			series: staffCountData.series,
			options: {
				colors: COLORS,
				labels: staffCountData.label,
				responsive: [{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: 'bottom'
						}
					}
				}]
			}
		};

		const staffAttendance = {
			
			series: [{
				name: "Attendance",
				data: staffAttendanceData.series
			}],
			options: {
				chart: {
					type: 'line',
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth',
					width: 3,
				},
				colors: [COLOR_2],
				xaxis: {
					categories: moment(staffAttendanceData.category),
				}
			}
		};
	

		return (

			<div style={{ marginLeft: 50, marginRight: 70 }}>
				<Divider>
				<h3>Staff Count vs Designation</h3>
				</Divider>

				<Chart
					options={staffCount.options}
					series={staffCount.series}
					height= {300}
					type="pie"
				/>

				<Divider style={{ marginTop: 100 }}>
				<h3>Staff Attendance by Day</h3>
				</Divider>

				<Chart
					options={staffAttendance.options}
					series={staffAttendance.series}
					height= {300}
				/>
		  </div>
		)
		
	}
	
}

export default App
