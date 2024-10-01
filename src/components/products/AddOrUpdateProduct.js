import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";

function AddOrUpdateProduct({
  //Bu componentin proplarına şunları da ekle
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      //0'a eşitse demekki direk linkten gidildi. Bu durumda kategorileri getirmek gerekir.
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]); //DOM'a geldiğinde bitir demek. AKsi takdirde sonsuz döngü

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct, //önceki programı extend et, onun üzerine yaz
      [name]: name === "categoryId" ? parseInt(value, 10) : value, //Eğer name'de categoryId olan geliyorsa integer olacak. categoryId değilse direkt yaz.
    }));
    validate(name, value);
  }
  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün İsmi Olmalıdır.",
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/"); // daha önce geldiğimiz sayfalara yönlendirme yapabileceğimiz bir yöntem
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId) || null;
  return product;
}

function MapStateToProps(state) {
  let { productId } = useParams();
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const MapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(MapStateToProps, MapDispatchToProps)(AddOrUpdateProduct);
