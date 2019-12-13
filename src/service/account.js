import instance from "../config/http-request";


/**
 *
 * @desc 登录口令
 * @param  {String} userName 用户名
 * @return {Object}
 */
export function login({userName}) {
    return instance({
        url: '/login',
        method: 'POST',
        data: {
            userName
        }
    })
}


/**
 *
 * @desc 注册口令
 * @param userName {String} 用户名
 * @param nickname {String} 昵称
 * @return {Object}
 */
export function register({userName, nickname}) {
    return instance({
        url: '/register',
        method: 'POST',
        data: {
            userName,
            nickname
        }
    })
}








