import fetch from 'auth/FetchInterceptor'

const inventoryService = {}


inventoryService.additem = function (jsonbody){

  return fetch({
    url: '/inventory/item',
    method: 'post',
    data: jsonbody

  })
}

inventoryService.getItems = function (categoryType){

  return fetch({
    url: `/inventory/itemlist?category=${categoryType}`,
    method: 'get',

  })
}

export default inventoryService