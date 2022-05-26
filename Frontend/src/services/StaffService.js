import fetch from 'auth/FetchInterceptor'

const staffService = {}

staffService.id = function (){
  return fetch({
    url:'/staff/id',
    method:'get'
  })
}

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
    url: 'staff/resign',
    method: 'put',
    data: data
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

staffService.addBonus = function (data) {
  return fetch({
    url: 'staff/salary/bonus',
    method: 'post',
    data
  })
}

staffService.getOThours = function (data) {
  return fetch({
    url: 'staff/salary/othours?month='+data.month,
    method: 'get'
  })
}

staffService.getBonusAmounts = function (data) {
  return fetch({
    url: 'staff/salary/bonus-calculate?month='+data.month,
    method: 'get'
  })
}

staffService.getStaffDetails = function () {
  return fetch({
    url: 'staff/salary/staffdetails',
    method: 'get'
  })
}

staffService.getStaffCountByDesignation = function() {
  return fetch({
    url: 'staff/stats/staffcount',
    method: 'get'
  })
}


export default staffService