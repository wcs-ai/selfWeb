

import makeActionList from "../makeActions";
import baseData from '../../utils/url_'
const typeList = [
    "updateUserInfo",
    "changeSomeValue",
    "resetUserInfo"
]
const actions = makeActionList(typeList)
const userInfoModule = {
    state: {
        userInfo:{
            "id": -1,
            "group_id": -1,
            "name": "点击登录",
            "f_sex": -10,
            "f_birthday": "",
            "f_sign": "",
            "phone": "",
            "status": 1,
            "accid": "",
            "yxtoken": "",
            "token": "",
            "invitecode": "",
            "avatar": "",
            "user_photo":baseData.img.self_head
        }
    },
    mutations: {
        updateUserInfo (state,data){
            state.userInfo = data
        },
        changeSomeValue (state,obj){
            for(var key in obj){
                state.userInfo[key] = obj[key]
            }
        },
        resetUserInfo(state){
            state.userInfo={
                "id": -1,
                "group_id": -1,
                "name": "点击登录",
                "f_sex": -10,
                "f_birthday": "",
                "f_sign": "",
                "phone": "",
                "status": 1,
                "accid": "",
                "yxtoken": "",
                "token": "",
                "invitecode": "",
                "avatar": "",
                "user_photo":baseData.img.self_head
            }
        }
    },
    actions
}

export default userInfoModule ;