import React, { Component } from "react";
import { getListShopping } from "../services/fakeShoppingList";

class ShoppingList extends Component {
  state = { listShopping: [] };
  async componentDidMount() {
    const listShopping = getListShopping();
    this.setState({ listShopping });
  }
  render() {
    const data = this.state.listShopping;

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Ingredients</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ingredient => (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ShoppingList;
