import React, { Component } from "react";
import ReceiptsTable from "./receiptsTable";
import { getReceipts, updateLike } from "../services/fakeReceiptService";
import {
  addingToShoppingListe,
  removingFromShoppingList
} from "../services/fakeShoppingList";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../components/utils/paginate";

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

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = receipts => {
    const { currentPage, pageSize, searchQuery } = this.state;
    let filtered = receipts;
    console.log("cest moi", receipts);
    if (searchQuery)
      filtered = receipts.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const paginateIngredients = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: paginateIngredients.length,
      data: paginateIngredients,
      filtered: filtered
    };
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      receipts,
      sortColumn,
      searchQuery,
      pageSize,
      currentPage
    } = this.state;
    const { data, filtered } = this.getPagedData(receipts);
    const totalCount = filtered.length;

    return (
      <div>
        <h1>Receipts</h1>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <ReceiptsTable
          receipts={data}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
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

export default Receipts;
