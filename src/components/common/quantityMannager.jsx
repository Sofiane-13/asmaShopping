import React, { Component } from "react";
class QuantityManager extends Component {
  state = {};
  render() {
    const { quantity, onRemoveQuantity, onAddQuantity } = this.props;
    return (
      <div>
        <button
          onClick={onRemoveQuantity}
          type="button"
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          -
        </button>
        {quantity}
        <button
          onClick={onAddQuantity}
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
        >
          +
        </button>
      </div>
    );
  }
}

export default QuantityManager;
