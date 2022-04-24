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


inventoryService.updateItemDetails = function(data) {
  return fetch({
    url: '/inventory/update-details',
    method: 'put',
    data: data
  })
}

inventoryService.itemDetails = function (data){
  
  return fetch({
    url: `/inventory/read?id=${data}`,
    method: 'get',

  })
}

inventoryService.delete = function (data){

  return fetch({
    url: `/inventory/itemlist/delete?id=${data}`,
    method: 'delete',

  })
}

//get auto incremented id

inventoryService.getId = function () {

  return fetch(

    {

      url: '/inventory/id',

      method: 'get'

    }

  )

}

export default inventoryService