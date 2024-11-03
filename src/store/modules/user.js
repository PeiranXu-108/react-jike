// 和用户相关的状态管理
import { removeToken, request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "users",
    //数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // localstorage存一份
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }

})

//结构出actionCreater

const { setToken, setUserInfo,clearUserInfo } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登陆获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
      try {
        const res = await request.post('/authorizations', loginForm);
        const token = res.data.token;
  
        if (token) {
          // 设置 token 到 Redux 和 localStorage
          dispatch(setToken(token));  // Redux 中设置 token
          setToken(token);            // localStorage 中设置 token
        }
      } catch (error) {
        console.error('登录失败', error);
      }
    };
  };
  
//获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin, setToken, fetchUserInfo ,clearUserInfo}

export default userReducer