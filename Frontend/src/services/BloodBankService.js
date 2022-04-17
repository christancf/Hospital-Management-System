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

export default bloodBankService