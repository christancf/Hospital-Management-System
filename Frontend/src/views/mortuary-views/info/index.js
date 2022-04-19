import React from 'react'
import { Table, Divider, Tag } from 'antd';
import mortuaryService from 'services/MortuaryService';
const Home = () => {
  return (
    <div>
      <Table columns={columns} dataSource={corpseData}
      />

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
];

var corpseData
mortuaryService.getData().then(value => {
  corpseData = value.payload
  for (var i = 0; i < corpseData.length; i++) {
    if (corpseData[i].status == true)
      corpseData[i].status = "In Mortuary"
    else {
      corpseData[i].status = "Released"
      corpseData[i].date_of_release = new Date(corpseData[i].date_of_release).toLocaleDateString()
    }
    corpseData[i].date_time_of_death = new Date(corpseData[i].date_time_of_death).toLocaleDateString()
      

  }
});
export default Home