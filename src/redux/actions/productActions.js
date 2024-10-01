import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  return fetch("http://localhost:3000/producs/" + (product.id || ""), {
    //Eğer localhost adresine product'ın id gönderilmişse gönderileni yaz. gönderilmemişse post et yenisini ekle
    method: product.id ? "PUT" : "POST", // Eğer product id gönderilmişse put (güncelle) eğer gönderilmemişse post(ekleme) yap
    headers: { "content-type": "application.json" }, //Şu an default olarak var ama başka projelerde olmayabilir.
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function saveProduct(product) {   // dispatch ile redux'a bağlanıyoruz yani reducerları devreye sokuyoruz.
  return function (dispatch) {
    return saveProductApi(product).then((savedProduct) => {
      product.id
        ? dispatch(updateProductSuccess(savedProduct))
        : dispatch(createProductSuccess(savedProduct));
    }).catch(error =>{throw error});
  };
}

export async function handleResponse(response){   // Eğer bir hataysa catch çalışır değilse çalışmaz.
    if(response.ok){
        return response.json()
    }
    const error = await response.text()
    throw new Error(error)
}

export function handleError(error){
    console.error("Bir hata oluştu!..")
    throw error;
}

export function getProducts(categoryId) {
  // export yani public yani dışarıya açılabilir categorileri getir.. categoryId'yi parametre verdik bununla ilgili işlem yapacaız.

  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}
