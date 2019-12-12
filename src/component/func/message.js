
import {message} from "antd";



export function success(msg, duration, cb) {
    message.success(msg, duration, cb);
}

export function error(msg, duration, cb) {
    message.error(msg, duration, cb);
}

export function warning(msg, duration, cb) {
    message.warning(msg, duration, cb);
}

export function loading(msg, duration, cb) {
    return message.loading(msg, duration)
}
