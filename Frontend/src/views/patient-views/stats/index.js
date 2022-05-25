import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Divider, Button, DatePicker,Spin } from "antd";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import moment from "moment";
import patientManagementService from "services/PatientManagement";


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
		  <Home/>
		</div>
  
		<div style={{ textAlign: "right", margin: 20 }}>
		  <Button type="primary" onClick={printDocument}>
			Download PDF
		  </Button>
		</div>
	  </div>
	);
  };

const Home = () => {

	const [categoryLoading, setCategoryLoading] = useState(true);
	const [categoryError, setCategoryError] = useState(false);
	const [categoryFemale, setCategoryFemale] = useState(null);
	const [categoryMale, setCategoryMale] = useState(null);
	const [category, setCategory] = useState(null);

	useEffect(()=>{
		patientManagementService
		.category()
		.then((res) => {
			console.table(res.payload)
			const myData = res.payload;
			var male = [];
			var female = [];
			var category = [
			  ...new Set(
				myData.map((item) => {
				  return item._id.category;
				})
			  ),
			];
	
			for (let i = 0; i < myData.length; i++) {
			  if (myData[i]._id.sex == "Male") {
				male[category.indexOf(myData[i]._id.category)] = myData[i].count;
			  } else {
				female[category.indexOf(myData[i]._id.category)] = myData[i].count;
			  }
			}
			setCategory(category);
			setCategoryMale(male);
			setCategoryFemale(female);
			setCategoryLoading(false);
		  })
		  .catch((err) => {
			setCategoryLoading(false);
			setCategoryError(true);
			setCategory();
			setCategoryMale();
			setCategoryFemale();
		  });
		
	},[])

	const categorySeries = [
		{
		  name: "Male",
		  data: categoryMale,
		},
		{
		  name: "Female",
		  data: categoryFemale,
		},
	  ];
	  const categoryOptions = {
		chart: {
		  type: "bar",
		  height: 350,
		  fontSize: "140px",
		},
		plotOptions: {
		  bar: {
			horizontal: false,
			columnWidth: "40%",
			endingShape: "rounded",
		  },
		},
		dataLabels: {
		  enabled: false,
		},
		stroke: {
		  show: true,
		  width: 2,
		  colors: ["transparent"],
		},
		xaxis: {
		  categories: category,
		},
		yaxis: {
		  title: {
			text: "Number of Patients",
			style: {
			  color: undefined,
			  fontSize: "14px",
			  fontFamily: "Helvetica, Arial, sans-serif",
			  fontWeight: 300,
			  cssClass: "apexcharts-yaxis-title",
			},
		  },
		},
		fill: {
		  opacity: 1,
		  
		},
		tooltip: {
		  y: {
			formatter: function (val) {
			  return val + " patients";
			},
		  },
		},
	  };

	if(categoryLoading){
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={categoryLoading} />
				</center>

			</>
		)
	}
	else if(categoryError){
		return (
			<>
			  <p>Error{categoryError.message}</p>
			</>
		  );
	}
	else{
		return(
			<div style={{ marginLeft: 50, marginRight: 70 }}>
				<Divider style={{ marginTop: 10 }}>
          			<h3>Number of patients vs Ward Category</h3>
        		</Divider>
				<ReactApexChart
					options={categoryOptions}
					series={categorySeries}
					type="bar"
					height={350}
				/>
			</div>
		)
	}
}

export default App
