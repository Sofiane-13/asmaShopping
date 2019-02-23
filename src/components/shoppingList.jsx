import React, { Component } from "react";
import {
  getShoppingList,
  deleteAllShoppingList,
  putShoppingList,
  postShoppingList
} from "../httpServices/shoppingListServices";
import { putAllReceiptsFalse } from "../httpServices/receiptServices";
import Popup from "./common/popup";
import { getIngredient } from "../httpServices/ingredientServices";
class ShoppingList extends Component {
  state = { listShopping: [], ingredients: [] };
  async componentDidMount() {
    this.populateAllIngredient();
    const myList = await getShoppingList();
    this.setState({ listShopping: myList.data });
  }
  async populateAllIngredient() {
    const ingredients = await getIngredient();
    this.setState({ ingredients: ingredients.data });
  }
  handelAddIngredient = async (ingredientChoosed, quantity) => {
    let listShopping = [...this.state.listShopping];
    const exestingIngredient = listShopping.filter(
      m => m.idIngredient == ingredientChoosed._id
    );

    if (exestingIngredient.length == 0) {
      listShopping.push({
        title: ingredientChoosed.title,
        quantity,
        unity: ingredientChoosed.unity,
        idIngredient: ingredientChoosed._id
      });

      //prepar ingredient
      const data = {
        ingredients: [
          {
            title: ingredientChoosed.title,
            quantity: quantity,
            unity: ingredientChoosed.unity,
            idIngredient: ingredientChoosed._id
          }
        ]
      };
      let resultshoppingList = await postShoppingList(data, false);

      this.setState({ listShopping });
    } else {
      alert("Ingredient already exists !");
    }
  };
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem"
          }}
        >
          <button
            style={{ marginRight: "1rem" }}
            className="btn btn-danger"
            onClick={() => this.doSubmit()}
          >
            clear
          </button>
          <Popup
            ingredients={this.state.ingredients}
            handelAddIngredient={this.handelAddIngredient}
          />
        </div>
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
              <tr key={ingredient.idIngredient}>
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
