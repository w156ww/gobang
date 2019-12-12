// // import {SET_API_INFO, SET_TREE_DATA, SET_TREE_CHECKED_DATA, SET_API_DETAIL_INFO} from "./action-types";
//
// const initialApiInfo = {
//     treeData:[], //树结构
//     TreeCheckedData:[],//选中相关数据
// };
// const initApiDetailInfo = {}; // api 详情信息
//
//
// export const apiInfo = function (state = initialApiInfo, action) {
//
//     switch (action.type) {
//         case SET_API_INFO: {
//             return {
//                 ...action.payload
//             }
//         }
//         case SET_TREE_DATA: {
//             return {
//                 ...state,
//                 treeData:action.data
//             }
//         }
//         case SET_TREE_CHECKED_DATA: {
//             return  {
//                 ...state,
//                 TreeCheckedData:action.data
//             }
//
//         }
//         default:
//             return state
//     }
// };
// // api详情信息
// export const apiDetailInfo = function(state = initApiDetailInfo, action) {
//     switch (action.type) {
//         case SET_API_DETAIL_INFO:
//             return action.payload.data;
//         default:
//             return state;
//     }
// }
//
//
//
//
//
