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

channellingService.searchAppointment = function (id){

  return fetch({
    url: `/channelling/search/appointment?id=${id}`,
    method: 'get'

  })
}

channellingService.getAllAppointments = function (){

  return fetch({
    url: '/channelling/appointments',
    method: 'get'

  })
}

channellingService.updateAppointment = function (id, body){

  return fetch({
    url: `/channelling/appointment/edit?id=${id}`,
    method: 'post',
    data: body
  })
}

channellingService.deleteAppointment = function (id){

  return fetch({
    url: `/channelling/appointment/delete?id=${id}`,
    method: 'post'
  })
}
///channelling/appointment/edit?id=623b0bf780a53cd830db0aa3
export default channellingService