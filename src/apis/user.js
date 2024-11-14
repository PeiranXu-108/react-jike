// 用户相关的所有请求
import { request } from "@/utils";
// 1. 登陆请求

export function loginAPI(formDate) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formDate
    })
}

//获取用户信息
export function getProfileAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}