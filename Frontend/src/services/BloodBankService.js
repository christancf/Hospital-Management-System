import fetch from 'auth/FetchInterceptor'

const bloodBankService = {}


bloodBankService.addBloodBag = function (jsonbody){

  return fetch({
    url: '/bloodbag/add-details',
    method: 'post',
    data: jsonbody
    
  })
}

bloodBankService.updateBloodDetails = function(data) {
  return fetch({
    url: '/bloodbag/update-details',
    method: 'put',
    data: data
  })
}

bloodBankService.readBloodDetails = async function () {
  return await fetch({
    url: '/bloodbag/details/read',
    method: 'get'
  })
}

bloodBankService.deleteBloodDetails = function(data) {
  return fetch({
    url: '/bloodbag/bag-delete/:id',
    method: 'delete',
    data: data
  })
}

bloodBankService.bloodBagDetails = function (data){
  
  return fetch({
    url: `/bloodbag/read?id=${data}`,
    method: 'get',

  })
}

bloodBankService.bagId = function (){
  
  return fetch({
    url: `/bloodbag/bagId`,
    method: 'get',

  })
}

export default bloodBankService