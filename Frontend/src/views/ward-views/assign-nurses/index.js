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
const key = 'assign'

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
				<h1 className='text-left' style={{ marginLeft: 20, marginBottom: 30 }}>Assign Nurse</h1>
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
	const [category, setCategory] = useState()
	const [options, setOptions] = useState()

	useEffect(() => {
		wardService.readWardCategory()
		.then((res) => {
			console.log('Category')
			console.log(res)
			setData(res)
			setLoading(false)

		}).catch((err) => {
			setLoading(false)
			setError(true)
			setData()
		})
		console.log('Use Effect')
		wardService.readWardCategoryIDs(category)
		.then((res) => {
			console.log('Options')
			console.log(res)
			setOptions(res)
		})
		.catch((e) => {
			setOptions()
			console.log(`Error: ${ e }`)
		})
	}, [category])
  const onFinish = values => {
		message.loading({content: 'Please wait...', key})
		delete values.name
		delete values.qualification
		values.assignedDate = (new Date()).getTime()
		values.reassignDate = values.reassignDate._d.getTime()
    console.log(values)
    wardService.assignNurse(values)
		.then(() => message.success({content: `Nurse ${values.id} has been successfully assigned`, key, duration:2}))
		.catch(() => message.error({content: `Nurse ${values.id} could not be assigned`, key, duration:2}))

		form.resetFields()
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
	const searchById = (id) => {
    wardService.getNurseDetails(id)
    .then((details) => { 
			console.log(details)
			if(details != null){
				checkIfAssigned(details.staffID)
				.then(res => {
					if(res){
						form.setFieldsValue({
							name: details.staffName,
							qualification: details.qualification
						})
						return
					}
					message.error('Nurse of this ID has already been assigned')
				})
			}else message.error('ID doesn\'t belong to nurse')
    }).catch((e)=>{
      console.log(`Error @ update-ward-details: ${e}`)
    })    
  }

	const checkIfAssigned = id => {
		return wardService.checkAssignedNurse(id)
		.then(res => {
			if(res === null)return true
		}).catch(e => console.log(`Error: ${e}`))
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
		return (
			<Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
				<Form.Item label="Nurse ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
					<Search placeholder="Nurse ID" id="id" onSearch={id => searchById(id)} enterButton />
				</Form.Item>
				<Form.Item label="Name" name="name" rules={[{ required: true }]}>
					<Input disabled={true} id="name" />
				</Form.Item>
				<Form.Item label="Qualification" name="qualification" rules={[{ required: true }]}>
					<Input disabled={true} id="qualification" />
				</Form.Item>
				<Form.Item label="Reassign Date" name="reassignDate" rules={[{ required: true, message: 'Please select reassign date' }]}>
					<DatePicker/>
				</Form.Item>
				<Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select ward category' }]}>
					<Select id="category" onChange={c => setCategory(c)} allowClear>
						{data.map(d => (
							<Option value={d._id}>{(d._id === 'icu')? d._id.toUpperCase() : d._id[0].toUpperCase()+d._id.substring(1)}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Ward ID" name="wardID" rules={[{ required: true, message: 'Please select ward id' }]}>
					<Select placeholder='Ward ID' id="wardId" >
						{/*options.map(d => (
							<Option value={d.id}>{d.id}</Option>
						))*/
							console.log('Options inside select')}{
							options? options.map(d => (<Option value={d.id}>{d.id}</Option>)): console.log('undefined')
						}
					</Select>
				</Form.Item>
				<Form.Item label="Role" name="role">
					<Select allowClear>
						<Option value="head">Head Nurse</Option>
					</Select>
				</Form.Item>
				<Form.Item {...tailLayout}>
						<Button htmlType="reset">Discard</Button>
						<Button type="primary" htmlType="submit" style={{marginLeft: 20}}>Save</Button>
				</Form.Item>
			</Form>
		)
	}
}


export default AssignNurses