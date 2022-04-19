import React,{useState,useEffect} from 'react'
// import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import bloodBankService from 'services/BloodBankService'

// export default class index extends Component{
// 	constructor(props){
// 		super(props);

// 		this.state={
// 			bloodBags:[]
// 		};
// 	}

// 	retrievePosts(){
// 		bloodBankService.readBloodDetails().then(res=>{
// 			if(res.data.succuss){
// 				this.setState({
// 					bloodBags:res.data.details
// 				});

// 				console.log(this.state.bloodBags);
// 			}
// 		})
// 	}

// 	render(){
// 		return(
// 			<div>
// 				{this.state.bloodBags.map(bloodBags=>(
// 					<div>
// 						<p>{bloodBags.details}</p>
// 					</div>		
// 				))}
// 			</div>
// 		)
// 	}
// }

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

// axios.get

const Rome = () => {
	console.log(response)
  }

const bloodBags = () => {
	return (
		<div>
       		<Rome />
       
		</div>
	)
}

export default bloodBags