import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "../searchBox";
class Popup extends Component {
  state = {
    visible: false,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    quantity: 0,
    ingredientChoosed: ""
  };

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
    const ingredientChoosed = ingredient;
    this.setState({ ingredientChoosed });
  };
  onRemoveQuantity = () => {
    var { quantity } = this.state;
    if (quantity > 0) {
      quantity--;
      this.setState({ quantity });
    }
  };
  onAddQuantity = () => {
    var { quantity } = this.state;
    quantity++;
    this.setState({ quantity });
  };

  render() {
    const {
      currentPage,
      pageSize,
      searchQuery,
      quantity,
      ingredientChoosed
    } = this.state;
    const { handelAddIngredient } = this.props;

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
          height="700"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div style={{ padding: "5px" }}>
            <div>
              <button
                className="float-right"
                value="Open"
                onClick={() => this.closeModal()}
                type="button"
                className="btn btn-dark"
              >
                Close
              </button>
              <h1>Add ingredients</h1>
              <h6>
                <b>Quantity :</b>
              </h6>
              <div style={{ marginLeft: "5px" }}>
                <button
                  onClick={this.onRemoveQuantity}
                  type="button"
                  className="btn btn-primary"
                  style={{ margin: "5px" }}
                >
                  -
                </button>
                {quantity}
                <button
                  onClick={this.onAddQuantity}
                  type="button"
                  className="btn btn-primary"
                  style={{ margin: "5px" }}
                >
                  +
                </button>
              </div>
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
                          className={
                            ingredient === ingredientChoosed
                              ? "btn btn-success"
                              : "btn btn-danger"
                          }
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
            <button
              style={{ marginLeft: "10px" }}
              type="button"
              className="btn btn-secondary"
              onClick={() => handelAddIngredient(ingredientChoosed, quantity)}
            >
              Ajouter
            </button>
          </div>
        </Modal>
      </section>
    );
  }
}

export default Popup;
