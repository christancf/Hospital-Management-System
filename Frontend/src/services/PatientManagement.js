import fetch from 'auth/FetchInterceptor'

const patientManagementService = {}


patientManagementService.admittance = function (jsonbody){

  return fetch({
    url: '/patient/admittance',
    method: 'post',
    data: jsonbody

  })
}

patientManagementService.patientDetails = function (data){

  return fetch({
    url: '/patient/read?id='+data,
    method: 'get',

  })
}


export default patientManagementService