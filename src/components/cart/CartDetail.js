import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as cartActions from '../../redux/actions/cartActions'
import { bindActionCreators } from "redux";
import {Button, Table} from 'reactstrap'
import alertify from "alertifyjs"

class CartDetail extends Component {
  removeFromCart(product){
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + "Removed")
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.cart.map(cartItem=>(
             
            <tr key={cartItem.product.id} > 
              <th scope="row">{cartItem.product.id}</th>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td><Button onClick={()=>this.removeFromCart(cartItem.product)} color="danger">REMOVE</Button></td>

            </tr>
           ))}
        

          </tbody>
        </Table>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    // Aksiyonlara bağlanmak için.
      return {
        actions: {
          removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        },
      };
    }
    function mapStateToProps(state) {
      // State'e bağlanmak için.
      return {
        cart: state.cartReducer,
      };
    }
    export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);