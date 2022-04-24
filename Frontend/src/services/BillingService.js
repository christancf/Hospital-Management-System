import fetch from 'auth/FetchInterceptor'

const billingService = {}


billingService.getBills = function (patientId){

  return fetch({
    url: `/billing/bills?patient=${patientId}`,
    method: 'get'
  })
}

billingService.getAllBills = function (){

  return fetch({
    url: `/billing/all-bills`,
    method: 'get'
  })
}

billingService.getAllPatients = function (){

  return fetch({
    url: `/billing/patient`,
    method: 'get'
  })
}

billingService.addTransactions = function (jsonbody){

  return fetch({
    url: `/billing/add-details`,
    method: 'post',
    data: jsonbody
  })
}

billingService.getAllTransactionToPatient = function (patientId){

  return fetch({
    url: `/billing/transactions?patientId=${patientId}`,
    method: 'get'
  })
}

billingService.getAllItems = function (){

  return fetch({
    url: `/billing/items`,
    method: 'get'
  })
}

export default billingService