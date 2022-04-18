import React from 'react'
import { Button, Typography, Table } from 'antd';

const { Title } = Typography

const CalculateTotalSalary = () => {
	return (
		<div>
			<Title>Calculate Total Salary</Title>
    		<Button type="primary">Primary</Button>
			<Table columns={columns} dataSource={data} onChange={onChange} />
		</div>
	)
}

//onclick func{ func{} }

//table
const columns = [
	{
	  title: 'Staff ID',
	  dataIndex: 'staffID',
	  sorter: {
		  compare: (a, b) => a.staffID - b.staffID,
		  multiple: 4,
	  },
	},
	{
	  title: 'Staff Name',
	  dataIndex: 'staffName',
	},
	{
	  title: 'Basic Salary',
	  dataIndex: 'basicSalary',
	},
	{
	  title: 'OT Hours',
	  dataIndex: 'otHours',
	},
	{
	  title: 'OT Rate',
	  dataIndex: 'otRate'
	},
	{
	  title: 'OT Amount',
	  dataIndex: 'otAmount'
	},
	{
		title: 'Bonuses',
		dataIndex: 'bonuses'
	},
	{
		title: 'Total Salary',
		dataIndex: 'totalSalary'
	},
  ];
  
  const data = [
	{
	  key: '1',
	  staffID: '2341',
	  staffName: 'Tharusha Wijesinghe',
	  basicSalary: 200000,
	  otHours: 4,
	  otRate: 0.12,
	  otAmount: 250000,
	  bonuses: 50000,
	  totalSalary: 350000
	},
	{
	  key: '2',
	  staffID: '4536',
	  staffName: 'Preshanthi Anushika',
	  basicSalary: 100000,
	  otHours: 8,
	  otRate: 0.10,
	  otAmount: 150000,
	  bonuses: 50000,
	  totalSalary: 250000
	}
  ];
  
  function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
  }


export default CalculateTotalSalary
