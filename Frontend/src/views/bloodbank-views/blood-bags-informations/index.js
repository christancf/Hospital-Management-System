import React,{useState,useEffect} from 'react'
import bloodBankService from 'services/BloodBankService'

let response = {};

bloodBankService.readBloodDetails().then(async function (res){
	response = res.details;


}).catch(function (error){
	
});

console.log(response);

const bloodBags = () => {
	return (
		<div>
			
		</div>
	)
}

export default bloodBags
