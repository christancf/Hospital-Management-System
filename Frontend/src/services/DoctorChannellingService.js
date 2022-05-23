import fetch from 'auth/FetchInterceptor'

const doctorChannellingService = {}



doctorChannellingService.getAppointmentList = function (email){

    return fetch({
      url: `/channelling/doctor/appointments?email=${email}`,
      method: 'get'
  
    })
  }

  doctorChannellingService.updateAppointmentStatus = function (id, body){

    return fetch({
      url: `/channelling/doctor/appointment/editstatus?is=${id}`,
      method: 'post',
      data: body
  
    })
  }
  

  export default doctorChannellingService