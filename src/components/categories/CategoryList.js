import React, { Component } from "react";
// store'a bağlanma
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = category =>{
    this.props.actions.changeCategory(category); // =>onclick olduğunda direkt bunu çağırabilirdik fakat hem kategory seçme hem de productları listeleme yapacağımız için böyle yaptık.
    this.props.actions.getProducts(category.id); // category'nin id sine göre productları getir.

  }
  render() {
    return (
      <div> 
        <h3><Badge color='warning'>Categories </Badge> </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // Burdaki state bizim store'daki tüm state mekanizmamız. statei proplara bağla
  return {
    currentCategory: state.changeCategoryReducer, // Benim currentCategory diye bir objem var. Onu state nesnesindeki changeCategoryReducer'a bağla.

    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  // action'ları proplara bağla

  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      )
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList); // store'a bağlama. Connect bir fonksiyon döndürür.
