import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Divider, Button, DatePicker,Spin,Card,Statistic, Row } from "antd";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import moment from "moment";
import patientManagementService from "services/PatientManagement";
import { PATIENT_ROLE , ValidateUser} from 'configs/AppConfig';

ValidateUser(PATIENT_ROLE);


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

	const[countLoading,setCountLoading] =useState(true);
	const[countError,setCountError] = useState(false);
	const[count,setCount] = useState([]);

	useEffect(()=>{
		patientManagementService
		.categoryStat()
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

		  patientManagementService
		.patientCount()
		.then((res) => {
			const data =res.payload;
			const arr =[];
			for(let i=0;i<data.length;i++){
				if(data[i]._id.status){
					arr[0]=data[i].count
				}else{
					arr[1]=data[i].count
				}
			}
			setCount(arr)
			setCountLoading(false);
		  })
		  .catch((err) => {
			setCountLoading(false);
			setCountError(true);
			setCount();
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

	if(categoryLoading||countLoading){
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={categoryLoading} />
				</center>

			</>
		)
	}
	else if(categoryError||countError){
		return (
			<>
			  <p>Error{categoryError.message}</p>
			</>
		  );
	}
	else{
		console.log(count)
		return(
			<div style={{ marginLeft: 50, marginRight: 70 }}>
				<Divider style={{ marginTop: 10 }}>
          			<h3>Number of patients</h3>
					 <Row>
					<Card>
					<Statistic
						title="Currently Admitted Patients"
						value={count[0]}
						valueStyle={{ color: '#3f8600' }}
					/>
					
        			</Card>
					<Card>
					<Statistic
						title="Total Number of Patients"
						value={count[0]+count[1]}
						
					/>
        			</Card>
					</Row> 
        		</Divider>
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
