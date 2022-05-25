import fetch from "auth/FetchInterceptor";
import { method } from "lodash";

const mortuaryService = {};

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
    url: "/mortuary/add",
    method: "post",
    data: params,
  });
};

//read for info page
mortuaryService.getData = function () {
  return fetch({
    url: "/mortuary/info",
    method: "get",
  });
};

//read for homepage
mortuaryService.getOccupiedData = function () {
  return fetch({
    url: "/mortuary/home",
    method: "get",
  });
};

//get auto incremented id
mortuaryService.getId = function () {
  return fetch({
    url: "/mortuary/id",
    method: "get",
  });
};
//read for update function
mortuaryService.readForUpdate = function (params) {
  return fetch({
    // url: `/mortuary/update/read?id:${params}`,
    url: "/mortuary/update/read",

    method: "post",
    data: params,
  });
};
//update function
mortuaryService.updateCorpse = function (id, params) {
  return fetch({
    url: `/mortuary/update/corpse?id=${id}`,
    method: "post",
    data: params,
  });
};
//read for occupied corpse page
mortuaryService.readForOccupiedCorpsePage = function (id) {
  return fetch({
    url: `/mortuary/home/read?id=${id}`,
    method: "post",
  });
};
//corpse release
mortuaryService.release = function (id, params) {
  return fetch({
    url: `/mortuary/release?id=${id}`,
    method: "post",
    data: params
  });
};

//search
mortuaryService.search = function (params) {
  return fetch({
    url: `/mortuary/search`,
    method: "post",
    data: params
  });
};

//filter
mortuaryService.filter = function (params) {
  return fetch({
    url: `/mortuary/filter`,
    method: "post",
    data: params
  });
};

//stat 1
mortuaryService.stat = function () {
  return fetch({
    url: `/mortuary/stat`,
    method: "post",
  });
};

//statMonth
mortuaryService.statMonth = function (params) {
  return fetch({
    url: `/mortuary/statMonth`,
    method: "post",
    data: params
  });
};

//stat 2
mortuaryService.stat2 = function () {
  return fetch({
    url: `/mortuary/stat2`,
    method: "post",
  });
};

//stat 2 month
mortuaryService.stat2Month = function (params) {
  return fetch({
    url: `/mortuary/stat2Month`,
    method: "post",
    data: params
  });
};
export default mortuaryService;
