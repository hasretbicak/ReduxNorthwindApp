import *as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function productListReducer(state = initialState.products, action){
    switch(action.type){  // hangi action geliyorsa onun payload'u state olarak döndürüyoruz.
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}