import React from 'react'
import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Select, Card, Spin, Modal, Row, Col, Table } from 'antd';
import billingService from 'services/BillingService';

const { Option } = Select;

const Home = () => {


  const [form] = Form.useForm();
  const [patientLoading, setPatientLoading] = useState(true);
  const [patientname, setPatientname] = useState([]);
  const [patientError, setPatientError] = useState(false);
  const [patientData, setPatientData] = useState();

  const [transactionLoading, setTransactionLoading] = useState(true);
  const [transactionError, setTransactionError] = useState(false);
  const [transactionData, setTransactionData] = useState();


  const [itemLoading, setitemLoading] = useState(true);
  const [itemData, setItemData] = useState();
  
  const [roomLoading, setRoomLoading] = useState(true);
  const [roomData, setRoomData] = useState();
  const [type,setType]=useState();
  const[remainingCount,setRemainingCount] = useState();
  


  

  const itemColumns = [
    {
      title: 'Item ID',
      dataIndex: 'id',
      key: 'itemId',
    },
    {
      title: 'Quantity',
      dataIndex: 'count',
      key: 'qty',
    },
    {
      title: 'Item Charge',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    }
  ];
  const roomColumns = [
    {
      title: 'Room ID',
      dataIndex: 'id',
      key: 'itemId',
    },
    {
      title: 'Hours',
      dataIndex: 'count',
      key: 'qty',
    },
    {
      title: 'Price per Hour',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    }
  ];



  function ShowModel(title, delay, innercontent, isSuccess) {

    if (isSuccess) {
      const modal = Modal.success({
        title: title,
        content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      });
      const timer = setInterval(() => {
        delay -= 1;
        modal.update({
          content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, delay * 1000);
    }

    else {
      const modal = Modal.error({
        title: title,
        content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      });
      const timer = setInterval(() => {
        delay -= 1;
        modal.update({
          content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, delay * 1000);
    }
  }

  useEffect(() => {


    billingService.getAllPatients().then((resp) => {
      setPatientData(resp.payload);
      setPatientLoading(false);

    }).catch((err) => {
      setPatientLoading(false);
      setPatientError(true);
      setPatientData();
    });


    billingService.getAllItems().then((resp) => {
      setItemData(resp.payload);
      setitemLoading(false);

    }).catch((err) => {
      setitemLoading(false);
      setItemData();
    });

    billingService.getAllRooms().then((resp) =>{
      setRoomData(resp.payload);
      setRoomLoading(false);
    }).catch((error)=>{
      setRoomLoading(false);
      setRoomData();
    })


  }, []);

  useEffect(() => {
    let TransactionListItem = {}
    let TransactionListRoom = {}
    console.log(patientname)
    billingService.getAllTransactionToPatient(patientname[0]).then((resp) => {

      TransactionListItem = resp.payload.filter((t) =>{return t.type==="item"}).map((transaction)=>{
        return {
          id: transaction.id,
          count: transaction.count,
          charge: transaction.charge,
          total: transaction.total
        }
      })
      TransactionListRoom = resp.payload.filter((t) =>{return t.type==="room"}).map((transaction)=>{
        return {
          id: transaction.id,
          count: transaction.count,
          charge: transaction.charge,
          total: transaction.total
        }
      })
      
      setTransactionData([TransactionListItem,TransactionListRoom]);
      setTransactionLoading(false);

    }).catch((err) => {
      setTransactionLoading(false);
      setTransactionError(true);
      setTransactionData();
    });
  },[patientname,type])

  

  const onFinishTransaction = (values) => {

    //console.log(values);

    const sendingObj = {
      patientId: values.patientid[0],
      type: values.type,
      id: values.item_room[0],
      count: values.count,
      patientName: values.patientid[1],
      charge:values.item_room[1]
    }

    console.log(sendingObj);

    billingService.addTransactions(sendingObj).then((resp) => {

      if (resp.succuss) {
        ShowModel(
          "Successfull !",
          4,
          "Your Transaction successfully added",
          true
        );
        form.resetFields(['type','item_room','count']);
        setType()

      }
      else {
        ShowModel(
          "Unsccessfull !",
          4,
          "Your Transaction placement faild",
          false
        );
      }



    }).catch((error) => {

      ShowModel(
        "Unsccessfull !",
        4,
        "Your Transaction placement faild",
        false
      );

    })

  }

  const onItemSelect = (value) => {
    setRemainingCount(value[2])
  }

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };


  if (!patientLoading) {

    const optionList = patientData.map((patient) => {
      return (
        <Option value={[patient.patientId,patient.fullName ]}>{patient.patientId} - {patient.fullName}</Option>
      )
    })

    if(!roomLoading){

      const roomOptionList = roomData.map((room) => {
        return (
          <Option value={[room.id,room.roomCharge]}>{room.id}</Option>
        )
      })


      if (!itemLoading) {

        const itemoptionList = itemData.map((item) => {
          return (
            <Option value={[item.id,item.unit_price,item.total_quantity]}>{item.item_name} - {item.id}</Option>
          )
        })
  
        return (
          <>
            <Row>
              <Col span={12}> <Card style={{ width: 600, height: 600 }}>
                <h2 className='text-center'>Add Transaction</h2>
                <Form
                  {...formLayout}
                  form={form}
                  onFinish={onFinishTransaction}
                >
  
                  <Form.Item name="patientid"
                    label="Patient ID" rules={[{ required: true }]}>
                    <Select
                      showSearch
                      placeholder="Select a Patient"
                      optionFilterProp="children"
                      onChange={c => {setPatientname(c)}}
                    >
                      {optionList}
                    </Select>
  
                  </Form.Item>
  
                  <Form.Item
                    name="type"
                    label="Type" rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select Type"
                      filterOption={false}
                      style={{ width: '100%' }}
                      onChange={c=>{setType(c)}}
                    >
                      <Option key="item">Item Charges</Option>
                      <Option key="room">Room Charges</Option>
                    </Select>
                  </Form.Item>
  
                   {type==="item"&&
                    <>
                      <Form.Item name="item_room"
                      label="Item Name" rules={[{ required: true }]}>
                      <Select
                        showSearch
                        placeholder="Select a Item"
                        optionFilterProp="children"
                        onChange={() => { } }
                        onSelect={onItemSelect}

                      >
                        {itemoptionList}
                      </Select>

                      </Form.Item>
                      <Form.Item name="count"
                      label="Item Quantity" rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={remainingCount} />

                      </Form.Item>
                    </>
                    }
                    {type==="room"&&
                    <>
                      <Form.Item name="item_room"
                      label="Room ID" rules={[{ required: true }]}>
                      <Select
                        showSearch
                        placeholder="Select a Room"
                        optionFilterProp="children"
                      >
                        {roomOptionList}
                      </Select>

                      </Form.Item>
                      <Form.Item name="count"
                      label="Hours" rules={[{ required: true }]}
                    >
                        <InputNumber min={1}/>
                      </Form.Item>
                    </>
                    } 
  
                  <Form.Item {...tailLayout}>
                    <Button shape="round" className="mr-2" htmlType="button" onClick={() => { form.resetFields(); setType();setPatientname([]); }}>
                      Clear
                    </Button>
                    <Button shape="round" className="mr-2" type="primary" htmlType="submit">
                      Add / Update
                    </Button>
  
                    <Button shape="round" className="mr-2" type="primary" onClick={() => {
                      window.location = '../billing/billlist';
                    }}>
                      Finish
                    </Button>
                  </Form.Item>
  
  
                </Form>
  
  
              </Card>
              </Col>
              <Col span={12}> <Card style={{ width: 600, height: 600 }}>
  
                {!transactionLoading ? <>
                  <Table columns={itemColumns} dataSource={transactionData[0]} />
                  <Table columns={roomColumns} dataSource={transactionData[1]} />
                </> : <></>}
  
  
  
              </Card>
              </Col>
            </Row>
  
  
  
          </>
        )
  
      }
      else {
        return (
          <>
            <center>
              <Spin size="large" tip="Loading..." delay={500} spinning={patientLoading} />
            </center>
  
          </>
        )
      }
    }
    else {
      return (
        <>
          <center>
            <Spin size="large" tip="Loading..." delay={500} spinning={roomLoading} />
          </center>
  
        </>
      )
    }
    



  }
  else {
    return (
      <>
        <center>
          <Spin size="large" tip="Loading..." delay={500} spinning={patientLoading} />
        </center>

      </>
    )
  }

}

export default Home
