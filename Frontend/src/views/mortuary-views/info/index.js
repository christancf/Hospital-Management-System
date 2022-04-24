import React, { useState, useEffect } from 'react';
import { Table, Divider, Button } from 'antd';
import mortuaryService from 'services/MortuaryService';
const Home = () => {
  return (
    <div>
      <Demo />
    </div>
  )
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'NIC',
    dataIndex: 'NIC',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cause of Death',
    dataIndex: 'cause_of_death',
  },
  {
    title: 'Date of Death',
    dataIndex: 'date_time_of_death',
  },
  {
    title: 'Date of Release',
    dataIndex: 'date_of_release'
  },
  {
    title: 'Cabinet Number',
    dataIndex: 'cabinet_number',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      
      <span>
        <Button type='link' href={`/mortuary/update?id=${record.id}`}>Edit</Button>
        <Divider type="vertical" />
        <a>Release</a>
        <Divider type="vertical" />
        <Button type='link'>More Info</Button>
      </span>
    ),
  }
];

const Demo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    mortuaryService.getData().then((res) => {

      const mydata = res.payload;
      for (var i = 0; i < mydata.length; i++) {
        if (mydata[i].status == true)
        mydata[i].status = "In Mortuary"
        else {
          mydata[i].status = "Released"
          mydata[i].date_of_release = new Date(mydata[i].date_of_release).toLocaleDateString()
        }
        mydata[i].date_time_of_death = new Date(mydata[i].date_time_of_death).toLocaleDateString()
      }

      setData(mydata);
      setLoading(false);



    }).catch((err) => {
      console.log(err)
      setLoading(false);
      setError(true);
      setData();
    });
  }, []);
  if (loading) {
    return (
      <>
        <Table columns={columns} />
        <p>Data Loading</p>
      </>
    )
  }
  else if (error) {
    return (
      <>
        <Table columns={columns} />
        <p>Error</p>
      </>
    )
  }
  else {
    return (
      <Table columns={columns} dataSource={data} />
    )
  }

}
export default Home



