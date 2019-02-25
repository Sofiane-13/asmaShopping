import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getIngredient } from "../httpServices/ingredientServices";
import MyIngredients from "./common/myIngredients";
import "./receiptForm.css";
import Popup from "./common/popup";
import { getReceiptsById } from "../httpServices/receiptServices";
import { putReceipts } from "../httpServices/receiptServices";
import { postReceipts } from "../httpServices/receiptServices";
class ReceiptForm extends Form {
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
    },
    genres: [],
    ingredients: [],
    errors: {}
  };

  populateGenres() {
    const genres = getGenres();
    this.setState({ genres });
  }

  async populateReceipts() {
    try {
      const receiptId = this.props.match.params.id;
      if (receiptId === "new") return;

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
  async populateAllIngredient() {
    const ingredients = await getIngredient();
    this.setState({ ingredients: ingredients.data });
  }

  componentDidMount() {
    this.populateGenres();
    this.populateReceipts();
    this.populateAllIngredient();
  }

  doSubmit = async () => {
    let { data } = this.state;

    let result;
    const receiptId = this.props.match.params.id;
    if (receiptId === "new") {
      delete data._id;

      result = await postReceipts(data);
    } else {
      result = await putReceipts(this.state.data, this.state.data._id);
    }
  };
  handelAddQuantity = ingredient => {
    const ingredients = [...this.state.data.ingredients];
    const index = ingredients.indexOf(ingredient);

    ingredients[index] = { ...ingredients[index] };
    ingredients[index].quantity++;

    const data = this.state.data;
    data.ingredients = ingredients;
    this.setState({ data });
  };
  handelRemoveQuantity = ingredient => {
    const ingredients = [...this.state.data.ingredients];
    const index = ingredients.indexOf(ingredient);

    ingredients[index] = { ...ingredients[index] };
    if (ingredients[index].quantity > 0) ingredients[index].quantity--;

    const data = this.state.data;
    data.ingredients = ingredients;
    this.setState({ data });
  };
  handelonDelete = ingredient => {
    const ingredients = this.state.data.ingredients.filter(
      m => m !== ingredient
    );
    const data = this.state.data;
    data.ingredients = ingredients;
    this.setState({ data });
  };

  handelAddIngredient = (ingredientChoosed, quantity) => {
    let ingredients = [...this.state.data.ingredients];
    const exestingIngredient = ingredients.filter(
      m => m.idIngredient == ingredientChoosed._id
    );

    if (exestingIngredient.length == 0) {
      ingredients.push({
        title: ingredientChoosed.title,
        quantity,
        unity: ingredientChoosed.unity,
        idIngredient: ingredientChoosed._id
      });

      const { data } = this.state;
      data.ingredients = ingredients;

      this.setState({ data });
    } else {
      alert("Ingredient already exists !");
    }
  };
  handleChangeGenre(e) {
    const { data, genres } = this.state;
    const myGenre = genres.find(g => g._id === e.target.value);
    data.genre.title = myGenre.name;
    data.genre.genreId = myGenre._id;

    this.setState({
      data
    });
  }
  handleChangeTitle(e) {
    const data = this.state.data;
    data.title = e.target.value;
    this.setState({ data });
  }
  handleChangeCook(e) {
    const data = this.state.data;
    data.preparation = e.target.value;
    this.setState({ data });
  }
  handleChangePersonNum(e) {
    const data = this.state.data;
    data.personNum = e.target.value;
    this.setState({ data });
  }
  handleChangeCookingTime(e) {
    const data = this.state.data;
    data.cookingTime = e.target.value;
    this.setState({ data });
  }
  render() {
    const { data, ingredients } = this.state;

    return (
      <div>
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
            value={this.state.data.genre.title}
            onChange={this.handleChangeGenre.bind(this)}
            className="form-control"
          >
            <option
              value={this.state.data.genre.title}
              className="p-3 mb-2 bg-primary text-white"
            >
              {this.state.data.genre.title}
            </option>
            {this.state.genres.map(option => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numPer">For how many people :</label>
          <select
            className="form-control"
            value={this.state.data.personNum}
            onChange={this.handleChangePersonNum.bind(this)}
            id="numPer"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cooking Time (min) :</label>
          <select
            className="form-control"
            value={this.state.data.cookingTime}
            onChange={this.handleChangeCookingTime.bind(this)}
            id="cookTime"
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
            <option value="65">65</option>
            <option value="70">70</option>
            <option value="75">75</option>
            <option value="80">80</option>
            <option value="85">85</option>
            <option value="90">90</option>
            <option value="105">105</option>
            <option value="110">110</option>
            <option value="115">115</option>
            <option value="120">120</option>
            <option value="125">125</option>
            <option value="130">130</option>
            <option value="135">135</option>
            <option value="140">140</option>
            <option value="145">145</option>
            <option value="150">150</option>
            <option value="155">155</option>
            <option value="160">160</option>
            <option value="165">165</option>
            <option value="170">170</option>
            <option value="175">175</option>
            <option value="180">180</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Title">How to prepare :</label>
          <textarea
            name="cook"
            id="cook"
            className="form-control"
            value={this.state.data.preparation}
            onChange={this.handleChangeCook.bind(this)}
            rows="5"
          />
        </div>
        <div className="content-ingredients">
          <Popup
            ingredients={this.state.ingredients}
            handelAddIngredient={this.handelAddIngredient}
          />

          {this.renderingredients()}
        </div>
        <button className="btn btn-success" onClick={() => this.doSubmit()}>
          Save
        </button>
      </div>
    );
  }
  renderingredients() {
    if (this.state.data.ingredients.length > 0)
      return (
        <div>
          <MyIngredients
            ingredients={this.state.data.ingredients}
            onAddQuantity={this.handelAddQuantity}
            onRemoveQuantity={this.handelRemoveQuantity}
            onDelete={this.handelonDelete}
          />
        </div>
      );
    else
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "5rem",
            fontFamily: "system-ui"
          }}
        >
          There is no ingredient !
        </div>
      );
  }
}

export default ReceiptForm;
