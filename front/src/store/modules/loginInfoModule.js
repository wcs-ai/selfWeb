

import makeActionList from "../makeActions";

const typeList = [
    "updateLoginInfo"
]
const actions = makeActionList(typeList)
const moduleA = {
    state: {
        loginInfo:{

        }
    },
    mutations: {
        updateLoginInfo (state,data){
            console.log(data)
            state.loginInfo = data
        }
    },
    actions
}

export default moduleA ;