export default function(token=null, action){
    if(action.type === 'addToken'){
        var userToken = action.whatToken
        return userToken
    }else{
        return token;
    }
}