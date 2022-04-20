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
  //const []
  
  useEffect(() => {
    wardService.getAssignedNurses()
    .then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setData()
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
    const unAssignNurse = id => {
      wardService.unassignNurse(id)
      .then(() => window.location.reload())
      .catch((e) => console.log(`Error: ${ e }`))
    }
    const resData = data  
    return (
      <div>
        <Row>
          <Col span={5} >
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 250 }}
            />
          </Col>  
          <Col span={18}>
            <Row>              
            {resData.map(d => (
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