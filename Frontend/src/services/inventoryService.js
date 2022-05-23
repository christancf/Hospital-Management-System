import fetch from 'auth/FetchInterceptor'

const inventoryService = {}

//add item API call
inventoryService.additem = function (jsonbody){

  return fetch({
    url: '/inventory/item',
    method: 'post',
    data: jsonbody

  })
}

//add inventory item API call
inventoryService.addInventoryItem = function (jsonbody){

  return fetch({
    url: '/inventory/inventoryItem',
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

inventoryService.getAllItems = function (){

  return fetch({
    url: `/inventory/getallitems`,
    method: 'get',

  })
}


inventoryService.updateItemDetails = function(data) {
  return fetch({
    url: '/inventory/update-details',
    method: 'post',
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