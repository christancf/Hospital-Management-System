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
      url: `/channelling/doctor/appointment/editstatus?id=${id}`,
      method: 'post',
      data: body
  
    })
  }


  doctorChannellingService.deleteAppointment = function (id){

    return fetch({
      url: `/channelling/appointment/delete?id=${id}`,
      method: 'post'
    })
  }
  

  export default doctorChannellingService