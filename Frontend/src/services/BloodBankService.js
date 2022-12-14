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

bloodBankService.updateBloodTransfusion = function(data) {
  return fetch({
    url: '/bloodbag/update-transfusion',
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

bloodBankService.bloodBagDetails = function (data){
  
  return fetch({
    url: `/bloodbag/read?id=${data}`,
    method: 'get',

  })
}

bloodBankService.bloodTransfusionDetails = function (data){
  
  return fetch({
    url: `/bloodbag/readTransfusion?id=${data}`,
    method: 'get',

  })
}

bloodBankService.bagId = function (){
  
  return fetch({
    url: `/bloodbag/bagId`,
    method: 'get',

  })
}

bloodBankService.getPatientDetails= function (patientId){

  return fetch({
    url: `/bloodbag/patient?id=`+patientId,
    method: 'get'
  })
}

bloodBankService.addTransfusion = function (jsonbody){

  return fetch({
    url: '/bloodbag/add-transfusion-details',
    method: 'post',
    data: jsonbody
    
  })
}

bloodBankService.readTransfusionDetails = async function () {
  return await fetch({
    url: '/bloodbag/details/readTransfusion',
    method: 'get'
  })
}

bloodBankService.deleteBagList = function (id){

  return fetch({
    url: `/bloodbag/deleteBagList?id=${id}`,
    method: 'delete'
  })
}

bloodBankService.updateStatus = function (id,data){

  return fetch({
    url: `/bloodbag/update-status?id=${id}`,
    method: 'put',
    data: data
  })
}

bloodBankService.expireBagDetails = function (data){

  return fetch({
    url: `/bloodbag/details/readExpireBag`,
    method: 'get',
    data: data
  })
}

bloodBankService.bloodBagsCount = function () {
  return fetch({
    url: `/bloodbag/bloodBagsCount`,
    method: "post",
  });
};

bloodBankService.transfusionCount = function () {
  return fetch({
    url: `/bloodbag/transfusionCount`,
    method: "post",
  });
};

bloodBankService.availableBagCount = function () {
  return fetch({
    url: `/bloodbag/availaleBloodCount`,
    method: "post",
  });
};

bloodBankService.bagCountAsMonth = function () {
  return fetch({
    url: `/bloodbag/bagCountAsMonth`,
    method: "post",
  });
};

bloodBankService.expireBloodCount = function (data){

  return fetch({
    url: `/bloodbag/expireBloodCount`,
    method: 'post',
    data: data
  })
}

export default bloodBankService