import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import mortuaryService from "services/MortuaryService";
import { Divider, Button, DatePicker } from "antd";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import moment from "moment";
import {MORTUARY_ROLE, ValidateUser } from 'configs/AppConfig'
const { MonthPicker } = DatePicker;

ValidateUser(MORTUARY_ROLE);



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
  const [month, setMonth] = useState(null);
  function onChange(date, dateString) {
    var m = moment(date).valueOf();
    setMonth(m);
  }
  return (
    <div>
      <div className="printing-wrapper">
      <h4 style={{ marginLeft: 50 }}>Month: <MonthPicker onChange={onChange} placeholder="Select month" /></h4>
        <Home month={month}/>
      </div>

      <div style={{ textAlign: "right", margin: 20 }}>
        <Button type="primary" onClick={printDocument}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};

const Home = ({month}) => {
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(false);
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);

  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(false);
  const [female, setFemale] = useState(null);
  const [male, setMale] = useState(null);
  const [cod, setCod] = useState(null);

 
  useEffect(() => {
    if (month == null) {
    //from all data
    mortuaryService
      .stat()
      .then((res) => {
        const myData = res.payload;
        var key = [];
        var value = [];

        for (let i = 0; i < myData.length; i++) {
          key[i] = myData[i]._id;
          value[i] = myData[i].count;
        }
        setKey(key);
        setValue(value);
        setLoading1(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading1(false);
        setError1(true);
        setKey();
        setValue();
      });
    // graph 2
    mortuaryService
      .stat2()
      .then((res) => {
        const myData = res.payload;
        var male = [];
        var female = [];
        var cod = [
          ...new Set(
            myData.map((item) => {
              return item._id.cod;
            })
          ),
        ];

        for (let i = 0; i < myData.length; i++) {
          if (myData[i]._id.sex == "male") {
            male[cod.indexOf(myData[i]._id.cod)] = myData[i].count;
          } else {
            female[cod.indexOf(myData[i]._id.cod)] = myData[i].count;
          }
        }
        setCod(cod);
        setMale(male);
        setFemale(female);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        setError2(true);
        setCod();
        setMale();
        setFemale();
      });
    } else {
      //according to month
    mortuaryService
      .statMonth({month: month})
      .then((res) => {
        const myData = res.payload;
        var key = [];
        var value = [];

        for (let i = 0; i < myData.length; i++) {
          key[i] = myData[i]._id;
          value[i] = myData[i].count;
        }
        setKey(key);
        setValue(value);
        setLoading1(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading1(false);
        setError1(true);
        setKey();
        setValue();
      });
   // graph 2 according to month
   mortuaryService
   .stat2Month({month: month})
   .then((res) => {
     const myData = res.payload;
     var male = [];
     var female = [];
     var cod = [
       ...new Set(
         myData.map((item) => {
           return item._id.cod;
         })
       ),
     ];

     for (let i = 0; i < myData.length; i++) {
       if (myData[i]._id.sex == "male") {
         male[cod.indexOf(myData[i]._id.cod)] = myData[i].count;
       } else {
         female[cod.indexOf(myData[i]._id.cod)] = myData[i].count;
       }
     }
     if(male == null) {
       setMale(0)
     } else {
      setMale(male);
     }
     if (female == null) {
       setFemale(0)
     } else {
      setFemale(female);
     }
     setCod(cod);
     
     
     setLoading2(false);
   })
   .catch((err) => {
     setLoading2(false);
     setError2(true);
     setCod();
     setMale();
     setFemale();
   });
  }
  }, [month]);
  const series = [
    {
      name: "Number of Deaths",
      data: value,
    },
  ];
  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#7D02EB"],
    xaxis: {
      categories: key,
    },
  };
  const series2 = [
    {
      name: "Male",
      data: male,
    },
    {
      name: "Female",
      data: female,
    },
  ];
  const options2 = {
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
      categories: cod,
    },
    yaxis: {
      title: {
        text: "Number of Deaths",
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
      // colors: ['']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " deaths";
        },
      },
    },
  };

  if (loading1 || loading2) {
    return (
      <>
        <p>Data Loading</p>
      </>
    );
  } else if (error1 || error2) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else if (!(loading1 && loading2)) {
    return (
      <div style={{ marginLeft: 50, marginRight: 70 }}>
        <Divider>
          <h3>Number of Deaths vs Cause of Death</h3>
        </Divider>
        <Chart options={options} series={series} height={300} />
        <Divider style={{ marginTop: 100 }}>
          <h3>Number of Deaths vs Cause of Death</h3>
        </Divider>
        <ReactApexChart
          options={options2}
          series={series2}
          type="bar"
          height={350}
        />
      </div>
    );
  }
};

export default App;
