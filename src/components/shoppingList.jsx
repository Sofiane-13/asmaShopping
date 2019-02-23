import React, { Component } from "react";
import {
  getShoppingList,
  deleteAllShoppingList
} from "../httpServices/shoppingListServices";
import { putAllReceiptsFalse } from "../httpServices/receiptServices";
class ShoppingList extends Component {
  state = { listShopping: [] };
  async componentDidMount() {
    const myList = await getShoppingList();
    this.setState({ listShopping: myList.data });
  }
  doSubmit = async () => {
    let result = await deleteAllShoppingList();
    let resultReceipts = await putAllReceiptsFalse();
    let { listShopping } = this.state;
    listShopping = [];
    this.setState({ listShopping });
  };
  render() {
    const data = this.state.listShopping;

    return (
      <div>
        <h1 style={{ margin: "1rem 1rem 3rem 0", fontFamily: "system-ui" }}>
          My shopping list of the week
        </h1>
        <button
          className="btn btn-danger"
          style={{ marginBottom: "1rem" }}
          onClick={() => this.doSubmit()}
        >
          clear
        </button>
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
      </div>
    );
  }
}

export default ShoppingList;
