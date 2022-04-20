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

wardService.readStaffNameAndQualification = (id) => {
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

wardService.getNurses = () => {
  return fetch({
    url: 'ward/nurse/assigned-details',
    method: 'get'
  })
}
export default wardService