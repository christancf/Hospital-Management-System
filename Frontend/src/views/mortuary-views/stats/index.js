import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { COLOR_2 } from "constants/ChartConstant";
import mortuaryService from "services/MortuaryService";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);

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
  const series = [
    {
      name: "Desktops",
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
    colors: ["#008FFB"],
    //   colors: [COLOR_2],
    xaxis: {
      categories: key,
    },
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
  } else {
    return (
      <div>
        <Chart options={options} series={series} height={300} />
      </div>
    );
  }
};

export default Home;
