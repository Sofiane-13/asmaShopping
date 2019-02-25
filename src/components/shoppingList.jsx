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
  render() {
    const { pageSize, currentPage } = this.state;
    const data = this.state.listShopping;
    const { dataPaginate, filtered } = this.getPagedData(data);
    const totalCount = data.length;

    return (
      <div>
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
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataPaginate.map(ingredient => (
              <tr key={ingredient.idIngredient}>
                <td>{ingredient.title}</td>
                <td>{ingredient.quantity}</td>
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
