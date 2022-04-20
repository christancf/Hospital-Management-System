import { Form, Input, InputNumber, Button, Select, DatePicker, Card, Spin, Modal } from 'antd';
import { useState, useEffect } from 'react';
import channellingService from 'services/FrontlineChannellingService';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const { Option } = Select;

const queryParams = new URLSearchParams(window.location.search);
const appointmentId = queryParams.get('appointmentId');

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};

const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
    number: {
        range: 'Must be between ${min} and ${max}',
    },
};



const AddAppointment = () => {

    const [form] = Form.useForm();


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const [appointmentLoading, setAppointmentLoading] = useState(true);
    const [appointmentData, setAppointmentData] = useState();


    useEffect(() => {
        channellingService.searchAppointment(appointmentId).then((resp) => {
            setAppointmentData(resp.payload[0]);
            setAppointmentLoading(false);

        }).catch((err) => {
            setAppointmentLoading(false);
            setAppointmentData();
        });

        channellingService.getAllDoctors().then((resp) => {
            setData(resp.payload);
            setLoading(false);

        }).catch((err) => {
            setLoading(false);
            setError(true);
            setData();
        });
    }, []);

    function filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }

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
                window.location = '../frontchannelling/list';
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





    const onFinish = values => {


        const payload = {
            NIC: values.NIC,
            name: values.name,
            birthday: toTimestamp(values.birthday),
            contact_no: values.contact_no,
            doctor_id: values.doctor_id.value,
            date: toTimestamp(values.date),
            queue_no: 20
        }

        channellingService.updateAppointment(appointmentId, payload).then((res) => {

            if (res.succuss) {
                ShowModel(
                    "Successfull !",
                    3,
                    "Your appointment successfully added",
                    true
                );
                form.resetFields();

            }
            else {
                ShowModel(
                    "Unsccessfull !",
                    3,
                    "Your appointment placement faild",
                    false
                );
            }




        }).catch((error) => {

            ShowModel(
                "Unsccessfull !",
                3,
                "Your appointment placement faild",
                false
            );

        })


    };

    if (loading) {
        return (
            <>
                <center>
                    <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
                </center>

            </>
        )
    }
    else if (error) {

        return (
            <>
                <center>
                    <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
                </center>

            </>
        )

    }
    else {
        if (!appointmentLoading) {

            const options = data.map((item) => {

                return (<Option key={item.staffID}>{item.staffName}</Option>)
            });

            const doctorName = data.find((item) => {
                if (item.staffID == appointmentData.doctor_id) {
                    return true;
                }
                else {
                    return false;
                }
            });

         
            form.setFieldsValue({
                doctor_id: doctorName.staffName

              });
            return (
                <>
                    <Card style={{ width: 800 }}>
                        <h1 className='text-left' style={{ marginLeft: 230 }}>Update Appointment</h1>


                        <Form {...layout} name="Update Appointment" form={form} onFinish={onFinish} validateMessages={validateMessages}>

                            <Form.Item name="NIC" label="Patient NIC" rules={[{ required: true }]} placeholder="Patient NIC" initialValue={appointmentData.NIC}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="name" label="Patient Name" rules={[{ required: true }]} placeholder="Patient Name" initialValue={appointmentData.name}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="birthday" label="Birthday" rules={[{ required: true }]} placeholder="Patient Birthday" initialValue={moment(new Date(appointmentData.birthday))}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="contact_no" label="Contact No" rules={[{ required: true }]} placeholder="Contact Number" initialValue={appointmentData.contact_no}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="doctor_id" label="Doctor" rules={[{ required: true }]}>
                                {/* <Cascader options={options} placeholder="Please select Doctor" showSearch={{ filter }} />, */}

                                <Select

                                    placeholder="Select users"
                                    filterOption={false}
                                    showSearch={{ filter }}
                                    style={{ width: '100%' }}

                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item name="date" label="Appointment Date" rules={[{ required: true }]} initialValue={moment(new Date(appointmentData.date))}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Update Appointment
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </>


            );

        }
        else {

            return (
                <>
                    <center>
                        <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
                    </center>

                </>
            )

        }


    }

};

export default AddAppointment;