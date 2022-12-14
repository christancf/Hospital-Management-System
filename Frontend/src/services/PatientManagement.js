import fetch from 'auth/FetchInterceptor'

const patientManagementService = {}


patientManagementService.admittance = function (jsonbody){

  return fetch({
    url: '/patient/admittance',
    method: 'post',
    data: jsonbody

  })
}

patientManagementService.id = function (){
  return fetch({
    url:'/patient/id',
    method:'get'
  })
}

patientManagementService.update = function (jsonbody){

  return fetch({
    url: '/patient/update',
    method: 'put',
    data: jsonbody

  })
}
patientManagementService.patientlist = function (){

  return fetch({
    url: '/patient/patientlist',
    method: 'get'
  })
}
patientManagementService.delete = function (data){

  return fetch({
    url: `/patient/checkout?id=${data}`,
    method: 'delete',

  })
}

patientManagementService.patientDetails = function (data){
  
  return fetch({
    url: `/patient/read?id=${data}`,
    method: 'get',

  })
}

patientManagementService.categoryStat = function(){
  return fetch({
    url: `/patient/stat`,
    method: 'get',
  })
}

patientManagementService.categoryList = function(){
  return fetch({
    url: `/patient/category`,
    method: 'get',
  })
}

patientManagementService.patientCount = function(){
  return fetch({
    url: `/patient/stat1`,
    method: 'get',
  })
}

export default patientManagementService