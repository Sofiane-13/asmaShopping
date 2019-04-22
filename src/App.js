import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Receipts from "./components/receipts";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import ReceiptForm from "./components/receiptForm";
import ShoppingList from "./components/shoppingList";
import AllIngredients from "./components/allIngredients";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main
          className="container"
          style={{
            marginBottom: "2rem"
          }}
        >
          <NavBar />
          <Switch>
            <ProtectedRoute path="/receipts/:id" component={ReceiptForm} />{" "}
            <Route path="/shoppingList" component={ShoppingList} />{" "}
            <Route path="/ingredients" component={AllIngredients} />{" "}
            <Route path="/" component={Receipts} />{" "}
          </Switch>{" "}
        </main>{" "}
      </React.Fragment>
    );
  }
}

export default App;
