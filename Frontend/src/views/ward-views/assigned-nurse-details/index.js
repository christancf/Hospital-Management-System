import React, { useEffect, useState } from 'react'
import {Row, Col, Card, message} from 'antd';
import wardService from 'services/WardService';

const key = 'read'
const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    wardService.getNurses()
    .then(res => {
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

  if(loading){
    return(
      <>Hi</>
      )
    }else if(error){
      return(
        <>Hi</>
        )
    }else{
      const resData = data
        
    return (
      <div>
        <Row>
          <Col span={3} offset={1}>Hi</Col>  
          <Col span={20}>
            <Row>              
            {resData.map(d => (
              <Col span={6} style={{margin: 10}}>
              <Card bordered={false}>
                <p>{d.nurseID}</p>
                <p>{d.wardCategory}</p>
                <p>{d.wardID}</p>
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

const displayCard = () => {
  
    <p>Card content</p>

}


export default Home