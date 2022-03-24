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
    url: '/details/read',
    method: 'get',
    data: data
  })
}
wardService.updateWardDetails = function (data) {
  return fetch({
    url: '/details/update',
    method: 'post',
    data: data
  })
}

export default wardService