import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "../searchBox";
import TableToSelect from "./tableToSelect";
import QuantityManager from "./quantityMannager";
class Popup extends Component {
  state = {
    visible: false,
    currentPage: 1,
    pageSize: 2,
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
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const paginateIngredients = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: paginateIngredients.length,
      data: paginateIngredients,
      filtered: filtered
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
  onChange(field, value) {
    this.setState({ quantity: value.target.value });
  }

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

    const { data, filtered } = this.getPagedData(ingredients);
    const totalCount = filtered.length;
    return (
      <section>
        <button
          value="Open"
          onClick={() => this.openModal()}
          type="button"
          className="btn btn-primary"
        >
          New ingredient
        </button>
        <Modal
          visible={this.state.visible}
          width="100%"
          height="100%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div style={{ margin: "1.5rem", padding: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6>
                  <b style={{ fontFamily: "system-ui" }}>Quantity :</b>
                </h6>
                <button
                  className="float-right btn btn-dark"
                  value="Open"
                  onClick={() => this.closeModal()}
                  type="button"
                >
                  Close
                </button>
              </div>
              <QuantityManager
                quantity={quantity}
                onRemoveQuantity={this.onRemoveQuantity}
                onAddQuantity={this.onAddQuantity}
                onChange={this.onChange.bind(this)}
              />
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <TableToSelect
                data={data}
                ingredientChoosed={ingredientChoosed}
                handelSelectedIngredient={this.handelSelectedIngredient}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
            <button
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
