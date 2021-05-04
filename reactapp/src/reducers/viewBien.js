export default function(bien={}, action){

    if(action.type === 'addBien'){
        var newBien = action.whatBien
        console.log(newBien)
        return newBien
    }else{
        return bien
    }
}