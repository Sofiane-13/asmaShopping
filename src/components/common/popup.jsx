import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Popup extends Component {
  state = { visible: false, currentPage: 1, pageSize: 8 };

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
    const { currentPage, pageSize } = this.state;

    ingredients = paginate(ingredients, currentPage, pageSize);
    return { totalCount: ingredients.length, data: ingredients };
  };
  render() {
    const { currentPage, pageSize } = this.state;
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
                    <td>{ingredient.name}</td>
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
