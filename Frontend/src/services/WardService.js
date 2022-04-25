import fetch from 'auth/FetchInterceptor'

const wardService = {}

wardService.addWardDetails = (data) => {
  return fetch({
    url: 'ward/details/add',
    method: 'post',
    data
  })
}

wardService.readWardDetails = function (data) {
  return fetch({
    url: 'ward/details/read?id='+data,
    method: 'get'
  })
}
wardService.updateWardDetails = function (data) {
  return fetch({
    url: 'ward/details/update',
    method: 'put',
    data: data
  })
}
wardService.readWardCategory = () => {
  return fetch({
    url: 'ward/category/names',
    method: 'get'
  })
}

wardService.readWardCategoryIDs = (category) => {
  return fetch({
    url:'ward/category/ids?category='+category,
    method: 'get'
  })
}

wardService.getNurseDetails = (id) => {
  return fetch({
    url: 'ward/nurse/read?id='+ id,
    method: 'get'
  })
}

wardService.assignNurse = (data) => {
  return fetch({
    url: 'ward/nurse/assign',
    method: 'post',
    data
  })
}

wardService.getAssignedNurses = () => {
  return fetch({
    url: 'ward/nurse/details',
    method: 'get'
  })
}

wardService.checkStatus = (id) => {
  return fetch({
    url:'ward/nurse/status?id='+id,
    method: 'get'
  })
}

wardService.unassignNurse = id => {
  return fetch({
    url: 'ward/nurse/unassign?id='+ id,
    method: 'delete'
  })
}

wardService.checkAssignedNurse = id => {
  return fetch({
    url: 'ward/nurse/assign/check?id='+id,
    method: 'get'
  })
}

export default wardService