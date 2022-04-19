import fetch from 'auth/FetchInterceptor'

const staffService = {}

staffService.addStaffMember = function (data) {
  return fetch({
    url: 'staff/add-member',
    method: 'post',
    data: data
  })
}

staffService.readStaffDetails = function (data) {
  return fetch({
    url: 'staff/read-details?id='+data,
    method: 'get'
  })
}

staffService.updateStaffDetails = function (data) {
  return fetch({
    url: 'staff/update-details',
    method: 'put',
    data
  })
}

staffService.readStaffs = function () {
  return fetch({
    url: 'staff/read-staffs',
    method: 'get'
  })
}

staffService.updateStatus = function (data) {
  return fetch({
    url: 'staff/update-status',
    method: 'put',
    data
  })
}

staffService.checkInAttendance = function (data) {
  return fetch({
    url: 'staff/attendance/checkin',
    method: 'post',
    data: data
  })
}

staffService.checkOutAttendance = function (data) {
  return fetch({
    url: 'staff/attendance/checkout',
    method: 'put',
    data: data
  })
}
export default staffService