import React, { useState, useEffect } from "react";
import { Table, Divider, Button, Input } from "antd";
import mortuaryService from "services/MortuaryService";
const { Search } = Input;

const Home = () => {
  const [searchValue, setSearchValue] = useState(null);
  const search = (value) => {
    setSearchValue(value)
  }
  return (
    <div>
      <Search
        placeholder="Search Name..."
        onSearch={(value) => {
          search(value);
        }}
        style={{ width: 300 }}
        enterButton
      />
      <SearchCorpse value={searchValue}/>
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

const SearchCorpse = ({value}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

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
        .search({name: value})
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
  }, [value]);

  if (loading) {
    return (
      <>
        <Table columns={columns} />
        <p>Data Loading</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <Table columns={columns} />
        <p>Error:{error}</p>
      </>
    );
  } else {
    return (
      <div>

        <Table columns={columns} dataSource={data} />
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
