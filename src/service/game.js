import instance from "../config/http-request";



/**
 *
 * @desc 获取用户列表
 * @param  {boolean} online 是否在线
 * @return {Object}
 */
export function findOnLineUsers({online}) {
    return instance({
        url: '/findOnLineUsers',
        method: 'GET',
        params: {
            online
        }
    })
}

/**
 *
 * @desc 获取所有用户列表
 * @return {Object}
 */
export function findAllUser() {
    return instance({
        url: '/findAllUser',
        method: 'GET',
    })
}
