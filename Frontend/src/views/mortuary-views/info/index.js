import React from 'react'
import { Table, Divider, Tag } from 'antd';
import mortuaryService from 'services/MortuaryService';
const Home = () => {
	return (
		<div>
			<Table columns={columns} 
      dataSource={data}
       />
       <Rome />
       
		</div>
	)
}
const Rome = () => {
  console.log(data)
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'NIC',
    dataIndex: 'nic',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cause of Death',
    dataIndex: 'causeOfDeath',
  },
  {
    title: 'Date of Death',
    dataIndex: 'dateOfDeath',
  },
  {
    title: 'Date of Release',
    dataIndex: 'dateOfRelease'
  },
  {
    title: 'Cabinet Number',
    dataIndex: 'cabinetNo',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const data = mortuaryService.getData().then(value=>{
  const corpseData = value.details
  // console.log(corpseData)
});

// const dataJson = data;
// console.log(dataJson)
export default Home