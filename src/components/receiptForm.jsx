import React from "react";
import Form from "./common/form";
import { getGenres, getGenre } from "../services/fakeGenreService";
import {
  getReceipt,
  saveReceipt,
  getReceipts
} from "../services/fakeReceiptService";
import { getIngredients } from "../services/fakeIngredientService";
import MyIngredients from "./common/myIngredients";
import "./receiptForm.css";
import Popup from "./common/popup";
import { addIngredient } from "../services/fakeReceiptService";
import { getReceiptsById } from "../httpServices/receiptServices";

class ReceiptForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      myIngredients: [],
      genre: {
        title: ""
      },
      preparation: "",
      personNum: 0,
      cookingTime: 0
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

  async populateReceipts() {
    try {
      const receiptId = this.props.match.params.id;
      if (receiptId === "new") return;

      const { data: receipt } = await getReceiptsById(receiptId);
      const data = this.state.data;
      data.myIngredients = receipt.ingredients;
      data._id = receipt._id;
      data.title = receipt.title;
      data.genre = receipt.genre;
      data.cookingTime = receipt.cookingTime;
      data.personNum = receipt.personNum;
      data.preparation = receipt.preparation;

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
    saveReceipt(this.state.data, this.state.category);
    // const receipts = getReceipts();
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
    const exestingIngredient = myIngredients.filter(
      m => m.name == ingredientChoosed.name
    );

    if (exestingIngredient.length == 0) {
      myIngredients.push({ name: ingredientChoosed.name, quantity });

      const { data } = this.state;
      data.myIngredients = myIngredients;

      //addIngredient(data._id, ingredientChoosed, quantity);
      this.setState({ data });
    } else {
      alert("Ingredient already exists !");
    }
  };
  handleChangeGenre(e) {
    const { data, genres } = this.state;
    const myGenre = genres.find(g => g._id === e.target.value);
    data.genre.title = myGenre.name;
    data.genre._id = myGenre._id;

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
    const { category, data } = this.state;
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

          {this.renderMyIngredients()}
        </div>
        <button className="btn btn-success" onClick={() => this.doSubmit()}>
          Save
        </button>
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
