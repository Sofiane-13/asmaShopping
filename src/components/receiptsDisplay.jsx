import React, { Component } from "react";
import { getReceiptsById } from "../httpServices/receiptServices";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

class ReceiptsDisplay extends Component {
  state = {
    data: {
      _id: "",
      title: "",
      preparation: "",
      personNum: 0,
      cookingTime: 0,
      liked: false,
      genre: {
        title: "",
        genreId: ""
      },
      ingredients: []
    }
  };
  componentDidMount() {
    this.populateReceipt();
  }
  async populateReceipt() {
    try {
      const receiptId = this.props.match.params.id;
      const { data: receipt } = await getReceiptsById(receiptId);
      const data = this.state.data;

      data._id = receiptId;
      data.ingredients = receipt.ingredients;
      data.genre.genreId = receipt.genre.genreId;
      data.title = receipt.title;
      data.genre = receipt.genre;
      data.cookingTime = receipt.cookingTime;
      data.personNum = receipt.personNum;
      data.preparation = receipt.preparation;
      data.liked = receipt.liked;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  render() {
    const { data } = this.state;
    return <div>{this.isLoading(data)}</div>;
  }
  isLoading(data) {
    if (data && data.title != "") {
      return (
        <div>
          <Link style={{ cursor: "pointer", fontSize: "1.5rem" }} to={`/`}>
            <button className="btn btn-dark" style={{ marginTop: "2rem" }}>
              Back
            </button>
          </Link>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1 style={{ marginBottom: "1rem" }}> {data.title} </h1>

            <h2
              style={{
                marginBottom: "1rem",
                border: ".5rem solid",
                padding: ".5rem"
              }}
            >
              {data.preparation}
            </h2>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ingredients</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unity</th>
                </tr>
              </thead>
              <tbody>
                {data.ingredients.map(ingredient => (
                  <tr key={ingredient.idIngredient}>
                    <td>{ingredient.title}</td>
                    <td>{ingredient.quantity}</td>
                    <td>{ingredient.unity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </div>
      );
  }
}

export default ReceiptsDisplay;
