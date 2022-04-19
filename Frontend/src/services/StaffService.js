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
export default staffService