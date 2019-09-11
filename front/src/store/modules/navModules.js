

import makeActionList from "../makeActions";

const typeList = [
    "changeNavTitle"
]
const actions = makeActionList(typeList)
const navModules = {
    state: {
        navTitle:"loading..."
    },
    mutations: {
        changeNavTitle (state,name){
            state.navTitle = name
        }
    },
    actions
}

export default navModules ;