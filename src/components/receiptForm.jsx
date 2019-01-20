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
      title: "",
      myIngredients: [],
      genreId: "0"
    },
    category: "",
    genres: [],
    ingredients: [],
    errors: {}
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

      const data = this.state.data;
      data.myIngredients = receipt.ingredients;
      data._id = receipt._id;
      data.title = receipt.title;
      data.genreId = receipt.genre._id;
      this.setState({ data });
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

  doSubmit = () => {
    saveReceipt(this.state.data);
    // this.props.history.push("/movies");
  };
  handelAddQuantity = ingredient => {
    const myIngredients = [...this.state.data.myIngredients];
    const index = myIngredients.indexOf(ingredient);

    myIngredients[index] = { ...myIngredients[index] };
    myIngredients[index].quantity++;

    const data = this.state.data;
    data.myIngredients = myIngredients;
    this.setState({ data });
  };
  handelRemoveQuantity = ingredient => {
    const myIngredients = [...this.state.data.myIngredients];
    const index = myIngredients.indexOf(ingredient);

    myIngredients[index] = { ...myIngredients[index] };
    if (myIngredients[index].quantity > 0) myIngredients[index].quantity--;

    const data = this.state.data;
    data.myIngredients = myIngredients;
    this.setState({ data });
  };
  handelonDelete = ingredient => {
    const myIngredients = this.state.data.myIngredients.filter(
      m => m !== ingredient
    );
    const data = this.state.data;
    data.myIngredients = myIngredients;
    this.setState({ data });
  };

  handelAddIngredient = (ingredientChoosed, quantity) => {
    let myIngredients = [...this.state.data.myIngredients];
    myIngredients.push({ name: ingredientChoosed.name, quantity });

    const { data } = this.state;
    data.myIngredients = myIngredients;

    addIngredient(data._id, ingredientChoosed, quantity);
    this.setState({ data });
  };
  handleChangeGenre(e) {
    this.setState({
      category: e.target.value
    });
  }
  handleChangeTitle(e) {
    const data = this.state.data;
    data.title = e.target.value;
    this.setState({ data });
  }
  render() {
    const { category, data } = this.state;
    console.log(data);
    return (
      <div>
        <h1>Receipt Form</h1>

        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            name="Title"
            id="Title"
            className="form-control"
            value={this.state.data.title}
            onChange={this.handleChangeTitle.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Genre">Genre</label>
          <select
            value={this.state.category}
            onChange={this.handleChangeGenre.bind(this)}
            className="form-control"
          >
            <option value="" />
            {this.state.genres.map(option => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
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
    if (this.state.data.myIngredients.length > 0)
      return (
        <div>
          <MyIngredients
            ingredients={this.state.data.myIngredients}
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
