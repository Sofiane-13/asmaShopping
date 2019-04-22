import React, { Component } from "react";
import {
  getShoppingList,
  deleteAllShoppingList,
  putShoppingList,
  postShoppingList,
  deleteShoppingList,
  postShoppingListOne
} from "../httpServices/shoppingListServices";
import { putAllReceiptsFalse } from "../httpServices/receiptServices";
import Popup from "./common/popup";
import { getIngredient } from "../httpServices/ingredientServices";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { ToastsContainer, ToastsStore } from "react-toasts";

class ShoppingList extends Component {
  state = { listShopping: [], ingredients: [], pageSize: 5, currentPage: 1 };
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
    ToastsStore.success("Ingredient added!");
    let listShopping = [...this.state.listShopping];
    const exestingIngredient = listShopping.filter(
      m => m.idIngredient == ingredientChoosed._id
    );

    if (exestingIngredient.length == 0) {
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
      let resultshoppingList = await postShoppingListOne(data, false);
      listShopping.push(resultshoppingList.data);
      this.setState({ listShopping });
    } else {
      ToastsStore.error("Ingredient already exists!");
    }
  };
  doSubmit = async () => {
    ToastsStore.success("Ingredients removed!");
    let result = await deleteAllShoppingList();
    let resultReceipts = await putAllReceiptsFalse();
    let { listShopping } = this.state;
    listShopping = [];
    this.setState({ listShopping });
  };
  handelonDelete = async ingredient => {
    const { listShopping } = this.state;

    const ingredients = listShopping.filter(m => m !== ingredient);

    const result = await deleteShoppingList(ingredient);
    this.setState({ listShopping: ingredients });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  getPagedData = receipts => {
    const { currentPage, pageSize } = this.state;
    let filtered = receipts;

    const paginateIngredients = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: paginateIngredients.length,
      dataPaginate: paginateIngredients,
      filtered: filtered
    };
  };
  handelAddQuantity = async ingredient => {
    const ingredients = [...this.state.ingredients];
    const index = ingredients.findIndex(g => g._id === ingredient.idIngredient);
    ingredient.quantity = ingredient.quantity + 1;
    let putShoppingListResult = await putShoppingList(ingredient);
    ingredients[index] = ingredient;
    this.setState({ ingredients });
  };
  handelRemoveQuantity = async ingredient => {
    const ingredients = [...this.state.ingredients];
    const index = ingredients.findIndex(g => g._id === ingredient.idIngredient);
    if (ingredient.quantity > 0) {
      ingredient.quantity = ingredient.quantity - 1;
      let putShoppingListResult = await putShoppingList(ingredient);
      ingredients[index] = ingredient;
      this.setState({ ingredients });
    } else {
      ToastsStore.error("Nothing to remove!");
    }
  };
  render() {
    const { pageSize, currentPage } = this.state;
    const data = this.state.listShopping;
    const { dataPaginate } = this.getPagedData(data);
    const totalCount = data.length;

    return (
      <div
        style={{
          marginTop: "1rem"
        }}
      >
        <ToastsContainer store={ToastsStore} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
        <div style={{ display: "flex", maxwidth: "100%" }}>
          <table
            className="table"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%"
            }}
          >
            <thead
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <tr>
                <th scope="col">Ingredients</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unity</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              {dataPaginate.map(ingredient => (
                <tr key={ingredient.idIngredient}>
                  <td>{ingredient.title}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() => this.handelRemoveQuantity(ingredient)}
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </button>
                      <span>
                        {ingredient.quantity}({ingredient.unity})
                      </span>
                      <button
                        onClick={() => this.handelAddQuantity(ingredient)}
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "5px" }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{ingredient.unity}</td>
                  <td>
                    <button
                      onClick={() => this.handelonDelete(ingredient)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default ShoppingList;
