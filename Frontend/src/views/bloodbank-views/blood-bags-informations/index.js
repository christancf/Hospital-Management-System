import React,{useState,useEffect} from 'react'
import { Table, Divider, Tag } from 'antd';
import bloodBankService from 'services/BloodBankService'

let response = {};

bloodBankService.readBloodDetails().then(async function (res){
	response = res.details;
	console.log(response);
	<div>
		<p>{}</p>
	</div>
}).catch(function (error){
	
});



/*this.state={
	bags:[]
};

export default function BloodBags(){
	
	const[bloodbags,setBloodBags] = useState([]);

	useEffect(()=>{
		function getBloodBags(){
			bloodBankService.readBloodDetails().then(function (res){
				console.log(res)
				bloodbags = setBloodBags(res.details);

				
					<div>
						<p>p</p>
					</div>
	
			}).catch(function (error){
				console.log(error)
			});

			
		}
		getBloodBags();
	},[])

	return(
		<div>
			
				<div>
					<p>{}</p>
				</div>
			
		</div>
	)
}
*/


const Rome = () => {
	console.log(response)
  }

const bloodBags = () => {
	return (
		<div>
			<Table columns={columns} ataSource={response}/>
       		<Rome />
       
		</div>
	)
}

export default bloodBags