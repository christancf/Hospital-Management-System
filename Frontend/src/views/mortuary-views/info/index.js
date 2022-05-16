import React, { useState, useEffect } from "react";
import { Table, Divider, Button, Input, Select, Row, Col, Form } from "antd";
import mortuaryService from "services/MortuaryService";
import { values } from "lodash";
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const search = (value) => {
    setSearchValue(value);
  };
  const filter = (value) => {
    // console.log(value)
    setFilterData(value);
  };
  return (
    <div>
      <Row>
        <Col>
          <Form
            form={form}
            layout="inline"
            onFinish={(values) => {
              filter(values);
            }}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
          >
            <Form.Item name="cod">
              <Select
                showSearch
                style={{ width: 200, marginRight: 10 }}
                placeholder="Cause of Death"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="Natural">Natural</Option>
                <Option value="Accident">Accident</Option>
                <Option value="Homicide">Homicide</Option>
                <Option value="Suicide">Suicide</Option>
              </Select>
            </Form.Item>

            <Form.Item name="age">
              <Select
                showSearch
                style={{ width: 200, marginRight: 10 }}
                placeholder="Select an age range"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="0">0 - 10</Option>
                <Option value="1">11 - 20</Option>
                <Option value="2">21 - 30</Option>
                <Option value="3">31 - 40</Option>
                <Option value="4">41 - 50</Option>
                <Option value="5">51 - 60</Option>
                <Option value="6">61 - 70</Option>
                <Option value="7">71 - 80</Option>
                <Option value="8">81 - 90</Option>
                <Option value="9">91 - 100</Option>
                <Option value="10">101 - 110</Option>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              Filter
            </Button>
          </Form>
          {/* <Filter onFilter={filter}/> */}
        </Col>
        <Col>
          <Search
            placeholder="Search Name..."
            onSearch={(value) => {
              search(value);
            }}
            style={{ width: 300 }}
            enterButton
          />
        </Col>
      </Row>

      <SearchCorpse value={searchValue} filterDataset={filterData} />
    </div>
  );
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "NIC",
    dataIndex: "NIC",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Cause of Death",
    dataIndex: "cause_of_death",
  },
  {
    title: "Date of Death",
    dataIndex: "date_time_of_death",
  },
  {
    title: "Date of Release",
    dataIndex: "date_of_release",
  },
  {
    title: "Cabinet Number",
    dataIndex: "cabinet_number",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button type="link" href={`/mortuary/update?id=${record.id}`}>
          Edit
        </Button>
        <Divider type="vertical" />
        <Button type="link" href={`/mortuary/release?id=${record.id}`}>
          Release
        </Button>
        <Divider type="vertical" />
        <Button type="link" href={`/mortuary/corpse-info?id=${record.id}`}>
          More Info
        </Button>
      </span>
    ),
  },
];

const SearchCorpse = ({ value, filterDataset }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  filterDataset = JSON.stringify(filterDataset); //convert to JSON string
  filterDataset = JSON.parse(filterDataset); //convert to JSON

  useEffect(() => {
    if (value == null || value == "") {
      mortuaryService
        .getData()
        .then((res) => {
          const mydata = res.payload;
          for (var i = 0; i < mydata.length; i++) {
            if (mydata[i].status == true) mydata[i].status = "In Mortuary";
            else {
              mydata[i].status = "Released";
              mydata[i].date_of_release = new Date(
                mydata[i].date_of_release
              ).toLocaleDateString();
            }
            mydata[i].date_time_of_death = new Date(
              mydata[i].date_time_of_death
            ).toLocaleDateString();
          }

          setData(mydata);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
          setData();
        });
    } else {
      mortuaryService
        .search({ name: value })
        .then((res) => {
          const mydata = res.payload;
          for (var i = 0; i < mydata.length; i++) {
            if (mydata[i].status == true) mydata[i].status = "In Mortuary";
            else {
              mydata[i].status = "Released";
              mydata[i].date_of_release = new Date(
                mydata[i].date_of_release
              ).toLocaleDateString();
            }
            mydata[i].date_time_of_death = new Date(
              mydata[i].date_time_of_death
            ).toLocaleDateString();
          }

          setData(mydata);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
          setData();
        });
    }
    if (filterDataset != null) {
      var low, high;
      var cod = filterDataset.cod;
      var myDate = new Date();

      switch (filterDataset.age) {
        case 0:
          low = myDate.getFullYear() - 0;
          high = myDate.getFullYear - 10;
          break;
        case 1:
          low = myDate.getFullYear() - 11;
          high = myDate.getFullYear - 20;
          break;
        case 2:
          low = myDate.getFullYear() - 21;
          high = myDate.getFullYear - 30;
          break;
        case 3:
          low = myDate.getFullYear() - 31;
          high = myDate.getFullYear - 40;
          break;
        case 4:
          low = myDate.getFullYear() - 41;
          high = myDate.getFullYear - 50;
          break;
        case 5:
          low = myDate.getFullYear() - 51;
          high = myDate.getFullYear - 60;
          break;
        case 6:
          low = myDate.getFullYear() - 61;
          high = myDate.getFullYear - 70;
          break;
        case 7:
          low = myDate.getFullYear() - 71;
          high = myDate.getFullYear - 80;
          break;
        case 8:
          low = myDate.getFullYear() - 81;
          high = myDate.getFullYear - 90;
          break;
        case 9:
          low = myDate.getFullYear() - 91;
          high = myDate.getFullYear - 100;
          break;
        case 10:
          low = myDate.getFullYear() - 101;
          high = myDate.getFullYear - 110;
          break;
        default:
          low = undefined;
          high = undefined;
      }
      mortuaryService
        .filter({
          low: low,
          high: high,
          cod: cod,
        })
        .then((res) => {
          const mydata = res.payload;
          for (var i = 0; i < mydata.length; i++) {
            if (mydata[i].status == true) mydata[i].status = "In Mortuary";
            else {
              mydata[i].status = "Released";
              mydata[i].date_of_release = new Date(
                mydata[i].date_of_release
              ).toLocaleDateString();
            }
            mydata[i].date_time_of_death = new Date(
              mydata[i].date_time_of_death
            ).toLocaleDateString();
          }

          setData(mydata);
          setLoading(false);
        });
    }
  }, [value, filterDataset]);

  if (loading) {
    return (
      <>
        <Table columns={columns} style={{ marginTop: 30 }} />
        <p>Data Loading</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <Table columns={columns} style={{ marginTop: 30 }} />
        <p>Error:{error}</p>
      </>
    );
  } else {
    return (
      <div>
        <Table columns={columns} dataSource={data} style={{ marginTop: 30 }} />
      </div>
    );
  }

  // return (
  //   <div>
  //     <Search
  //       placeholder="Search Name..."
  //       onSearch={(value) => {
  //         SearchCorpse(value);
  //       }}
  //       style={{ width: 300 }}
  //       enterButton
  //     />
  //   </div>
  // );
};

export default Home;
