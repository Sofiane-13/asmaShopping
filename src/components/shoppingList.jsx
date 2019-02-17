import React, { Component } from "react";
import { getShoppingList } from "../httpServices/shoppingListServices";

class ShoppingList extends Component {
  state = { listShopping: [] };
  async componentDidMount() {
    const myList = await getShoppingList();
    this.setState({ listShopping: myList.data });
  }
  render() {
    const data = this.state.listShopping;

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Ingredients</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ingredient => (
            <tr key={ingredient._id}>
              <td>{ingredient.title}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.unity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ShoppingList;
