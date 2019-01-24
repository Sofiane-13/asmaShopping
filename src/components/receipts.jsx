import React, { Component } from "react";
import ReceiptsTable from "./receiptsTable";
import { getReceipts, updateLike } from "../services/fakeReceiptService";
import {
  addingToShoppingListe,
  removingFromShoppingList
} from "../services/fakeShoppingList";

class Receipts extends Component {
  state = {
    receipts: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const receipts = getReceipts();
    console.log(receipts);

    this.setState({ receipts });
  }

  handleLike = receipt => {
    const receipts = [...this.state.receipts];
    // console.log(receipts);
    const index = receipts.indexOf(receipt);
    receipts[index] = { ...receipts[index] };

    if (!receipts[index].liked) {
      addingToShoppingListe(receipt);
    } else {
      removingFromShoppingList(receipt);
    }
    receipts[index].liked = !receipts[index].liked;
    updateLike(receipt._id);
    this.setState({ receipts });
  };

  render() {
    const { receipts, sortColumn } = this.state;
    return (
      <div>
        <h1>Receipts</h1>
        <ReceiptsTable
          receipts={receipts}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}

export default Receipts;
