import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function cartReducer(state=initialState.cart, action){  
    switch(action.type){

        case actionTypes.ADD_TO_CART:
            var addedItem = state.find(c=>c.product.id===action.payload.product.id); // sepetteki her bir product'un idSi payloadla gelen product'un idsine eşit olanları bul. Ve bunu addedItem de yani sepete eklenmiş.

            if(addedItem){ // Redux'ta verinin referansını değiştirmemiz gerekiyor. Eğer yapmazsak state deişmemiş kabul ediliyor.

                //Burda referansı değiştiryoruz. 
                // map ile bütün cartItem' gezer yeni bir cartItem döndürü ve listeye ekler. Oluşan bu array artık bizim newState'tir.
                var newState = state.map(cartItem=>{
                    if(cartItem.product.id === action.payload.product.id){
                        return Object.assign({}, addedItem,{quantity:addedItem.quantity+1}) //ilk parantez kopyala demek.
                    }
                    return cartItem;
                })
                return newState;
            }
            else{

                return [...state,{...action.payload}]  // State'in bir kopyasını al ve o kopyaya action ile gelen payload'u ekle.
                // Yani array'eleman ekliyoruz. ama kopyasını aldıktan sonra ekliyoruz.
            }
        
        case actionTypes.REMOVE_FROM_CART:
            const newState2 = state.filter(cartItem=>cartItem.product.id!==action.payload.id);
            return newState2;
        default:
            return state;

    }
}