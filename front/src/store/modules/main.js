

import makeActionList from "../makeActions";

const typeList = [
    "test1"
]
const actions = makeActionList(typeList)
const moduleA = {
    state: {
        name:1
    },
    mutations: {
        test1 (state){
            state.name = "test"
        }
    },
    actions
}

export default moduleA ;