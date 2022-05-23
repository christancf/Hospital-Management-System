import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, DatePicker, Card, Spin, Modal, Row, Col, Table } from 'antd';
import billingService from 'services/BillingService';

const { Option } = Select;

const Home = () => {


  const [form] = Form.useForm();
  const [patientLoading, setPatientLoading] = useState(true);
  const [patientname, setPatientname] = useState(false);
  const [patientError, setPatientError] = useState(false);
  const [patientData, setPatientData] = useState();

  const [transactionLoading, setTransactionLoading] = useState(true);
  const [transactionError, setTransactionError] = useState(false);
  const [transactionData, setTransactionData] = useState();


  const [itemLoading, setitemLoading] = useState(true);
  const [itemData, setItemData] = useState();
  
  const [roomLoading, setRoomLoading] = useState(true);
  const [roomData, setRoomData] = useState();

  const[remainingCount,setRemainingCount] = useState();
  


  

  const columns = [
    {
      title: 'Item ID',
      dataIndex: 'itemId',
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

  let TransactionList = {}

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

  const onFinishTransaction = (values) => {

    //console.log(values);

    const sendingObj = {
      patientId: values.patientid[0],
      type: values.type,
      id: values.item[0],
      count: values.count,
      patientName: values.patientid[1],
      charge:values.item[1]
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
        form.resetFields(['type','item','count']);
        onPatientSearch(form.getFieldValue('patientid'));

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

  const onPatientSearch = (value) => {


    setPatientname(true);

    billingService.getAllTransactionToPatient(value[0]).then((resp) => {

      TransactionList = resp.payload.map((transaction) => {
        return {
          itemId: transaction.id,
          count: transaction.count,
          charge: transaction.charge,
          total: transaction.total
        }
      });
      setTransactionData(TransactionList);
      setTransactionLoading(false);

    }).catch((err) => {
      setTransactionLoading(false);
      setTransactionError(true);
      setTransactionData();
    });

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
                    onSelect={onPatientSearch}
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
                  >
                    <Option key="item">Item Charges</Option>
                    <Option key="room">Room Charges</Option>
                  </Select>
                </Form.Item>


                <Form.Item name="item"
                  label="Item Name" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="Select a Item"
                    optionFilterProp="children"
                    onChange={()=> {}}
                    onSelect={onItemSelect}

                  >
                    {itemoptionList}
                  </Select>

                </Form.Item>
                <Form.Item name="count"
                  label="Item Quantity" rules={[{ required: true }]}
                >
                  <InputNumber min={0} max={remainingCount}/>

                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button shape="round" className="mr-2" htmlType="button" onClick={() => { form.resetFields(); }}>
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
                <Table columns={columns} dataSource={transactionData} />
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
          <Spin size="large" tip="Loading..." delay={500} spinning={patientLoading} />
        </center>

      </>
    )
  }

}

export default Home
