import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getReceipt, saveReceipt } from "../services/fakeReceiptService";
import { getIngredients } from "../services/fakeIngredientService";
class ReceiptForm extends Form {
  state = {
    data: {
      title: "",
      genreId: ""
    },
    genres: [],
    ingredients: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    ingredientId: Joi.string()
      .required()
      .label("Ingredient")
  };

  populateGenres() {
    const genres = getGenres();
    this.setState({ genres });
  }

  populateIngredients() {
    const ingredients = getIngredients();
    console.log(ingredients);
    this.setState({ ingredients });
  }

  populateReceipts() {
    try {
      const receiptId = this.props.match.params.id;
      if (receiptId === "new") return;

      const receipt = getReceipt(receiptId);
      this.setState({ data: this.mapToViewModel(receipt) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  componentDidMount() {
    this.populateGenres();
    this.populateReceipts();
    this.populateIngredients();
  }

  mapToViewModel(receipt) {
    return {
      _id: receipt._id,
      title: receipt.title,
      genreId: receipt.genre._id
    };
  }

  doSubmit = () => {
    saveReceipt(this.state.data);
    // this.props.history.push("/movies");
    console.log("submit");
  };

  render() {
    return (
      <div>
        <h1>Receipt Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderSelect(
            "ingredientId",
            "Ingredient",
            this.state.ingredients
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReceiptForm;
