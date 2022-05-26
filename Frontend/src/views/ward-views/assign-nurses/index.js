import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, Select, DatePicker, message, Spin, Modal, Popover} from 'antd'
import wardService from 'services/WardService'
import { capitalize } from '../assigned-nurse-details'
import moment from 'moment'
import { ValidateUser, WARD_ROLE } from 'configs/AppConfig';

const { Search } = Input
const { Option } = Select
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 15, span: 16 },
}

const POPOVER_MESSAGE = {
	'nurse-unit-manager': 'Runs the ward',
	'associate nurse unit manager':'Acts as the manager when the nurse unit manager is off site',
	'nurse practitioner':'Highly skiled nurses with an advanced level of training',
	'registered nurse': 'Provide a high level of day-to-day care',
	'enrolled nurse': 'Provide basic medical care under the supervision of more senior nurses'
}

ValidateUser(WARD_ROLE)


function disabledDate(current) {
	return current < moment().endOf('day');
}

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

const ShowModal = (title, delay, innercontent, isSuccess) => {

  if (isSuccess) {
    const modal = Modal.success({
      title: title,
      content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      closable: true,
      maskClosable: true,
      okText: 'Go to Assigned nurses page',
      onOk: () => {window.location ='../nurse/details'}
    });
    const timer = setInterval(() => {
      delay -= 1;
      modal.update({
        content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy()
    }, delay * 1000)
  }
  else {
    const modal = Modal.error({
      title: title,
      content: `${innercontent}.This popup will close in ${delay} seconds.`,
    });
    const timer = setInterval(() => {
      delay -= 1;
      
      modal.update({
        content: `${innercontent}.This popup will close in ${delay} seconds.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, delay * 1000);
  }
}


const AssignNursesForm = () => {
	const [form] = Form.useForm()
	const [categoryLoading, setCategoryLoading] = useState(true)
	const [categoryError, setCategoryError] = useState(false)
	const [categoryData, setCategoryData] = useState()
	const [category, setCategory] = useState()
	const [categoryOptions, setCategoryOptions] = useState()
	const [checked, setChecked] = useState(false)
	const [nurseData, setNurseData] = useState()
	const [nurseDataLoading, setNurseDataLoading] = useState(true)
	const [nurseDataError, setNurseDataError] = useState(false)

	useEffect(() => {
		wardService.getAllUnassignedNurseDetails()
		.then(res => {
			setNurseData(res)
			setNurseDataLoading(false)
		}).catch((err) => {
			setNurseDataLoading(false)
			setNurseDataError(true)
			setNurseData()
		})
		wardService.readWardCategory()
		.then((res) => {
			console.log('Category')
			console.log(res)
			setCategoryData(res)
			setCategoryLoading(false)

		}).catch((err) => {
			setCategoryLoading(false)
			setCategoryError(true)
			setCategoryData()
		})
		console.log('Use Effect')
		wardService.readWardCategoryIDs(category)
		.then((res) => {
			console.log('Options')
			console.log(res)
			setCategoryOptions(res)
		})
		.catch((e) => {
			setCategoryOptions()
			console.log(`Error: ${ e }`)
		})
	}, [category])
  const onFinish = values => {
		delete values.name
		delete values.qualification
		values.assignedDate = (new Date()).getTime()
		values.reassignDate = values.reassignDate._d.getTime()
    console.log(values)
    wardService.assignNurse(values)
		.then(() => {
			ShowModal(
        "Successful!",
        4,
        "Category added successfully",
        true
      )
      // form.resetFields()
			setCategory()
		})
		.catch(() => {
			ShowModal(
        "Try again!",
        4,
        "There was an unexpected error. Try again later.",
        true
      )
		})

		form.resetFields()
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

	const handleCheckBox = e => {
		setChecked(prevChecked => {
			if(prevChecked) return prevChecked = false
			return prevChecked = true
		})
	}
  
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

	const setDetails = id => {
    nurseData.map(d => {
      if(id === d.staffID){
        form.setFieldsValue({
          name: d.staffName,
					qualification: d.qualification
        })
        return
      }
    })
    document.getElementById("nurseId").setAttribute('disabled', 'true')
  }

	if (nurseDataLoading || categoryLoading) {
		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={nurseDataLoading && categoryLoading} />
				</center>

			</>
		)
	}
	else if (nurseDataError || categoryError) {

		return (
			<>
				<center>
					<Spin size="large" tip="Loading..." delay={500} spinning={nurseDataLoading && categoryLoading} />
				</center>

			</>
		)

	}
	else {
		return (
			<Form {...layout} name="Assign Nurses" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
				<Form.Item label="Nurse ID" name="id" rules={[{ required: true, message: 'Please input ward ID!' }]}>
				<Select showSearch allowClear id="nurseId" placeholder='Select a category' onChange={setDetails}>
            { nurseData.map(d => (
              <Option value={d.staffID}>{`${d.staffID} - ${d.staffName}`}</Option>
            ))}
          </Select>
				</Form.Item>
				<Form.Item label="Name" name="name" rules={[{ required: true }]}>
					<Input disabled={true} id="name" />
				</Form.Item>
				<Form.Item label="Qualification" name="qualification" rules={[{ required: true }]}>
					<Input disabled={true} id="qualification" />
				</Form.Item>
				<Form.Item label="Reassign Date" name="reassignDate" rules={[{ required: true, message: 'Please select reassign date' }]}>
					<DatePicker disabledDate={disabledDate}/>
				</Form.Item>
				<Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select ward category' }]}>
					<Select id="category" onChange={setCategory} showSearch allowClear>
						{categoryData.map(d => (<Option value={d._id}>{capitalize(d._id)}</Option>))}
					</Select>
				</Form.Item>
				<Form.Item label="Ward ID" name="wardID" rules={[{ required: true, message: 'Please select ward id' }]}>
					<Select placeholder='Ward ID' id="wardId" >
						{categoryOptions? categoryOptions.map(d => (<Option value={d.id}>{d.id}</Option>)): console.log('undefined')}
					</Select>
				</Form.Item>
				<Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role' }]}>
					<Select placeholder='Select a role' id="role" >
						<Option value='nurse unit manager'>
							<Popover placement="left" content={POPOVER_MESSAGE['nurse-unit-manager']} trigger="hover">
								Nurse Unit Manager
							</Popover>
						</Option>
						<Option value='associate nurse unit manager'>
							<Popover placement="left" content={POPOVER_MESSAGE['associate nurse unit manager']} trigger="hover">
								Associate Nurse Unit Manager
							</Popover>
						</Option>
						<Option value='nurse practitioner'>
							<Popover placement="left" content={POPOVER_MESSAGE['nurse practitioner']} trigger="hover">	
								Nurse Practitioner
							</Popover>
						</Option>
						<Option value='registered nurse'>
							<Popover placement="left" content={POPOVER_MESSAGE['registered nurse']} trigger="hover">	
								Registered Nurse
							</Popover>
						</Option>
						<Option value='enrolled nurse'>
							<Popover placement="left" content={POPOVER_MESSAGE['enrolled nurse']} trigger="hover">
								Enrolled Nurse
							</Popover>
						</Option>
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