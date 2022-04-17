import fetch from 'auth/FetchInterceptor'

const mortuaryService = {}

// exampleService.getPost = function (params) {
//   return fetch({
//     url: '/posts/1',
//     method: 'get',
//     params
//   })
// }

// exampleService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

mortuaryService.addCorpse = function (params) {
  return fetch({
    url: '/mortuary/add',
    method: 'post',
    data: params
  })
}

mortuaryService.getData = function () {
    return fetch({
      url: '/mortuary/info',
      method: 'get'
    })
  }
export default mortuaryService