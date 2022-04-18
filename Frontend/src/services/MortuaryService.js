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

//add corpse
mortuaryService.addCorpse = function (params) {
  return fetch({
    url: '/mortuary/add',
    method: 'post',
    data: params
  })
}

//read for info page
mortuaryService.getData = function () {
    return fetch({
      url: '/mortuary/info',
      method: 'get'
    })
  }

//read for homepage
mortuaryService.getOccupiedData = function () {
  return fetch(
    {
      url: '/mortuary/home',
      method: 'get'
    }
  )
}
export default mortuaryService