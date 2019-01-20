import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getReceipt, saveReceipt } from "../services/fakeReceiptService";
import { getIngredients } from "../services/fakeIngredientService";
import MyIngredients from "./common/myIngredients";
import "./receiptForm.css";
import Popup from "./common/popup";
import { addIngredient } from "../services/fakeReceiptService";

class ReceiptForm extends Form {
  state = {
    data: {
      _id: "",
      title: "title",
      genreId: "0"
    },
    myIngredients: [],
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
      .label("Genre")
  };

  populateGenres() {
    const genres = getGenres();
    this.setState({ genres });
  }

  populateReceipts() {
    try {
      const receiptId = this.props.match.params.id;
      if (receiptId === "new") return;

      const receipt = getReceipt(receiptId);
      this.setState({ data: this.mapToViewModel(receipt) });

      const myIngredients = receipt.ingredients;
      this.setState({ myIngredients });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  populateAllIngredient() {
    const ingredients = getIngredients();
    this.setState({ ingredients });
  }

  componentDidMount() {
    this.populateGenres();
    this.populateReceipts();
    this.populateAllIngredient();
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
  };
  handelAddQuantity = ingredient => {
    const myIngredients = [...this.state.myIngredients];
    const index = myIngredients.indexOf(ingredient);

    myIngredients[index] = { ...myIngredients[index] };
    myIngredients[index].quantity++;
    this.setState({ myIngredients });
  };
  handelRemoveQuantity = ingredient => {
    const myIngredients = [...this.state.myIngredients];
    const index = myIngredients.indexOf(ingredient);

    myIngredients[index] = { ...myIngredients[index] };
    if (myIngredients[index].quantity > 0) myIngredients[index].quantity--;
    this.setState({ myIngredients });
  };
  handelonDelete = ingredient => {
    const myIngredients = this.state.myIngredients.filter(
      m => m !== ingredient
    );
    this.setState({ myIngredients });
  };
  handelAddIngredient = (ingredientChoosed, quantity) => {
    const { data } = this.state;
    // console.log("Je suis vorte data", data);
    // console.log("Je suis vorte ingredientChoosed", ingredientChoosed);

    addIngredient(data._id, ingredientChoosed, quantity);
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <h1>Receipt Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderButton("Save")}
        </form>
        <div className="content-ingredients">
          <Popup
            ingredients={this.state.ingredients}
            handelAddIngredient={this.handelAddIngredient}
          />

          {this.renderMyIngredients()}
        </div>
      </div>
    );
  }
  renderMyIngredients() {
    if (this.state.myIngredients.length > 0)
      return (
        <div>
          <MyIngredients
            ingredients={this.state.myIngredients}
            onAddQuantity={this.handelAddQuantity}
            onRemoveQuantity={this.handelRemoveQuantity}
            onDelete={this.handelonDelete}
          />
        </div>
      );
    else return <div>There is no ingredient</div>;
  }
}

export default ReceiptForm;
