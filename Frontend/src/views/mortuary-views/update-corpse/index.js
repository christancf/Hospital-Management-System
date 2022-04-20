import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Cascader, Radio, Modal } from 'antd';
import moment from 'moment';
import mortuaryService from 'services/MortuaryService';

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

const Home = () => {
    return (
        <div>
            <h1>Update Corpse Details</h1>
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
            onOk: () => { window.location = '.../home' }
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
            window.location = '.../home'
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

const Demo = () => {
    const onFinish = values => {

    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        mortuaryService.readForUpdate({id:id}).then((res) => {
            const mydata = res.payload;
            for (var i = 0; i < mydata.length; i++) {
                mydata[i].date_of_birth = new Date(mydata[i].date_of_birth).toLocaleDateString()
                mydata[i].date_time_of_death = new Date(mydata[i].date_time_of_death).toLocaleString()
            }
            setData(mydata);
            setLoading(false);
            console.log(data)
        }).catch((err) => {
            console.log(err)
            setLoading(false);
            setError(true);
            setData();
        });
    }, []);
    if (loading) {
        return (
            <>
                {/* <h2>Cabinet Number: {data.cabinet_number}</h2> */}
                <p>Data Loading</p>
            </>
        )
    }
    else if (error) {
        return (
            <>
                {/* <h2>Cabinet Number: {data.cabinet_number}</h2> */}
                <p>Error</p>
            </>
        )
    }
    else {
        return (
            <Form
				{...layout}
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
					<Input placeholder={data} disabled/>
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
					<Cascader options={causeOfDeath} placeholder="Select Cause of Death" />
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
const causeOfDeath = [{
	value: 'Natural',
	label: 'Natural'
},
{
	value: 'Accident',
	label: 'Accident'
},
{
	value: 'Homicide',
	label: 'Homicide'
},
{
	value: 'Suicide',
	label: 'Suicide'
}]
export default Home
