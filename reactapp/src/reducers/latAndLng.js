export default function(latAndLng = [], action) {
    if(action.type === "setLatAndLng") {
        var newLatAndLng = action.whatBounds;
        console.log("newLatAndLng: ", newLatAndLng)
        return newLatAndLng
    }else {
        return latAndLng
    }
}