import React, { useEffect, useState } from 'react'
import { Spin, Table, Tag, Typography, Divider, Input  } from 'antd';
import staffService from 'services/StaffService';

const { Title } = Typography
const { Search } = Input

const DisplayStaffDetails = () => {
  
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		staffService.readStaffs()
    .then((details) => {      
      setData(details)
      setLoading(false)
    })
    .catch((e) => {
      setLoading(false)
      setError(true)
      setData()
      console.log(`Error @ display-staff: ${e}`)
    })
	}, []);

  const searchByName = (name) => {
  }

  if (loading) {
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)
	}
	else if (error) {

		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)

	}
  else {
    return (
      <div >
        <Title>Staff Details</Title>
        <Search 
          placeholder="input search text" 
          onSearch={value => searchByName(value)} enterButton 
          style={{width: 300, marginBottom: 20}} />
        <Table columns={columns} dataSource={data} onChange={onChange}/>        
      </div>
    ) 
  }
}

const columns = [
  {
    title: 'Staff ID',
    dataIndex: 'staffID',
    key: 'staffID',
    sorter: {
      compare: (a, b) => a.staffID - b.staffID,
      multiple: 1,
    }
  },
  {
    title: 'Staff Name',
    dataIndex: 'staffName',
    key: 'staffName',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation'
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
    key: 'qualification'
  },
  {
    title: 'Basic Salary',
    dataIndex: 'basicSalary',
    key: 'basicSalary'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    // render: tags => (
    //   <span>
    //     {tags.map (tag => {
    //       let color = 'red'
    //       if(tag === 'Employed') color = 'green'
    //       return (
          
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </span>
    // ),
  },
  {
    title: '',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href=''>View</a>
        <Divider type="vertical" />
        <a href='http://localhost:8080/staff/update-staff-details'>Edit</a>
      </span>
    ),
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export default DisplayStaffDetails
