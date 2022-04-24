import { Table, Divider, Tag, Spin, Modal, notification  } from 'antd';
import { useState, useEffect } from 'react';
import channellingService from 'services/FrontlineChannellingService';
const { confirm } = Modal;

const openNotification = (title, content) => {
    notification.open({
      message: title,
      description: content,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };


const deleteAppointment = (id) => {

    confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, Your appointment will be delete ',
        onOk() {
          return new Promise((resolve, reject) => {

            channellingService.deleteAppointment(id).then((ress)=> {
                openNotification("Successfull !", "Your appointment deleted successfully.");
                setTimeout(function(){
                    window.location.reload(false);
                }, 2000);
                

            }).catch((errors)=> {
                openNotification("Unsuccessfull !", "Your appointment delete process faild !!.");

            })
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });


}

const ViewAppointment = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const [doctorloading, setDoctorloading] = useState(true);
    const [doctorData, setDoctorData] = useState();

    useEffect(() => {
        channellingService.getAllAppointments().then((resp) => {
            setData(resp.payload);
            setLoading(false);

        }).catch((err) => {
            setLoading(false);
            setError(true);
            setData();
        });

        channellingService.getAllDoctors().then((resp) => {
            setDoctorData(resp.payload);
            setDoctorloading(false);

        }).catch((err) => {
            setDoctorloading(false);
            setDoctorData();
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
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
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
                    <a href={`../frontchannelling/edit?appointmentId=${record._id}`}>Update</a>
                    <Divider type="vertical" />
                    <a onClick={()=> { deleteAppointment(record._id)}}>Delete</a>
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

        if (!doctorloading) {

            function calculate_age(dob) {
                dob = new Date(dob);
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);

                return Math.abs(age_dt.getUTCFullYear() - 1970);
            }

            const findDoctorName = (id) => {

                for (let i = 0; i < doctorData.length; i++) {
                    if (doctorData[i].staffID == id) {
                        return doctorData[i].staffName;
                    }
                }

                return "";

            }
            const tableData = data.map((appointment) => {
                return {
                    _id : appointment._id,
                    NIC: appointment.NIC,
                    name: appointment.name,
                    age: calculate_age(appointment.birthday),
                    contact: appointment.contact_no,
                    doctor: findDoctorName(appointment.doctor_id),
                    date: new Date(appointment.date).toDateString(),
                    status: appointment.status,
                    qnumb: appointment.queue_no
                }
            })
            return (
                <>
                    <h1 className='text-left' >View Appointments</h1>
                    <Table columns={columns} dataSource={tableData} />
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
            );

        }

    }


}

export default ViewAppointment;
