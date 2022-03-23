import fetch from 'auth/FetchInterceptor'

const channellingService = {}


channellingService.addAppointment = function (jsonbody){

  return fetch({
    url: '/apppointment/add',
    method: 'post',
    data: jsonbody

  })
}

export default channellingService