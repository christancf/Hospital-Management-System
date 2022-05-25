import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Radio, Modal, Select } from 'antd';
import moment from 'moment';
import mortuaryService from 'services/MortuaryService';
const { Option } = Select;

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

const Home = () => {
    return (
        <div>
            <h1>Update Corpse Details</h1>
            {/* <h2>Cabinet Number: {cabinet_number}</h2> */}
            <Demo />
        </div>
    )
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
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
            const now = new Date()
            let hour = now.getHours()
            return range(hour, 24);
        }
    };
}
function ShowModel(title, delay, innercontent, isSuccess) {

    if (isSuccess) {
        const modal = Modal.success({
            title: title,
            content: `${innercontent}.This popup will be destroyed after ${delay} seconds.`,
            onOk: () => { window.location = '../mortuary/info' }
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
            window.location = '../mortuary/info'
        }, delay * 1000);
    }

    else {
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

    const onFinish = values => {

        
        const payload = {
            NIC: values.NIC,
            name: values.name,
            sex: values.sex,
            address: values.address,
            date_of_birth: moment(values.dob).valueOf(),
            date_time_of_death: moment(values.dod).valueOf(),
            cause_of_death: values.cod,
            specifics_of_death: values.sod
        }

        mortuaryService.updateCorpse(id, payload).then((res) => {

            if (res.success) {
                ShowModel(
                    "Successful !",
                    3,
                    "Your corpse modification successful",
                    true
                );
                form.resetFields();

            }
            else {
                ShowModel(
                    "Unsuccessful !",
                    3,
                    "Your corpse modification failed",
                    false
                );
            }




        }).catch((error) => {

            ShowModel(
                "Unsuccessful !",
                3,
                "Your corpse modification failed",
                false
            );

        })


    }
    const onFinishFailed = errorInfo => {
        ShowModel(
            "Unsuccessfull !",
            3,
            "Your corpse modification faild",
            false
        );
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        mortuaryService.readForUpdate({ id: id }).then((res) => {
            const mydata = res.payload[0];
            setData(mydata);
            setLoading(false);

        }).catch((err) => {
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
        )
    }
    else if (error) {
        return (
            <>
                <p>Error</p>
            </>
        )
    }
    else {
        console.log(data)
        const speci_death = (data.specifics_of_death == undefined) ? "" : data.specifics_of_death;
        form.setFieldsValue({
            id: id,
            nic: data.NIC,
            name: data.name,
            sex: data.sex,
            address: data.address,
            dob: moment(new Date(data.date_of_birth)),
            dod: moment(new Date(data.date_time_of_death)),
            cod: data.cause_of_death,
            sod: speci_death
        })
        // console.log(data.date_of_birth)


        return (
            <Form
                {...layout}
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="CorpseID"
                    name="id"
                    initialValue={data}
                >
                    <Input placeholder={data} disabled />
                </Form.Item>
                <Form.Item
                    label="NIC"
                    name="nic"
                    rules={[{ required: true, message: 'Please input the NIC!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Sex"
                    name="sex"
                    rules={[{ required: true, message: 'Please choose the Sex!' }]}
                >
                    <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input the Address!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[{ required: true, message: 'Please input the Date of Birth!' }]}
                >
                    <DatePicker
                        // defaultValue={moment('2015/01/01', dateFormat)}
                        placeholder='Select Date'
                        format="YYYY-MM-DD"
                        disabledDate={disabledDate}
                    />
                </Form.Item>

                <Form.Item
                    label="Date & Time of Death"
                    name="dod"
                    rules={[{ required: true, message: 'Please input the Date & Time of Death!' }]}
                >
                    <DatePicker
                        placeholder='Select Date & Time'
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                </Form.Item>

                <Form.Item
                    label="Cause of Death"
                    name="cod"
                    rules={[{ required: false }]}
                >
                    <Select

                        placeholder="Select Cause of Death"
                        filterOption={false}
                        style={{ width: '100%' }}
                    >
                        {causeOfDeath}
                    </Select>
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
        )
    }
}
const causeOfDeath = [
    <Option key="Natural">Natural</Option>,
    <Option key="Accident">Accident</Option>,
    <Option key="Homicide">Homicide</Option>,
    <Option key="Suicide">Suicide</Option>
]
export default Home
