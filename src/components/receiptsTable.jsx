import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class ReceiptsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: receipt => (
        <Link to={`/receipts/${receipt._id}`}>{receipt.title}</Link>
      )
    },
    { path: "genre.title", label: "Genre" },
    {
      key: "like",
      content: receipt => (
        <Like
          liked={receipt.liked}
          onClick={() => this.props.onLike(receipt)}
        />
      )
    },
    {
      key: "delete",
      content: receipt => (
        <button
          onClick={() => this.props.onDelete(receipt)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { receipts, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={receipts}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ReceiptsTable;
