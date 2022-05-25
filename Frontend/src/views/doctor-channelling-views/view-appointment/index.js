import { Table, Divider, Tag, Spin, Modal, notification, Select, Row, Col, Form ,Menu, Dropdown} from 'antd';
import { useState, useEffect } from 'react';
import doctorChannellingService from 'services/DoctorChannellingService';
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { DOCTOR_CHANNELLING_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'
import { 
    PlusOutlined, 
    EllipsisOutlined, 
    StopOutlined, 
  } from '@ant-design/icons';
const { confirm } = Modal;



const { Option } = Select;

const ValidateUser = (role) => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);
	
	if(mytoken){
		var decoded = jwt_decode(mytoken)

		if(decoded.role == role){
			window.location = DOCTOR_CHANNELLING_PREFIX_PATH;
		}
		else{
			localStorage.clear();
			window.location = APP_PREFIX_PATH;
		}

	}

}

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
        title: 'Do you want to delete this appointment ?',
        content: 'When clicked the OK button, Your appointment will be delete ',
        onOk() {
          return new Promise((resolve, reject) => {

            doctorChannellingService.deleteAppointment(id).then((ress)=> {
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

const updateAppointmentStatus = (id, status) => {

    const openNotification = (isSuccess, id, status) => {

        if(isSuccess){
            notification.success({
                message: 'Appointment Status update process success !',
                description:
                  `Your appointment (${id}) status successfully updated to ${status} status !`,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
        }
        else{
            notification.error({
                message: 'Appointment Status update process failed !',
                description:
                `Your appointment (${id}) status update process failed !`,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
        }

      };

    doctorChannellingService.updateAppointmentStatus(id, {status: status}).then((res) => {

        if (res.succuss) {
            openNotification(true, id, status);
        }
        else {
            openNotification(false, id, status);
        }

    }).catch((error) => {

        openNotification(false, id, status);

    })
}

const ViewAppointment = () => {

    ValidateUser('doctor');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();
    const [form] = Form.useForm();


    const UpdateModel = (id, defaultstatus) => {

    
        

        // setStatus(defaultstatus);

        const onSeletectStatus = (val) => {
            console.log(val)
            // setStatus(val)
        }
      

        const statusModel = Modal.confirm({
            title: 'Update status of appointment',
            content: (
                <div style={{marginTop:20}}>
                    <Form form={form}>
                        <Form.Item label="Update status to :" name="formstatus">
                        <Select  defaultValue={defaultstatus} style={{ width: 120 }} onSelect={onSeletectStatus} >
                            <Option value="pending">Pending</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                        </Form.Item>
                    </Form>
                    
                    
                </div>
            ),
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: ()=> {
                updateAppointmentStatus(id, form.getFieldValue('formstatus'));
                statusModel.destroy();
                setTimeout(function(){
                    window.location.reload(1);
                 }, 2000);
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


      const CardDropdown = (props) => {

        const newJoinMemberOption = (
            <Menu>
              <Menu.Item key="0">
                <span>
                  <div className="d-flex align-items-center">
                    <PlusOutlined />
                    <span className="ml-2"><a onClick={() => { UpdateModel(props.record._id, props.record.status) }}>Update Status</a></span>
                  </div>
                </span>
              </Menu.Item>
              <Menu.Item key="1">
                <span>
                  <div className="d-flex align-items-center">
                    <StopOutlined />
                    <span className="ml-2"> <a onClick={() => { deleteAppointment(props.precord._id)}}>Delete</a></span>
                  </div>
                </span>
              </Menu.Item>
            </Menu>
          )
    
        return (
            <Dropdown overlay={newJoinMemberOption}  placement="bottomCenter">
              <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                <EllipsisOutlined style={{ transform: 'rotate(90deg)' }}/>
              </a>
            </Dropdown>
          )
      }
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
                    <CardDropdown record={record}/>
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
