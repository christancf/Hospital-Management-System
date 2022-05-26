import React from 'react'
import { Form, Input, Button, Checkbox, Card, Select, message} from 'antd';
import wardService from 'services/WardService'
import { ShowModal } from '../add-ward-details'
import { ValidateUser, WARD_ROLE } from 'configs/AppConfig';

const { Option } = Select
const key = 'add'

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 15, span: 16 },
}

ValidateUser(WARD_ROLE)

const AddCategory = () => {
  return (
    <>
				<Card style={{ width: 800 }}>
					<h1 className='text-left' style={{ marginLeft: 20, marginBottom: 30 }}>Add Category</h1>
          <AddCategoryForm />
        </Card>
    </>    
  );
};


const AddCategoryForm = () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    //Number validation, 
    wardService.addWardCategory({'category': values.category.toLowerCase(), 'abbreviation': values.abbreviation})
    .then(() => {
      ShowModal(
        "Successful!",
        4,
        "Category added successfully",
        true
      )
      form.resetFields()
    })
    .catch(() => {
      ShowModal(
        "Try again!",
        4,
        "There was an unexpected error. Try again later.",
        true
      )
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return(
    <Form {...layout} name="Add Category" form={form} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please input category!' }]}>
        <Input placeholder='Intensive Care Unit' />
      </Form.Item>
      <Form.Item label="Abbreviation" name="abbreviation" rules={[{ required: true, message: 'Please input a short form this category!' }]}>
        <Input placeholder='ICU' />
      </Form.Item>
      <Form.Item {...tailLayout}>
						<Button htmlType="reset">Discard</Button>
						<Button type="primary" htmlType="submit" style={{marginLeft: 20}}>Save</Button>
				</Form.Item>
    </Form>
  )
}


export default AddCategory
