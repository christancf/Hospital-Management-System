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


  const columns = [
    {
      title: 'Item ID',
      dataIndex: 'itemId',
      key: 'itemId',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Item Charge',
      dataIndex: 'itemCharge',
      key: 'itemCharge',
    },
    {
      title: 'Doctor Charge',
      dataIndex: 'doctorCharge',
      key: 'doctorCharge',
    },
    {
      title: 'Room Charge',
      dataIndex: 'roomCharge',
      key: 'roomCharge',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
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
        window.location.reload(false)
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


  }, []);

  const onFinishTransaction = (values) => {

    console.log(values);

    const sendingObj = {
      patientId: values.patientid,
      type: values.type.value,
      itemId: values.itemname,
      qty: values.qty,
      patientName: values.patientid,
      roomCharges: 100,
      itemCharges: 100,
      doctorCharges: 100,
      tax: 50,
      total: 500
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
        form.resetFields(['type']);
        onPatientSearch();

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

    billingService.getAllTransactionToPatient(value).then((resp) => {

      TransactionList = resp.payload.map((transaction) => {
        return {
          itemId: transaction.itemId,
          qty: transaction.qty,
          itemCharge: transaction.itemCharges,
          doctorCharge: transaction.doctorCharges,
          roomCharge: transaction.roomCharges,
          tax: transaction.tax,
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
        <Option value={patient.patientId}>{patient.patientId} - {patient.fullName}</Option>
      )
    })

    if (!itemLoading) {

      const itemoptionList = itemData.map((item) => {
        return (
          <Option value={item.id}>{item.item_name} - {item.id}</Option>
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
                  label="Patient ID">
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
                  label="Type"

                >
                  <Select

                    labelInValue
                    placeholder="Select Type"
                    filterOption={false}
                    style={{ width: '100%' }}
                  >
                    <Option key="item charges">Item Charges</Option>
                    <Option key="room charges">Room Charges</Option>
                    <Option key="doctor charges">Doctor Charges</Option>
                  </Select>
                </Form.Item>


                <Form.Item name="itemname"
                  label="Item Name">
                  <Select
                    showSearch
                    placeholder="Select a Item"
                    optionFilterProp="children"
                    onChange={()=> {}}

                  >
                    {itemoptionList}
                  </Select>

                </Form.Item>
                <Form.Item name="qty"
                  label="Item Quantity"
                >
                  <InputNumber />

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
