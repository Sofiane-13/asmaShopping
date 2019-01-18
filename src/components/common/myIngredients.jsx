import React, { Component } from "react";
class MyIngredients extends Component {
  state = {};
  render() {
    const { ingredients } = this.props;
    return <div>{this.renderIngredients()}</div>;
  }
  renderIngredients() {
    const { ingredients, onAddQuantity, onRemoveQuantity } = this.props;
    if (ingredients.length > 0)
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ingredients</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(ingredient => (
              <tr key={ingredient.name}>
                <td>{ingredient.name}</td>
                <td>
                  <div>
                    <button
                      onClick={() => onAddQuantity(ingredient)}
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      +
                    </button>
                    {ingredient.quantity}
                    <button
                      onClick={() => onRemoveQuantity(ingredient)}
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      -
                    </button>
                  </div>
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
