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
import { getGenres } from "../services/fakeGenreService";
import { Button, Collapse } from "react-bootstrap";
class Receipts extends Component {
  state = {
    receipts: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    genres: [],
    open: false
  };

  componentDidMount() {
    this.populatReceipts();
    this.populateGenres();
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
    const { currentPage, pageSize, searchQuery, selectedGenre } = this.state;
    let filtered = receipts;

    if (searchQuery)
      filtered = receipts.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    if (selectedGenre && selectedGenre._id)
      filtered = filtered.filter(m => m.genre.genreId === selectedGenre._id);

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
  populateGenres() {
    const data = getGenres();

    //const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ genres });
  }
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handlingFilterButton = () => {
    const { open } = this.state;

    if (open)
      this.setState({
        open: !open,
        selectedGenre: { _id: "", name: "All Genres" }
      });
    else this.setState({ open: !open });
  };

  render() {
    const {
      receipts,
      sortColumn,
      searchQuery,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      open
    } = this.state;
    const { data, filtered } = this.getPagedData(receipts);
    const totalCount = filtered.length;

    return (
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/receipts/new`}>
            <button className="btn btn-primary" style={{ marginRight: "1rem" }}>
              New
            </button>
          </Link>
          <button
            className="btn btn-danger"
            style={{ marginRight: "1rem" }}
            onClick={() => this.doSubmit()}
          >
            Clear
          </button>
          <button
            className="btn btn-dark"
            onClick={() => this.handlingFilterButton()}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Filter
          </button>
        </div>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text" style={{ marginTop: "1rem" }}>
            <ul className="list-group">
              {genres.map(item => (
                <li
                  onClick={() => this.handleGenreSelect(item)}
                  key={item._id}
                  className={
                    item === selectedGenre
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
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
