import { Form, Input, InputNumber, Button, Cascader, DatePicker,Select,Modal,Spin } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import bloodBankService from 'services/BloodBankService';

const { Option } = Select;

function toTimestamp(strDate){
	var datum = Date.parse(strDate);
	return datum/1000;
 }

const layout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 10 },
};

const validateMessages = {
	required: 'This field is required!',
	types: {
		email: 'Not a valid email!',
	},
};

const bloodGroup =[
	{
		label:"A positive(A+)",
		value:"A+"
	},
	{
		label:"A negative(A-)",
		value:"A-"
	},
	{
		label:"B positive(B+)",
		value:"B+",
	},
	{
		label:"B negative(B-)",
		value:"B-",
	},
	{
		label:"AB positive(AB+)",
		value:"AB+",
	},
	{
		label:"AB negative(AB-)",
		value:"AB-",
	},
	{
		label:"O positive(O+)",
		value:"O+",
	},
	{
		label:"O negative(O-)",
		value:"O-",
	},
]


const UpdateBloodBag = () => {
	const [form] = Form.useForm();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		bloodBankService.bloodBagDetails(6).then((resp) => {
			setData(resp.payload);
			setLoading(false);
		}).catch((err) => {
			setLoading(false);
			setError(true);
			setData();
		});
	}, []);

	function ShowModel(title, delay, innercontent, isSuccess) {

		if (isSuccess) {
			const modal = Modal.success({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}

		else {
			const modal = Modal.error({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}
	}

	function filter(inputValue, path) {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}


	const onFinish = values => {

		const bloodbag =  {
			bagId: 6,
      donorName: values.donorName,
      donorNIC: values.donorNIC,
      donationNumber: values.donationNumber,
      donateDate: moment(values.donateDate).format("X"),
      place: values.place,
      bloodGroup: values.bloodGroup,
		}

		const payload={bloodbag:bloodbag}

		bloodBankService.updateBloodDetails(payload).then((res) => {
			ShowModel("Successful!",5,"Blood Bag details updated Sucessfully",true)
			form.resetFields();
		}).catch((error) =>{
			ShowModel("Failed!",5,"Blood Bag details update Failed",false)
		})
	
		console.log(payload)
		

		//console.log(res);
	};

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

	else{

		// var myDate = new Date(data.dateOfBirth);
		// myDate.toLocaleString();

		return (

			

			<Form {...layout} name="BloodBagUpdate" onFinish={onFinish} validateMessages={validateMessages}>
				<label>Admiit New Patient</label>
				<Form.Item name="donorName" initialValue={data.donorName} label="Donor's  Name" rules={[{ required: true }]} placeholder="Donor's  Name" >
					<Input />
				</Form.Item>
				<Form.Item name="donorNIC" initialValue={data.donorNIC} label=" Donor's NIC" rules={[{ required: true }]} placeholder="Donor's NIC">
					<Input />
				</Form.Item>
        <Form.Item name="donationNumber" initialValue={data.donationNumber} label=" Donation Number" rules={[{ required: true }]} placeholder="Donation Number">
					<Input />
				</Form.Item>
				<Form.Item name="donateDate"  label="Donate Date" rules={[{ required: true }]} placeholder=" Donate Date">
					<DatePicker />
				</Form.Item> 
				<Form.Item name="place" initialValue={data.place} label="Place" rules={[{ required: true }]} placeholder="Place">
					<Input />
				</Form.Item>
				<Form.Item name="bloodGroup" initialValue={data.bloodGroup} label="bloodGroup" rules={[{required:true}]}>
				<Select
					labelInValue
					placeholder="Select Blood Group"
					filterOption={false}
					showSearch={{ filter }}
					style={{ width: '100%' }}
				>
					{bloodGroup.map(d => (
						<Option key={d.value}>{d.label}</Option>
					))}
				</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button type="primary" htmlType="submit">
					Admit Button
					</Button>
				</Form.Item>
			</Form>
		);
					}
};

export default UpdateBloodBag;

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const UpdateBloodBag = () => {

//   const onFinish = values => {
//     let Name = values.Name
//     let NIC = values.NIC
//     let DonationNum = values.DonationNum
//     let DonatedDate = values.DonatedDate
//     let Place = values.Place
//     let BloodGroup = values.BloodGroup
//     let result = bloodBankService.updateBloodBagDetails(Name,NIC,DonationNum,DonatedDate,Place,BloodGroup)
//     console.log('Successfully updated!', result)
//   };

// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo);
// };

// const setValues = (bloodBagDetails) => {
//   let Name = document.getElementById('Name')
//   let NIC = document.getElementById('NIC')
//   let DonationNum = document.getElementById('DonationNum')
//   let DonatedDate = document.getElementById('DonatedDate')
//   let Place = document.getElementById('Place')
//   let BloodGroup = document.getElementById('BloodGroup')
// }



//   return (
//     <div>
//         <Form.Item label="Donor's Name" >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donor's NIC" name="DonorNIC" rules={[{ required: true, message: 'Please input Donor\'s NIC!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donation Number " name="DonationNum" rules={[{ required: true, message: 'Please input Donation Number!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Donated Date & Time">
//           <DatePicker />
//         </Form.Item>
//         <Form.Item label="Place" >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Blood Group">
//           <Select>
//             <Select.Option value="A+">A positive(A+)</Select.Option>
//             <Select.Option value="A-">A negative(A-)</Select.Option>
//             <Select.Option value="B+">B positive(B+)</Select.Option>
//             <Select.Option value="B-">B negative(B-)</Select.Option>
//             <Select.Option value="O+">O positive(O+)</Select.Option>
//             <Select.Option value="O-">O negative(O-)</Select.Option>
//             <Select.Option value="AB+">AB positive(AB+)</Select.Option>
//             <Select.Option value="AB-">AB negative(AB-)</Select.Option>
//          </Select>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Button className="mr-2" htmlType="button" >
//             Reset
//           </Button>
//           <Button className="mr-2" type="primary" htmlType="submit">
//             Update
//           </Button>
//       </Form.Item>
//     </div>
//   );
// };

// export default UpdateBloodBag
