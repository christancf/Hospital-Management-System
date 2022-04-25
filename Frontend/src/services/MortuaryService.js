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

//get auto incremented id
mortuaryService.getId = function () {
  return fetch(
    {
      url: '/mortuary/id',
      method: 'get'
    }
  )
}
//read for update function
mortuaryService.readForUpdate = function (params) {
  return fetch(
    {
      // url: `/mortuary/update/read?id:${params}`,
      url: '/mortuary/update/read',

      method: 'post',
      data: params
    }
  )
}
//update function
mortuaryService.updateCorpse = function (id,params) {
  return fetch(
    {
      url: `/mortuary/update/corpse?id=${id}`,
      method: 'post',
      data: params
    }
  )
}
//read for homepage popover
mortuaryService.readForPopover = function (cabinetNo) {
  return fetch(
    {
      url: `/mortuary/home/read?id=${cabinetNo}`,
      method: 'post',
    }
  )
}
export default mortuaryService