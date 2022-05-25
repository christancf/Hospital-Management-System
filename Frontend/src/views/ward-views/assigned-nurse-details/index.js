import React, { useEffect, useState } from 'react'
import {message, Input, Button, Modal, Form, DatePicker, Row, Col, Result} from 'antd';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import wardService from 'services/WardService';
import './index.css'

const { Search } = Input;
const { confirm } = Modal
const key = 'read'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
};

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
      <>Hi</>
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
                <span className='title'>Staff ID: </span><span className='value'>{d.nurseID}</span><br/>
                <span className='title'>Staff Name: </span><span className='value'>{d.details[0].staffName}</span><br/>
                <span className='title'>Ward: </span><span className='value'>{capitalize(d.wardCategory)}</span><br/>
                <span className='title'>Ward Unit: </span><span className='value'>{d.wardID}</span><br/>      
                <GetStatus id={d.nurseID}/>
                <Button className="bin" htmlType="button" onClick={() => showDeleteConfirm(d.nurseID, d.details[0].staffName)} icon={<DeleteOutlined id="delete"/>}></Button>
                <ViewMore moreDetails={d}/>
              </div>
            </div>  
          )
          )}
        </div>    
      </div>
    )
    
  }
}

const GetStatus = id => {
  const [status, setStatus] = useState()
  wardService.checkStatus(id)
  .then(res => {
    let a =(res)?"Unavailable":"Available"
    setStatus(a)
  }).catch(e => console.log(`Error: ${e}`))
  let s = status
  console.log(status)
  return (
    <span>
      <span className='title'>Status: </span><span id="status" className='value'>{s}</span>
    </span>
  )
}

const ViewMore = ({moreDetails}) => {

  const staffDetails = moreDetails.details[0]
  const [viewDetails, setViewDetails] = useState(false)
  const [form] = Form.useForm()
  
  const showModal = () => {
    setViewDetails(true)
    form.setFieldsValue({
      staffID: moreDetails.nurseID,
      staffName: staffDetails.staffName,
      NIC: staffDetails.NIC,
      email: staffDetails.email,
      role: `${capitalize(moreDetails.role)} Nurse`,
      qualification: staffDetails.qualification,
      assignedDate: moment(moreDetails.assignedDate),
      reassignDate: moment(moreDetails.reassignDate),
      assignedWard: `${capitalize(moreDetails.wardCategory)} - ${moreDetails.wardID}`
    })
  };

  const handleOk = e => {
    console.log(e)
    setViewDetails(false)
  };
  
  return (
    <div>
      <Button className="view" htmlType="button" onClick={showModal} icon={<EyeOutlined id="eye"/>}></Button>
      <Modal title={`Nurse ID ${moreDetails['nurseID']}`} visible={viewDetails} onCancel={handleOk} width='65%'
      footer={[
        <Button key="okay" onClick={handleOk} type="primary">
          Okay
        </Button>,
      ]}>
        <Form {...layout} name="basic" initialValues={{ remember: true }} form={form} style={{pointerEvents:'none'}}>
          <Row>
            <Col span={11}>
              <Form.Item label="Staff ID" name="staffID" >
                <Input />
              </Form.Item>
              <Form.Item label="NIC" name="NIC">
                <Input />
              </Form.Item>
              <Form.Item label="Role" name="role" >
                <Input />
              </Form.Item>
              <Form.Item label="Assigned Ward" name="assignedWard" >
                <Input />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Input />
              </Form.Item>
            </Col>
          
            <Col span={13}>
              <Form.Item label="Name" name="staffName">
                <Input />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input />
              </Form.Item>      
              <Form.Item label="Qualification" name="qualification">
                <Input />
              </Form.Item>
              <Form.Item label="Assigned Date" name="assignedDate">
                <DatePicker format="DD/MM/YYYY" disabledDate={disabledDate} />
              </Form.Item>
              <Form.Item label="Reassign Date" name="reassignDate">
                <DatePicker format="DD/MM/YYYY" disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export const capitalize = txt => {
  return txt.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
}
{/*checkStatus(d.nurseID)
.then(status => {
  console.log('status')
  console.log(status)
})
*/}
export default AssignedNurseDetails