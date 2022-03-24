import fetch from 'auth/FetchInterceptor'

const wardService = {}

wardService.addWardDetails = (data) => {
  return fetch({
    url: '/details/add',
    method: 'post',
    data
  })
}

wardService.readWardDetails = function (data) {
  return fetch({
    url: '/details/read?id='+data,
    method: 'get'
  })
}
wardService.updateWardDetails = function (data) {
  return fetch({
    url: '/details/update',
    method: 'put',
    data: data
  })
}

export default wardService