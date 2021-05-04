export default function(category={}, action){

    if(action.type === 'addCategory'){
        var newCategory = action.category
        return newCategory
    }else{
        return category
    }
}