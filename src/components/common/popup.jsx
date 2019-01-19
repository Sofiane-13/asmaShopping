import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "../searchBox";

class Popup extends Component {
  state = { visible: false, currentPage: 1, pageSize: 8, searchQuery: "" };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  getPagedData = ingredients => {
    const { currentPage, pageSize, searchQuery } = this.state;
    let filtered = ingredients;

    if (searchQuery)
      filtered = ingredients.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const paginateIngredients = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: paginateIngredients.length,
      data: paginateIngredients
    };
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handelSelectedIngredient = ingredient => {
    console.log(ingredient);
  };
  render() {
    const { currentPage, pageSize, searchQuery } = this.state;
    const { ingredients } = this.props;
    const totalCount = ingredients.length;

    const { data } = this.getPagedData(ingredients);
    return (
      <section>
        <button
          // onClick={() => onRemoveQuantity(ingredient)}
          value="Open"
          onClick={() => this.openModal()}
          type="button"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          +
        </button>
        <Modal
          visible={this.state.visible}
          width="1000"
          height="500"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <button
              // onClick={() => onRemoveQuantity(ingredient)}
              value="Open"
              onClick={() => this.closeModal()}
              type="button"
              className="btn btn-danger"
            >
              Close
            </button>
            <h1>Add ingredient</h1>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            {/* debut de la table */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {data.map(ingredient => (
                  <tr key={ingredient.name}>
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{ width: "100%", height: "100%" }}
                        onClick={() =>
                          this.handelSelectedIngredient(ingredient)
                        }
                      >
                        {ingredient.name}
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
            {/* Fin de la table  */}
          </div>
        </Modal>
      </section>
    );
  }
}

export default Popup;
