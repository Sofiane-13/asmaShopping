import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Receipts from "./components/receipts";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import ReceiptForm from "./components/receiptForm";
import ShoppingList from "./components/shoppingList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar />
          <Switch>
            <Route path="/home" component={Home} />
            <ProtectedRoute path="/receipts/:id" component={ReceiptForm} />
            <Route path="/receipts" component={Receipts} />
            <Route path="/shoppingList" component={ShoppingList} />
          </Switch>{" "}
        </main>{" "}
      </React.Fragment>
    );
  }
}

export default App;
