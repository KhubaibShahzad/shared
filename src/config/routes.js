const ROUTES = {
  //  BASE_URL:"https://778mpekjkk.execute-api.us-east-1.amazonaws.com/stage",
  BASE_URL:"https://weh4nnvk0g.execute-api.us-east-1.amazonaws.com/stage02",
  // BASE_URL: "http://192.168.100.32:3000/dev",
  // BASE_URL: "http://localhost:3000/dev",

  FETCH_ALL_MODULES: "module/all",
  FETCH_ALL_ITEMS: "client-module/list",
  DELETE_ITEM: "client-module",
  FETCH_ALL_ROOMS: "client-module/detail",
  FETCH_FAQ: "faq/all",

  CREATE_MODULE: "module",
  UPDATE_MODULE: "module",
  SWAP_COLLECTIBLES: "module/swap",

  MODULE_ATTRIBUTES: "attribute/detail",
  REMOVE_MODULE_ATTRIBUTES: "module/attribute/remove",

  IMAGE_UPLOAD: "image",

  CRETE_CLIENT_ITEM: "client-module",
  UPDATE_CLIENT_ITEM: "client-module/update",
  RECORD_TOTAL: "client-module/total",
};

export default ROUTES;
