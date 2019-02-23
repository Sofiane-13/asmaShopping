import React, { Component } from "react";
import { getIngredient } from "../httpServices/ingredientServices";
import ReceiptsTable from "./receiptsTable";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { postIngredient } from "../httpServices/ingredientServices";
class AllIngredients extends Component {
  state = {
    data: {
      title: "",
      unity: ""
    },
    ingredients: [],
    currentPage: 1,
    searchQuery: "",
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" }
  };
  async populateIngredient() {
    const ingredients = await getIngredient();
    this.setState({ ingredients: ingredients.data });
  }
  componentDidMount() {
    this.populateIngredient();
  }
  getPagedData = ingredients => {
    const { currentPage, pageSize, searchQuery } = this.state;
    let filtered = ingredients;

    if (searchQuery)
      filtered = ingredients.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const paginateIngredients = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: filtered.length,
      data: paginateIngredients
    };
  };
  handleLike = async receipt => {};
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleChangeTitle(e) {
    const data = this.state.data;
    data.title = e.target.value;
    this.setState({ searchQuery: data.title, currentPage: 1 });
    this.setState({ data });
  }
  handleChangeUnity(e) {
    const data = this.state.data;
    data.unity = e.target.value;
    this.setState({ data });
  }

  doSubmit = async () => {
    const { ingredients, data, searchQuery } = this.state;
    const existingIngredient = ingredients.filter(
      i => i.title.toLowerCase() === data.title.toLowerCase()
    );
    if (existingIngredient.length != 0) {
      alert("Ingredient existe ! ");
    } else {
      const ingredient = {
        title: data.title,
        unity: data.unity
      };
      let result = await postIngredient(ingredient);
      let newIngredients = ingredients;
      newIngredients.push(ingredient);

      let newData = data;
      newData.title = "";
      newData.unity = "";
      const newSearchQuery = "";
      this.setState({
        ingredients: newIngredients,
        data: newData,
        searchQuery: newSearchQuery
      });
    }
  };
  render() {
    const { ingredients, currentPage, pageSize } = this.state;

    const { data, totalCount } = this.getPagedData(ingredients);
    // const totalCount = data.length;

    return (
      <div>
        <h1 style={{ margin: "1rem 1rem 3rem 0", fontFamily: "system-ui" }}>
          All ingredients
        </h1>
        <button
          className="btn btn-primary"
          style={{ marginBottom: "1rem" }}
          onClick={() => this.doSubmit()}
        >
          New
        </button>
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            name="Title"
            id="Title"
            className="form-control"
            value={this.state.data.title}
            onChange={this.handleChangeTitle.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Unity">Unity</label>
          <input
            name="Unity"
            id="Unity"
            className="form-control"
            value={this.state.data.unity}
            onChange={this.handleChangeUnity.bind(this)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unity</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.title}>
                <td>{item.title}</td>
                <td>{item.unity}</td>
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

export default AllIngredients;
