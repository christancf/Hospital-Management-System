import fetch from 'auth/FetchInterceptor'

const channellingService = {}


channellingService.addAppointment = function (jsonbody){

  return fetch({
    url: '/channelling/appointment/add',
    method: 'post',
    data: jsonbody

  })
}

channellingService.getAllDoctors = function (){

  return fetch({
    url: '/channelling/doctors',
    method: 'get'

  })
}

channellingService.getAllAppointments = function (){

  return fetch({
    url: '/channelling/appointments',
    method: 'get'

  })
}

export default channellingService