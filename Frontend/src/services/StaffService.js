import fetch from 'auth/FetchInterceptor'

const staffService = {}

staffService.addStaffMember = function (data) {
  return fetch({
    url: '/add-member',
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


export default staffService