import fetch from 'auth/FetchInterceptor'

const doctorChannellingService = {}



doctorChannellingService.getAppointmentList = function (email){

    return fetch({
      url: `/channelling/doctor/appointments?email=${email}`,
      method: 'get'
  
    })
  }
  

  export default doctorChannellingService