import fetch from 'auth/FetchInterceptor'

const channellingService = {}


channellingService.addAppointment = function (jsonbody){

  return fetch({
    url: '/channelling/apppointment/add',
    method: 'post',
    data: jsonbody

  })
}

export default channellingService