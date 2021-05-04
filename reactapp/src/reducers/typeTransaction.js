export default function(type = "", action) {
    if(action.type === "addType") {
        console.log("reducer :", action.whatType)
        var newType = action.whatType;
        return newType
    }else {
        return type
    }
}