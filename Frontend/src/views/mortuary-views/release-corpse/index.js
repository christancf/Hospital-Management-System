import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Select, Card } from "antd";
import moment from "moment";
import mortuaryService from "services/MortuaryService";
import {MORTUARY_ROLE, ValidateUser } from 'configs/AppConfig'
const { Option } = Select;

ValidateUser(MORTUARY_ROLE);

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

const Home = () => {
  return (
    <div>
      <h2 style={{ width: "100%", textAlign: "center" }}>Release Corpse</h2>
      <Demo />
    </div>
  );
};
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};
function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf("day");
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    disabledHours: () => {
      const now = new Date();
      let hour = now.getHours();
      return range(hour, 24);
    },
  };
}
function ShowModel(title, delay, innercontent, isSuccess) {
  if (isSuccess) {
    const modal = Modal.success({
      title: title,
      content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
      onOk: () => {
        window.location = "../mortuary/info";
      },
    });
    const timer = setInterval(() => {
      delay -= 1;
      modal.update({
        content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);

      modal.destroy();
      window.location = "../mortuary/info";
    }, delay * 1000);
  } else {
    const modal = Modal.error({
      title: title,
      content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
    });
    const timer = setInterval(() => {
      delay -= 1;
      modal.update({
        content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, delay * 1000);
  }
}
// let cabinet_number;
const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      receiver_name: values.receiverName,
      receiver_type: values.receiverType,
      date_of_release: moment(values.dor).valueOf(),
      receiver_description: values.receiverDescription,
    };

    mortuaryService
      .release(id, payload)
      .then((res) => {
        if (res.success) {
          ShowModel(
            "Successful !",
            3,
            "Your corpse release was successful",
            true
          );
          form.resetFields();
        } else {
          ShowModel("Unsuccessful !", 3, "Your corpse release failed", false);
        }
      })
      .catch((error) => {
        ShowModel("Unsuccessful !", 3, "Your corpse release failed", false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    ShowModel("Unsuccessfull !", 3, "Your corpse release failed", false);
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    mortuaryService
      .readForUpdate({ id: id })
      .then((res) => {
        const mydata = res.payload[0];
        setData(mydata);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);
  if (loading) {
    return (
      <>
        <p>Data Loading</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else {
    form.setFieldsValue({
      id: id,
      nic: data.NIC,
      name: data.name,
    });
    const currentDate = new Date();
    return (
      <Card style={{ width: "60%", margin: "auto", marginTop: "20px", paddingTop: "25px" }}>
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%", marginLeft: 100 }}
          labelAlign="left"
        >
          <Form.Item label="CorpseID" name="id" initialValue={data}>
            <Input placeholder={data} disabled />
          </Form.Item>
          <Form.Item label="NIC" name="nic" initialValue={data}>
            <Input placeholder={data} disabled />
          </Form.Item>

          <Form.Item label="Name" name="name" initialValue={data}>
            <Input placeholder={data} disabled />
          </Form.Item>

          <Form.Item
            label="Receiver Name"
            name="receiverName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Receiver Type"
            name="receiverType"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Receiver Type"
              filterOption={false}
              style={{ width: "50%" }}
            >
              {receiverType}
            </Select>
          </Form.Item>

          <Form.Item label="Receiver Description" name="receiverDescription">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Date of Release"
            name="dor"
            initialValue={currentDate}
          >
            <Input placeholder={currentDate} disabled />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
              <Button
                onClick={() => {
                  form.setFieldsValue({
                    receiverName: "Manoj Perera",
                    receiverType: "Medical Faculty",
                    receiverDescription: "Released to Medical Faculty of University of Colombo for educational purposes."
                  });
                }}
                danger
              >
                Demo
              </Button>
            </Form.Item>
        </Form>
      </Card>
    );
  }
};
const receiverType = [
  <Option key="Family">Family</Option>,
  <Option key="MedicalFaculty">Medical Faculty</Option>,
  <Option key="Hospital">Hospital</Option>,
];
export default Home;
