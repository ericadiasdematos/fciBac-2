export default function(bienInfo={}, action){

    if(action.type === 'sendBienInfo'){
        var newBienInfo = action.whatInfo
        console.log(newBienInfo)
        return newBienInfo
    }else{
        return bienInfo
    }
}