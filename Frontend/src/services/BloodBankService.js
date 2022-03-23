import fetch from 'auth/FetchInterceptor'

const bloodBankService = {}


bloodBankService.addAppointment = function (jsonbody){

  return fetch({
    url: '/apppointment/add',
    method: 'post',
    data: jsonbody

  })
}

export default bloodBankService