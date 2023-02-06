import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { getLoggedInUser } from '../../helpers/authUtils';
import ROUTES from '../../config/routes';

const initialState = {
  loading: false,
  // user: getLoggedInUser(),
  loginUserData: getLoggedInUser(),
  error: ''
};

// A slice for login with our 3 reducers
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postLoginLoading: state => {
      state.loading = true
    },
    postLoginSuccess: (state, { payload }) => {

      state.loginUserData = payload
      state.loading = false

    },
    postLoginFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

// Three actions generated from the slice
export const { postLoginLoading, postLoginSuccess, postLoginFailure } = loginSlice.actions

// A selector
// export const loginSelector = state => state.login

// The reducer
export default loginSlice.reducer



// Asynchronous thunk action
export function postLoginUser(userData, config, history) {
  return async dispatch => {

    dispatch(postLoginLoading())

    try {
      const res = await axios.post(

        // `https://778mpekjkk.execute-api.us-east-1.amazonaws.com/stage/auth/signin`,
        `${ROUTES.BASE_URL}/auth/signin`,
        // `http://192.168.100.32:3000/dev/auth/signin`,
        userData,
        config
      );
      dispatch(postLoginSuccess(res.data))
      localStorage.setItem("userLoginToken", res.data.access_token)

      history.push("/dashboard");


    } catch (error) {
      dispatch(postLoginFailure(error.response.data.message))
    }
  }
}