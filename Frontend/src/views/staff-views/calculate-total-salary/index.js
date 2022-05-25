import React, { useEffect, useState } from 'react'
import { Typography, Table, Select, Spin } from 'antd';
import staffService from 'services/StaffService';
import { STAFF_ROLE, ValidateUser } from 'configs/AppConfig';

ValidateUser(STAFF_ROLE)

const { Title } = Typography
const { Option } = Select
/*

A => othours => id, sum
B => bonus => id, sum
C => name, base salary = id, name, base salary




*/

//get default value for month
const setDefaultMonth = () => {
	if(new Date().getDate() > 25) return new Date().getMonth()
	return new Date().getMonth() - 1
}
	
const CalculateTotalSalary = () => {

	const [bonusLoading, setBonusLoading] = useState(true)
	const [otLoading, setOtLoading] = useState(true)
	const [staffLoading, setStaffLoading] = useState(true)

	const [bonusError, setBonusError] = useState(false)
	const [otError, setOtError] = useState(false)
	const [staffError, setStaffError] = useState(false)

	const [bonusData, setBonusData] = useState()	
	const [otData, setOtData] = useState()
	const [staffData, setStaffData] = useState()
	const [monthData, setMonthData] = useState(setDefaultMonth())

	useEffect(() => {

		staffService.readStaffs()
		.then((staff) => {
			console.log('staff', staff)
			setStaffData(staff)
			setStaffLoading(false)

			staffService.getBonusAmounts({month: monthData})
			.then((bonus) => {
				console.log('bonus', bonus)
				setBonusData(bonus)
				setBonusLoading(false)
			})
			.catch((e) => {
				setBonusLoading(false)
				setBonusError(true)
				setBonusData()
			})

			staffService.getOThours({month: monthData})
			.then((ot) => {
				console.log('ot', ot)
				setOtData(ot)
				setOtLoading(false)
			})
			.catch((e) => {
				setOtLoading(false)
				setOtError(true)
				setOtData()
			})
		})
		.catch((e) => {
			setStaffLoading(false)
			setStaffError(true)
			setStaffData()
		})


	}, [monthData])

	const setOnChangeMonth = e => {

		// setBonusData()
		// setOtData()
		// setStaffData()

		setBonusLoading(true)
		setOtLoading(true)
		setStaffLoading(true)

		
		setMonthData(e.key)

	}


	const columns = [
		{
		  title: 'Staff ID',
		  dataIndex: 'staffID',
		  sorter: {
			  compare: (a, b) => a.staffID - b.staffID,
			  multiple: 4,
		  },
		},
		{
		  title: 'Staff Name',
		  dataIndex: 'staffName',
		},
		{
		  title: 'Basic Salary',
		  dataIndex: 'basicSalary',
		},
		{
		  title: 'OT Hours',
		  dataIndex: 'othrs',
		},
		{
		  title: 'OT Rate',
		  dataIndex: 'otRate'
		},
		{
		  title: 'OT Amount',
		  dataIndex: 'otAmount'
		},
		{
			title: 'Bonuses',
			dataIndex: 'bonuses'
		},
		{
			title: 'Total Salary',
			dataIndex: 'totalSalary'
		},
	  ];

	  if(bonusLoading || otLoading || staffLoading) {

		return (
            <>
                <center>
                    <Spin size="large" tip="Loading..." delay={500} spinning={otLoading || staffLoading || bonusLoading} />
                </center>

            </>
        )

	
	  } else if(bonusError || otError || staffError) {

		return (
            <>
                <center>
                    <Spin size="large" tip="Loading..." delay={500} spinning={bonusLoading || staffLoading} />
                </center>

            </>
        )
	  } else {

		staffData.map(staff => {
		
			otData.map(ot => {

				try {
					if(!staff?.othrs) {
						(ot._id === staff.staffID) ? staff.othrs = ot.othrs : staff.othrs = 0
					}
				} catch (error) {
					staff.othrs = 0
					console.log('catch error')
				}

				return null						
			})

			bonusData.map(bonus => {

				if(!staff?.bonuses) {
					(bonus._id === staff.staffID) ? staff.bonuses = bonus.count : staff.bonuses = 0
				}
			})
			return null
		})

		staffData.map(staff => {

			staff.otRate = Number(((staff.basicSalary / 160) * 1.5).toFixed(2))
			staff.otAmount = Number((staff.otRate * staff.othrs).toFixed(2))
			//staff.bonuses = (staff.bonuses).toFixed(2)
			staff.totalSalary = staff.basicSalary + staff.otAmount + staff.bonuses
			// staff.totalSalary = (staff.totalSalary).toLocaleString()
			// staff.otAmount = (staff.otAmount).toLocaleString()
			// staff.bonuses = (staff.bonuses).toLocaleString()
			//staff.otRate = (staff.otRate).toLocalString()

		})
		console.log(staffData)
		
			const year = new Date().getFullYear()
			console.log('month data bbbbb', monthData)
			return (
				<div>
					<Title>Staff Salary - { year }</Title>
	
					<Select
						style={{ width: 300}}
						placeholder="Select a month"
						labelInValue
						defaultValue={{key: monthData}}
						onChange={setOnChangeMonth}
						
					>
						<Option value={0}>December 26 - January 25</Option>
						<Option value={1}>January 26 - February 25</Option>
						<Option value={2}>February 26 - March 25</Option>
						<Option value={3}>March 26 - April 25</Option>
						<Option value={4}>April 26 - May 25</Option>
						<Option value={5}>May 26 - June 25</Option>
						<Option value={6}>June 26 - July 25</Option>
						<Option value={7}>July 26 - August 25</Option>
						<Option value={8}>August 26 - September 25</Option>
						<Option value={9}>September 26 - October 25</Option>
						<Option value={10}>October 26 - November 25</Option>
						<Option value={11}>November 26 - December 25</Option>
					</Select>
	
					<Table columns={columns} dataSource={staffData} onChange={onChange} />
				</div>
			)
	  }
}
  
  function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
  }


export default CalculateTotalSalary
