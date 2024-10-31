// 和用户相关的状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "users",
    //数据状态
    initialState: {
        token: getToken() || ''
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // localstorage存一份
            _setToken(action.payload)
        }
    }
})

//结构出actionCreater

const { setToken } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登陆获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        try {
            //1. 发送异步请求
            const res = await request.post('/authorizations', loginForm);
            //2. 提交同步action进行token存入
            dispatch(setToken(res.data.token));
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Request setup error:", error.message);
            }
        }
    }
}


export { fetchLogin, setToken }

export default userReducer