import React, { useState, useEffect } from "react";
import { List } from "antd";
import mortuaryService from "services/MortuaryService";

const queryParams = new URLSearchParams(window.location.search);
const userID = queryParams.get("id");

const Home = () => {
  return (
    <div>
      <Demo />
    </div>
  );
};

const Demo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    mortuaryService
      .readForOccupiedCorpsePage(userID)
      .then((res) => {
        const mydata = res.payload[0];
        mydata.date_of_birth = new Date(
          mydata.date_of_birth
        ).toLocaleDateString();
        mydata.date_time_of_death = new Date(
          mydata.date_time_of_death
        ).toLocaleString();
        setData(mydata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);
  if (loading) {
    return (
      <>
        <p>Data Loading</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <p>Error: {error}</p>
      </>
    );
  } else {
    let dataset = Object.entries(data)
    dataset[1][0] = 'Name'
    dataset[2][0] = 'Sex'
    dataset[3][0] = 'Address'
    dataset[4][0] = 'Date of Birth'
    dataset[5][0] = 'Date & Time of Death'
    dataset[6][0] = 'Cause of Death'
    dataset[7][0] = 'Specifics of Death'
    dataset[8][0] = 'Cabinet Number'
    // dataset.pop() //remove cabinet number 

    // for(var i = 0; i < 9; i++) {
    //   if(dataset[i][1] == "") {
    //     dataset.pop(i); //remove blank fields
    //   }
    // }
    

    return (
      <div>
        <h1>Data of Corpse {dataset[1][1]}</h1>
        <List
          itemLayout="horizontal"
          dataSource={dataset}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item[0]}
                description={item[1]}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
};
export default Home;
