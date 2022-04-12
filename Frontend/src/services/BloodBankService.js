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
    url: '/details/update',
    method: 'put',
    data: data
  })
}

export default bloodBankService