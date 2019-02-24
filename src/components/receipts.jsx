import React, { Component } from "react";
import ReceiptsTable from "./receiptsTable";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../components/utils/paginate";
import { Link } from "react-router-dom";
import { getReceipts, deleteReceipt } from "../httpServices/receiptServices";
import { putReceipts } from "../httpServices/receiptServices";
import { postShoppingList } from "../httpServices/shoppingListServices";
import { putAllReceiptsFalse } from "../httpServices/receiptServices";
import { deleteAllShoppingList } from "../httpServices/shoppingListServices";
import Like from "./common/like";
import { deleteIngredient } from "../httpServices/ingredientServices";
class Receipts extends Component {
  state = {
    receipts: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.populatReceipts();
  }
  async populatReceipts() {
    const receipts = await getReceipts();
    this.setState({ receipts: receipts.data });
  }
  handleLike = async receipt => {
    let result;
    let resultshoppingList;

    const myReceipt = receipt;

    resultshoppingList = await postShoppingList(myReceipt, myReceipt.liked);

    myReceipt.liked = !myReceipt.liked;
    result = await putReceipts(myReceipt);

    this.setState({ data: myReceipt });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = receipts => {
    const { currentPage, pageSize, searchQuery } = this.state;
    let filtered = receipts;
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
  handelonDelete = async receipt => {
    const { receipts } = this.state;

    const myReceipt = receipts.filter(m => m !== receipt);

    const result = await deleteReceipt(receipt);
    this.setState({ receipts: myReceipt });
  };
  doSubmit = async () => {
    let result = await deleteAllShoppingList();
    let resultReceipts = await putAllReceiptsFalse();
    let { receipts } = this.state;
    receipts.map(function(x) {
      x.liked = false;
      return x;
    });
    this.setState({ receipts });
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
        <h1
          style={{
            margin: "1rem 1rem 3rem 0",
            fontFamily: "system-ui"
          }}
        >
          Chose the recipes of the week
        </h1>

        <Link to={`/receipts/new`}>
          <button className="btn btn-primary" style={{ marginRight: "1rem" }}>
            New
          </button>
        </Link>
        <button className="btn btn-danger" onClick={() => this.doSubmit()}>
          Clear
        </button>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <table className="table">
          <thead>
            <tr>
              <th>Ingredients</th>

              <th>Like</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map(data => (
              <tr key={data._id}>
                <td>
                  <Link to={`/receipts/${data._id}`}>{data.title}</Link>
                </td>

                <td>
                  <Like
                    liked={data.liked}
                    onClick={() => this.handleLike(data)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handelonDelete(data)}
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

export default Receipts;
