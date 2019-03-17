import React, { Component } from "react";
class QuantityManager extends Component {
  state = {};
  onDateChange(dateValue) {
    // for a date field, the value is passed into the change handler
    this.props.onChange("dateCommenced", dateValue);
  }
  render() {
    const { quantity, onRemoveQuantity, onAddQuantity } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <button
          onClick={onRemoveQuantity}
          type="button"
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          -
        </button>
        <input
          name="quantity"
          id="quantity"
          className="form-control"
          value={quantity}
          onChange={this.onDateChange.bind(this)}
          style={{ width: "4rem" }}
        />
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
