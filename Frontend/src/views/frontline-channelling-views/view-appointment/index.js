import { Table, Divider, Tag } from 'antd';



const ViewAppointment = () => {
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
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a>Update</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                </span>
            ),
        },
    ];

    const data = [
        {
            NIC: '1',
            name: 'John Brown',
            age: 32,
            contact: +94768898654,
            doctor: 'Dr. Kaputu Kaak',
            date: 'New York No. 1 Lake Park',
            status: ['nice', 'developer'],
            qnumb: 1
        },
        {
            NIC: '2',
            name: 'Jim Green',
            age: 42,
            contact: +94768898654,
            doctor: 'Dr. Kaputu Kaak',
            date: 'London No. 1 Lake Park',
            status: ['loser'],
            qnumb: 2
        },
        {
            NIC: '3',
            name: 'Joe Black',
            age: 32,
            contact: +94768898654,
            doctor: 'Dr. Kaputu Kaak',
            date: 'Sidney No. 1 Lake Park',
            status: ['cool', 'teacher'],
            qnumb: 3
        },
    ];


    return (
        <>
        <h1 className='text-left' >View Appointments</h1>
        <Table columns={columns} dataSource={data} />
        </>
    );

}

export default ViewAppointment;
