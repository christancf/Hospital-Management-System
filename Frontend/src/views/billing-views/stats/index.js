import React from "react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import billingService from "services/BillingService";
import { Button, Divider } from "antd";
import Chart from "react-apexcharts";

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

const Home = () => {
  const [billingValueLoading, setBillingValueLoading] = useState(true);
  const [billingValueError, setBillingValueError] = useState(false);
  const [billingValue, setBillingValue] = useState(null);

  useEffect(() => {
    billingService
      .stat()
      .then((res) => {
        const data = res.payload;
        // var bagMonthKey = [];
        var billingMonthValue = [0, 0, 0, 0, 0];

        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // console.log(bagCountMonth)
        for (let i = 0; i < data.length; i++) {
          billingMonthValue[month.indexOf(data[i]._id)] = data[i].totalIncome;
        }
        setBillingValue(billingMonthValue);
        setBillingValueLoading(false);
      })
      .catch((err) => {
        setBillingValueLoading(true);
        setBillingValueError(true);
        setBillingValue();
      });
  }, []);
  const series = [
    {
      name: "Total Income",
      data: billingValue,
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
  };
  if (billingValueLoading) {
    return (
      <>
        <p>Data Loading</p>
      </>
    );
  } else if (billingValueError) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else {
    return (
      <div style={{ marginLeft: 50, marginRight: 70 }}>
        <Divider>
          <h3>Income for year 2022 so far</h3>
        </Divider>
        <Chart options={options} series={series} height={300} />
      </div>
    );
  }
};
export default App;