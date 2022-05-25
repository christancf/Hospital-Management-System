import React, { useState, useEffect } from "react";
import { List, Card } from "antd";
import mortuaryService from "services/MortuaryService";
import { TagsOutlined } from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import Flex from "components/shared-components/Flex";

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
        Object.keys(mydata).forEach((key) => {
          if (
            mydata[key] === null ||
            mydata[key] == false ||
            mydata[key] == true ||
            mydata[key] == ""
          ) {
            delete mydata[key];
          }
        });

        mydata.date_of_birth = new Date(
          mydata.date_of_birth
        ).toLocaleDateString();
        mydata.date_time_of_death = new Date(
          mydata.date_time_of_death
        ).toLocaleString();
        if (mydata.date_of_release != null) {
          mydata.date_of_release = new Date(
            mydata.date_of_release
          ).toLocaleString();
        }
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
    let dataset = Object.entries(data);
    function capitalize(s) {
      s = s.replaceAll("_", " ");
      const arr = s.split(" ");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      return str2;
    }
    for (let i = 1; i < dataset.length; i++) {
      dataset[i][0] = capitalize(dataset[i][0]);
    }
    dataset[2][1] = capitalize(dataset[2][1]);

    var newData = [];
    for (let i = 0; i < dataset.length; i++) {
      let data = {
        title: dataset[i][0],
        icon: TagsOutlined,
        desc: dataset[i][1],
      };
      newData.push(data);
    }
    console.log(newData);
    return (
      <div>
        <h3 style={{ width: "100%", textAlign: "center" }}>
          Data of Corpse : {dataset[1][1]}
        </h3>
        <Card
          style={{
            width: "50%",
            margin: "auto",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={newData}
            renderItem={(item) => (
              // <List.Item>
              //   <List.Item.Meta title={item[0]} description={item[1]} />
              // </List.Item>
              <List.Item>
                <Flex
                  justifyContent="between"
                  alignItems="center"
                  // className="w-100"
                >
                  <div className="d-flex align-items-center">
                    <Icon className="h1 mb-0 text-primary" type={item.icon} />
                    <div className="ml-3">
                      <h4 className="mb-0">{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </Flex>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
};
export default Home;
