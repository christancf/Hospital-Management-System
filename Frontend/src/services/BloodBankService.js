import fetch from 'auth/FetchInterceptor'

const bloodBankService = {}


bloodBankService.addBloodBag = function (jsonbody){

  return fetch({
    url: '/add-details',
    method: 'post',
    data: jsonbody

  })
}

export default bloodBankService