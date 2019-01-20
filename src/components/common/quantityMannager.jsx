import React, { Component } from "react";
class QuantityManager extends Component {
  state = {};
  render() {
    const { quantity, onRemoveQuantity, onAddQuantity } = this.props;
    return (
      <div style={{ marginLeft: "5px" }}>
        <button
          onClick={onRemoveQuantity}
          type="button"
          className="btn btn-primary"
          style={{ margin: "5px" }}
        >
          -
        </button>
        {quantity}
        <button
          onClick={onAddQuantity}
          type="button"
          className="btn btn-primary"
          style={{ margin: "5px" }}
        >
          +
        </button>
      </div>
    );
  }
}

export default QuantityManager;
