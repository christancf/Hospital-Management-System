import React, { useEffect, useState } from 'react'
import wardService from 'services/WardService'
import Chart from "react-apexcharts"
import { COLORS} from 'constants/ChartConstant'
import {Spin, Button, Result, Divider} from 'antd'
import { ValidateUser, WARD_ROLE } from 'configs/AppConfig'
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

ValidateUser(WARD_ROLE)

const Stats = () => {
	return (
		<div>
			<div style={{ textAlign: "right", margin: 20 }}>
        <Button type="primary" onClick={() => window.print()}>
          Download PDF
        </Button>
      </div>
			<div>
				<Divider>
          <h3>Ward Categories vs Assigned Nurses</h3>
        </Divider>
				<Pie />
			</div>
		</div>
	)
}

const Pie = () => {
	const [pieData, setPieData] = useState()
	const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
	
	useEffect(()=> {
		wardService.CategoryVsNurseStat()
		.then(res => {
			setPieData(res)
			console.log('res', res)
			setLoading(false)
		}).catch(e => {
			setLoading(false)
			setError(true)
			setPieData()
		})
	}, [])


	if(loading){
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)
	}else if(error){
		return(
			<Result status="warning" title="We ran into a problem :(" extra={<Button type="primary" onClick={() => {window.location.reload()}} key="refresh">Refresh</Button>}/>
		)
	}
	else{
		const data =
			{
				series: pieData.series,
				options: {
					colors: COLORS,
					labels: pieData.label,
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
			}
		
		return (
			<Chart
				options={data.options}
				series={data.series}
				height= {300}
				type="pie"
			/>
		)
	}
}

export default Stats