import React, { useEffect, useState } from 'react'
import {message, Input, Button, Modal, Form, DatePicker, Row, Col, Result, Spin} from 'antd';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import wardService from 'services/WardService'
import '../assigned-nurse-details/index.css'
import { ValidateUser, WARD_ROLE } from 'configs/AppConfig';

const { Search } = Input;
const { confirm } = Modal
const key = 'read'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
};

ValidateUser(WARD_ROLE)

function disabledDate(current) {
	return current && current > moment().endOf('day');
}

const AssignedNurseDetails= () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [fullData, setFullData] = useState()
  const [deleted, setDeleted] = useState(1)
  //const []
  
  useEffect(() => {
    wardService.readAllWardDetails()
    .then(res => {
      setFullData(res)
      setData(res)
      setLoading(false)
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setData()
      setFullData()
      console.log(`Error: ${e}`)
    })
  }, [deleted])

  const showDeleteConfirm = (id, name) => {
    confirm({
      title: `Are you sure you want to unassign ${name} - ${id}?`,
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        unAssignNurse(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const unAssignNurse = id => {
    message.loading({content:"Please wait...", key})
    wardService.unassignNurse(id)
    .then((res) => {
      console.log(res)
      setDeleted(prevDelete => {
        return prevDelete += 1
      })
      message.success({content: "Unassigned Successfully", key, duration:2})})
    .catch((e) => message.error({content:"Could not unassign right now. Try again later.", key, duration:2}))
  }

  if(loading){
    return(
      <>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={loading} />
				</center>

			</>
		)
    }else if(error){
      return(
        <Result status="warning" title="We ran into a problem :(\n Try refreshing the page" extra={<Button type="primary" key="refresh">Refresh</Button>}/>
      )
    }else{
      const savedData = []
      const search = (str) => {
        if(str === '') return setData(fullData)
        str = str.toUpperCase()
        fullData.map(d => {
          let wardID = d.id
          if(wardID === str || wardID.includes(str)) {
            savedData.push(d)
          }
          return
        })
        setData(savedData)
      }
 
    return (
      <div className="container">
        <div className='filter'>
          <Search
            placeholder="Search name..."
            id="searchTxt"
            onInput={() => search(document.getElementById('searchTxt').value)}
            allowClear
            style={{ width: 250 }}
          />
        </div>  
        <div className="collection">    
          {data.map(d => (
            <div className="card">
              <div>
                <span className='title'>Ward ID: </span><span className='value'>{d.id}</span><br/>
                <span className='title'>Category: </span><span className='value'>{capitalize(d.category)}</span><br/>
                <span className='title'>Room Charge per day: </span><span className='value'>{d.roomCharge}</span><br/>
                <span className='title'>Status: </span><span className='value'>{d.status}</span><br/>
              </div>
            </div>  
          )
          )}
        </div>    
      </div>
    )
    
  }
}

export const capitalize = txt => {
  return txt.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
}





export default AssignedNurseDetails