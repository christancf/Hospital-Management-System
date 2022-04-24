import {
  Form,
  Input,
  InputNumber,
  Button,
  Cascader,
  DatePicker,
  Select,
  Modal,
  Spin,
} from "antd";
import moment from "moment";
import patientManagementService from "services/PatientManagement";
import { useState, useEffect } from "react";

const { Option } = Select;
const { Search } = Input;

const queryParams = new URLSearchParams(window.location.search);
const patientId = queryParams.get("patientId");

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

function disabledDate2(current) {
	// Can not select days before today and today
	return current && current > moment().endOf('day');
  }

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a valid email!",
  },
};

const options = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];
const bloodGroup = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

const PatientAdmittance = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const [patientLoading, setPatientLoading] = useState(true);
  const [patientError, setPatientError] = useState(false);
  const [patientData, setPatientData] = useState();

  useEffect(() => {
    patientManagementService
      .patientDetails(patientId)
      .then((resp) => {
        setData(resp.payload);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);

  useEffect(() => {
    patientManagementService
      .patientlist()
      .then((resp) => {
        setPatientData(resp.payload);
        setPatientLoading(false);
      })
      .catch((err) => {
        setPatientLoading(false);
        setPatientError(true);
        setPatientData();
      });
  }, []);

  function ShowModel(title, delay, innercontent, isSuccess) {
    if (isSuccess) {
      const modal = Modal.success({
        title: title,
        content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
        onOk:() => {window.location.href = `../patient/update?patient`}
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
		    window.location.href = `../patient/update?patient`
        
      }, delay * 1000);
    } else {
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

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  const onFinish = (values) => {
    const patient = {
      id: patientId,
      fullName: values.fullName,
      nic: values.nic,
      dateOfBirth: moment(values.dateOfBirth).format("X"),
      sex: values.sex,
      mobile: values.mobile,
      address: values.address,
      bloodGroup: values.bloodGroup,
    };

    const payload = { patient: patient };

    patientManagementService
      .update(payload)
      .then((res) => {
        ShowModel(
          "Successful!",
          5,
          "Patient details updated Sucessfully",
          true
        );
      })
      .catch((error) => {
        ShowModel("Failed!", 5, "Patient details update Failed", false);
      });

    console.log(payload);
  };

  if (patientId == undefined) {
    if (patientLoading) {
      return (
        <>
          <center>
            <Spin
              size="large"
              tip="Loading..."
              delay={500}
              spinning={loading}
            />
          </center>
        </>
      );
    } else if (patientError) {
      return (
        <>
          <center>
            <Spin
              size="large"
              tip="Loading..."
              delay={500}
              spinning={loading}
            />
          </center>
        </>
      );
    } else {
      const optionList = patientData.map((patient) => {
        return (
          <Option value={patient.patientId}>
            {patient.patientId} - {patient.fullName}
          </Option>
        );
      });
      return (
        <>
          <Select
            showSearch
			style={{width:'80%'}}
            placeholder="Select a Patient"
            optionFilterProp="children"
            onSelect={(value) => (window.location.href = `../patient/update?patientId=${value}`)}
			size={"large"}
        >
            {optionList}

        </Select>

        </>
      );
    }
  } else if (loading) {
    return (
      <>
        <center>
          <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
        </center>
      </>
    );
  } else if (error) {
    return (
      <>
        <center>
          <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
        </center>
      </>
    );
  } else {
    return (
      <Form
        {...layout}
        name="Admittance"
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
      >
        <label>Update Patient details</label>
        <Form.Item
          name="id"
          label="Patient ID"
          initialValue={patientId}
          rules={[{ required: true }]}
          placeholder="Patient ID"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="fullName"
          initialValue={data.fullName}
          label="Full  Name"
          rules={[{ required: true }]}
          placeholder="Full Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nic"
          initialValue={data.nic}
          label=" NIC"
          rules={[{ required: true, pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' , message: 'Enter valid NIC' }]}
          placeholder="NIC"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          initialValue={moment(new Date(data.dateOfBirth * 1000))}
          label="Birthday"
          rules={[{ required: true }]}
          placeholder=" Birthday"
        >
          <DatePicker disabledDate={disabledDate2}/>
        </Form.Item>
        <Form.Item
          name="sex"
          initialValue={data.sex}
          label="Sex"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Sex"
            filterOption={false}
            showSearch={{ filter }}
            style={{ width: "100%" }}
          >
            {options.map((d) => (
              <Option value={d.value}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="mobile"
          initialValue={data.mobile}
          label="Contact No"
          rules={[{ required: true }]}
          placeholder="Contact Number"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          initialValue={data.address}
          label="Address"
          rules={[{ required: true }]}
          placeholder="Address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bloodGroup"
          initialValue={data.bloodGroup}
          label="bloodGroup"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Blood Group"
            filterOption={false}
            showSearch={{ filter }}
            style={{ width: "100%" }}
          >
            {bloodGroup.map((d) => (
              <Option key={d.value}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default PatientAdmittance;
