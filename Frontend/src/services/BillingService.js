import fetch from 'auth/FetchInterceptor'

const billingService = {}


billingService.getBills = function (patientId){
  //bills for a patient id paid or pending
  return fetch({
    url: `/billing/bills?patient=${patientId}`,
    method: 'get'
  })
}

billingService.getAllBills = function (){
  //every bill with status "pending" 
  return fetch({
    url: `/billing/all-bills`,
    method: 'get'
  })
}

billingService.getAllPatients = function (){
  // list of currently admitted patient
  return fetch({
    url: `/billing/patient`,
    method: 'get'
  })
}

billingService.addTransactions = function (jsonbody){
  //add a transaction
  return fetch({
    url: `/billing/add-details`,
    method: 'post',
    data: jsonbody
  })
}

billingService.getAllTransactionToPatient = function (patientId){
  //every transaction on current pending bill
  return fetch({
    url: `/billing/transactions?patientId=${patientId}`,
    method: 'get'
  })
}

billingService.getAllItems = function (){
  //get list of items
  return fetch({
    url: `/billing/items`,
    method: 'get'
  })
}

billingService.getAllRooms = function (){
  //get list of wards
  return fetch({
    url: `/billing/rooms`,
    method: 'get'
  })
}

billingService.paid = function (id){
  return fetch({
  url:`/billing/paid?id=${id}`,
  method:'get'
  })
  }

export default billingService