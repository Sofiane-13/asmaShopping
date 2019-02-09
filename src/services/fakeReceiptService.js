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
  // return receipts;
  console.log('je ss ds get');

  // fetch('http://localhost:3000/api/receipts').then(results => {
  //   console.log('Moi ', results);
  //   return results.json();
  // }).then(data => {
  //   console.log(data);
  //   return data;
  // });

}

export function getReceipt(id) {
  console.log('je ss ds get ID', id);
  const url = 'http://localhost:3000/api/receipts/';
  console.log(url);

  // fetch('http://localhost:3000/api/receipts/').then(results => {
  //   return results.json();
  // }).then(data => {
  //   console.log(data);
  //   return data;
  // });
}
export function saveReceipt(receipt, category) {

  const receiptExesting = getReceipt(receipt._id);
  const genre = genresAPI.getGenreByName(category);
  console.log(receiptExesting);
  console.log(receipt);

  // if (typeof receiptExesting === 'undefined') {

  //   const myreceipt = {
  //     _id: "1234",
  //     title: receipt.title,
  //     ingredients: receipt.myIngredients,
  //     genre: genre[0]
  //   }
  //   receipts.push(myreceipt);
  // } else {

  //   receiptExesting.title = receipt.title;
  //   receiptExesting.genre = genre[0];

  //   receiptExesting.ingredients = receipt.myIngredients;

  //   deleteReceipt(receipt._id);
  //   receipts.push(receiptExesting);
  // }

}
export function addIngredient(id, ingredient, quantity) {
  const receiptExesting = receipts.find(m => m._id === id);
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


export function deleteReceipt(id) {
  let receiptInDb = receipts.find(m => m._id === id);
  receipts.splice(receipts.indexOf(receiptInDb), 1);
  return receiptInDb;
}