import React, { useEffect, useState } from 'react'
import {message, Input, Button, Modal} from 'antd';
import { DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import wardService from 'services/WardService';
import './index.css'

const { Search } = Input;
const { confirm } = Modal
const key = 'read'
const AssignedNurseDetails= () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [fullData, setFullData] = useState()
  const [deleted, setDeleted] = useState(1)
  const [status, setStatus] = useState()
  //const []
  
  useEffect(() => {
    wardService.getAssignedNurses()
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
      title: 'Are you sure you want to unassign this staff?',
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

  const getStatus = id => {
    wardService.checkStatus(id)
        .then(res => {
          let a = (res?.checkOut)? "Unavailable":"Available"
          //setStatus(a)
        }).catch(e => console.log(`Error: ${e}`))
        console.log('status')
        console.log(status)
        return status
  }
  if(loading){
    return(
      <>Hi</>
      )
    }else if(error){
      return(
        <>Hi</>
      )
    }else{
      const savedData = []
      const search = (str) => {
        if(str === '') return setData(fullData)
        str = str.toUpperCase()
        fullData.map(d => {
          let staffName = d.details[0].staffName.toUpperCase()
          if(staffName === str || staffName.includes(str)) {
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
            placeholder="Search ID..."
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
                <span className='title'>Staff ID: </span><span className='value'>{d.nurseID}</span><br/>
                <span className='title'>Staff Name: </span><span className='value'>{d.details[0].staffName}</span><br/>
                <span className='title'>Ward: </span><span className='value'>{(d.wardCategory === 'icu')? d.wardCategory.toUpperCase() : d.wardCategory[0].toUpperCase() + d.wardCategory.substring(1)}</span><br/>
                <span className='title'>Ward Unit: </span><span className='value'>{d.wardID}</span><br/>
                <span className='title'>Status: </span><span className='value'>{getStatus(d.nurseID)}</span>                
                <Button className="bin" htmlType="button" onClick={() => showDeleteConfirm(d.nurseID, d.details[0].staffName)} icon={<DeleteOutlined id="delete"/>}></Button>
                <Button className="view" htmlType="button" onClick={() => alert("View More")} icon={<EyeOutlined id="eye"/>}></Button>
              </div>
            </div>  
          )
          )}
        </div>    
      </div>
    )
    
  }
}

{/*checkStatus(d.nurseID)
.then(status => {
  console.log('status')
  console.log(status)
})
*/}
export default AssignedNurseDetails