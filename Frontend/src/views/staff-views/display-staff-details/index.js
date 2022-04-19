import React from 'react'
import { Table, Typography } from 'antd';
import staffService from 'services/StaffService';

const { Title } = Typography

let data = []
const readData = () => {
  staffService.readStaffs()
  .then((details) => {
    console.log(details)
    for(let i = 0; i < details.length; ++i){
      data.push({
        key: i+1,
        staffID: String(details[i].staffID),
        staffName: details[i].staffName,
        designation: details[i].designation,
        qualification: details[i].qualification,
        basicSalary: details[i].basicSalary,
        status: 'Employed',
      })
    }
    console.log(data)
  })
  .catch((e) => console.log(`Error @ display-staff: ${e}`))
}
const DisplayStaffDetails = () => {
  
  return (
    <div >
			<Title>Staff Details</Title>
			<Table columns={columns} dataSource={data} onChange={onChange}/>
		</div>
	)
}
readData()
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
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
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





function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

//ReactDOM.render(, mountNode);

export default DisplayStaffDetails
