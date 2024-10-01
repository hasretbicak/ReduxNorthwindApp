import * as actionTypes from "./actionTypes" //Bütün actionTypes'lar import edildi

export function changeCategory(category){  //fonksiyon oluşturuldu(actionTypes ve payload)
    return{type:actionTypes.CHANGE_CATEGORY, payload:category} // parametreyi redux'un anlayacağı bir objeye çevirdik.

// Yani actiontype = changeCategory payload ise parametre ile gönderilen categoridir.
}

export function getCategoriesSuccess(categories){
    return{type:actionTypes.GET_CATEGORIES_SUCCESS, payload:categories}
}

export function getCategories(){ // export yani public yani dışarıya açılabilir categorileri getir.

    return function(dispatch){
        let url ="http://localhost:3000/categories"
        return fetch(url).then(response=>response.json())
        .then(result=>dispatch(getCategoriesSuccess(result)))
    }
}