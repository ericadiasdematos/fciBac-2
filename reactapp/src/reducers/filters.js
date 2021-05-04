export default function(filters = {}, action) {
    if(action.type === "filtersFromRecherche") {
        var filtersFromRecherche = action.whatFilters;
        console.log("filtersFromRecherche: ", filtersFromRecherche)
        return filtersFromRecherche
    }else {
        return filters
    }
}