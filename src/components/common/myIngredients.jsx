import React, { Component } from "react";
class MyIngredients extends Component {
  state = {};
  render() {
    const { ingredients } = this.props;
    return <div>{this.renderIngredients()}</div>;
  }
  renderIngredients() {
    const {
      ingredients,
      onAddQuantity,
      onRemoveQuantity,
      onDelete
    } = this.props;
    if (ingredients.length > 0)
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ingredients</th>
              <th scope="col">Quantity</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(ingredient => (
              <tr key={ingredient.idIngredient}>
                <td>{ingredient.title}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <button
                      onClick={() => onRemoveQuantity(ingredient)}
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </button>
                    <span>
                      {ingredient.quantity}({ingredient.unity})
                    </span>
                    <button
                      onClick={() => onAddQuantity(ingredient)}
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: "5px" }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(ingredient)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    else return <div>No ingredients !</div>;
  }
}

export default MyIngredients;
