import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import inventoryService from "services/inventoryService";
import { Divider, Button, DatePicker } from "antd";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import moment from "moment";

const { MonthPicker } = DatePicker;


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

const Home = ({month}) => {
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(false);
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);
 
  useEffect(() => {
    //from all data
    inventoryService
      .stat()
      .then((res) => {
        const myData = res.payload;
        var key = [];
        var value = [];

        for (let i = 0; i < myData.length; i++) {
          key[i] = myData[i].item_name;
          value[i] = myData[i].total_quantity;
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

  }, []);
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

  if (loading1) {
    return (
      <>
        <p>Data Loading</p>
      </>
    );
  } else if (error1) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else {
    return (
      <div style={{ marginLeft: 50, marginRight: 70 }}>
        <Divider>
          <h3>Current Availability of Items</h3>
        </Divider>
        <Chart options={options} series={series} height={300} />
      </div>
    );
  }
};

export default App;
