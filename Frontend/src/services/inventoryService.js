import fetch from 'auth/FetchInterceptor'

const inventoryService = {}


inventoryService.additem = function (jsonbody){

  return fetch({
    url: '/inventory/item',
    method: 'post',
    data: jsonbody

  })
}

export default inventoryService