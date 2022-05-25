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
//get items from the item list API call
inventoryService.getItems = function (categoryType){

  return fetch({
    url: `/inventory/itemlist?category=${categoryType}`,
    method: 'get',

  })
}
//get inventory items from the inventory list API call
inventoryService.getInventoryItems = function ( ){

  return fetch({
    url: `/inventory/inventorylist`,
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

//stat 1
inventoryService.stat = function () {
  return fetch({
    url: `/inventory/stat`,
    method: "post",
  });
};

export default inventoryService