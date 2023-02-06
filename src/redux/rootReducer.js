import { combineReducers } from 'redux'

import loginReducer from './slices/loginSlice'
import inventoryReducer from './slices/inventorySlice'
import clientInfoReducer from './slices/clientInfoSlice'

export default combineReducers({
  loginUser: loginReducer,
  inventory: inventoryReducer,
  clientInfo : clientInfoReducer

})

