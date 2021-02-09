export default function(reason='', action){
    if(action.type === 'addReason'){
        var newReason = action.whatReason
        return newReason
    }else{
        return reason;
    }
}