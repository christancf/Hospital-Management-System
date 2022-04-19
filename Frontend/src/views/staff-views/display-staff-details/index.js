import React from 'react'
import { Table, Typography } from 'antd';

const { Title } = Typography

const DisplayStaffDetails = () => {
	return (
		<div>
			<Title>Staff Details</Title>
			<Table columns={columns} dataSource={data} onChange={onChange} />
		</div>
	)
}

// let { sortedInfo } = this.state;
//     sortedInfo = sortedInfo || {};

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
	// sorter: (a, b) => a.staffName.length - b.staffName.length,
	// sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
	// ellipsis: true,
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    // sorter: {
    //   compare: (a, b) => a.designation - b.designation,
    //   multiple: 2,
    // },
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
    // sorter: {
    //   compare: (a, b) => a.qualification - b.qualification,
    //   multiple: 1,
    // },
  },
  {
	title: 'Basic Salary',
	dataIndex: 'basicSalary'
  },
  {
	title: 'Status',
	dataIndex: 'status'
  }
];

const data = [
  {
    key: '1',
    staffID: '2341',
    staffName: 'Tharusha Wijesinghe',
    designation: 'Doctor',
    qualification: 'MBBS',
	basicSalary: 250000,
	status: 'Employed',
  },
  {
	key: '2',
    staffID: '4536',
    staffName: 'Preshanthi Anushika',
    designation: 'Nurse',
    qualification: 'BSN',
	basicSalary: 150000,
	status: 'Employed',
  }
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

//ReactDOM.render(, mountNode);

export default DisplayStaffDetails
