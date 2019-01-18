import React, { Component } from "react";
import ReceiptsTable from "./receiptsTable";
import { getReceipts } from "../services/fakeReceiptService";
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
    // const genres = [{ _id: "", name: "All Genres" }, ...data];

    // const { data: movies } = await getMovies();
    this.setState({ receipts });
  }

  handleLike = receipt => {
    const receipts = [...this.state.receipts];
    const index = receipts.indexOf(receipt);
    receipts[index] = { ...receipts[index] };
    receipts[index].liked = !receipts[index].liked;
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
