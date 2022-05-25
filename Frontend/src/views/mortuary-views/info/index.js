import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Divider,
  Button,
  Input,
  Select,
  Row,
  Col,
  Form,
  DatePicker,
} from "antd";
import moment from "moment";
import mortuaryService from "services/MortuaryService";

const { Search } = Input;
const { Option } = Select;

function disabledDate(current) {
  // Can not select days after today
  return current && current > moment().endOf("day");
}

const Home = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedVal, setSelectedVal] = useState();
  const search = (value) => {
    setFilterData(null);
    setSearchValue(value);
  };
  const filter = (value) => {
    setSearchValue(null);
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
              if (values.dod == undefined) {
                filter(values);
                form.resetFields();
              } else {
                values.dod = moment(values.dod).valueOf();
                filter(values);
                form.resetFields();
              }
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
                placeholder="Age range"
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
            <Form.Item name="dod">
              <DatePicker
                placeholder="Date of Death"
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
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
            value={selectedVal}
            onSearch={(value) => {
              search(value);
              setSelectedVal();
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
    render: (tag) => (
      <span>
        {tag == "Natural" && (
          <Tag color="green" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
        {tag == "Suicide" && (
          <Tag color="gold" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
        {tag == "Homicide" && (
          <Tag color="purple" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
        {tag == "Accident" && (
          <Tag color="volcano" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
      </span>
    ),
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
    render: (tag) => (
      <span>
        {tag == "Released" && (
          <Tag color="green" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
        {tag == "In Mortuary" && (
          <Tag color="volcano" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )}
      </span>
    ),
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
        <Button type="link" href={`/mortuary/corpse-info?id=${record.id}`}>
          More Info
        </Button>
        <Divider type="vertical" />
        {record.status == "In Mortuary" && (
          <Button type="link" href={`/mortuary/release?id=${record.id}`}>
            Release
          </Button>
        )}
      </span>
    ),
  },
];


const SearchCorpse = ({ value, filterDataset }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (filterDataset != null) {
      // console.log(filterDataset)
      var low = undefined;
      var high = undefined;
      var cod = filterDataset.cod;
      var dod = filterDataset.dod;
      function agecheck(index) {
        if (index == 0) {
          var myDate = new Date();
          low = myDate.setFullYear(myDate.getFullYear() - 0);
          var myDate = new Date();
          high = myDate.setFullYear(myDate.getFullYear() - 10);
        } else {
          var myDate = new Date();

          low = myDate.setFullYear(myDate.getFullYear() - (index * 10 + 1));
          var myDate = new Date();

          high = myDate.setFullYear(myDate.getFullYear() - (index + 1) * 10);
        }
      }

      agecheck(parseInt(filterDataset.age));
      mortuaryService
        .filter({
          low: low,
          high: high,
          cod: cod,
          dod: dod,
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
    } else if (value == null || value == "") {
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
    } else if (value != null) {
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
};

export default Home;
