import React, { useEffect, useState } from 'react'
import {Row, Col, Card, message, Input, Divider, Button} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import wardService from 'services/WardService';

const { Search } = Input;
const key = 'read'
const AssignedNurseDetails= () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [fullData, setFullData] = useState()
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
  }, [])

  const checkStatus = id => {
    let check
    wardService.checkStatus(id)
    .then(res => {
      check = res[0]
      console.log(check)
      if(check.checkOut === undefined) return "Available"
      return "Unavailable"
    })
    .catch(e => console.log(`Error: ${ e }`))
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

    const unAssignNurse = id => {
      wardService.unassignNurse(id)
      .then(() => window.location.reload())
      .catch((e) => console.log(`Error: ${ e }`))
    } 
    return (
      <div>
        <Row>
          <Col span={5} >
            <Search
              placeholder="input search text"
              id="searchTxt"
              onInput={() => search(document.getElementById('searchTxt').value)}
              allowClear
              style={{ width: 250 }}
            />
          </Col>  
          <Col span={18}>
            <Row>              
            {data.map(d => (
              <Col span={6} offset={1} >
                <Card bordered={false} style={{width: 200, fontSize:10, color: '#000'}}>
                  <span>{`Staff ID: ${d.nurseID}`}</span><br/>
                  <span>{`Staff Name: ${d.details[0].staffName}`}</span><br/>
                  <span>{`Role: ${d.role[0].toUpperCase() + d.role.substring(1)}`}</span><br/>
                  <span>{`Status: Available`}</span>
                  <Button htmlType="button" onClick={id => unAssignNurse(d.nurseID)} style={{fontSize:5, marginLeft:15}} icon={<DeleteOutlined/>}></Button>
                </Card>
              </Col>          
            ))
          }
            </Row>
          </Col>    
        </Row>
      </div>
    )
    
  }
}

export default AssignedNurseDetails