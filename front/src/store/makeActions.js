









function makeAction (type) {
    return ({ commit }, ...args) => commit(type, ...args)
}

function makeActionList (typeList){
    var actionList = {}
    for(var i = 0 ; i< typeList.length ; i++){
        actionList[typeList[i]]=makeAction(typeList[i])
    }
    return actionList;
}

export default makeActionList