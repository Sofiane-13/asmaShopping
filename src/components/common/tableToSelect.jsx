import React, { Component } from "react";
class TableToSelect extends Component {
  state = {};
  render() {
    const { data, ingredientChoosed, handelSelectedIngredient } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ingredient => (
            <tr key={ingredient.title}>
              <td>
                <button
                  className={
                    ingredient === ingredientChoosed
                      ? "btn btn-success"
                      : "btn btn-danger"
                  }
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => handelSelectedIngredient(ingredient)}
                >
                  {ingredient.title}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableToSelect;
