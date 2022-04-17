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
    url: '/bloodbag/bag-update/:id',
    method: 'put',
    data: data
  })
}

bloodBankService.readBloodDetails = function(data) {
  return fetch({
    url: '/bloodbag/details/read?:id',
    method: 'get',
    data: data
  })
}

bloodBankService.deleteBloodDetails = function(data) {
  return fetch({
    url: '/bloodbag/bag-delete/:id',
    method: 'delete',
    data: data
  })
}

export default bloodBankService