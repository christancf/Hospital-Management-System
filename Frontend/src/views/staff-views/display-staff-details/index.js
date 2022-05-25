import React, { useEffect, useState } from 'react'
import { Spin, Table, Tag, Typography, Divider, Input, Modal, Form, Select, DatePicker, Row, Col } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import staffService from 'services/StaffService';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const { Title } = Typography
const { Search } = Input
const {Option} = Select

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
  };

//disable current date and dates before current date
function disabledDate(current) {
	return current && current > moment().endOf('day');
}

const DisplayStaffDetails = () => {
  
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();
  const [fullData, setFullData] = useState()
  

	useEffect(() => {
		staffService.readStaffs()
    .then((details) => {      
      setData(details)
      setFullData(details)
      setLoading(false)
    })
    .catch((e) => {
      setLoading(false)
      setError(true)
      setData()
      setFullData()
      console.log(`Error @ display-staff: ${e}`)
    })
	}, []);

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

    const searchData = []
    const searchByName = (name) => {
      if(name === '') return setData(fullData)
      name = name.toUpperCase()
      fullData.map(d => {
        let staffName = d.staffName.toUpperCase()
        if(staffName === name || staffName.includes(name)) {
          searchData.push(d)
        }
        return setData(searchData)
      })
      if(name === '') return setData(fullData)
    }

    return (
      <div >
        <Title>Staff Details</Title>
        <Search 
          placeholder="Search by staff name" 
          id="searchStaff"
          onInput={() => searchByName(document.getElementById('searchStaff').value)} 
          allowClear
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
    key: 'designation',
    filters: [{ text: 'Doctor', value: 'doctor'},
              { text: 'Nurse', value: 'nurse'},
              { text: 'Allied Health Professionals', value: 'allied health professionals'}],
    onFilter: (value, record) => record.designation === value
  },
  {
    title: 'Qualification',
    dataIndex: 'qualification',
    key: 'qualification'
  },
  {
    title: 'Basic Salary',
    dataIndex: 'basicSalary',
    key: 'basicSalary',
    sorter: {
      compare: (a, b) => a.basicSalary - b.basicSalary,
      multiple: 1,
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filters: [{ text: 'Employed', value: 'Employed'},
              { text: 'Resigned', value: 'Resigned'},],
    onFilter: (value, record) => record.status === value,

    render: tags => (
      <span>
      {tags === "Resigned" &&
          <Tag color='volcano' key={tags}>
              {tags.toUpperCase()}
          </Tag>
      }
      {tags === "Employed" &&
          <Tag color='geekblue' key={tags}>
              {tags.toUpperCase()}
          </Tag>

      }
  </span>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (text, record) => (

      <span>
        <Row>
          <Col span={6}>
            <ViewMore moreDetails = {record} />
          </Col>
          <Col>
            <Divider type="vertical" />
          </Col>
          <Col span={6}>
          <a href={`http://localhost:8080/staff/update-staff-details?id=${record.staffID}`}><EditOutlined style={{fontSize: '1.15rem', color: '#262626'}}/></a>
          </Col>
        </Row>
     
       
        {/* <Button *>
          <a href={`http://localhost:8080/staff/update-staff-details?id=${record.staffID}`}><EditOutlined /></a>
        </Button> */}
        
        
      </span>
    ),
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const ViewMore = ({moreDetails}) => {

  const [viewDetails, setViewDetails] = useState(false)
  const [form] = Form.useForm()
  
  const showModal = () => {
    setViewDetails(true)
    form.setFieldsValue({
      staffID: moreDetails.staffID,
      staffName: moreDetails.staffName,
      NIC: moreDetails.NIC,
      email: moreDetails.email,
      designation: moreDetails.designation,
      qualification: moreDetails.qualification,
      dateOfBirth: moment(moreDetails.dateOfBirth),
      gender: moreDetails.gender,
      address: moreDetails.address,
      basicSalary: moreDetails.basicSalary,
      mobile: moreDetails.mobile,
      home: moreDetails.home,
      status: moreDetails.status
    })
  };

  const handleOk = e => {
    console.log(e)
    setViewDetails(false)
  };

  const handleCancel = e => {
    console.log(e)
    setViewDetails(false)
  };
  
    return (
      <div>
        <EyeOutlined onClick={showModal} style={{fontSize: '1.15rem', color: '#262626'}}/>
        <Modal
          title={`Staff ID ${moreDetails['staffID']}`}
          visible={viewDetails}
          onOk={handleOk}
          onCancel={handleCancel}
          width='65%'
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
            style={{pointerEvents:'none'}}
        >
          <Row>
            <Col span={11}>
        
        <Form.Item
          label="Name"
          name="staffName"
        >
          <Input />
        </Form.Item>

      <Form.Item
          label="NIC"
          name="NIC"
        >
          <Input />
        </Form.Item>

      <Form.Item
          label="E-mail"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item name="designation" label="Designation">
          <Select allowClear>
            <Option value="doctor">Doctor</Option>
            <Option value="nurse">Nurse</Option>
            <Option value="allied health professionals">Allied Health Professionals</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Qualification"
          name="qualification"
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          >
         <Input />
        </Form.Item>
            </Col>
            
            <Col span={13}>
            <Form.Item  
          label="Date Of Birth"
          name="dateOfBirth"
        >
            <DatePicker
              placeholder='Select Date'
              format="YYYY-MM-DD"
              disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select allowClear>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
        <TextArea style={{height: 15}} />
        </Form.Item>

        <Form.Item
          label="Basic Salary"
          name="basicSalary"
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Home"
          name="home"
        >
          <Input />
        </Form.Item>
            </Col>
          </Row>
      
			</Form>
        </Modal>
      </div>
    );
}

export default DisplayStaffDetails
