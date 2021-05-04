export default function(bien={}, action){

    if(action.type === 'editBien'){
        var newBien = action.whatBien
        return newBien
    }else{
        return bien
    }
}