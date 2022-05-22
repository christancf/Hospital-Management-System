import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import mortuaryService from "services/MortuaryService";
import { Divider } from "antd";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  View,
  usePDF,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "row", backgroundColor: "#E4E4E4" },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});

const App = () => {
  return (
    <div>
      <Home />
      <GeneratePDF />
    </div>
  );
};
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Home />
      </View>
    </Page>
  </Document>
);
const GeneratePDF = () => {
  const [instance, updateInstance] = usePDF({ document: <MyDocument /> });
  if (instance.loading) return <div>Loading ...</div>;
  if (instance.error) return <div>Something went wrong: {instance.error}</div>;
  return (
    <a href={instance.url} download="test.pdf">
      Download
    </a>
  );
};
const Home = () => {
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
      <Document>
        <Page>
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
        </Page>
      </Document>
    );
  }
};

export default App;
