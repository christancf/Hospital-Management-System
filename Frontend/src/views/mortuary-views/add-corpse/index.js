import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Cascader,
  Col,
  Radio,
  Card,
  Modal,
  Row,
  Divider,
} from "antd";
import moment from "moment";
import mortuaryService from "services/MortuaryService";

const queryParams = new URLSearchParams(window.location.search);
const cabinetNo = queryParams.get("cabinetNo");

const Home = () => {
  return (
    <div>
      <h2 style={{ width: "100%", textAlign: "center" }}>Add Corpse Details</h2>
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
  // Can not select days after today
  return current && current > moment().endOf("day");
}
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function ShowModel(title, delay, innercontent, isSuccess) {
  if (isSuccess) {
    const modal = Modal.success({
      title: title,
      content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
      onOk: () => {
        window.location = "../mortuary/home";
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
      window.location = "../mortuary/home";
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
const Demo = () => {
  let dob;
  const onFinish = (values) => {
    if (values.cod == undefined) {
      values.cod = null;
    }
    if (values.sod == undefined) {
      values.sod = null;
    }
    const corpseData = {
      id: parseInt(values.id),
      cabinet_number: cabinetNo,
      NIC: values.nic,
      name: values.name,
      sex: values.sex,
      address: values.address,
      date_of_birth: moment(values.dob).valueOf(),
      date_time_of_death: moment(values.dod).valueOf(),
      cause_of_death: values.cod == null ? values.cod : values.cod[0],
      specifics_of_death: values.sod,
    };
    mortuaryService
      .addCorpse(corpseData)
      .then((value) => {
        if (value.success == true) {
          ShowModel("Successful !", 4, "The new corpse was added", true);
        } else {
          ShowModel(
            "Unsuccessful !",
            4,
            "The new corpse was not added, please try again",
            false
          );
        }
      })
      .catch((error) => {
        ShowModel(
          "Unsccessfull !",
          4,
          "The new corpse was not added, please try again",
          false
        );
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState();

  function disabledDateForDeath(current) {
    let dob = form.getFieldValue("dob");
    return (
      (current && current > moment().endOf("day")) || (current && current < dob)
    );
  }
  useEffect(() => {
    mortuaryService
      .getId()
      .then((res) => {
        setData(res.payload);
        setLoading(false);
      })
      .catch((err) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);
  if (loading) {
    return (
      <>
        <p>Form Loading</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else {
    return (
      <div>
        <Card style={{ width: "60%", margin: "auto", marginTop: "20px" }}>
          <Divider orientation="right">
            <h3>Cabinet Number: {cabinetNo}</h3>
          </Divider>
          <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "100%", marginLeft: 100, marginTop: -50 }}
            labelAlign="left"
          >
            <Form.Item
              // label="CorpseID"
              name="id"
              initialValue={data}
            ></Form.Item>
            <Form.Item
              label="NIC"
              name="nic"
              rules={[
                {
                  required: true,
                  pattern: "^([0-9]{9}[x|X|v|V]|[0-9]{12})$",
                  message: "Enter valid NIC",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Sex"
              name="sex"
              rules={[{ required: true, message: "Please choose the Sex!" }]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input the Address!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please input the Date of Birth!" },
              ]}
            >
              <DatePicker
                // name='dobs'
                placeholder="Select Date"
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item
              label="Date & Time of Death"
              name="dod"
              rules={[
                {
                  required: true,
                  message: "Please input the Date & Time of Death!",
                },
              ]}
            >
              <DatePicker
                placeholder="Select Date & Time"
                showNow={false}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDateForDeath}
                onSelect={setSelectedDate}
                showTime={{
                  defaultValue: moment("00:00:00", "HH:mm:ss"),
                  disabledHours: () => {
                    var chosenDate = new Date(moment(selectedDate).valueOf()).toLocaleDateString()
                    var now = new Date().toLocaleDateString()
                    if (chosenDate == now) {
                      const now = new Date();
                      let hour = now.getHours();
                      return range(hour, 24);
                    }
                    
                  },
                }}
              />
            </Form.Item>

            <Form.Item
              label="Cause of Death"
              name="cod"
              rules={[{ required: false }]}
            >
              <Cascader
                options={causeOfDeath}
                placeholder="Select Cause of Death"
              />
            </Form.Item>

            <Form.Item
              label="Specifics about Death"
              name="sod"
              rules={[{ required: false }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
};
const causeOfDeath = [
  {
    value: "Natural",
    label: "Natural",
  },
  {
    value: "Accident",
    label: "Accident",
  },
  {
    value: "Homicide",
    label: "Homicide",
  },
  {
    value: "Suicide",
    label: "Suicide",
  },
];
export default Home;
