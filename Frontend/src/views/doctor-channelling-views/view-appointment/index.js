import { Table, Divider, Tag, Spin, Modal, notification, Select, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import doctorChannellingService from 'services/DoctorChannellingService';
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from 'redux/constants/Auth'
const { confirm } = Modal;

const { Option } = Select;

const openNotification = (title, content) => {
    notification.open({
        message: title,
        description: content,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};


// const deleteAppointment = (id) => {

//     confirm({
//         title: 'Do you want to delete these items?',
//         content: 'When clicked the OK button, Your appointment will be delete ',
//         onOk() {
//           return new Promise((resolve, reject) => {

//             channellingService.deleteAppointment(id).then((ress)=> {
//                 openNotification("Successfull !", "Your appointment deleted successfully.");
//                 setTimeout(function(){
//                     window.location.reload(false);
//                 }, 2000);


//             }).catch((errors)=> {
//                 openNotification("Unsuccessfull !", "Your appointment delete process faild !!.");

//             })
//             setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//           }).catch(() => console.log('Oops errors!'));
//         },
//         onCancel() {},
//       });


// }

const updateAppointmentStatus = () => {
    
}

const ViewAppointment = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();


    const UpdateModel = (status) => {

        function handleChange(value) {
            console.log(`selected ${value}`);
        }

   

        const statusModel = Modal.confirm({
            title: 'Update status of appointment',
            content: (
                <div style={{marginTop:20}}>
                    Update sttaus to :  &nbsp;&nbsp;&nbsp;
                    <Select defaultValue={status} style={{ width: 120 }} onChange={handleChange}>
                            <Option value="Pending">Pending</Option>
                            <Option value="Completed">Completed</Option>
                            <Option value="Cancelled">Cancelled</Option>
                        </Select>
                </div>
            ),
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: ()=> {
                statusModel.destroy();
            },
            onCancel: ()=>{
                statusModel.destroy();
            },
        });


 

    }


    const fetUserEmail = () => {

        var mytoken = localStorage.getItem(AUTH_TOKEN);

        if (mytoken) {
            var decoded = jwt_decode(mytoken)

            return decoded.email;

        }

    }
    const GetUserName = () => {

        var mytoken = localStorage.getItem(AUTH_TOKEN);

        if (mytoken) {
            var decoded = jwt_decode(mytoken)

            return (
                <h1>
                    {decoded.name}
                </h1>
            );

        }
        else {
            return (
                <h1>
                </h1>
            );
        }

    }

    useEffect(() => {
        doctorChannellingService.getAppointmentList(fetUserEmail()).then((resp) => {

            if (resp.succuss == true) {

                setData(resp.payload);
                setLoading(false);
            }
            else {
                setData();
                setLoading(false);
            }


        }).catch((err) => {
            setLoading(false);
            setError(true);
            setData();
        });


    }, []);

    const columns = [
        {
            title: 'NIC',
            dataIndex: 'NIC',
            key: 'NIC',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Queue No',
            dataIndex: 'qnumb',
            key: 'qnumb',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: tags => (
                <span>
                    {tags == "cancelled" &&
                        <Tag color='volcano' key={tags}>
                            {tags.toUpperCase()}
                        </Tag>
                    }
                    {tags == "pending" &&
                        <Tag color='geekblue' key={tags}>
                            {tags.toUpperCase()}
                        </Tag>

                    }
                    {tags == "completed" &&
                        <Tag color='green' key={tags}>
                            {tags.toUpperCase()}
                        </Tag>

                    }
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => { UpdateModel("Completed") }}>Update Status</a>
                    <Divider type="vertical" />
                    <a onClick={() => { }}>Delete</a>
                </span>
            ),
        },
    ];

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

        function calculate_age(dob) {
            dob = new Date(dob);
            var diff_ms = Date.now() - dob.getTime();
            var age_dt = new Date(diff_ms);

            return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

        const tableData = data.map((appointment) => {
            return {
                _id: appointment._id,
                NIC: appointment.NIC,
                name: appointment.name,
                age: calculate_age(appointment.birthday),
                contact: appointment.contact_no,
                date: new Date(appointment.date).toDateString(),
                status: appointment.status,
                qnumb: appointment.queue_no
            }
        })

        return (
            <>
                <>
                    <h1 className='text-left' >View Appointments <GetUserName /></h1>
                    <Table columns={columns} dataSource={tableData} />
                </>

            </>
        )

    }


}

export default ViewAppointment;
