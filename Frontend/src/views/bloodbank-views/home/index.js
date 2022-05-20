import React, { useState, useEffect,Component } from "react";
import Chart from "react-apexcharts";
import { COLORS} from 'constants/ChartConstant';
import bloodBankService from "services/BloodBankService";
import {Doughnut} from 'react-chartjs-2';
import { COLOR_1, COLOR_2, COLOR_4,COLOR_1_LIGHT,COLOR_2_LIGHT,COLOR_3_LIGHT,COLOR_4_LIGHT,COLOR_3 } from 'constants/ChartConstant';

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [key, setKey] = useState(null);
	const [value, setValue] = useState(null);

	useEffect(() => {
		bloodBankService.bloodBagsCount().then((res) => {
			const myData = res.payload;
			var key = [];
			var value = [];
	
			console.log(myData);

			for (let i = 0; i < myData.length; i++) {
			  key[i] = myData[i]._id;
			  value[i] = myData[i].count;
			}
			setKey(key);
			setValue(value);
			setLoading(false);
		  })
		  .catch((err) => {
			console.log(err);
			setLoading(false);
			setError(true);
			setKey();
			setValue();
		  });
	  }, []);

	  const myData = {
		labels: ['A+', 'A-', 'B+','B-','AB+','AB-','O+','O-'],
  datasets: [
	{
	  data:value,
	  backgroundColor: [COLOR_1, COLOR_4, COLOR_2,COLOR_1_LIGHT,COLOR_2_LIGHT,COLOR_4_LIGHT,COLOR_3_LIGHT,COLOR_3],
		pointBackgroundColor : [COLOR_1, COLOR_4, COLOR_2,COLOR_1_LIGHT,COLOR_2_LIGHT,COLOR_4_LIGHT,COLOR_3_LIGHT,COLOR_3]
	}
  ]
	}

	  const series = [
		{
		  name: "Desktops",
		  data: value,
		},
	  ];

	  const options = {
		chart: {
			type: "pie",
			width: 200,
			zoom: {
			  enabled: false,
			},
		  },
		  xaxis: {
			categories: key,
		  },
		  legend: {
			position: 'bottom'
		},
		colors: COLORS,
		breakpoint: 480,
		// responsive: [{
		// 	type:"donut",
		// 	breakpoint: 480,
		// 	options: {
		// 		chart: {
		// 			width: 200
		// 		},
		// 		legend: {
		// 			position: 'bottom'
		// 		},
		// 		xaxis: {
		// 			categories: key,
		// 		  },
		// 	}
		// }]
	  };

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
	  }
	  else{
		  return (
		<div>
			<Chart options={options} series={series} height={300}/>
			{/* <Doughnut data={myData}/> */}
		</div>
	)
	  }
	
}

export default Home
