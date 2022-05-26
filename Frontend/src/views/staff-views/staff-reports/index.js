import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { COLORS} from 'constants/ChartConstant';
import staffService from 'services/StaffService';

const StaffReports = () => {

	const [staffCountLoading, setStaffCountLoading] = useState(true)
	const [staffCountError, setStaffCountError] = useState(false)
	const [staffCountData, setStaffCountData] = useState()

	useEffect(() => {
		
		staffService.getStaffCountByDesignation()
		.then((staffCount) => {
			
		})
	})

	state = {
		series: [44, 55, 13, 43, 22],
		options: {
			colors: COLORS,
			labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

	
	return (
		<Chart
			options={this.state.options}
			series={this.state.series}
			height= {300}
			type="pie"
		/>
	)
}



export default StaffReports
