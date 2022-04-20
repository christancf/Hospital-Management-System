import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Card, Select, DatePicker, message, Spin} from 'antd';
import wardService from 'services/WardService';
import { fromPairs } from 'lodash';
const { Search } = Input
const { Option } = Select
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 15, span: 16 },
}

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

const AssignNurses = () => {
  return (
    <>
			<Card style={{ width: 800 }}>
				<h1 className='text-left' style={{ marginLeft: 230 }}>Assign Nurses</h1>
				<AssignNursesForm />
			</Card>
		</>
  )
}

const AssignNursesForm = () => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [data, setData] = useState()
	const [iloading, setIloading] = useState(true)
	const [ierror, setIerror] = useState(false)
	const [options, setOptions] = useState()

	useEffect(() => {
		wardService.readWardCategory()
		.then((res) => {
			setData(res)
			setLoading(false)

		}).catch((err) => {
			setLoading(false)
			setError(true)
			setData()
		})
		if(form.getFieldValue['category'] !== undefined){
			wardService.readWardCategoryIDs(form.getFieldValue['category'])
			.then((res) => {
				setOptions(res)
				setLoading(false)
			})
			.catch((e) => {
				setIloading(false)
				setIerror(true)
				setOptions()
				console.log(`Error: ${ e }`)
			})
		}
	}, [])
  const onFinish = values => {
    console.log(values)
    /*console.log(`${values}`)
    wardService.assignNurse(values.id)*/
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
	const searchById = (id) => {
    wardService.readStaffNameAndQualification(id)
    .then((details) => { 
			console.log(details)
			if(details != null){
				form.setFieldsValue({
					name: details.staffName,
					qualification: details.qualification
				})         
			}else message.error('ID doesn\'t belong to nurse')
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })    
  }
	
	const resetFields = () => {
    form.resetFields()
  }

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
		const resData = data
		return (
			<Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
				<Form.Item label="Nurse ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
					<Search placeholder="Nurse ID" id="id" onSearch={id => searchById(id)} enterButton />
				</Form.Item>
				<Form.Item label="Name" name="name">
					<Input disabled={true} id="name" />
				</Form.Item>
				<Form.Item label="Qualification" name="qualification">
					<Input disabled={true} id="qualification" />
				</Form.Item>
				<Form.Item label="Reassign Date" name="reassignDate" rules={[{ required: true, message: 'Please select reassign date' }]}>
					<DatePicker/>
				</Form.Item>
				<Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select ward category' }]}>
					<Select allowClear>
						{resData.map(d => (
							<Option value={d._id}>{(d._id === 'icu')? d._id.toUpperCase() : d._id[0].toUpperCase()+d._id.substring(1)}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Ward ID" name="wardID" rules={[{ required: true, message: 'Please select ward id' }]}>
					<Select placeholder='Ward ID' id="wardId" rend>
					</Select>
				</Form.Item>
				<Form.Item label="Role" name="role">
					<Select allowClear>
						<Option value="head">Head Nurse</Option>
					</Select>
				</Form.Item>
				<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="button" onClick={resetFields} style={{backgroundColor: '#000', marginRight: 20}}>Discard</Button>
						<Button type="primary" htmlType="submit">Save</Button>
				</Form.Item>
			</Form>
		)
	}
}


export default AssignNurses