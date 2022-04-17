import fetch from 'auth/FetchInterceptor'

const staffService = {}

staffService.addStaffMember = function (data) {
  return fetch({
    url: 'staff/add-member',
    method: 'post',
    data: data
  })
}

staffService.setPost = function (data) {
  return fetch({
    url: '/posts',
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


export default staffService