import * as genresAPI from "./fakeGenreService";

const receipts = [{
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Couscous",
    ingredients: [{
        name: 'water',
        quantity: 1
      },
      {
        name: 'semoul',
        quantity: 1
      }
    ],
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "receipt"
    },

  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Ratatouille",
    ingredients: [{
        name: 'water',
        quantity: 1
      },
      {
        name: 'flour',
        quantity: 1
      },
      {
        name: 'oil',
        quantity: 1
      },
      {
        name: 'yeast',
        quantity: 1
      }
    ],
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "receipt"
    }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Pizza",
    ingredients: [{
        name: 'tomato',
        quantity: 1
      },
      {
        name: 'cheese',
        quantity: 1
      }
    ],
    genre: {
      _id: "5b21ca3eeb7f6fbccd471820",
      name: "cooked meal"
    }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "bread",
    ingredients: [{
        name: 'water',
        quantity: 1
      },
      {
        name: 'flour',
        quantity: 1
      },
      {
        name: 'oil',
        quantity: 1
      },
      {
        name: 'yeast',
        quantity: 1
      }
    ],
    genre: {
      _id: "5b21ca3eeb7f6fbccd471814",
      name: "bakery"
    },

  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "banana",
    ingredients: [],
    genre: {
      _id: "5b21ca3eeb7f6fbccd471815",
      name: "fruit"
    }
  }
];

export function getReceipts() {
  return receipts;
}

export function getReceipt(id) {
  return receipts.find(m => m._id === id);
}
export function saveReceipt(receipt, category) {
  //console.log("Anvant : ", receipts);

  const receiptExesting = getReceipt(receipt._id);
  receiptExesting.title = receipt.title;
  const genre = genresAPI.getGenreByName(category);
  console.log(genre);
  receiptExesting.genre = genre[0];

  receiptExesting.ingredients = receipt.myIngredients;

  deleteReceipt(receipt._id);
  receipts.push(receiptExesting);
  //console.log("Apres : ", receipts);

}
export function addIngredient(id, ingredient, quantity) {
  const receiptExesting = receipts.find(m => m._id === id);
  // console.log("On addIngredient", id, "   ", ingredient, "   ", quantity);
  const ingredientname = ingredient.name;
  receiptExesting.ingredients.push({
    name: ingredientname,
    quantity: quantity
  });
}
export function updateLike(id) {
  const receiptExesting = receipts.find(m => m._id === id);
  receiptExesting.liked = !receiptExesting.liked;

  deleteReceipt(id);
  receipts.push(receiptExesting);
}
// export function saveReceipt(receipt) {
//   let receiptInDb = receipts.find(m => m._id === receipt._id) || {};
//   receiptInDb.name = receipt.name;
//   receiptInDb.genre = genresAPI.genres.find(g => g._id === receipt.genreId);
//   receiptInDb.numberInStock = receipt.numberInStock;
//   receiptInDb.dailyRentalRate = receipt.dailyRentalRate;

//   if (!receiptInDb._id) {
//     receiptInDb._id = Date.now();
//     receipts.push(receiptInDb);
//   }

//   return receiptInDb;
// }

export function deleteReceipt(id) {
  let receiptInDb = receipts.find(m => m._id === id);
  receipts.splice(receipts.indexOf(receiptInDb), 1);
  return receiptInDb;
}